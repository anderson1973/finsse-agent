import { describe, it, expect } from 'vitest';
import { classifyExpense } from '../classifier/expense-classifier.js';

describe('classifyExpense', () => {
  it('should map 办公用品 to 管理费用-办公费', () => {
    const result = classifyExpense('办公用品', 500);
    expect(result.debitAccount).toBe('管理费用-办公费');
    expect(result.creditAccount).toBe('银行存款');
    expect(result.amount).toBe(500);
    expect(result.confidence).toBeGreaterThanOrEqual(0.85);
  });

  it('should map 差旅费 to 管理费用-差旅费', () => {
    const result = classifyExpense('差旅费', 1200);
    expect(result.debitAccount).toBe('管理费用-差旅费');
    expect(result.amount).toBe(1200);
  });

  it('should fallback to 管理费用-其他 for unknown items', () => {
    const result = classifyExpense('未知商品', 100);
    expect(result.debitAccount).toBe('管理费用-其他');
    expect(result.confidence).toBe(0.6);
  });
});
