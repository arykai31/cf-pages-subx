/**
 * @file AppLayout.tsx
 * @description 应用主布局组件，包含 Header/Footer 等公共元素
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { Footer } from "@/presentation/components/layouts/Footer";
import { Header } from "@/presentation/components/layouts/Header";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 检查是否存在token
    const token = localStorage.getItem("authToken");
    if (!token) {
      // 如果没有token，跳转到登录页
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {" "}
      {/* Header */}
      <Header />
      {/* 主内容区域 - 渲染嵌套路由 */}
      <main className="grow container mx-auto p-4">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};
