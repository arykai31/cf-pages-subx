---
name: Cloudflare Works 项目后端开发指南
description: 介绍如何开发项目，并在 Cloudflare Workers 上部署后端项目
---

## 后端开发指南

1. 环境设置（5分钟完成）

```bash
# 1. 安装 Wrangler 2
bun add -d @cloudflare/workers-types wrangler

# 2. 创建 Workers 项目
wrangler init

# 3. 安装依赖
bun add elysia d1
```

2. 项目结构（关键目录）

```bash
src/
├── workers/
│ ├── index.ts # Workers 入口
│ └── api/
│ ├── posts.ts # 文章 API
│ └── images.ts # 图片上传 API
├── db/
│ └── migrations/ # D1 数据库迁移
└── types.ts # 全局类型定义
```

3. 关键 API 实现

`src/workers/api/posts.ts`

```ts
import { Elysia } from "elysia";
import { D1 } from "@cloudflare/workers-types";

export const posts = async ({ query }: { query: { db: D1 } }) => {
  const db = query.db;
  const result = await db.prepare("SELECT \* FROM posts").all();
  return result.results;
};
```

`src/workers/api/images.ts`

```ts
import { Elysia } from "elysia";

export const images = async ({ request, env }) => {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return new Response("No file", { status: 400 });
  }

  const object = await env.R2_BUCKET.put(file.name, file);
  return new Response(JSON.stringify({ url: object.url }));
};
```

4. D1 数据库迁移

`src/db/migrations/0001-create-posts-table.sql`

```sql
CREATE TABLE IF NOT EXISTS posts (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
content TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

5. Workers 入口（`src/workers/index.ts`）

```ts
import { Elysia } from "elysia";
import { posts } from "./api/posts";
import { images } from "./api/images";

const app = new Elysia()
  .get("/api/posts", posts)
  .get("/api/images", images)
  .listen({
    port: 3000,
    hostname: "0.0.0.0",
  });

console.log(`Server running at ${app.server?.hostname}`);
```

6. 部署配置（`wrangler.toml`）

```toml
name = "my-app"
main = "src/workers/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["streams"]

[vars]
DB_NAME = "my-app-db"
```

7. 开发流程

```bash
# 启动 Workers 开发服务器
wrangler dev

# 生成生产构建
wrangler deploy

# 创建 D1 数据库
wrangler d1 create my-app-db
```

8. 数据库操作（D1）

```ts
// 在 API 中使用 D1
export const posts = async ({ query }: { query: { db: D1 } }) => {
  // 1. 创建查询
  const prepared = query.db.prepare("SELECT \* FROM posts WHERE id = ?");

  // 2. 执行查询
  const result = await prepared.bind(1).all();

  // 3. 返回结果
  return result.results;
};
```
