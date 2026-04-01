# 2026-04-02 站内导航离场压屏与运行时文案审计

## 范围

本次只处理两类同源问题：

- 站内页面切换到趋势页时，旧页会闪一帧。
- 多个页面的运行时文案模块仍可能先露出静态占位文本。

明确不包含：

- 版本号变更
- 发布动作
- 无关布局或业务逻辑调整

## 实际改动

- `app.js`
  - 新增 `resolveNavigationUrl()` 与 `getAnchorNavigationUrl()`，统一解析站内目标地址。
  - 新增 `bindPageNavigationGuards()`，拦截所有站内 `<a href>`，避免浏览器直接跳转前没有机会先绘制离场状态。
  - `navigateTo()` 改为先标记 `app-page-leaving`，再通过双 `requestAnimationFrame` 延后一帧以上执行真实跳转。
  - 站内 JS 跳转入口统一改为 `navigateTo(...)`。
  - `setText()` 现在会联动 `markRuntimeCopyReady()`。
  - `markRuntimeCopyReady()` 现在会把最近的 `data-runtime-copy-group` 一并标记为 ready。
- `app.css`
  - 新增 `body.app-page-leaving::after` 全屏遮罩。
  - 保留并启用 `[data-runtime-copy-group]:not([data-runtime-copy-group="ready"]) { visibility: hidden; }`。
- `index.html`、`add.html`、`stats.html`、`logs.html`、`settings.html`
  - 对共享运行时文案模块补齐 `data-runtime-copy-group`。

## 验证

- 代码级验证
  - `node --check app.js` 通过。
  - 搜索确认 `app.js` 中共享站内跳转已统一经由 `navigateTo(...)`。
- 浏览器最小回归
  - 本地静态服务 + Playwright Headless 验证：
    - `index.html -> stats.html`
    - `add.html -> stats.html`
    - `logs.html -> stats.html`
    - `settings.html -> stats.html`
  - 结果：
    - 四条路径均已在 URL 变化前看到 `app-page-leaving`。
    - 离场遮罩伪元素 `body.app-page-leaving::after` 已生效。
- 运行时文案首屏检查
  - 使用禁用 JS 的浏览器加载 `index.html`、`add.html`、`stats.html`、`logs.html`、`settings.html`。
  - 结果：所有 `data-runtime-copy-group` 初始均为 `visibility: hidden`，历史页“下一站，山海相见”等静态文案不会先露出。

## 未验证

- 未做真机或安装态 PWA 的人工肉眼回归。
- 未执行提交、推送或发布。

## 保持不动

- 版本号与发布说明
- 缓存键
- 无关页面样式与业务逻辑
