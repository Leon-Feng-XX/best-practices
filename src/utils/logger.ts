export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

const LEVEL_COLOR: Record<LogLevel, string> = {
  debug: 'color:#9ca3af',
  info: 'color:#3b82f6',
  warn: 'color:#f59e0b',
  error: 'color:#ef4444;font-weight:bold',
}

export interface LogEntry {
  level: LogLevel
  timestamp: Date
  args: unknown[]
}

export type LogHandler = (entry: LogEntry) => void

const minLevel: LogLevel = import.meta.env.VITE_LOG_LEVEL ?? 'warn'

function formatTime(date: Date): string {
  return date.toTimeString().slice(0, 8)
}

function consoleHandler({ level, timestamp, args }: LogEntry): void {
  const prefix = `%c[${formatTime(timestamp)}] [${level.toUpperCase()}]`
  const style = LEVEL_COLOR[level]
  // eslint-disable-next-line no-console -- centralized console output
  console[level](prefix, style, ...args)
}

const handlers: LogHandler[] = [consoleHandler]

export function addLogHandler(handler: LogHandler): void {
  handlers.push(handler)
}

function log(level: LogLevel, ...args: unknown[]): void {
  if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[minLevel])
    return

  const entry: LogEntry = { level, timestamp: new Date(), args }

  for (const handler of handlers) {
    try {
      handler(entry)
    }
    catch (error) {
      console.error('Logger handler failed:', error)
    }
  }
}

export const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
}
