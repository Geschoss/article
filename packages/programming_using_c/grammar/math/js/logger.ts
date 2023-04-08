export class LoggerFactory {
  private show: boolean;
  private loggers: Logger[] = [];
  constructor(show: boolean = true) {
    this.show = show;
  }

  create(name: string) {
    const logger = new Logger(name, this.show);
    this.loggers.push(logger);
    return logger;
  }
  on() {
    this.loggers.forEach((logger) => {
      logger.on();
    });
  }
  off() {
    this.loggers.forEach((logger) => {
      logger.off();
    });
  }
}

export class Logger {
  private show: boolean;
  private name: string;
  constructor(name: string, show: boolean = true) {
    this.name = name;
    this.show = show;
  }
  log(...args: any[]) {
    if (this.show) {
      console.log(`From ${this.name}: `, ...args);
    }
  }
  err(...args: any[]) {
    if (this.show) {
      console.error(`From ${this.name}: `, ...args);
    }
  }
  on() {
    this.show = true;
  }
  off() {
    this.show = false;
  }
}
