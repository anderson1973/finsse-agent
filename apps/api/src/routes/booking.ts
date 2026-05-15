import type { FastifyPluginAsync } from 'fastify';

/**
 * 入账管理路由
 *
 * POST   /api/bookings/:invoiceId   — 确认入账（生成凭证 → 推送财务软件）
 */
export const bookingRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Params: { invoiceId: string } }>('/:invoiceId', async (req, reply) => {
    const { invoiceId } = req.params;
    // TODO(W2): AI 引擎生成记账凭证
    // TODO(W3): 推送到用友/金蝶 API
    return {
      invoiceId,
      status: 'pending',
      message: '入账任务已提交',
    };
  });
};
