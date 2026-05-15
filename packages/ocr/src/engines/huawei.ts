import type { OcrEngine, OcrResult, InvoiceFields } from '../types/invoice.js';

/**
 * 华为云 OCR — 增值税发票识别
 *
 * API 文档: https://support.huaweicloud.com/api-ocr/ocr_03_0019.html
 * 需设置环境变量 HUAWEI_OCR_ENDPOINT / HUAWEI_OCR_AK / HUAWEI_OCR_SK
 */
export class HuaweiOcrEngine implements OcrEngine {
  readonly name = 'huawei';

  async recognize(imageBuffer: Buffer, mimeType: string): Promise<OcrResult> {
    // TODO(W1): 调用华为云 RecognizeVatInvoice API
    void imageBuffer;
    void mimeType;

    return {
      success: false,
      fields: null,
      raw: null,
      error: '未实现 — 需配置华为云 OCR 凭证',
    };
  }
}
