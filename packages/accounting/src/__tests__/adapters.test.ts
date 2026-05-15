import { describe, it, expect } from 'vitest';
import { YonyouAdapter } from '../adapters/yonyou.js';
import { KingdeeAdapter } from '../adapters/kingdee.js';
import type { JournalEntry } from '../types/journal.js';

const sampleEntry: JournalEntry = {
  id: 'test-001',
  invoiceId: 'inv-001',
  date: '2026-05-15',
  summary: '采购办公用品',
  entries: [
    { accountCode: '660201', accountName: '管理费用-办公费', debit: 500, credit: 0 },
    { accountCode: '100201', accountName: '银行存款', debit: 0, credit: 500 },
  ],
  status: 'draft',
};

describe('YonyouAdapter', () => {
  const adapter = new YonyouAdapter();

  it('should have name yonyou', () => {
    expect(adapter.name).toBe('yonyou');
  });

  it('should return not-implemented error (mock mode)', async () => {
    const result = await adapter.post(sampleEntry);
    expect(result.success).toBe(false);
    expect(result.error).toContain('未实现');
  });
});

describe('KingdeeAdapter', () => {
  const adapter = new KingdeeAdapter();

  it('should have name kingdee', () => {
    expect(adapter.name).toBe('kingdee');
  });

  it('should return not-implemented error (mock mode)', async () => {
    const result = await adapter.post(sampleEntry);
    expect(result.success).toBe(false);
    expect(result.error).toContain('未实现');
  });
});
