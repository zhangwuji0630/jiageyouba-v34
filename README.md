# 加油记录 V3.4

一个基于 5 个移动端页面组合而成的静态 PWA：

- `index.html` 看板
- `add.html` 记录
- `stats.html` 趋势
- `logs.html` 历史
- `settings.html` 设置

## 在线地址

- GitHub Pages: `https://zhangwuji0630.github.io/jiageyouba-v34/`

## 当前状态

- 已发布并可安装为 PWA
- 5 页底部导航已全部接通
- 数据层已从 `localStorage` 重构为 `IndexedDB`
- 已支持旧版本地数据自动迁移
- 已支持车辆、设置、记录、站点四类基础模型
- 当前录入页已接通加油记录的新增与编辑
- 看板 / 趋势 / 历史 / 设置 已接到真实数据
- 支持 CSV 导出、JSON 备份、JSON 导入恢复
- 主题按钮与未开放模块已改成明确提示，不再是假交互

## 数据模型

- `settings`
  - 单位
  - 当前车辆
  - 主题占位
- `vehicles`
  - 车辆名称
  - 牌照
  - 里程
- `records`
  - `fuel`
  - `maintenance`
  - `wash`
  - `repair`
  - `accessory`
  - `decoration`
- `stations`
  - 加油站基础信息预留

## 最新进度

### 2026-03-30

- 完成独立仓库 `jiageyouba-v34` 的线上发布与本地对齐
- 完成 PWA 壳接线与 `service-worker` 缓存更新
- 完成 `IndexedDB` 数据层落地与旧数据迁移
- 完成 5 页主要交互接线
- 完成 README 重写与 UTF-8 编码约束
- 新增 `.editorconfig` 与 `.gitattributes`，锁定文本文件为 UTF-8

## 已知范围

- 当前 UI 保持 V3.4 视觉，不主动改设计
- 浅色主题暂未实现，只保留统一提示
- 保养 / 洗车 / 维修 / 配件 / 配饰的数据模型已预留，但录入页还未接通
- 当前不做登录注册

## 下一步建议

1. 完成非加油类记录的录入页与编辑流
2. 为看板和趋势页补更多跨车辆聚合能力
3. 单独设计浅色主题，而不是直接反色
4. 增加站点信息录入与筛选
5. 视需求再决定是否引入账号体系
