# DSH 界面美化插件（部署级 bundle）

一个运行在 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) 上的**部署级 Cordis bundle 插件**，专注于**界面外观美化**。装配进 profile 的 bundles 列表后**重启自动加载**，不再随进程丢失。

> **v1.1.0 变更**：工作区文件面板与 token 费用统计已移除，改用社区插件（见下文"配套插件"）。

## 功能

- **Hermes 预设主题**：Nous / Midnight / Ember / Mono / Cyberpunk / Slate 六套配色
- **L's Image 内置默认主题**：启动默认主题
- **自定义主题**：11 色拾色器（背景/卡片/次要表面/浮层/边框/输入框/主色/主文字/次要文字/错误色/侧栏底色），保存 / 编辑 / 删除
- **界面字体**：选择系统常见字体或枚举电脑全部已安装字体，也可手动输入任意字体名称
- **持久化**：主题、自定义主题、字体均保存在浏览器 localStorage，刷新自动恢复

## 配套插件（替换已移除的功能）

| 功能 | 推荐插件 |
|---|---|
| 右侧工作区文件面板 | `dsh-workbench`（`dsh plugin add dsh-workbench`） |
| 对话完成 Windows 通知 | `dsh-notify-windows`（`dsh plugin add dsh-notify-windows`） |
| Token 费用统计 | `dsh-cost-meter`（`dsh plugin add dsh-cost-meter`） |

## 安装（部署级，持久）

先确保 pnpm 在 PATH（dsh plugin 命令依赖它）：

```powershell
npm install -g pnpm
```

把本目录下载到本地，例如 `D:\dsh-workspace-files`，然后装配进 web profile：

```powershell
dsh plugin --profile web add D:\dsh-workspace-files
```

重启 DSH web，刷新页面后生效。装配后 profile 的 `package.json` 里 `dsh.profile.bundles` 会包含 `@dsh-external/dsh-workspace-files`，重启由 bundles 接管。

## 使用

1. 打开设置 → 外观
2. 选择预设主题或新建自定义主题
3. 选择界面字体

## 结构

| 文件 | 作用 |
|---|---|
| `lib/index.js` | Host 半：字体枚举 RPC（`/wfr/api` 前缀路由，webServer 注入） |
| `lib/client.js` | Client 半：外观设置 UI（`__ModuleLoader__` 格式） |
| `cordis.patch.yml` | bundle 补丁层，插入 `dsh-workspace-files` 插件行 |
| `package.json` | bundle 元数据（`dsh.bundle` + `dsh.client` 声明） |

## 说明

- **bundle 本体 = 本目录**（`dsh plugin add` 用的是 link 依赖），删除目录会导致启动失败；迁移后需同步更新 profile 的链接与 package.json。
- 主题、自定义主题与字体保存在浏览器 localStorage，仅对当前浏览器生效。

## 许可证

MIT
