/**
 * @file main.tsx
 * @description 应用入口文件，负责初始化 React 应用并渲染根组件
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { errorService } from "@/application/services/errorService";
import "@/index.css";
import { router } from "@config/routes";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./presentation/contexts/ThemeContext";

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
    // 使用 errorService 记录错误
    errorService.error(
      "React 渲染错误",
      {
        error: error.message,
        stack: error.stack,
        errorInfo: errorInfo.componentStack,
      },
      "ErrorBoundary"
    );
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

// 添加全局错误监听
window.addEventListener("error", (event) => {
  errorService.error(
    "全局 JavaScript 错误",
    {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    },
    "GlobalError"
  );
});

// 添加未处理的 Promise 拒绝监听
window.addEventListener("unhandledrejection", (event) => {
  errorService.error(
    "未处理的 Promise 拒绝",
    {
      reason: event.reason,
      promise: event.promise,
    },
    "UnhandledRejection"
  );
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "未找到根元素，请检查 index.html 中是否包含 id='root' 的元素"
  );
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </ErrorBoundary>
);
