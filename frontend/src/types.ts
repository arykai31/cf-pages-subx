/**
 * @file types.ts
 * @description 全局类型定义文件
 * @author cf-pages-sub
 * @date 2026-01-20
 */

// 用户相关类型
export interface User {
  id: string;
  username: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

// 订阅相关类型
export interface Subscription {
  id: string;
  user_id: string;
  title: string;
  time: string;
  is_enabled: boolean;
  channel: 'wechat' | 'qywechat';
  created_at: string;
}

// 设置相关类型
export interface Settings {
  id: string;
  user_id: string;
  show_lunar: boolean;
  push_enabled: boolean;
  push_channel: 'wechat' | 'qywechat';
  push_time: string;
  created_at: string;
  updated_at: string;
}

// JWT相关类型
export interface JwtToken {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}