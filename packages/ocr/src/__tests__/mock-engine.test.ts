import { describe, it, expect } from 'vitest';
import { MockOcrEngine } from '../engines/mock.js';
import { HuaweiOcrEngine } from '../engines/huawei.js';

describe('MockOcrEngine', () => {
  const engine = new MockOcrEngine();

  it('should have name mock', () => {
    expect(engine.name).toBe('mock');
  });

  it('should return success with valid fields', async () => {
    const result = await engine.recognize(Buffer.from('fake'), 'image/png');
    expect(result.success).toBe(true);
    expect(result.fields).not.toBeNull();
    expect(result.fields!.invoiceNo).toMatch(/^INV-MOCK-/);
    expect(result.fields!.totalAmount).toBe(12500);
    expect(result.fields!.sellerName).toBe('杭州云帆科技有限公司');
    expect(result.fields!.lineItems).toHaveLength(1);
  });

  it('should return unique invoice numbers', async () => {
    const r1 = await engine.recognize(Buffer.from('a'), 'image/png');
    const r2 = await engine.recognize(Buffer.from('b'), 'image/png');
    expect(r1.fields!.invoiceNo).not.toBe(r2.fields!.invoiceNo);
  });
});

describe('HuaweiOcrEngine', () => {
  const engine = new HuaweiOcrEngine();

  it('should have name huawei', () => {
    expect(engine.name).toBe('huawei');
  });

  it('should return not-implemented error', async () => {
    const result = await engine.recognize(Buffer.from('x'), 'image/png');
    expect(result.success).toBe(false);
    expect(result.error).toContain('未实现');
  });
});
