// src/application/services/authService.ts
// 认证服务 - 处理登录/注销等操作

// 模拟 API 调用函数
export const loginUser = async (username: string, password: string): Promise<{ token: string }> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 简单的模拟验证
  if (username === 'admin' && password === '123456') {
    // 模拟返回成功的 token
    return { token: 'mock-jwt-token-for-admin' };
  } else {
    // 模拟登录失败
    throw new Error('用户名或密码错误');
  }
};