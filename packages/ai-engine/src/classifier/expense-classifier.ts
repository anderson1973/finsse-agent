/**
 * 记账凭证 — AI 映射结果
 */
export interface AccountEntry {
  debitAccount: string;    // 借方科目
  creditAccount: string;   // 贷方科目
  amount: number;
  summary: string;         // 摘要
  auxiliary?: Record<string, string>;  // 辅助核算
  confidence: number;      // 置信度 0-1
}

/**
 * 高频科目映射表（MVP 初期覆盖 50 个科目）
 *
 * TODO(W2): 基于商户名称 / 商品描述，通过 LLM 或规则引擎匹配科目
 */
const commonMappings: Record<string, { debit: string; credit: string }> = {
  '办公用品':   { debit: '管理费用-办公费',   credit: '银行存款' },
  '差旅费':    { debit: '管理费用-差旅费',   credit: '银行存款' },
  '房租':     { debit: '管理费用-房租',     credit: '银行存款' },
  '设备采购':   { debit: '固定资产',          credit: '银行存款' },
  '餐饮':     { debit: '管理费用-业务招待费', credit: '银行存款' },
  '咨询费':    { debit: '管理费用-咨询费',   credit: '银行存款' },
  '快递费':    { debit: '管理费用-快递费',   credit: '银行存款' },
};

/**
 * 根据商品名称/摘要匹配会计科目
 */
export function classifyExpense(
  description: string,
  amount: number,
): AccountEntry {
  const normalized = description.trim();
  const mapping = commonMappings[normalized];

  if (mapping) {
    return {
      debitAccount: mapping.debit,
      creditAccount: mapping.credit,
      amount,
      summary: normalized,
      confidence: 0.9,
    };
  }

  // 默认走 "管理费用-其他"
  return {
    debitAccount: '管理费用-其他',
    creditAccount: '银行存款',
    amount,
    summary: normalized,
    confidence: 0.6,
  };
}
