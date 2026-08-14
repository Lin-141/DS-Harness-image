# DSH 工作区文件面板插件

一个运行在 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/dsh) 上的动态 Cordis 插件，为会话提供右侧工作区文件面板。

## 功能

- **右侧可拖拽文件面板**：树形浏览工作区文件，拖动左边框调整宽度，拖到最右自动关闭
- **右键菜单**：打开 / 新建文件 / 新建文件夹 / 重命名 / 删除 / 复制路径 / **引用到输入框** / 在文件管理器中显示 / 刷新
- **Trae 风格交互**：单击选择、双击打开（文本预览 / 图片弹窗）、全文搜索
- **文件类型图标**：内置 Trae（iCube）深色主题全套 59 个彩色 SVG 图标，按扩展名区分文件类型；浅色主题自动回退工作区 / Trae 安装目录
- **外观设置**：Hermes 6 预设主题 + **L's Image 内置默认主题** + 自定义主题（11 色拾色器、保存 / 编辑 / 删除）
- **字体设置**：选择系统字体或枚举电脑全部已安装字体，持久化到 localStorage
- **持久化**：主题、自定义主题、字体均保存在浏览器 localStorage，刷新自动恢复

## 安装

DSH 中通过动态 Cordis 插件加载：

```text
cordis_define → code.host = src/host.js, code.client = src/client.js → cordis_run
```

## 使用

1. 点击会话标题栏左侧的面板按钮打开 / 关闭右侧工作区文件面板
2. 单击选择文件，双击打开预览，右键呼出操作菜单
3. 设置 → 外观：切换主题、自定义主题、选择界面字体

## 配置说明

- 图标来源优先级：插件内嵌（深色主题）→ 工作区 `trae-icons/dark|light` → Trae 安装目录
- 若需自定义图标，替换 `trae-icons` 目录下同名 SVG 即可

## 主题

| 主题 | 说明 |
| --- | --- |
| L's Image | 内置默认主题（蓝底 + 金色强调色） |
| Nous / Midnight / Ember / Mono / Cyberpunk / Slate | Hermes 预设 |
| 自定义 | 11 个核心色自定并保存 |

## License

MIT
