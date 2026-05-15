import type { OcrEngine, OcrResult, InvoiceFields } from '../types/invoice.js';

let counter = 0;

/**
 * Mock OCR 引擎 — 开发阶段使用，零成本
 *
 * 返回模拟发票数据，用于前端开发和集成测试。
 * 替换为真实引擎后，接口返回结构不变。
 */
export class MockOcrEngine implements OcrEngine {
  readonly name = 'mock';

  async recognize(imageBuffer: Buffer, mimeType: string): Promise<OcrResult> {
    counter += 1;
    const seq = counter.toString(36).toUpperCase().padStart(6, '0');

    const mockFields: InvoiceFields = {
      invoiceNo: `INV-MOCK-${seq}`,
      date: new Date().toISOString().slice(0, 10),
      totalAmount: 12500.00,
      totalExTax: 11061.95,
      taxAmount: 1438.05,
      taxRate: 13,
      sellerName: '杭州云帆科技有限公司',
      sellerTaxId: '91330100MA27XXXXXX',
      buyerName: '示例购买方',
      buyerTaxId: '91330100MA27YYYYYY',
      lineItems: [
        { name: '软件开发服务', quantity: 1, unitPrice: 11061.95, amount: 11061.95 },
      ],
      confidence: {
        invoiceNo: 0.99,
        date: 0.98,
        totalAmount: 0.97,
        sellerName: 0.95,
        buyerName: 0.95,
      },
    };

    void imageBuffer;
    void mimeType;

    return { success: true, fields: mockFields, raw: {} };
  }
}
