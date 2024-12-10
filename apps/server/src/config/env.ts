import * as dotenv from "dotenv";
import { z } from "zod";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform(Number).default("3000"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

export const env = envSchema.parse(process.env);
