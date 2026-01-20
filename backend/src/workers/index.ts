/**
 * @file index.ts
 * @description Cloudflare Workers 入口文件，使用 Elysia.js 框架
 * @author cf-pages-sub
 * @date 2026-01-20
 */

import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRoutes } from './api/auth';
import { subscriptionRoutes } from './api/subscriptions';
import { settingsRoutes } from './api/settings';
import { userRoutes } from './api/user';

// 创建 Elysia 应用实例
const app = new Elysia()
  // 启用 CORS
  .use(cors({
    origin: true,
    credentials: true
  }))
  // 注册 API 路由
  .group('/api', (api) =>
    api
      .use(authRoutes)
      .use(subscriptionRoutes)
      .use(settingsRoutes)
      .use(userRoutes)
  )
  // 健康检查端点
  .get('/health', () => 'OK');

// 导出应用
// Cloudflare Workers 使用默认导出
//@ts-ignore
export default app;