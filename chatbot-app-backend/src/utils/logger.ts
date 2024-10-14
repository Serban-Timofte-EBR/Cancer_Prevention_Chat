import { Logger } from '@nestjs/common';

export class AppLogger {
  private static logger = new Logger('Chatbot');

  static log(message: string, context?: string) {
    this.logger.log(message, context);
  }

  static error(message: string, trace?: string, context?: string) {
    this.logger.error(message, trace, context);
  }

  static warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }
}
