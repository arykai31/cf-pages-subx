/**
 * @file routes.tsx
 * @description 应用路由配置文件，定义页面路由和布局
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../src/presentation/components/layouts/AppLayout";
import { Home } from "../src/presentation/pages/Home";
import { LoginPage } from "../src/presentation/pages/Login";
import { Profile } from "../src/presentation/pages/Profile";
import { Settings } from "../src/presentation/pages/Settings";

export const router = createBrowserRouter([
  // 非嵌套路由 - 不使用公共布局
  { path: "/login", element: <LoginPage /> },

  // 嵌套路由 - 使用公共布局
  {
    element: <AppLayout />, // 将公共布局放在这里
    children: [
      { path: "/", element: <Home /> },
      { path: "/settings", element: <Settings /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);
