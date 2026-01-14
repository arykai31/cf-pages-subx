/**
 * @file utils.ts
 * @description 工具函数集合，包括类名合并和条件类名处理
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @function cn
 * @description 合并类名，支持条件类名和Tailwind CSS合并
 * @param {...ClassValue[]} inputs - 类名或条件类名数组
 * @returns {string} 合并后的类名字符串
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
