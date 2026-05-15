/**
 * OCR 引擎 — 默认 Mock 模式
 *
 * 开发阶段使用 MockOcrEngine 模拟识别结果，降低 API 调用成本。
 * 设置环境变量 OCR_MODE=huawei 或 OCR_MODE=tencent 切换到真实引擎。
 *
 * 费用控制：
 *   - MVP 阶段只接华为云（增值税发票专精）
 *   - 开发时使用 Mock，不上线不产生 OCR 费用
 *   - 华为云 OCR 约 0.1-0.3 元/次，月 5000 次约 ¥200
 */
export type { InvoiceFields, OcrResult, OcrEngine } from './types/invoice.js';
export { MockOcrEngine } from './engines/mock.js';
export { HuaweiOcrEngine } from './engines/huawei.js';
