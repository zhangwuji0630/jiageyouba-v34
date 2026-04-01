# 加油记录 V3.6.4

一个由 5 个移动端页面组成的静态 PWA：
- `index.html`：看板
- `add.html`：记录
- `stats.html`：趋势
- `logs.html`：历史
- `settings.html`：设置

在线地址：
- GitHub Pages：`https://zhangwuji0630.github.io/jiageyouba-v34/`

## 当前状态

- 已支持安装为 PWA
- 已完成 `IndexedDB` 本地数据层
- 已支持 `settings / vehicles / stations / records` 四类基础模型
- 已接通加油记录与非加油类记录的新增、编辑与历史展示
- 已支持深色、浅色、跟随系统三套主题模式
- 已支持 CSV 导出、JSON 备份、JSON 导入恢复
- 已加入 Supabase 登录与云同步入口
- 已补充 `supabase/setup.sql`，用于创建云端快照表与 RLS 策略
- 已修复静态 HTML 可见中文的编码风险
- 当前仓库版本已同步到 `V3.6.4`
- 已完成 Supabase 邮箱确认、登录联调与云同步状态验证

## 数据模型

- `settings`
  - 单位
  - 当前车辆
  - 主题模式
- `vehicles`
  - 车辆名称
  - 牌照
  - 里程
- `stations`
  - 站点名称
  - 城市
  - 品牌
- `records`
  - `fuel`
  - `maintenance`
  - `wash`
  - `repair`
  - `accessory`
  - `decoration`

## 云同步方案

当前版本采用“本地优先 + 登录后云端快照同步”：

- 本地仍以 `IndexedDB` 为主
- 登录后会将整份快照同步到 Supabase `public.user_snapshots`
- 删除桌面 PWA 后，只要重新安装并登录同一账号，即可从云端恢复

前端固定配置：
- `Project URL`：`https://akjryomhmjdttxnevzxz.supabase.co`
- `Publishable key`：已写入前端静态配置

注意：
- 公开仓库里只能放 `publishable key`
- 绝不能提交 `service_role` 或 `secret key`

## Supabase 初始化

1. 在 Supabase 控制台创建项目
2. 开启 `Authentication > Sign In / Providers > Email`
3. 在 `Authentication > URL Configuration` 中配置：
   - `Site URL`：`https://zhangwuji0630.github.io/jiageyouba-v34/`
   - `Redirect URLs`：`https://zhangwuji0630.github.io/jiageyouba-v34/`
   - `Redirect URLs`：`https://zhangwuji0630.github.io/jiageyouba-v34/**`
4. 打开 SQL Editor，执行 `supabase/setup.sql`

## 版本规则

- `x.y.z`：小修复、布局调整、文案修正、缓存更新，不改数据结构
- `x.y`：新增功能、流程、同步能力或页面级能力
- `x`：数据结构、存储格式或整体架构变更

每次发布至少同步更新：
- 页面 `<title>`
- 设置页可见版本标识
- `manifest.webmanifest`
- `README.md`
- `service-worker.js` 缓存键

## 本次版本

### 2026-04-02 · V3.6.4

- 修复趋势页、历史页、设置页仍残留的静态占位与示例内容首屏露出问题
- 趋势页首屏统计、分类明细、历史页示例记录卡、设置页示例车辆与云同步状态统一改为安全占位
- 为趋势页、历史页、设置页补充 page hydration gate，确保真实数据到位后再显示关键内容
- 升级 `service-worker` 缓存键，确保客户端获取 `V3.6.4` 新资源

### 2026-04-01 · V3.6.3

- 修复看板从记录页、趋势页、设置页快速切回时露出静态占位值的问题
- 将看板关键指标默认占位改为安全初始值，并增加 hydration gate，避免先看到错误数字再被真实数据覆盖
- 统一关闭共享数字格式中的千分号，金额、里程等数字按当前设计直接显示
- 升级 `service-worker` 缓存键，确保发布后客户端能拉到新版本资源

### 2026-04-01 · V3.6.2

- 修复趋势页“分类明细”分类项上下间距过宽的问题
- 将分类项垂直间距从 `12px` 进一步缩短到 `8px`，保持分隔感但不贴紧
- 将分类项点击行的垂直内边距从 `py-1` 进一步缩短到 `py-0.5`
- 保留分类项点击跳转能力，并同步更新应用版本号与缓存版本

### 2026-03-31 · V3.6.0

- 新增 Supabase 登录与云同步入口
- 新增 `public.user_snapshots` 快照表方案
- 增加本地自动同步与手动同步逻辑
- 修复 5 个静态 HTML 页面可见中文编码风险
- 新增 `supabase/setup.sql`
- 升级 `service-worker` 缓存版本
- 完成邮箱确认、账号登录与云同步状态验证
- 当前测试账号已确认可以正常显示“已登录”与最近同步时间

## 后续建议

1. 增加“忘记密码”与密码重置流程，减少测试期账号反复注册带来的限流问题。
2. 增加“同步冲突处理”与“最后恢复来源”提示。
3. 增加站点信息录入与筛选。
4. 为历史与趋势页增加更多筛选维度。
5. 增加图片附件、店铺、项目明细等扩展字段。
