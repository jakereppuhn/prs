import { IQueryParams } from "@/types/schema";
import { Services } from ".";

export class MachineService {
  constructor(services: Services) {}

  public async getMachines(machineParams?: IQueryParams) {}

  public async getMachine(machineId: string) {}

  public async createMachine(machineData: any) {}

  public async updateMachine(machineId: string, machineData: any) {}

  public async deleteMachine(machineId: string) {}

  public async getMachineProfiles(machineId: any) {}

  public async getMachineProfile(machineProfileId: any) {}

  public async getActiveMachineProfile(machineId: string) {}

  public async createMachineProfile(machineProfileData: any) {}

  public async updateMachineProfile(
    machineProfileId: any,
    machineProfileData: any
  ) {}

  public async deleteMachineProfile(machineProfileId: any) {}
}
