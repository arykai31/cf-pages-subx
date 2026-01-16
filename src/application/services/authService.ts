// src/application/services/authService.ts
// 认证服务 - 处理登录/注销等操作

// JWT 相关类型定义
export interface JwtToken {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

export interface UserCredentials {
  username: string;
  password: string;
}

// 模拟 API 调用函数
export const loginUser = async (username: string, password: string): Promise<JwtToken> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 简单的模拟验证
  if (username === 'admin' && password === await hashPassword('123456')) {
    // 模拟生成 JWT token 和 refresh token
    const token = generateMockToken(username);
    const refreshToken = generateMockRefreshToken(username);
    const expiresAt = Date.now() + 3600000; // 1小时后过期
    
    return { token, refreshToken, expiresAt };
  } else {
    // 模拟登录失败
    throw new Error('用户名或密码错误');
  }
};

// 模拟密码哈希函数（与前端一致）
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 模拟生成 JWT token
function generateMockToken(username: string): string {
  // 简化的 JWT 结构，实际应用中应该使用真实的 JWT 库
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    role: 'admin'
  }));
  const signature = btoa('mock-signature'); // 实际应用中应该使用真实的签名算法
  return `${header}.${payload}.${signature}`;
}

// 模拟生成刷新 token
function generateMockRefreshToken(username: string): string {
  return `refresh-${username}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 验证 JWT token
export const verifyToken = (token: string): boolean => {
  try {
    // 简化的 JWT 验证，实际应用中应该使用真实的 JWT 库
    const parts = token.split('.');
    if (parts.length !== 3) {
      // 无效的 JWT 格式
      return false;
    }
    
    const [, payload] = parts;
    
    // 处理模拟 token，直接返回 true
    // 实际应用中应该使用真实的 JWT 库进行验证
    if (token.startsWith('ey')) {
      // 真实 JWT 格式，使用 atob 解码
      const decodedPayload = JSON.parse(atob(payload));
      const now = Math.floor(Date.now() / 1000);
      return decodedPayload.exp > now;
    } else {
      // 模拟 token，直接返回 true
      return true;
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
};

// 刷新 JWT token
export const refreshToken = async (refreshToken: string): Promise<JwtToken> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 模拟验证刷新 token
  if (refreshToken.startsWith('refresh-')) {
    const username = refreshToken.split('-')[1];
    const newToken = generateMockToken(username);
    const newRefreshToken = generateMockRefreshToken(username);
    const expiresAt = Date.now() + 3600000; // 1小时后过期
    
    return { token: newToken, refreshToken: newRefreshToken, expiresAt };
  } else {
    throw new Error('无效的刷新令牌');
  }
};

// 存储 JWT 到本地存储
export const storeToken = (token: JwtToken): void => {
  localStorage.setItem('authToken', token.token);
  localStorage.setItem('refreshToken', token.refreshToken);
  localStorage.setItem('tokenExpiresAt', token.expiresAt.toString());
};

// 从本地存储获取 JWT
export const getStoredToken = (): JwtToken | null => {
  const token = localStorage.getItem('authToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expiresAtStr = localStorage.getItem('tokenExpiresAt');
  
  if (token && refreshToken && expiresAtStr) {
    return {
      token,
      refreshToken,
      expiresAt: parseInt(expiresAtStr, 10)
    };
  }
  
  return null;
};

// 清除本地存储中的 JWT
export const clearStoredToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiresAt');
};

// 检查 token 是否过期
export const isTokenExpired = (expiresAt: number): boolean => {
  return Date.now() >= expiresAt;
};

// 获取当前用户信息
export const getCurrentUser = (): string | null => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.sub;
  } catch (error) {
    return null;
  }
};

// 注销用户
export const logoutUser = (): void => {
  clearStoredToken();
};