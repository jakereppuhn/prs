import { AuthService } from "./auth-service";
import { CronService } from "./cron-service";
import { EmailService } from "./email-service";
import { MachineService } from "./machine-service";
import { MonitorService } from "./monitor-service";
import { SocketService } from "./socket-service";
import { UserService } from "./user-service";

export class Services {
  readonly auth: AuthService;
  readonly cron: CronService;
  readonly email: EmailService;
  readonly machine: MachineService;
  readonly monitor: MonitorService;
  readonly socket: SocketService;
  readonly user: UserService;
  private static instance: Services;

  constructor() {
    this.auth = new AuthService(this);
    this.cron = new CronService(this);
    this.email = new EmailService(this);
    this.machine = new MachineService(this);
    this.monitor = new MonitorService(this);
    this.socket = new SocketService(this);
    this.user = new UserService(this);
  }

  public static getInstance(): Services {
    if (!Services.instance) {
      Services.instance = new Services();
    }
    return Services.instance;
  }
}
