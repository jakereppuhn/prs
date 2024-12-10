import { IncomingMessage } from "http";
import WebSocket, { WebSocketServer } from "ws";

import { Services } from ".";
import { ClientSubscriptionType, WSMessageType } from "@/types/enums";
import { IWSMessage } from "@/types/schema";

export class SocketService {
  private services: Services;
  private readonly heartbeatConfig: any;
  private monitorConnections: Map<string, WebSocket>;
  // update type
  private monitorConnectionInfo: Map<string, any>;
  private clientSubscriptions: Map<ClientSubscriptionType, Set<WebSocket>>;
  private heartbeatIntervals: Map<string, NodeJS.Timeout>;
  private heartbeatTimeouts: Map<string, NodeJS.Timeout>;

  constructor(services: Services) {}

  public async initialize(wss: WebSocketServer) {
    wss.on("connection", (socket: WebSocket, request: IncomingMessage) => {
      const connectionType = this.getRequestParam(request, "connectionType");

      switch (connectionType) {
        case "client":
          this.handleClientConnection(socket, request);
          break;
        case "monitor":
          this.handleMonitorConnection(socket, request);
          break;
        default:
          socket.close(1008, "Invalid connection type");
          throw new Error("Invalid connection type");
      }
    });
  }

  private getRequestParam(request: any, paramName: string): string | undefined {
    try {
      const url = new URL(request.url!, `http://${request.headers.host}`);
      return url.searchParams.get(paramName) || undefined;
    } catch (error) {
      throw new Error(`Error getting ${paramName}`);
    }
  }

  public async handleClientConnection(
    socket: WebSocket,
    request: IncomingMessage
  ) {
    const subscriptionType = this.getRequestParam(request, "subscriptionType");

    if (
      !subscriptionType ||
      !Object.values(ClientSubscriptionType).includes(
        subscriptionType as ClientSubscriptionType
      )
    ) {
      socket.close(1008, "Valid subscription type required");
      throw new Error("Valid subscription type required");
    }

    const subscribers = this.clientSubscriptions.get(
      subscriptionType as ClientSubscriptionType
    );

    subscribers?.add(socket);

    switch (subscriptionType) {
      case ClientSubscriptionType.ALERTS:
        await this.broadcastAlerts();
        break;
      case ClientSubscriptionType.MACHINE_STATUS:
        await this.broadcastMachineStatus();
        break;
      case ClientSubscriptionType.MONITOR_STATUS:
        await this.broadcastMonitorStatus();
        break;
    }

    this.setupClientListeners(
      subscriptionType as ClientSubscriptionType,
      socket
    );
  }

  public async handleMonitorConnection(
    socket: WebSocket,
    request: IncomingMessage
  ) {
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
    const monitorId = this.getRequestParam(request, "monitorId");

    if (!monitorId) {
      console.log(
        `[${timestamp}] [error] [server] [404] [GET] [/monitor/connect] {}`
      );
      socket.close(1008, "Monitor ID required");
      throw new Error("Monitor ID required");
    }

    // const monitor = await Monitor.findOne({ where: { name: monitorId } });
    const monitor = {
      id: 1,
    };

    if (!monitor) {
      console.log(
        `[${timestamp}] [error] [server] [404] [GET] [/monitor/connect] {}`
      );
      socket.close(1008, "Monitor not found with the provided ID");
      throw new Error("Monitor not found with the provided ID");
    }

    if (this.monitorConnections.has(monitorId)) {
      console.log(
        `[${timestamp}] [error] [server] [404] [GET] [/monitor/connect] {}`
      );
      socket.close(1008, "Monitor ID already connected");
      throw new Error("Monitor ID already connected");
    }

    // update type
    const initialState: any = {
      monitorId: monitor.id,
      connectedAt: new Date(),
      lastHeartbeat: new Date(),
      missedHeartbeats: 0,
      isAwaitingHeartbeat: false,
      reconnectAttempts: 0,
    };

    this.monitorConnections.set(monitorId, socket);
    this.monitorConnectionInfo.set(monitorId, initialState);

    console.log(
      `[${timestamp}] [success] [server] [200] [GET] [/monitor/connect] {}`
    );

    this.setupMonitorListeners(monitorId, socket);
    this.startHeartbeatMonitor(monitorId);

    this.broadcastMonitorStatus();
  }

  private async setupClientListeners(
    subscriptionType: ClientSubscriptionType,
    socket: WebSocket
  ) {
    socket.on("close", () => {
      const subscribers = this.clientSubscriptions.get(subscriptionType);
      subscribers?.delete(socket);
    });

    socket.on("error", (error) => {
      const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
      console.log(
        `[${timestamp}] [error] [server] [500] [WS] [/monitor/error] {}`
      );

      socket.close();
    });
  }

  private async setupMonitorListeners(monitorId: string, socket: WebSocket) {
    socket.on("message", (data: WebSocket.Data) => {
      const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);
      const message: IWSMessage = JSON.parse(data.toString());

      switch (message.type) {
        case WSMessageType.READING:
          console.log(
            `[${timestamp}] [success] [server] [200] [WS] [/monitor/reading] {}`
          );
          this.handleIncomingReading(message.payload);
          break;
        case WSMessageType.HEARTBEAT:
          console.log(
            `[${timestamp}] [success] [server] [200] [WS] [/monitor/heartbeat] ${monitorId}`
          );
          this.handleIncomingHeartbeat(monitorId);
          break;
        default:
          console.log(
            `[${timestamp}] [error] [server] [400] [WS] [/monitor/message] {}`
          );
          break;
      }
    });
  }

  private async startHeartbeatMonitor(monitorId: string) {}

  public async sendToMonitor(
    monitorId: string,
    message: IWSMessage
  ): Promise<boolean> {
    try {
      const socket = this.monitorConnections.get(monitorId);
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error(`No active connection for monitor ${monitorId}`);
      }

      socket.send(JSON.stringify(message));
      return true;
    } catch (error) {
      return false;
    }
  }

  private async sendHeartbeat(monitorId: string): Promise<void> {
    const state = this.monitorConnectionInfo.get(monitorId);
    if (!state || state.isAwaitingHeartbeat) {
      this.handleMissedHeartbeat(monitorId);
      return;
    }

    this.sendToMonitor(monitorId, {
      type: WSMessageType.HEARTBEAT,
      payload: { monitorId },
      timestamp: new Date(),
    });

    state.isAwaitingHeartbeat = true;
    this.monitorConnectionInfo.set(monitorId, state);

    const timeoutId = setTimeout(() => {
      this.handleMissedHeartbeat(monitorId);
    }, this.heartbeatConfig.heartbeatTimeout + this.heartbeatConfig.networkBuffer);

    this.heartbeatTimeouts.set(monitorId, timeoutId);
  }

  private async handleIncomingHeartbeat(monitorId: string) {}

  private async handleMissedHeartbeat(monitorId: string) {}

  private async clearHeartbeatTimers(monitorId: string) {
    const interval = this.heartbeatIntervals.get(monitorId);
    if (interval) {
      clearInterval(interval);
      this.heartbeatIntervals.delete(monitorId);
    }

    const timeout = this.heartbeatTimeouts.get(monitorId);
    if (timeout) {
      clearTimeout(timeout);
      this.heartbeatTimeouts.delete(monitorId);
    }
  }

  private async handleIncomingReading(messagePayload: any) {}

  private async broadcastReading() {}

  private async broadcastMonitorStatus() {}

  public async broadcastMachineStatus(): Promise<void> {
    const allMachines = await this.services.machine.getMachines();

    const machineStatusList = [];

    const message = {
      type: WSMessageType.MACHINE_STATUS,
      payload: machineStatusList,
      timestamp: new Date(),
    };

    const machineStatusSubscribers = this.clientSubscriptions.get(
      ClientSubscriptionType.MACHINE_STATUS
    );

    if (machineStatusSubscribers) {
      machineStatusSubscribers.forEach((socket) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(message));
        }
      });
    }
  }

  private async broadcastAlerts() {}
}
