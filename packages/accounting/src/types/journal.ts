/**
 * 记账凭证 — 统一结构
 */
export interface JournalEntry {
  id: string;
  invoiceId: string;
  date: string;            // 凭证日期  YYYY-MM-DD
  summary: string;         // 摘要
  entries: Array<{
    accountCode: string;   // 科目编码
    accountName: string;   // 科目名称
    debit: number;         // 借方金额
    credit: number;        // 贷方金额
  }>;
  attachments?: string[];  // 原始发票附件链接
  status: 'draft' | 'posted' | 'failed';
  error?: string;
}

export interface AccountingAdapter {
  readonly name: string;
  post(entry: JournalEntry): Promise<{ success: boolean; remoteId?: string; error?: string }>;
}
