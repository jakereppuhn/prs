import { IQueryParams } from "@/types/schema";
import { Services } from ".";

export class MonitorService {
  constructor(services: Services) {}

  public async getMonitors(monitorParams?: IQueryParams) {}

  public async getMonitor(monitorId: string) {}

  public async createMonitor(monitorData: any) {}

  public async updateMonitor(monitorId: string, monitorData: any) {}

  public async deleteMonitor(monitorId: string) {}
}
