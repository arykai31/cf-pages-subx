/**
 * @file main.tsx
 * @description 应用入口文件，负责初始化 React 应用并渲染根组件
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "@/index.css";
import { router } from "@config/routes";
import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("应用渲染错误:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>应用出错了</h1>
          <p>请刷新页面重试</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "未找到根元素，请检查 index.html 中是否包含 id='root' 的元素"
  );
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);
