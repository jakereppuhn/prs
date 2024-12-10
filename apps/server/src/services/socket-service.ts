import WebSocket from "ws";

import { Services } from ".";

export class SocketService {
  constructor(services: Services) {}

  public initialize() {}

  private async getRequestParam() {}

  public async handleClientConnection() {}

  public async handleMonitorConnection() {}

  private async setupClientListeners() {}

  private async setupMonitorListeners() {}

  private async startHeartbeatMonitor() {}

  private async sendToMonitor() {}

  private async sendHeartbeat() {}

  private async handleIncomingHeartbeat() {}

  private async handleMissedHeartbeat() {}

  private async clearHeartbeatTimers() {}

  private async broadcastReading() {}

  private async broadcastMonitorStatus() {}

  private async broadcastMachineStatus() {}

  private async broadcastAlerts() {}
}
