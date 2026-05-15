import type { InvoiceFields } from '@finsse/ocr';
import type { AccountEntry } from '../classifier/expense-classifier.js';

/**
 * AI Agent 工作流步骤
 */
export type WorkflowStep =
  | 'pending'      // 等待处理
  | 'classifying'  // 分类中
  | 'mapping'      // 科目匹配
  | 'reviewing'    // 待人工审核
  | 'completed'    // 完成
  | 'failed';      // 失败

/**
 * 工作流状态
 */
export interface WorkflowState {
  invoiceId: string;
  step: WorkflowStep;
  invoice: InvoiceFields | null;
  entry: AccountEntry | null;
  confidence: number;
  errors: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 发票处理工作流
 *
 * 使用状态机模式编排流程：
 *   OCR 完成 → 费用分类 → 科目映射 → 生成凭证 → 推送到入账
 */
export class InvoiceWorkflow {
  private state: WorkflowState;

  constructor(invoiceId: string) {
    this.state = {
      invoiceId,
      step: 'pending',
      invoice: null,
      entry: null,
      confidence: 0,
      errors: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  getState(): WorkflowState {
    return this.state;
  }

  /**
   * 将 OCR 字段注入工作流
   */
  setInvoice(invoice: InvoiceFields): void {
    this.state.invoice = invoice;
    this.state.step = 'classifying';
    this.state.updatedAt = new Date();
  }

  /**
   * 设置 AI 分类结果
   */
  setClassification(entry: AccountEntry, confidence: number): void {
    this.state.entry = entry;
    this.state.confidence = confidence;
    this.state.step = confidence >= 0.85 ? 'completed' : 'reviewing';
    this.state.updatedAt = new Date();
  }

  /**
   * 标记失败
   */
  fail(error: string): void {
    this.state.step = 'failed';
    this.state.errors.push(error);
    this.state.updatedAt = new Date();
  }
}
