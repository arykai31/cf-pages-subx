/**
 * @file themes.ts
 * @description 主题配置文件，定义所有主题的颜色变量
 * @author cf-pages-sub
 * @date 2026-01-16
 */

/**
 * 主题配置类型
 */
export type ThemeConfig = {
  [key: string]: string;
};

/**
 * 主题类型枚举
 */
export type ThemeName = 'light' | 'dark' | 'modernMinimalist';

/**
 * 主题配置集合
 */
export const themes: Record<ThemeName, ThemeConfig> = {
  /**
   * 浅色主题（默认主题）
   */
  light: {
    '--background': 'oklch(1 0 0)',
    '--foreground': 'oklch(0.145 0 0)',
    '--card': 'oklch(1 0 0)',
    '--card-foreground': 'oklch(0.145 0 0)',
    '--popover': 'oklch(1 0 0)',
    '--popover-foreground': 'oklch(0.145 0 0)',
    '--primary': 'oklch(0.205 0 0)',
    '--primary-foreground': 'oklch(0.985 0 0)',
    '--secondary': 'oklch(0.97 0 0)',
    '--secondary-foreground': 'oklch(0.205 0 0)',
    '--muted': 'oklch(0.97 0 0)',
    '--muted-foreground': 'oklch(0.556 0 0)',
    '--accent': 'oklch(0.97 0 0)',
    '--accent-foreground': 'oklch(0.205 0 0)',
    '--destructive': 'oklch(0.577 0.245 27.325)',
    '--border': 'oklch(0.922 0 0)',
    '--input': 'oklch(0.922 0 0)',
    '--ring': 'oklch(0.708 0 0)',
    '--radius': '0.625rem',
    '--chart-1': 'oklch(0.646 0.222 41.116)',
    '--chart-2': 'oklch(0.6 0.118 184.704)',
    '--chart-3': 'oklch(0.398 0.07 227.392)',
    '--chart-4': 'oklch(0.828 0.189 84.429)',
    '--chart-5': 'oklch(0.769 0.188 70.08)',
    '--sidebar': 'oklch(0.985 0 0)',
    '--sidebar-foreground': 'oklch(0.145 0 0)',
    '--sidebar-primary': 'oklch(0.205 0 0)',
    '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
    '--sidebar-accent': 'oklch(0.97 0 0)',
    '--sidebar-accent-foreground': 'oklch(0.205 0 0)',
    '--sidebar-border': 'oklch(0.922 0 0)',
    '--sidebar-ring': 'oklch(0.708 0 0)',
  },

  /**
   * 深色主题
   */
  dark: {
    '--background': 'oklch(0.145 0 0)',
    '--foreground': 'oklch(0.985 0 0)',
    '--card': 'oklch(0.205 0 0)',
    '--card-foreground': 'oklch(0.985 0 0)',
    '--popover': 'oklch(0.205 0 0)',
    '--popover-foreground': 'oklch(0.985 0 0)',
    '--primary': 'oklch(0.922 0 0)',
    '--primary-foreground': 'oklch(0.205 0 0)',
    '--secondary': 'oklch(0.269 0 0)',
    '--secondary-foreground': 'oklch(0.985 0 0)',
    '--muted': 'oklch(0.269 0 0)',
    '--muted-foreground': 'oklch(0.708 0 0)',
    '--accent': 'oklch(0.269 0 0)',
    '--accent-foreground': 'oklch(0.985 0 0)',
    '--destructive': 'oklch(0.704 0.191 22.216)',
    '--border': 'oklch(1 0 0 / 10%)',
    '--input': 'oklch(1 0 0 / 15%)',
    '--ring': 'oklch(0.556 0 0)',
    '--radius': '0.625rem',
    '--chart-1': 'oklch(0.488 0.243 264.376)',
    '--chart-2': 'oklch(0.696 0.17 162.48)',
    '--chart-3': 'oklch(0.769 0.188 70.08)',
    '--chart-4': 'oklch(0.627 0.265 303.9)',
    '--chart-5': 'oklch(0.645 0.246 16.439)',
    '--sidebar': 'oklch(0.205 0 0)',
    '--sidebar-foreground': 'oklch(0.985 0 0)',
    '--sidebar-primary': 'oklch(0.488 0.243 264.376)',
    '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
    '--sidebar-accent': 'oklch(0.269 0 0)',
    '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
    '--sidebar-border': 'oklch(1 0 0 / 10%)',
    '--sidebar-ring': 'oklch(0.556 0 0)',
  },
  /**
   * 科技创新主题
   * 运用高对比度配色，展现前沿科技的大胆与现代感
   */
  modernMinimalist: {
    '--background': '#1e1e1e',
    '--foreground': '#ffffff',
    '--card': '#2d2d2d',
    '--card-foreground': '#ffffff',
    '--popover': '#2d2d2d',
    '--popover-foreground': '#ffffff',
    '--primary': '#0066ff',
    '--primary-foreground': '#ffffff',
    '--secondary': '#00ffff',
    '--secondary-foreground': '#1e1e1e',
    '--muted': '#3d3d3d',
    '--muted-foreground': '#b0b0b0',
    '--accent': '#00ffff',
    '--accent-foreground': '#1e1e1e',
    '--destructive': '#ff4444',
    '--border': '#3d3d3d',
    '--input': '#3d3d3d',
    '--ring': '#0066ff',
    '--radius': '0.5rem',
    '--chart-1': '#0066ff',
    '--chart-2': '#00ffff',
    '--chart-3': '#ffffff',
    '--chart-4': '#666666',
    '--chart-5': '#3d3d3d',
    '--sidebar': '#2d2d2d',
    '--sidebar-foreground': '#ffffff',
    '--sidebar-primary': '#0066ff',
    '--sidebar-primary-foreground': '#ffffff',
    '--sidebar-accent': '#00ffff',
    '--sidebar-accent-foreground': '#1e1e1e',
    '--sidebar-border': '#3d3d3d',
    '--sidebar-ring': '#0066ff',
  },
};

/**
 * 主题名称映射，用于显示
 */
export const themeNames: Record<ThemeName, string> = {
  light: '浅色',
  dark: '深色',
  modernMinimalist: '科技创新',
};
