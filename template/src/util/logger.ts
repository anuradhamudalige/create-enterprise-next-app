import 'server-only';

/**
 * @remarks
 * This utility should be used only in server-side code.
 * Do not import or use in client-side/browser environments.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogMeta = unknown[];

interface Logger {
  debug: (message: string, ...meta: LogMeta) => void;
  info: (message: string, ...meta: LogMeta) => void;
  warn: (message: string, ...meta: LogMeta) => void;
  error: (message: string, ...meta: LogMeta) => void;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const configuredLevel = (process.env.LOG_LEVEL?.toLowerCase() as LogLevel | undefined) ?? 'info';
const minLevel = LOG_LEVELS[configuredLevel] ?? LOG_LEVELS.info;

const shouldLog = (level: LogLevel): boolean => LOG_LEVELS[level] >= minLevel;

const toLogParts = (level: LogLevel, message: string, meta: LogMeta): unknown[] => {
  const prefix = `[${new Date().toISOString()}] [${level.toUpperCase()}]`;
  return meta.length > 0 ? [prefix, message, ...meta] : [prefix, message];
};

const write = (level: LogLevel, message: string, ...meta: LogMeta): void => {
  if (!shouldLog(level)) {
    return;
  }

  const parts = toLogParts(level, message, meta);

  if (level === 'error') {
    console.error(...parts);
    return;
  }

  if (level === 'warn') {
    console.warn(...parts);
    return;
  }

  if (level === 'debug') {
    console.debug(...parts);
    return;
  }

  console.info(...parts);
};

export const logger: Logger = {
  debug: (message: string, ...meta: LogMeta) => write('debug', message, ...meta),
  info: (message: string, ...meta: LogMeta) => write('info', message, ...meta),
  warn: (message: string, ...meta: LogMeta) => write('warn', message, ...meta),
  error: (message: string, ...meta: LogMeta) => write('error', message, ...meta),
};
