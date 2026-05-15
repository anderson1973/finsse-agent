# Finsse Agent — 财税会计 AI Agent

面向中小企业的智能财税工具，从发票识别→自动入账切入。

## 架构

```
apps/
  api/       # Fastify 后端 API
  web/       # Next.js 前端 (TODO)
packages/
  ocr/       # OCR 引擎（华为云 + 腾讯云）
  ai-engine/ # AI Agent 工作流引擎
  accounting/# 财务软件适配器（用友 + 金蝶）
```

## 快速开始

```bash
pnpm install
docker compose up -d    # 启动 PostgreSQL + Redis
pnpm dev               # 启动开发服务器
```

## 环境变量

复制 `.env.example` 为 `.env`，填入对应 API 密钥。

## License

MIT
