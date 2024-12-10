import { Services } from ".";
import cron from "node-cron";
import { logger } from "../utils/logger";

export class CronService {
  readonly services: Services;
  constructor(services: Services) {
    this.services = services;
    this.initialize();
  }

  private initialize() {
    cron.schedule(
      "0 0 * * *",
      () => {
        logger.info("Running midnight task");
      },
      {
        scheduled: true,
        timezone: "America/New_York",
      }
    );

    cron.schedule(
      "0 8 * * 1",
      () => {
        logger.info("Running Monday morning task");
        this.services.email.sendWeeklyRuntimeReport();
      },
      {
        scheduled: true,
        timezone: "America/New_York",
      }
    );

    // cron.schedule("*/30 * * * * *", () => {
    //   logger.info("Running task every 30 seconds");
    // });

    // cron.schedule("* * * * *", () => {
    //   logger.info("Running task every minute");
    // });

    // cron.schedule("*/2 * * * *", () => {
    //   logger.info("Running task every 2 minutes");
    // });
  }
}
