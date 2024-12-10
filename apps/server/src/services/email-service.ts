import { Services } from ".";
import { logger } from "../utils/logger";

export class EmailService {
  constructor(services: Services) {}

  private async sendEmail() {
    logger.info("Email Sent");
  }

  public async sendWeeklyRuntimeReport() {
    await this.sendEmail();
  }
}
