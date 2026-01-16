/**
 * @file Login.tsx
 * @description 登录页面组件，负责用户登录操作
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { loginUser, storeToken } from "@/application/services/authService"; // 导入模拟服务
import { Button } from "@/presentation/components/atoms/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/atoms/ui/card";
import { Input } from "@/presentation/components/atoms/ui/input";
import { hashPassword } from "@shared/lib/utils"; // 导入密码哈希函数
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 用于路由跳转和链接

export const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // 获取导航函数

  // State 管理用户输入和表单状态
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // 控制密码显示/隐藏
  const [isLoading, setIsLoading] = useState<boolean>(false); // 控制登录按钮加载状态
  const [error, setError] = useState<string | null>(null); // 存储错误信息

  // 检查是否已登录，如果已登录则跳转到主页
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认提交行为
    setIsLoading(true);
    setError(null); // 清空之前的错误

    try {
      console.log("Attempting login with username:", username);

      // 对密码进行哈希处理
      const hashedPassword = await hashPassword(password);
      console.log("Password hashed successfully");

      // 调用模拟的 API 服务，传入哈希后的密码
      const response = await loginUser(username, hashedPassword);

      console.log("Login successful, received tokens:", response);

      // 成功后，使用storeToken函数存储完整的 Token 信息
      storeToken(response);

      // 跳转到主页
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      // @ts-ignore - 假设 err 是 Error 对象或字符串
      setError(err.message || "登录失败，请稍后重试");
    } finally {
      setIsLoading(false); // 结束加载状态
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {" "}
      {/* 页面背景和居中布局 */}
      <Card className="w-full max-w-sm">
        {" "}
        {/* Shadcn Card 组件，限制宽度 */}
        <CardHeader>
          <CardTitle className="text-2xl">登录</CardTitle>
          <CardDescription>输入您的凭据继续访问</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {" "}
            {/* 表单提交事件绑定 */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}{" "}
            {/* 错误提示 */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  用户名/邮箱
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入用户名或邮箱"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                {" "}
                {/* 为了放置眼睛图标 */}
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  密码
                </label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // 根据 state 切换密码类型
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // 切换 showPassword state
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}{" "}
                  {/* 使用图标 */}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isLoading} // 加载时禁用按钮
            >
              {isLoading ? "登录中..." : "登录"}{" "}
              {/* 根据加载状态显示按钮文字 */}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            to="/reset-password"
            className="text-sm underline underline-offset-4 hover:text-primary"
          >
            忘记密码？
          </Link>
          {/* 如果需要注册功能，可以加上这个链接 */}
          {/* <Link to="/register" className="text-sm underline underline-offset-4 hover:text-primary">
            没有账户？立即注册
          </Link> */}
        </CardFooter>
      </Card>
    </div>
  );
};
