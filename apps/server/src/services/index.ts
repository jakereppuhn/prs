import { AuthService } from "./auth-service";
import { MachineService } from "./machine-service";
import { UserService } from "./user-service";

export class Services {
  private static instance: Services;

  private readonly auth: AuthService;
  private readonly machine: MachineService;
  private readonly user: UserService;

  constructor() {
    this.auth = new AuthService(this);
    this.machine = new MachineService(this);
    this.user = new UserService(this);
  }

  public static getInstance(): Services {
    if (!Services.instance) {
      Services.instance = new Services();
    }
    return Services.instance;
  }
}
