import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().transform(Number).default("8080"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

const env = envSchema.parse(process.env);

const __prod__ = env.NODE_ENV === "production";

export { env, __prod__ };
