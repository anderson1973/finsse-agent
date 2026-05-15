import type { FastifyPluginAsync } from 'fastify';

/**
 * 发票管理路由
 *
 * POST   /api/invoices/upload   — 上传发票（文件 → OCR）
 * GET    /api/invoices          — 获取发票列表
 * GET    /api/invoices/:id      — 获取单张发票详情
 */
export const invoiceRoutes: FastifyPluginAsync = async (app) => {
  // ── 上传发票 ──────────────────────────────────────────────────────────
  app.post('/upload', async (req, reply) => {
    const file = await req.file();
    if (!file) {
      return reply.status(400).send({ error: '请上传发票文件' });
    }

    // TODO(W1): 接入 OCR 引擎识别
    // TODO(W2): AI 引擎分类 + 科目映射
    return {
      id: 'inv_tmp_' + Date.now(),
      filename: file.filename,
      mimetype: file.mimetype,
      status: 'uploaded',
      message: '上传成功，正在识别...',
    };
  });

  // ── 发票列表 ──────────────────────────────────────────────────────────
  app.get('/', async (_req) => {
    // TODO(W1): 从数据库查询
    return { invoices: [] };
  });

  // ── 发票详情 ──────────────────────────────────────────────────────────
  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    // TODO(W1): 从数据库查询
    return reply.status(404).send({ error: `发票 ${id} 未找到` });
  });
};
