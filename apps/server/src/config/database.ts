import { Sequelize } from "sequelize";
import { env } from "./env";

const environment = env.NODE_ENV;

const getDatabaseConfig = () => {
  const baseConfig = {
    dialect: "sqlite" as const,
    logging: environment === "development" ? console.log : false,
  };

  switch (environment) {
    case "development":
      return {
        ...baseConfig,
        storage: "./data/dev-database.sqlite",
      };
    case "production":
      return {
        ...baseConfig,
        storage: "./data/production.sqlite",
        logging: false,
      };
    default:
      return {
        ...baseConfig,
        storage: "./data/database.sqlite",
      };
  }
};

const seedDevelopmentDatabase = async () => {
  if (environment === "development") {
    console.log("Seeding development database...");
  }
};

export const initializeDatabase = async () => {
  const config = getDatabaseConfig();
  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
    console.log(`Database connection established (${environment} environment)`);

    if (environment === "development") {
      await sequelize.sync({ alter: true });
      await seedDevelopmentDatabase();
    }

    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
