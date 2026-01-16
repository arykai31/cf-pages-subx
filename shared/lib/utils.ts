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

/**
 * @function hashPassword
 * @description 对密码进行哈希处理
 * @param {string} password - 原始密码
 * @returns {Promise<string>} 哈希后的密码
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hash))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * @function generateRandomString
 * @description 生成随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
