---
name: Cloudflare Pages 前端开发指南
description: 介绍如何开发项目，并在 Cloudflare Pages 上部署前端项目
---

## 前端开发指南

1. 环境设置（5分钟完成）

```bash
# 1. 安装 Bun（推荐）
curl -fsSL https://bun.sh/install | bash

# 2. 创建新项目
bun init -y
bun add react react-dom @types/react @types/react-dom zustand tailwindcss postcss autoprefixer

# 3. 配置 Tailwind CSS
npx tailwindcss init -p

# 4. 配置 tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

# 5. 配置全局样式
echo "@tailwind base; @tailwind components; @tailwind utilities;" > src/styles/globals.css
```

2. 项目结构（关键目录）

```bash
src/
├── app/                # 路由（Cloudflare Pages 自动识别）
│   ├── layout.tsx      # 全局布局（包含 Header/Footer）
│   └── page.tsx        # 首页
├── components/         # UI 组件
│   ├── navigation/     # 导航组件（Header/Footer）
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── theme/          # 主题相关（ThemeToggle）
│   │   └── ThemeToggle.tsx
│   └── ui/             # 原子组件（Button, Input 等）
├── lib/                # 通用逻辑
│   ├── api.ts          # Fetch 封装
│   └── store.ts        # Zustand 状态管理
├── hooks/              # 自定义 Hook
│   └── use-theme.ts    # 主题 Hook
└── styles/             # 全局样式
    ├── globals.css
    └── theme.css
```

3. 关键组件实现
   `components/navigation/Header.tsx`

```tsx
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          My App
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline">Login</Button>
        </div>
      </div>
    </header>
  );
}
```

`components/theme/ThemeToggle.tsx`

```tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
```

4. 状态管理（Zustand）
   `lib/store.ts`

```ts
import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
```

`hooks/use-theme.ts`

```ts
import { useThemeStore } from "@/lib/store";

export function useTheme() {
  const { theme, toggleTheme } = useThemeStore();
  return { theme, toggleTheme };
}
```

5. 开发流程

```bash
# 启动开发服务器（自动热更新）
bun dev

# 生成生产构建
bun build

# 部署到 Cloudflare Pages
bun run deploy
```

6. 部署脚本（package.json）

```json
{
  "scripts": {
    "dev": "bun run dev --port 3000",
    "build": "bun run build",
    "deploy": "wrangler deploy"
  }
}
```
