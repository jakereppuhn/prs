import { Sequelize } from "sequelize";
import { __prod__, env } from "./env";

const environment = env.NODE_ENV;

const getDatabaseConfig = () => {
  const baseConfig = {
    dialect: "sqlite" as const,
    logging: false,
  };

  switch (environment) {
    case "development":
      return {
        ...baseConfig,
        storage: "./data/development.sqlite",
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
  if (!__prod__) {
    console.log("Seeding development database...");
  }
};

export const initializeDatabase = async () => {
  const config = getDatabaseConfig();
  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
    console.log(`Database connection established (${environment} environment)`);

    if (!__prod__) {
      await sequelize.sync({ alter: true });
      await seedDevelopmentDatabase();
    }

    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
