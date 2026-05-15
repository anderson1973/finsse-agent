import type { OcrEngine, OcrResult } from '../types/invoice.js';

/**
 * 腾讯云 OCR — 增值税发票识别
 *
 * API 文档: https://cloud.tencent.com/document/product/866/37495
 * 需设置环境变量 TENCENT_OCR_SECRET_ID / TENCENT_OCR_SECRET_KEY
 */
export class TencentOcrEngine implements OcrEngine {
  readonly name = 'tencent';

  async recognize(imageBuffer: Buffer, mimeType: string): Promise<OcrResult> {
    // TODO(W1): 调用腾讯云 VatInvoiceOCR API
    void imageBuffer;
    void mimeType;

    return {
      success: false,
      fields: null,
      raw: null,
      error: '未实现 — 需配置腾讯云 OCR 凭证',
    };
  }
}
