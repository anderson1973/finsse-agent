/**
 * 发票字段 — OCR 识别的统一输出结构
 */
export interface InvoiceFields {
  invoiceNo: string;       // 发票号码
  date: string;            // 开票日期  YYYY-MM-DD
  totalAmount: number;     // 价税合计（含税）
  totalExTax: number;      // 不含税金额
  taxAmount: number;       // 税额
  taxRate: number;         // 税率（百分比，如 13）
  sellerName: string;      // 销方名称
  sellerTaxId: string;     // 销方纳税人识别号
  buyerName: string;       // 购方名称
  buyerTaxId: string;      // 购方纳税人识别号
  lineItems?: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  confidence: Record<string, number>;  // 各字段置信度 (0-1)
}

export interface OcrResult {
  success: boolean;
  fields: InvoiceFields | null;
  raw: unknown;
  error?: string;
}

export interface OcrEngine {
  readonly name: string;
  recognize(imageBuffer: Buffer, mimeType: string): Promise<OcrResult>;
}
