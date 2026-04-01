# 2026-04-02 运行时随机文案首帧闪出修复

## 范围

本次仅处理一类残留问题：

- HTML 中先写死、初始化后再由 JS 随机改写的文案，会在首帧先露出静态文本。

重点起因是历史页累计支出下方的页脚文案先闪出“下一站，山海相见”。

## 实际改动

- `index.html`
  - 为看板故事文案与看板页脚文案增加统一的运行时文案标记。
- `add.html`
  - 为记录页页脚随机文案增加统一的运行时文案标记。
- `stats.html`
  - 为趋势页页脚随机文案增加统一的运行时文案标记。
- `logs.html`
  - 为历史页页脚随机文案增加统一的运行时文案标记，避免先露出静态文案。
- `settings.html`
  - 为设置页页脚随机文案增加统一的运行时文案标记。
- `app.css`
  - 新增运行时随机文案的统一隐藏规则，只有在 JS 标记为 ready 后才显示。
- `app.js`
  - 新增 `markRuntimeCopyReady()`。
  - `renderFooterQuote()` 在写入本次会话文案后再显示目标节点。
  - `renderDashboardStoryQuote()` 在首次写入随机故事文案后再显示目标节点。

## 审计结论

- 本次已顺带检查五个页面内由 `renderFooterQuote()` 或 `renderDashboardStoryQuote()` 改写的静态文案节点。
- 当前已覆盖：
  - `dashboardStoryQuote`
  - `dashboardFooterQuote`
  - `addFooterQuote`
  - `statsFooterQuote`
  - `logsFooterQuote`
  - `settingsFooterQuote`

## 验证

- 已执行 `node --check app.js`，通过。
- 已确认上述六个运行时随机文案节点都已接入统一的 runtime gate。
- 尚未做浏览器人工回归；需要继续确认历史页底部文案和其它页脚文案不再首帧闪出。
