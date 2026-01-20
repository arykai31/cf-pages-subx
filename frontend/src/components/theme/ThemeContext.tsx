/**
 * @file ThemeContext.tsx
 * @description 主题管理上下文，用于动态切换应用主题
 * @author cf-pages-sub
 * @date 2026-01-16
 */

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeConfig, ThemeName } from "../../hooks/themes";
import { themes } from "../../hooks/themes";

/**
 * 主题上下文类型
 */
interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeNames: Record<ThemeName, string>;
}

/**
 * 创建主题上下文
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题上下文提供者组件属性
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 应用主题到文档根元素
 * @param theme 主题配置
 */
const applyTheme = (theme: ThemeConfig): void => {
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, String(value));
  });
};

/**
 * 主题上下文提供者组件
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // 从本地存储获取主题，默认使用现代极简主题
  const getInitialTheme = (): ThemeName => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as ThemeName) || "modernMinimalist";
  };

  const [currentTheme, setCurrentTheme] = useState<ThemeName>(getInitialTheme);

  // 当主题变化时应用到文档
  useEffect(() => {
    applyTheme(themes[currentTheme]);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  // 切换主题的函数
  const handleSetTheme = (theme: ThemeName): void => {
    setCurrentTheme(theme);
  };

  // 主题名称映射，用于显示
  const themeNames: Record<ThemeName, string> = {
    light: "浅色",
    dark: "深色",
    modernMinimalist: "科技创新",
  };

  const value = {
    currentTheme,
    setTheme: handleSetTheme,
    themeNames,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * 自定义钩子，用于访问主题上下文
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}