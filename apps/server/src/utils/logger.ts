import winston from "winston";

const prettyJson = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    const msg =
      typeof message === "object" ? JSON.stringify(message, null, 2) : message;

    const meta = Object.keys(metadata).length
      ? JSON.stringify(metadata, null, 2)
      : "";

    return `${timestamp} ${level}: ${msg} ${meta}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    prettyJson
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
    new winston.transports.Console(),
  ],
});

export { logger };
