/**
 * @file layout.tsx
 * @description 应用主布局组件，包含 Header/Footer 等公共元素和路由守卫
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { getStoredToken, isTokenExpired, refreshToken as refreshAuthToken, storeToken, verifyToken } from "@/lib/authService";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 检查是否存在token
        const tokenData = getStoredToken();

        if (!tokenData) {
          // 如果没有token，跳转到登录页
          navigate("/login");
          return;
        }

        // 验证token是否有效
        try {
          const isTokenValid = verifyToken(tokenData.token);

          if (!isTokenValid) {
            // 如果token无效，检查是否可以刷新
            if (isTokenExpired(tokenData.expiresAt)) {
              try {
                // 尝试刷新token
                const newTokenData = await refreshAuthToken(
                  tokenData.refreshToken,
                );
                // 存储新的token
                storeToken(newTokenData);
                console.log("Token refreshed successfully");
              } catch (error) {
                // 刷新失败，跳转到登录页
                console.error("Failed to refresh token:", error);
                navigate("/login");
                return;
              }
            } else {
              // token未过期但无效，跳转到登录页
              console.error("Token is invalid but not expired");
              navigate("/login");
              return;
            }
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          // 验证过程中出现异常，跳转到登录页
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // 正在检查认证状态时，显示加载中
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>正在验证身份...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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
}