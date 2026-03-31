# 加油记录 V3.6.0

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
- 已修复静态 HTML 可见中文的编码风险，并统一版本到 `V3.6.0`
- 已完成 Supabase 邮箱确认、登录联调与云同步状态验证
- 已将首屏样式、图标字体、看板插图、Supabase SDK 本地化，减少海外第三方依赖
- 已改为本地生成 `tailwind.generated.css`，不再依赖运行时 Tailwind CDN
- 已为云同步加入超时降级，本地模式在网络较差时可继续使用

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

如果后续切换到自定义域名或 CDN 前置域名：

1. 保留当前 `github.io` 地址作为备用回调
2. 在 `Authentication > URL Configuration` 里新增新的生产域名
3. 保证新的域名也包含：
   - `/`
   - `/**`
   - `/settings.html`

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

## 开发与发布

首次或更新依赖后执行：

1. `npm install`
2. `npm run build:css`

当前静态站点的关键资源已经本地化，仓库内需要一并提交：

- `tailwind.generated.css`
- `vendor/material-symbols.css`
- `icons/fonts/material-symbols-outlined.ttf`
- `vendor/supabase-js.min.js`
- `images/dashboard-story.png`

`0331` 分支已经作为稳定开发分支使用。

- 推送到 `0331` 后，仓库中的 `.github/workflows/deploy-pages-0331.yml` 会用于 GitHub Pages 部署
- 如果 GitHub Pages 后续切换到 `GitHub Actions` 作为发布来源，这个工作流可以直接复用

## 中国用户访问优化

当前版本已经完成的优化：

- 去掉 `cdn.tailwindcss.com`
- 去掉 Google Fonts 与 Google Material Symbols 远程依赖
- 去掉首页 Google 图片源
- 去掉所有页面的首屏远程 Supabase SDK 脚本依赖
- 云同步失败时快速回退到本地模式，而不是卡住主流程
- `service-worker` 预缓存改为更稳健的安装方式，降低单资源失败导致整体失效的概率

建议继续推进的部署层优化：

1. 给站点增加自定义域名，并在前面接 Cloudflare 做 DNS 与缓存控制。
2. 在 Supabase 中同步配置新的站点域名与回调地址。
3. 如果后续需要更强的中国区访问稳定性，可考虑将静态前端镜像到 Cloudflare Pages，同时保留 GitHub 作为源码仓库。

## 本次版本

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
