import { MockOcrEngine, HuaweiOcrEngine } from '@finsse/ocr';
import type { OcrEngine } from '@finsse/ocr';

let engine: OcrEngine | null = null;

/**
 * 获取 OCR 引擎实例
 *
 * 根据 OCR_MODE 环境变量选择引擎：
 *   - mock   → MockOcrEngine（开发默认，零成本）
 *   - huawei → HuaweiOcrEngine（需配置华为云凭证）
 */
export function getOcrEngine(): OcrEngine {
  if (engine) return engine;

  const mode = process.env.OCR_MODE ?? 'mock';

  switch (mode) {
    case 'huawei':
      engine = new HuaweiOcrEngine();
      break;
    case 'mock':
    default:
      engine = new MockOcrEngine();
      break;
  }

  return engine;
}
