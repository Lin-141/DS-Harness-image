# DSH 工作区文件面板插件（部署级 bundle）

一个运行在 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) 上的**部署级 Cordis bundle 插件**，为会话提供右侧工作区文件面板。装配进 profile 的 bundles 列表后**重启自动加载**，不再随进程丢失。

## 功能

- **右侧可拖拽文件面板**：树形浏览工作区文件，拖动左边框调整宽度，拖到最右自动关闭
- **右键菜单**：打开 / 新建文件 / 新建文件夹 / 重命名 / 删除 / 复制路径 / **引用到输入框** / 在文件管理器中显示 / 刷新
- **Trae 风格交互**：单击选择、双击打开（文本预览 / 图片弹窗）、全文搜索
- **文件类型图标**：内置 Trae（iCube）深色主题全套 59 个彩色 SVG 图标，按扩展名区分文件类型；浅色主题自动回退工作区 / Trae 安装目录
- **外观设置**：Hermes 6 预设主题 + **L's Image 内置默认主题** + 自定义主题（11 色拾色器、保存 / 编辑 / 删除）
- **字体设置**：选择系统字体或枚举电脑全部已安装字体，持久化到 localStorage
- **持久化**：主题、自定义主题、字体均保存在浏览器 localStorage，刷新自动恢复

## 安装（部署级，持久）

先确保 pnpm 在 PATH（dsh plugin 命令依赖它）：

```powershell
npm install -g pnpm
```

把本目录下载到本地，例如 `D:\dsh-workspace-files`，然后装配进 web profile：

```powershell
dsh plugin --profile web add D:\dsh-workspace-files
```

重启 DSH web，刷新页面后，会话标题栏最左侧会出现面板开关按钮。

装配后 profile 的 `package.json` 里 `dsh.profile.bundles` 会包含 `@dsh-external/dsh-workspace-files`，重启由 bundles 接管。

## 使用

1. 点击会话标题栏左侧的面板按钮打开 / 关闭右侧工作区文件面板
2. 单击选择文件，双击打开预览，右键呼出操作菜单
3. 设置 → 外观：切换主题、自定义主题、选择界面字体

## 结构

| 文件 | 作用 |
|---|---|
| `lib/index.js` | Host 半：文件系统 RPC（`/wfr/api` 前缀路由，webServer 注入） |
| `lib/client.js` | Client 半：React UI（`__ModuleLoader__` 格式） |
| `cordis.patch.yml` | bundle 补丁层，插入 `dsh-workspace-files` 插件行 |
| `package.json` | bundle 元数据（`dsh.bundle` + `dsh.client` 声明） |

## 说明

- **bundle 本体 = 本目录**（`dsh plugin add` 用的是 link 依赖），删除目录会导致启动失败；迁移后需同步更新 profile 的链接与 package.json。
- 图标来源优先级：插件内嵌（深色主题）→ 工作区 `trae-icons` → Trae 安装目录。
- 本目录中的 `src/` 为历史动态插件源码，仅供参考。

## 许可证

MIT
