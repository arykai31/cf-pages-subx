/**
 * @file errorService.ts
 * @description 错误处理和日志记录服务
 * @author cf-pages-sub
 * @date 2026-01-16
 */

// 日志级别常量
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];

// 日志条目接口
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: any;
  context?: string;
}

/**
 * @class ErrorService
 * @description 错误处理和日志记录服务类
 */
export class ErrorService {
  private static instance: ErrorService;
  private logQueue: LogEntry[] = [];
  private maxQueueSize = 100;
  
  // 单例模式
  private constructor() {}
  
  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }
  
  /**
   * @method log
   * @description 记录日志
   * @param {LogLevel} level - 日志级别
   * @param {string} message - 日志消息
   * @param {any} details - 日志详情
   * @param {string} context - 日志上下文
   */
  public log(level: LogLevel, message: string, details?: any, context?: string): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
      context
    };
    
    // 添加到日志队列
    this.logQueue.push(logEntry);
    
    // 如果队列超过最大大小，移除最旧的日志
    if (this.logQueue.length > this.maxQueueSize) {
      this.logQueue.shift();
    }
    
    // 输出到控制台
    this.consoleLog(logEntry);
    
    // 在生产环境中，可以将错误日志发送到服务器
    if (level >= LogLevel.ERROR && import.meta.env.PROD) {
      this.sendToServer(logEntry);
    }
  }
  
  /**
   * @method debug
   * @description 记录调试日志
   * @param {string} message - 日志消息
   * @param {any} details - 日志详情
   * @param {string} context - 日志上下文
   */
  public debug(message: string, details?: any, context?: string): void {
    this.log(LogLevel.DEBUG, message, details, context);
  }
  
  /**
   * @method info
   * @description 记录信息日志
   * @param {string} message - 日志消息
   * @param {any} details - 日志详情
   * @param {string} context - 日志上下文
   */
  public info(message: string, details?: any, context?: string): void {
    this.log(LogLevel.INFO, message, details, context);
  }
  
  /**
   * @method warn
   * @description 记录警告日志
   * @param {string} message - 日志消息
   * @param {any} details - 日志详情
   * @param {string} context - 日志上下文
   */
  public warn(message: string, details?: any, context?: string): void {
    this.log(LogLevel.WARN, message, details, context);
  }
  
  /**
   * @method error
   * @description 记录错误日志
   * @param {string} message - 日志消息
   * @param {any} details - 日志详情
   * @param {string} context - 日志上下文
   */
  public error(message: string, details?: any, context?: string): void {
    this.log(LogLevel.ERROR, message, details, context);
  }
  
  /**
   * @method consoleLog
   * @description 输出日志到控制台
   * @param {LogEntry} logEntry - 日志条目
   */
  private consoleLog(logEntry: LogEntry): void {
    const { level, message, details, context, timestamp } = logEntry;
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    if (context) {
      console[level](`${prefix} [${context}] ${message}`, details);
    } else {
      console[level](`${prefix} ${message}`, details);
    }
  }
  
  /**
   * @method sendToServer
   * @description 将日志发送到服务器
   * @param {LogEntry} logEntry - 日志条目
   */
  private async sendToServer(logEntry: LogEntry): Promise<void> {
    try {
      // 模拟发送到服务器
      console.log('Sending log to server:', logEntry);
      // 实际应用中，这里会是一个 API 调用
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(logEntry)
      // });
    } catch (error) {
      console.error('Failed to send log to server:', error);
    }
  }
  
  /**
   * @method getLogs
   * @description 获取日志队列
   * @returns {LogEntry[]} 日志队列
   */
  public getLogs(): LogEntry[] {
    return [...this.logQueue];
  }
  
  /**
   * @method clearLogs
   * @description 清除日志队列
   */
  public clearLogs(): void {
    this.logQueue = [];
  }
  
  /**
   * @method handleGlobalError
   * @description 处理全局错误
   * @param {Error} error - 错误对象
   * @param {string} context - 错误上下文
   */
  public handleGlobalError(error: Error, context?: string): void {
    this.error('Global Error', {
      message: error.message,
      stack: error.stack
    }, context);
  }
}

// 创建并导出单例实例
export const errorService = ErrorService.getInstance();
