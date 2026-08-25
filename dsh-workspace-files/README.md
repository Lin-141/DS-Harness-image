# DSH 工作区文件面板 + 界面美化插件（部署级 bundle）

一个运行在 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) 上的**部署级 Cordis bundle 插件**，提供右侧工作区文件面板与界面外观美化。装配进 profile 的 bundles 列表后**重启自动加载**，不再随进程丢失。

> **v1.2.0**：恢复工作区文件面板（此前误删，试用 dsh-workbench 后回滚）。费用统计仍由社区插件 `dsh-cost-meter` 承担（本插件已移除计费）。

## 功能

### 工作区文件面板
- **右侧可拖拽文件面板**：树形浏览工作区文件，拖动左边框调整宽度，拖到最右自动关闭
- **右键菜单**：打开 / 新建文件 / 新建文件夹 / 重命名 / 删除 / 复制路径 / **引用到输入框** / 在文件管理器中显示 / 刷新
- **Trae 风格交互**：单击选择、双击打开（文本预览 / 图片弹窗）、全文搜索
- **文件类型图标**：内置 Trae（iCube）深色主题全套 59 个彩色 SVG 图标，按扩展名区分文件类型

### 界面美化
- **Hermes 预设主题**：Nous / Midnight / Ember / Mono / Cyberpunk / Slate 六套配色
- **L's Image 内置默认主题**：启动默认主题
- **自定义主题**：11 色拾色器，保存 / 编辑 / 删除
- **界面字体**：选择系统常见字体或枚举电脑全部已安装字体

## 配套插件

| 功能 | 推荐插件 |
|---|---|
| Windows 通知 | `dsh-notify-windows`（已装） |
| Token 费用统计 | `dsh-cost-meter`（已装） |

## 安装（部署级，持久）

先确保 pnpm 在 PATH（dsh plugin 命令依赖它）：

```powershell
npm install -g pnpm
```

把本目录下载到本地，例如 `D:\dsh-workspace-files`，然后装配进 web profile：

```powershell
dsh plugin --profile web add D:\dsh-workspace-files
```

重启 DSH web，刷新页面后生效。

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

- **bundle 本体 = 本目录**（`dsh plugin add` 用的是 link 依赖），删除目录会导致启动失败。
- 主题、自定义主题与字体保存在浏览器 localStorage，仅对当前浏览器生效。

## 许可证

MIT
