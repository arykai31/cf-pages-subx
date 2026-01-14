/**
 * @file Header.tsx
 * @description 应用头部组件，包含导航栏和品牌标识
 * @author cf-pages-sub
 * @date 2026-01-14
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/components/atoms/ui/dropdown-menu";
import { Link } from "@/presentation/components/atoms/ui/link";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  // 退出登录处理函数
  const handleLogout = () => {
    // 清除token
    localStorage.removeItem("authToken");
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

        {/* 右侧：用户头像下拉菜单 */}
        <div className="flex items-center gap-3">
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
            <DropdownMenuContent className="w-26" align="end">
              <DropdownMenuItem>
                <Link to="/profile" aria-label="个人中心">
                  个人中心
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" aria-label="设置">
                  设置
                </Link>
              </DropdownMenuItem>
              {/* 分隔线 */}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                退出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
