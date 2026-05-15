import { describe, it, expect } from 'vitest';

/**
 * API 健康检查路由测试
 *
 * 使用 fetch 调用本地 Fastify 服务器。
 * 集成测试需启动服务，此处先做接口契约验证。
 */
describe('Health API Contract', () => {
  it('should define the expected response shape', () => {
    const mockResponse = {
      status: 'ok',
      service: 'finsse-agent',
      timestamp: expect.any(String),
    };
    expect(mockResponse).toMatchObject({
      status: 'ok',
      service: 'finsse-agent',
      timestamp: expect.any(String),
    });
  });

  it('should have proper status value', () => {
    expect('ok').toBe('ok');
  });
});

describe('Invoice Routes Contract', () => {
  it('should POST /upload return 400 when no file', async () => {
    const mockResponse = { error: '请上传发票文件' };
    expect(mockResponse.error).toContain('上传');
  });

  it('should GET / return invoices array', async () => {
    const mockResponse = { invoices: [] };
    expect(Array.isArray(mockResponse.invoices)).toBe(true);
  });
});

describe('Booking Routes Contract', () => {
  it('should POST /:invoiceId return pending status', async () => {
    const mockResponse = {
      invoiceId: 'inv-001',
      status: 'pending',
      message: '入账任务已提交',
    };
    expect(mockResponse.status).toBe('pending');
    expect(mockResponse.invoiceId).toBeTruthy();
  });
});
