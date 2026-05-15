import type { AccountingAdapter, JournalEntry } from '../types/journal.js';

/**
 * 用友 U8+ / NC Cloud API 适配器
 *
 * 通过用友 Open API (RESTful) 推送记账凭证
 * 需配置 YONYOU_API_URL / YONYOU_APP_KEY / YONYOU_APP_SECRET
 */
export class YonyouAdapter implements AccountingAdapter {
  readonly name = 'yonyou';

  async post(entry: JournalEntry): Promise<{ success: boolean; remoteId?: string; error?: string }> {
    // TODO(W3): 调用用友 Open API 创建凭证
    void entry;
    return { success: false, error: '未实现 — 需配置用友 API 凭证' };
  }
}
