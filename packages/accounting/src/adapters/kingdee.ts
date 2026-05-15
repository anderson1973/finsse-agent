import type { AccountingAdapter, JournalEntry } from '../types/journal.js';

/**
 * 金蝶云·星辰 / 星空 API 适配器
 *
 * 通过金蝶 Open API (RESTful) 推送记账凭证
 * 需配置 KINGDEE_API_URL / KINGDEE_APP_ID / KINGDEE_APP_SECRET
 */
export class KingdeeAdapter implements AccountingAdapter {
  readonly name = 'kingdee';

  async post(entry: JournalEntry): Promise<{ success: boolean; remoteId?: string; error?: string }> {
    // TODO(W3): 调用金蝶 Open API 创建凭证
    void entry;
    return { success: false, error: '未实现 — 需配置金蝶 API 凭证' };
  }
}
