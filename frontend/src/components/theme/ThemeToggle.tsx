/**
 * @file ThemeToggle.tsx
 * @description 主题切换组件，用于在不同主题之间切换
 * @author cf-pages-sub
 * @date 2026-01-16
 */

import { useTheme } from "./ThemeContext";
import { AlignHorizontalIcon } from "../ui/align-horizontal";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/**
 * 主题切换组件
 */
export const ThemeToggle = () => {
  const { currentTheme, setTheme, themeNames } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <AlignHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(themeNames).map(([theme, name]) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme as any)}
            className={currentTheme === theme ? "bg-primary/10" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}