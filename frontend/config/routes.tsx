/**
 * @file routes.tsx
 * @description 应用路由配置文件，定义页面路由和布局
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../src/app/layout";
import LoginPage from "../src/app/login/page";
import HomePage from "../src/app/page";
import ProfilePage from "../src/app/profile/page";
import SettingsPage from "../src/app/settings/page";

export const router = createBrowserRouter([
  // 非嵌套路由 - 不使用公共布局
  { path: "/login", element: <LoginPage /> },

  // 嵌套路由 - 使用公共布局
  {
    element: <RootLayout />, // 将公共布局放在这里
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
]);
