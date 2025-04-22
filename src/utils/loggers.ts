import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";
import { AckPayloadType } from "../types/payload";

// Declare the class Logger
export class Logger {
  private logger: WinstonLogger;

  constructor() {
    const loggerFormat = format.combine(
      format.colorize({
        colors: {
          info: "green",
          error: "red",
          warn: "yellow",
          debug: "blue",
          silly: "magenta",
          verbose: "cyan",
        },
      }), // Add specific colors for each level
      format.timestamp(),
      format.printf((info) => {
        return `[${info.level}] - ${info.timestamp} - ${info.message}`;
      })
    );

    this.logger = createLogger({
      format: loggerFormat,
      transports: [new transports.Console({ level: "silly" })],
    });
  }

  info(message: string, payload?: AckPayloadType): void {
    this.logger.info(message);
  }

  error(message: string, error?: any): void {
    this.logger.error(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
  silly(message: string): void {
    this.logger.silly(message);
  }
  verbose(message: string): void {
    this.logger.verbose(message);
  }

  // Other methods can be added as necessary, e.g., warn, verbose, etc.
}
