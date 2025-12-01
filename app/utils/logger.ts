/* eslint-disable no-console */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
    private isDevelopment = __DEV__;

    private log(level: LogLevel, message: string, ...args: unknown[]): void {
        if (!this.isDevelopment && level === 'debug') {
            return;
        }

        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

        switch (level) {
            case 'debug':
                console.log(prefix, message, ...args);
                break;
            case 'info':
                console.info(prefix, message, ...args);
                break;
            case 'warn':
                console.warn(prefix, message, ...args);
                break;
            case 'error':
                console.error(prefix, message, ...args);
                break;
            default:
                console.log(prefix, message, ...args);
        }
    }

    debug(message: string, ...args: unknown[]): void {
        this.log('debug', message, ...args);
    }

    info(message: string, ...args: unknown[]): void {
        this.log('info', message, ...args);
    }

    warn(message: string, ...args: unknown[]): void {
        this.log('warn', message, ...args);
    }

    error(message: string, ...args: unknown[]): void {
        this.log('error', message, ...args);
    }
}

export const logger = new Logger();
