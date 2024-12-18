import { IQueryParams } from "@/types/schema";
import { Services } from ".";

export class UserService {
  constructor(services: Services) {}

  public async getUsers(userParams?: IQueryParams) {}

  public async getUser(userId: string) {}

  public async syncMicrosoftUsers() {}

  public async updateUser(userId: string, userData: any) {}

  private async generateMicrosoftToken() {}
}
