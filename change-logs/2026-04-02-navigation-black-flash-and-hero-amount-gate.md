# 2026-04-02 页面切换黑闪与金额英雄区 gate 收口

## 范围

本次只处理两类同源问题：

- 站内页面切换时，全局离场遮罩导致所有页面都会闪黑一下。
- 趋势页与历史页的金额英雄区仍有静态币种/单位节点先露出。

明确不包含：

- 版本号变更
- 提交、推送或发布
- 无关布局与业务逻辑调整

## 实际改动

- `app.css`
  - 删除 `body.app-page-leaving::after` 全屏黑色遮罩。
  - 删除离场时把 `.app-topbar`、`.app-main`、`.app-bottom-nav` 直接打到 `opacity: 0` 的做法。
  - 改为离场时仅做轻微模糊、轻微淡出和轻微缩放，避免整页黑屏。
  - 为 `.app-topbar`、`.app-main`、`.app-bottom-nav` 补上短时过渡，确保离场视觉是柔和的。
- `stats.html`
  - 为“本月支出总额”的金额行整行补上 `data-page-hydration-gate`，连同 `¥` 一起在 hydration 前隐藏。
- `logs.html`
  - 为“累计支出”的金额行整行补上 `data-page-hydration-gate`，连同 `CNY` 一起在 hydration 前隐藏。

## 验证

- 代码检查
  - `git diff` 已确认本轮只改 `app.css`、`stats.html`、`logs.html`。
- 浏览器验证
  - 本地静态服务 + Playwright Headless 截取 `index.html -> stats.html` 的离场帧。
  - 结果：
    - `body::after` 计算样式为 `none`。
    - `.app-main` 与 `.app-topbar` 仍保持可见，只是轻微模糊与淡出。
    - 离场截图不再是整屏黑屏。
- 首屏 gate 验证
  - 禁用 JS 打开 `stats.html` 与 `logs.html`。
  - 结果：
    - 趋势页金额行 `visibility: hidden`，文本内容为 `¥ 0.00`，整行被隐藏。
    - 历史页金额行 `visibility: hidden`，文本内容为 `0.00 CNY`，整行被隐藏。

## 未验证

- 未做真机或安装态 PWA 的人工肉眼回归。
- 未执行提交、推送或发布。

## 保持不动

- 版本号与缓存键
- 发布说明
- 其余页面结构与业务逻辑
