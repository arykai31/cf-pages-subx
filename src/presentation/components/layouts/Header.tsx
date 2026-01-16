/**
 * @file Header.tsx
 * @description 应用头部组件，包含导航栏和品牌标识
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import { getCurrentUser, logoutUser } from "@/application/services/authService";
import { ThemeToggle } from "@/presentation/components/atoms/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/atoms/ui/dropdown-menu";
import { Link } from "@/presentation/components/atoms/ui/link";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser() || "用户";

  // 退出登录处理函数
  const handleLogout = () => {
    // 使用 authService 清除所有 token
    logoutUser();
    // 跳转到登录页
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border animate-fadeIn">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 左侧：品牌标识 + 桌面导航 */}
        <div className="flex items-center gap-1">
          {/* 品牌标识 */}
          <Link to="/" variant="brand">
            <span className="text-primary">Subx</span>
          </Link>
          {/* 导航项 */}
          <nav></nav>
        </div>

        {/* 右侧：主题切换 + 用户头像下拉菜单 */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-0 border-none bg-transparent cursor-pointer">
                <img
                  src="/src/assets/user-avatar.png"
                  alt="用户头像"
                  className="w-8 h-8 rounded-full overflow-hidden border border-border transition-all hover:ring-2 hover:ring-primary/50"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              {/* 用户信息标签 */}
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{currentUser}</span>
                  <span className="text-xs text-muted-foreground">管理员</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* 下拉菜单项 */}
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <Link
                  to="/profile"
                  aria-label="个人中心"
                  className="flex items-center w-full"
                >
                  个人中心
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <Link
                  to="/settings"
                  aria-label="设置"
                  className="flex items-center w-full"
                >
                  设置
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
