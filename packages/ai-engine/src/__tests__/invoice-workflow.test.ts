import { describe, it, expect } from 'vitest';
import { InvoiceWorkflow } from '../workflow/invoice-workflow.js';

describe('InvoiceWorkflow', () => {
  it('should start at pending state', () => {
    const wf = new InvoiceWorkflow('inv_001');
    const state = wf.getState();
    expect(state.invoiceId).toBe('inv_001');
    expect(state.step).toBe('pending');
    expect(state.errors).toEqual([]);
  });

  it('should transition to classifying after invoice set', () => {
    const wf = new InvoiceWorkflow('inv_001');
    wf.setInvoice({
      invoiceNo: '123456',
      date: '2026-05-01',
      totalAmount: 1000,
      totalExTax: 885,
      taxAmount: 115,
      taxRate: 13,
      sellerName: '某公司',
      sellerTaxId: '91110108...',
      buyerName: '我方公司',
      buyerTaxId: '91110108...',
      confidence: { totalAmount: 0.99 },
    });
    expect(wf.getState().step).toBe('classifying');
  });

  it('should complete with high confidence', () => {
    const wf = new InvoiceWorkflow('inv_001');
    wf.setInvoice({
      invoiceNo: '123',
      date: '2026-05-01',
      totalAmount: 500,
      totalExTax: 442.48,
      taxAmount: 57.52,
      taxRate: 13,
      sellerName: '某公司',
      sellerTaxId: '91110108...',
      buyerName: '我方',
      buyerTaxId: '91110108...',
      confidence: { totalAmount: 0.99 },
    });
    wf.setClassification(
      { debitAccount: '管理费用-办公费', creditAccount: '银行存款', amount: 500, summary: '办公用品', confidence: 0.95 },
      0.95,
    );
    expect(wf.getState().step).toBe('completed');
  });

  it('should go to review when confidence is low', () => {
    const wf = new InvoiceWorkflow('inv_002');
    wf.setInvoice({
      invoiceNo: '456',
      date: '2026-05-01',
      totalAmount: 100,
      totalExTax: 88.5,
      taxAmount: 11.5,
      taxRate: 13,
      sellerName: '未知',
      sellerTaxId: '000',
      buyerName: '我方',
      buyerTaxId: '000',
      confidence: { totalAmount: 0.5 },
    });
    wf.setClassification(
      { debitAccount: '管理费用-其他', creditAccount: '银行存款', amount: 100, summary: '未知', confidence: 0.6 },
      0.6,
    );
    expect(wf.getState().step).toBe('reviewing');
  });

  it('should record failure', () => {
    const wf = new InvoiceWorkflow('inv_003');
    wf.fail('OCR 识别失败');
    expect(wf.getState().step).toBe('failed');
    expect(wf.getState().errors).toContain('OCR 识别失败');
  });
});
