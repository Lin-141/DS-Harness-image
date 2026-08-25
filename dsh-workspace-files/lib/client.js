window.__ModuleLoader__.load({
  id: "@dsh-external/dsh-workspace-files",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    const React = require("react");
    const styles = {
      insert(css) {
        if (typeof document === "undefined") return () => {}
        const tag = document.createElement("style")
        tag.textContent = css
        document.head.appendChild(tag)
        return () => { try { tag.remove() } catch (e) {} }
      }
    };
    const host = {
      call(method, args) {
        return fetch("/wfr/api", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ method: method, args: args === undefined ? null : args })
        }).then((r) => r.json())
      }
    };
    const apply = (ctx) => {
    const slots = ctx.get('slots')
    if (slots === undefined) return
    const themeService = ctx.get('theme')

    const disposeStyles = styles.insert(`
.wfr-appearance { display: flex; flex-direction: column; gap: 14px; padding: 18px 20px; max-width: 680px; }
.wfr-appearance h2 { margin: 0; font-size: 16px; font-weight: 600; color: var(--dsw-alias-label-primary); }
.wfr-card { background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; }
.wfr-desc { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.6; }
.wfr-presets { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
.wfr-preset { display: flex; align-items: center; gap: 8px; padding: 9px 11px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; cursor: pointer; background: var(--dsw-alias-bg-layer-2); transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease; }
.wfr-preset:hover { border-color: color-mix(in srgb, var(--wfr-hover-accent, var(--dsw-alias-brand-primary)) 10%, color-mix(in srgb, var(--wfr-hover-base, var(--dsw-alias-label-primary)) 7%, transparent)); background: color-mix(in srgb, var(--wfr-hover-accent, var(--dsw-alias-brand-primary)) 3%, color-mix(in srgb, var(--wfr-hover-base, var(--dsw-alias-label-primary)) 4%, transparent)); transform: translateY(-1px); }
.wfr-preset:active { transform: translateY(0); }
.wfr-preset-active { border-color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 6%, transparent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent); }
.wfr-preset:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.wfr-swatch { width: 20px; height: 20px; border-radius: 5px; border: 1px solid rgba(128,128,128,0.45); flex: none; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.15); }
.wfr-preset-name { font-size: 13px; color: var(--dsw-alias-label-primary); }
.wfr-check { margin-left: auto; color: var(--dsw-alias-brand-primary); font-size: 13px; font-weight: 700; flex: none; }
.wfr-custom-list { display: flex; flex-direction: column; gap: 6px; }
.wfr-custom-row { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-layer-2); cursor: pointer; }
.wfr-custom-row:hover { border-color: var(--dsw-alias-border-l2); }
.wfr-custom-row-active { border-color: var(--dsw-alias-brand-primary); }
.wfr-custom-name { flex: 1; font-size: 13px; color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.wfr-mini-btn { background: transparent; border: none; color: var(--dsw-alias-label-secondary); cursor: pointer; font-size: 12px; padding: 2px 7px; border-radius: 5px; flex: none; }
.wfr-mini-btn:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.wfr-mini-btn-danger { color: var(--dsw-alias-state-error-primary); }
.wfr-editor { display: flex; flex-direction: column; gap: 10px; }
.wfr-color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 6px 12px; }
.wfr-color-row { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--dsw-alias-label-secondary); }
.wfr-color-row input[type=color] { width: 32px; height: 22px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 4px; background: transparent; padding: 0; cursor: pointer; }
.wfr-form-actions { display: flex; gap: 6px; justify-content: flex-end; }
.wfr-font-row { display: flex; flex-direction: column; gap: 6px; }
.wfr-select { padding: 5px 8px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font-size: 12.5px; max-width: 100%; }
.wfr-select:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.wfr-btn { padding: 4px 10px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); cursor: pointer; font-size: 12px; }
.wfr-btn:hover { border-color: var(--dsw-alias-border-l2); }
.wfr-btn-primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground, #ffffff); }
.wfr-btn:disabled { opacity: 0.5; cursor: default; }
.wfr-form-input { padding: 5px 8px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font-size: 12.5px; box-sizing: border-box; width: 100%; }
.wfr-form-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
`)

    const NOUS_LIGHT = { background:'#F8FAFF', card:'#FFFFFF', muted:'#F2F6FF', popover:'#FFFFFF', border:'#C7D9FF', input:'#B3CBFE', primary:'#0053FD', foreground:'#17171A', mutedForeground:'#666678', destructive:'#C72E4D', sidebar:'#F3F7FF' }
    const NOUS_DARK = { background:'#0D2F86', card:'#12378F', muted:'#183F9A', popover:'#123A96', border:'#3158AD', input:'#0B2566', primary:'#FFE6CB', foreground:'#FFE6CB', mutedForeground:'#B5C7F3', destructive:'#C0473A', sidebar:'#09286F' }
    const MIDNIGHT = { background:'#08081c', card:'#0d0d28', muted:'#13133a', popover:'#0f0f2e', border:'#1e1e52', input:'#1e1e52', primary:'#ddd6ff', foreground:'#ddd6ff', mutedForeground:'#7c7ab0', destructive:'#b03060', sidebar:'#06061a' }
    const EMBER = { background:'#160800', card:'#1e0e04', muted:'#2a1408', popover:'#221008', border:'#3a1c08', input:'#3a1c08', primary:'#ffd8b0', foreground:'#ffd8b0', mutedForeground:'#aa7a56', destructive:'#c43010', sidebar:'#100600' }
    const MONO = { background:'#0e0e0e', card:'#141414', muted:'#1e1e1e', popover:'#181818', border:'#2a2a2a', input:'#2a2a2a', primary:'#eaeaea', foreground:'#eaeaea', mutedForeground:'#808080', destructive:'#a84040', sidebar:'#0a0a0a' }
    const CYBERPUNK = { background:'#000a00', card:'#001200', muted:'#001a00', popover:'#001000', border:'#003000', input:'#003000', primary:'#00ff41', foreground:'#00ff41', mutedForeground:'#1a8a30', destructive:'#ff003c', sidebar:'#000600' }
    const SLATE = { background:'#0d1117', card:'#161b22', muted:'#21262d', popover:'#1c2128', border:'#30363d', input:'#30363d', primary:'#c9d1d9', foreground:'#c9d1d9', mutedForeground:'#8b949e', destructive:'#cf4848', sidebar:'#090d13' }

    const LSIMAGE = { background:'#104f9a', card:'#161616', muted:'#222222', popover:'#cf8f30', border:'#6c6c6c', input:'#222222', primary:'#ca8c2f', foreground:'#ffffff', mutedForeground:'#edbc6b', destructive:'#ff7a17', sidebar:'#161616' }
    function buildTokens(light, dark) {
      return {
        '--dsw-alias-bg-base': { light: light.background, dark: dark.background },
        '--dsw-alias-bg-layer-1': { light: light.card, dark: dark.card },
        '--dsw-alias-bg-layer-2': { light: light.muted, dark: dark.muted },
        '--dsw-alias-bg-overlay': { light: light.popover, dark: dark.popover },
        '--dsw-alias-border-l1': { light: light.border, dark: dark.border },
        '--dsw-alias-border-l2': { light: light.input, dark: dark.input },
        '--dsw-alias-brand-primary': { light: light.primary, dark: dark.primary },
        '--dsw-alias-label-primary': { light: light.foreground, dark: dark.foreground },
        '--dsw-alias-label-secondary': { light: light.mutedForeground, dark: dark.mutedForeground },
        '--dsw-alias-state-error-primary': { light: light.destructive, dark: dark.destructive },
        '--dsw-specific-sidebar-fill': { light: light.sidebar, dark: dark.sidebar },
      }
    }

    const PRESET_TOKENS = {
      lsimage: buildTokens(LSIMAGE, LSIMAGE),
      nous: buildTokens(NOUS_LIGHT, NOUS_DARK),
      midnight: buildTokens(MIDNIGHT, MIDNIGHT),
      ember: buildTokens(EMBER, EMBER),
      mono: buildTokens(MONO, MONO),
      cyberpunk: buildTokens(CYBERPUNK, CYBERPUNK),
      slate: buildTokens(SLATE, SLATE),
    }

    const PRESETS = {
      lsimage: { label: "L's Image", bg: '#104f9a', accent: '#ca8c2f', midground: '#ca8c2f', base: '#ffffff' },
      nous: { label: 'Nous', bg: '#0D2F86', accent: '#FFE6CB', midground: '#0053FD', base: '#17171A' },
      midnight: { label: 'Midnight', bg: '#08081c', accent: '#8b80e8', midground: '#8b80e8', base: '#ddd6ff' },
      ember: { label: 'Ember', bg: '#160800', accent: '#d97316', midground: '#d97316', base: '#ffd8b0' },
      mono: { label: 'Mono', bg: '#0e0e0e', accent: '#eaeaea', midground: '#9a9a9a', base: '#eaeaea' },
      cyberpunk: { label: 'Cyberpunk', bg: '#000a00', accent: '#00ff41', midground: '#00ff41', base: '#00ff41' },
      slate: { label: 'Slate', bg: '#0d1117', accent: '#58a6ff', midground: '#58a6ff', base: '#c9d1d9' },
    }

    const HERMES_CSS = `
body { font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif; }
`

    const EXTENDED_CSS = `
body, body[data-ds-dark-theme] {
  --dsw-alias-bg-layer-3: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 55%, var(--dsw-alias-bg-base));
  --dsw-alias-bg-module-platform: var(--dsw-alias-bg-layer-2);
  --dsw-alias-bg-multi-select: var(--dsw-alias-bg-layer-2);
  --dsw-alias-bg-skeleton: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
  --dsw-alias-border-l2-darkmode-thin: var(--dsw-alias-border-l1);
  --dsw-alias-border-l3: var(--dsw-alias-border-l2);
  --dsw-alias-border-l4: color-mix(in srgb, var(--dsw-alias-border-l2) 55%, var(--dsw-alias-label-primary));
  --dsw-alias-brand-primary-invert: var(--dsw-alias-label-primary);
  --dsw-alias-brand-primary-new-colorprimary-new-color: var(--dsw-alias-brand-primary);
  --dsw-alias-brand-text: var(--dsw-alias-brand-primary);
  --dsw-alias-button-contrast-fill: var(--dsw-alias-label-primary);
  --dsw-alias-button-elevated-fill: var(--dsw-alias-bg-layer-2);
  --dsw-alias-button-floating-fill: var(--dsw-alias-bg-overlay);
  --dsw-alias-button-floating-hover: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, var(--dsw-alias-bg-overlay));
  --dsw-alias-button-ghost-active-border: var(--dsw-alias-border-l2);
  --dsw-alias-button-ghost-active-fill: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, var(--dsw-alias-bg-layer-2));
  --dsw-alias-button-ghost-active-hover: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, var(--dsw-alias-bg-layer-2));
  --dsw-alias-button-info-fill: var(--dsw-alias-brand-primary);
  --dsw-alias-button-info-hover: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, var(--dsw-alias-brand-primary));
  --dsw-alias-button-primary-dimmed: color-mix(in srgb, var(--dsw-alias-brand-primary) 70%, var(--dsw-alias-bg-base));
  --dsw-alias-button-primary-fill: var(--dsw-alias-brand-primary);
  --dsw-alias-button-primary-hover: color-mix(in srgb, var(--dsw-alias-label-primary) 12%, var(--dsw-alias-brand-primary));
  --dsw-alias-button-tool-bar-fill-invisible: color-mix(in srgb, var(--dsw-alias-label-secondary) 25%, transparent);
  --dsw-alias-button-tool-bar-fill: color-mix(in srgb, var(--dsw-alias-label-secondary) 35%, transparent);
  --dsw-alias-button-tool-bar-hover: color-mix(in srgb, var(--dsw-alias-label-secondary) 45%, transparent);
  --dsw-alias-interactive-bg-active: color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);
  --dsw-alias-interactive-bg-hover-accent: color-mix(in srgb, var(--dsw-alias-brand-primary) 24%, transparent);
  --dsw-alias-interactive-bg-hover-danger: color-mix(in srgb, var(--dsw-alias-state-error-primary) 15%, transparent);
  --dsw-alias-interactive-bg-hover-solid: var(--dsw-alias-bg-layer-2);
  --dsw-alias-interactive-bg-hover: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent);
  --dsw-alias-label-caption: color-mix(in srgb, var(--dsw-alias-label-secondary) 60%, var(--dsw-alias-label-primary));
  --dsw-alias-label-dimmed: color-mix(in srgb, var(--dsw-alias-label-secondary) 60%, var(--dsw-alias-label-primary));
  --dsw-alias-label-primary-bluish: var(--dsw-alias-label-primary);
  --dsw-alias-label-primary-dimmed: color-mix(in srgb, var(--dsw-alias-label-primary) 85%, var(--dsw-alias-bg-base));
  --dsw-alias-label-primary-foreground: var(--dsw-alias-label-primary);
  --dsw-alias-label-primary-inverted: var(--dsw-alias-bg-layer-2);
  --dsw-alias-label-tertiary: var(--dsw-alias-label-secondary);
  --dsw-alias-markdown-citation: var(--dsw-alias-bg-layer-2);
  --dsw-alias-markdown-code-block-banner: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 70%, var(--dsw-alias-bg-base));
  --dsw-alias-markdown-code-block: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 70%, var(--dsw-alias-bg-base));
  --dsw-alias-markdown-code-segment-selected: var(--dsw-alias-bg-layer-2);
  --dsw-alias-markdown-code-segment-unselected: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 80%, var(--dsw-alias-bg-base));
  --dsw-alias-markdown-inline-code: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 60%, var(--dsw-alias-bg-base));
  --dsw-alias-markdown-placeholder: var(--dsw-alias-bg-layer-2);
  --dsw-alias-markdown-tag: var(--dsw-alias-bg-layer-2);
  --dsw-alias-scrollbar-bg-l1: color-mix(in srgb, var(--dsw-alias-border-l1) 100%, transparent);
  --dsw-alias-scrollbar-bg-l2: color-mix(in srgb, var(--dsw-alias-border-l1) 100%, transparent);
  --dsw-alias-scrollbar-hover-l1: var(--dsw-alias-border-l2);
  --dsw-alias-scrollbar-hover-l2: var(--dsw-alias-border-l2);
  --dsw-alias-state-business-primary: var(--dsw-alias-brand-primary);
  --dsw-alias-state-business-tertiary: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
  --dsw-alias-state-error-secondary: var(--dsw-alias-state-error-primary);
  --dsw-alias-toast-bg: var(--dsw-alias-bg-overlay);
  --dsw-alias-tooltip-bg: var(--dsw-alias-bg-overlay);
  --dsw-specific-bubble-highlight: color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent);
  --dsw-specific-bubble: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  --dsw-specific-input-major: var(--dsw-alias-bg-layer-1);
  --dsw-specific-login-input: var(--dsw-alias-bg-layer-2);
  --dsw-specific-menu: var(--dsw-alias-bg-layer-3);
  --dsw-specific-selector: var(--dsw-alias-bg-layer-2);
  --dsw-specific-sidebar-nav-item-active-accent: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
  --dsw-specific-sidebar-nav-item-active: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
  --dsw-specific-sidebar-nav-item-hover: color-mix(in srgb, var(--dsw-alias-brand-primary) 7%, transparent);
  --dsw-specific-tip: var(--dsw-alias-bg-layer-2);
}
`

    const THEME_KEY = 'wfr-hermes-preset'
    const CUSTOM_KEY = 'wfr-custom-themes'
    const FONT_KEY = 'wfr-font-family'
    const DEFAULT_PALETTE = { background:'#0b0b0e', card:'#15151a', muted:'#1e1e25', popover:'#191920', border:'#2a2a33', input:'#3a3a46', primary:'#a78bfa', foreground:'#eceaf1', mutedForeground:'#9d9aa8', destructive:'#f87171', sidebar:'#0e0e12' }
    const COLOR_FIELDS = [ ['background','背景'], ['card','卡片'], ['muted','次要表面'], ['popover','浮层'], ['border','边框'], ['input','输入框边框'], ['primary','主色'], ['foreground','主文字'], ['mutedForeground','次要文字'], ['destructive','错误色'], ['sidebar','侧栏底色'] ]
    const FONT_PRESETS = [
      ['', '跟随系统（默认）'],
      ['Inter', 'Inter'],
      ['Segoe UI', 'Segoe UI'],
      ['Microsoft YaHei', '微软雅黑 (Microsoft YaHei)'],
      ['PingFang SC', '苹方 (PingFang SC)'],
      ['SimHei', '黑体 (SimHei)'],
      ['SimSun', '宋体 (SimSun)'],
      ['KaiTi', '楷体 (KaiTi)'],
      ['JetBrains Mono', 'JetBrains Mono'],
      ['Consolas', 'Consolas'],
      ['Courier New', 'Courier New'],
    ]
    let fontsCache = null

    const readCustomThemes = () => {
      try {
        if (typeof localStorage !== 'undefined') {
          const raw = localStorage.getItem(CUSTOM_KEY)
          if (raw) {
            const arr = JSON.parse(raw)
            if (Array.isArray(arr)) return arr.filter((t) => t && typeof t.name === 'string' && t.colors && typeof t.colors === 'object' && t.colors.background)
          }
        }
      } catch (err) {}
      return []
    }
    const writeCustomThemes = (arr) => {
      try { if (typeof localStorage !== 'undefined') localStorage.setItem(CUSTOM_KEY, JSON.stringify(arr)) } catch (err) {}
    }
    const saveTheme = (id) => {
      try {
        if (typeof localStorage !== 'undefined') {
          if (id === 'none' || !id) localStorage.removeItem(THEME_KEY)
          else localStorage.setItem(THEME_KEY, id)
        }
      } catch (err) {}
    }
    const readStoredFont = () => {
      try {
        if (typeof localStorage !== 'undefined') return localStorage.getItem(FONT_KEY) || ''
      } catch (err) {}
      return ''
    }
    const saveFont = (family) => {
      try {
        if (typeof localStorage !== 'undefined') {
          if (!family) localStorage.removeItem(FONT_KEY)
          else localStorage.setItem(FONT_KEY, family)
        }
      } catch (err) {}
    }
    const readStoredTheme = () => {
      try {
        if (typeof localStorage !== 'undefined') {
          const v = localStorage.getItem(THEME_KEY)
          if (!v) return 'lsimage'
          if (v.startsWith('custom:')) {
            const name = v.slice(7)
            if (customThemes.some((c) => c.name === name)) return v
            return 'lsimage'
          }
          if (PRESET_TOKENS[v]) return v
        }
      } catch (err) {}
      return 'lsimage'
    }

    let customThemes = readCustomThemes()
    const paletteTokens = (p) => buildTokens(p, p)
    let currentFont = readStoredFont()
    const quoteFamily = (t) => {
      const x = String(t).trim()
      if (!x) return ''
      return /^[A-Za-z0-9 _-]+$/.test(x) ? x : '"' + x.replace(/"/g, '\\"') + '"'
    }
    const fontCss = (family) => {
      if (!family) return ''
      const parts = String(family).split(',').map(quoteFamily).filter(Boolean).join(', ')
      if (!parts) return ''
      return '\nbody { font-family: ' + parts + ', \'Segoe UI\', system-ui, -apple-system, \'PingFang SC\', \'Microsoft YaHei\', sans-serif; }\n'
    }

    let presetDispose = null
    let lookDispose = null
    let fontOnlyDispose = null
    let currentThemeId = 'none'
    const clearTheme = () => {
      if (presetDispose) { try { presetDispose() } catch (err) {} presetDispose = null }
      if (lookDispose) { try { lookDispose() } catch (err) {} lookDispose = null }
      if (fontOnlyDispose) { try { fontOnlyDispose() } catch (err) {} fontOnlyDispose = null }
    }
    const applyPalette = (colors, midground, base) => {
      clearTheme()
      if (!themeService) return
      try {
        presetDispose = themeService.overrideTokens('hermes-preset', paletteTokens(colors))
        lookDispose = styles.insert(HERMES_CSS + fontCss(currentFont) + EXTENDED_CSS + '\n:root { --wfr-hover-accent: ' + (midground || colors.primary) + '; --wfr-hover-base: ' + (base || colors.foreground) + '; }')
      } catch (err) {
        console.error('hermes preset apply failed', err)
      }
    }
    const applyPaletteFromTokens = (tokens, midground, base) => {
      clearTheme()
      if (!themeService) return
      try {
        presetDispose = themeService.overrideTokens('hermes-preset', tokens)
        lookDispose = styles.insert(HERMES_CSS + fontCss(currentFont) + EXTENDED_CSS + '\n:root { --wfr-hover-accent: ' + midground + '; --wfr-hover-base: ' + base + '; }')
      } catch (err) {
        console.error('hermes preset apply failed', err)
      }
    }
    const applyThemeById = (id) => {
      currentThemeId = id
      if (id === 'none') { clearTheme(); return }
      if (id.startsWith('custom:')) {
        const name = id.slice(7)
        const t = customThemes.find((c) => c.name === name)
        if (!t) return
        applyPalette(t.colors, t.colors.primary, t.colors.foreground)
        return
      }
      const tokens = PRESET_TOKENS[id]
      const meta = PRESETS[id]
      if (!tokens || !meta) return
      applyPaletteFromTokens(tokens, meta.midground, meta.base)
    }
    const applyFont = (family) => {
      currentFont = family || ''
      saveFont(currentFont)
      if (currentThemeId && currentThemeId !== 'none') {
        applyThemeById(currentThemeId)
      } else {
        if (fontOnlyDispose) { try { fontOnlyDispose() } catch (err) {} fontOnlyDispose = null }
        if (currentFont) fontOnlyDispose = styles.insert(fontCss(currentFont))
      }
    }
    ctx.effect(() => () => clearTheme())

    const initialPreset = readStoredTheme()
    if (initialPreset !== 'none') applyThemeById(initialPreset)
    else if (currentFont) fontOnlyDispose = styles.insert(fontCss(currentFont))

    function AppearancePage(props) {
      const [preset, setPreset] = React.useState(initialPreset)
      const [list, setList] = React.useState(customThemes.slice())
      const [editing, setEditing] = React.useState(null)
      const [editorName, setEditorName] = React.useState('')
      const [editorColors, setEditorColors] = React.useState(DEFAULT_PALETTE)
      const [fontSel, setFontSel] = React.useState(currentFont)
      const [fontInput, setFontInput] = React.useState('')
      const [installed, setInstalled] = React.useState(fontsCache || [])
      const [fontLoading, setFontLoading] = React.useState(false)

      const applyPreset = (id) => {
        setPreset(id)
        saveTheme(id)
        applyThemeById(id)
      }

      const loadFonts = () => {
        setFontLoading(true)
        host.call('list-fonts', {}).then((res) => {
          setFontLoading(false)
          if (res && res.fonts) {
            fontsCache = res.fonts
            setInstalled(res.fonts)
          } else if (res && res.error) {
            fontsCache = null
          }
        }).catch(() => {
          setFontLoading(false)
        })
      }

      React.useEffect(() => {
        if (!fontsCache) loadFonts()
      }, [])

      const startNew = () => {
        setEditing({ name: '', colors: DEFAULT_PALETTE })
        setEditorName('')
        setEditorColors({ ...DEFAULT_PALETTE })
      }
      const startEdit = (t) => {
        setEditing({ name: t.name, colors: t.colors })
        setEditorName(t.name)
        setEditorColors({ ...t.colors })
      }
      const cancelEdit = () => setEditing(null)

      const previewCustom = () => {
        applyPalette(editorColors, editorColors.primary, editorColors.foreground)
      }

      const saveCustom = () => {
        const name = editorName.trim()
        if (!name) return
        const colors = { ...editorColors }
        const next = list.filter((c) => c.name !== name).concat([{ name, colors }])
        setList(next)
        customThemes = next
        writeCustomThemes(next)
        setEditing(null)
        applyPreset('custom:' + name)
      }

      const removeCustom = (t) => {
        const next = list.filter((c) => c.name !== t.name)
        setList(next)
        customThemes = next
        writeCustomThemes(next)
        if (preset === 'custom:' + t.name) applyPreset('none')
      }

      const changeFont = (family) => {
        setFontSel(family)
        applyFont(family)
      }
      const applyCustomFont = () => {
        const v = fontInput.trim()
        if (v) changeFont(v)
      }

      const optionRow = (id, label) => {
        const meta = PRESETS[id]
        const active = preset === id
        return React.createElement('div', {
          key: id,
          role: 'button',
          tabIndex: 0,
          className: 'wfr-preset' + (active ? ' wfr-preset-active' : ''),
          onClick: () => applyPreset(id),
          onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyPreset(id) } },
          title: id === 'none' ? '恢复 DSH 默认主题' : '应用 Hermes ' + label + ' 主题',
        },
          meta ? React.createElement('span', { className: 'wfr-swatch', style: { background: meta.bg, borderColor: meta.accent } }) : React.createElement('span', { className: 'wfr-swatch' }),
          React.createElement('span', { className: 'wfr-preset-name' }, label),
          active ? React.createElement('span', { className: 'wfr-check' }, '✓') : null,
        )
      }

      const editorColorRow = (field, label) => React.createElement('div', { className: 'wfr-color-row', key: field },
        React.createElement('input', {
          type: 'color',
          value: editorColors[field],
          onChange: (e) => setEditorColors((prev) => ({ ...prev, [field]: e.target.value })),
        }),
        React.createElement('span', null, label),
      )

      const presetVals = FONT_PRESETS.map((f) => f[0].toLowerCase())
      const installedOptions = installed.filter((f) => presetVals.indexOf(String(f).toLowerCase()) < 0).map((f) => [f, f])
      const fontOptions = FONT_PRESETS.concat(installedOptions)

      return React.createElement('div', { className: 'wfr-appearance' },
        React.createElement('h2', null, '外观'),
        React.createElement('div', { className: 'wfr-card' },
          React.createElement('div', { className: 'wfr-desc' }, 'Hermes 预设主题（配色提取自本机安装包）。L\'s Image 为启动默认；选择即生效并保存在浏览器中。'),
          React.createElement('div', { className: 'wfr-presets' },
            optionRow('none', '默认主题'),
            Object.keys(PRESETS).map((name) => optionRow(name, PRESETS[name].label)),
          ),
        ),
        React.createElement('div', { className: 'wfr-card' },
          React.createElement('div', { className: 'wfr-desc' }, '自定义主题：点击选择 / 编辑，保存后同样持久化。'),
          React.createElement('div', { className: 'wfr-custom-list' },
            list.map((t) => {
              const active = preset === 'custom:' + t.name
              return React.createElement('div', {
                key: t.name,
                className: 'wfr-custom-row' + (active ? ' wfr-custom-row-active' : ''),
                onClick: () => applyPreset('custom:' + t.name),
              },
                React.createElement('span', { className: 'wfr-swatch', style: { background: t.colors.background, borderColor: t.colors.primary } }),
                React.createElement('span', { className: 'wfr-custom-name' }, t.name),
                active ? React.createElement('span', { className: 'wfr-check' }, '✓') : null,
                React.createElement('button', { className: 'wfr-mini-btn', title: '编辑', onClick: (e) => { e.stopPropagation(); startEdit(t) } }, '✏️'),
                React.createElement('button', { className: 'wfr-mini-btn wfr-mini-btn-danger', title: '删除', onClick: (e) => { e.stopPropagation(); removeCustom(t) } }, '删除'),
              )
            }),
            React.createElement('div', { className: 'wfr-form-actions' },
              React.createElement('button', { className: 'wfr-btn', onClick: startNew }, '+ 新建自定义主题'),
            ),
          ),
        ),
        editing ? React.createElement('div', { className: 'wfr-card' },
          React.createElement('div', { className: 'wfr-editor' },
            React.createElement('div', { className: 'wfr-form-msg' }, editing.name ? '编辑主题：' + editing.name : '新建自定义主题'),
            React.createElement('input', {
              className: 'wfr-form-input',
              placeholder: '主题名称',
              value: editorName,
              onChange: (e) => setEditorName(e.target.value),
            }),
            React.createElement('div', { className: 'wfr-color-grid' },
              COLOR_FIELDS.map((f) => editorColorRow(f[0], f[1])),
            ),
            React.createElement('div', { className: 'wfr-form-actions' },
              React.createElement('button', { className: 'wfr-btn', onClick: previewCustom }, '预览'),
              React.createElement('button', { className: 'wfr-btn', onClick: cancelEdit }, '取消'),
              React.createElement('button', { className: 'wfr-btn wfr-btn-primary', onClick: saveCustom }, '保存并应用'),
            ),
          ),
        ) : null,
        React.createElement('div', { className: 'wfr-card' },
          React.createElement('div', { className: 'wfr-desc' }, '界面字体：选择系统常见字体或下方列出的电脑全部已安装字体；也可手动输入任意字体名称。选择后持久化。'),
          React.createElement('div', { className: 'wfr-font-row' },
            React.createElement('select', {
              className: 'wfr-select',
              value: fontSel,
              onChange: (e) => changeFont(e.target.value),
            },
              fontOptions.map((f) => React.createElement('option', { key: f[0] || 'default', value: f[0] }, f[1])),
            ),
            React.createElement('div', { className: 'wfr-form-actions' },
              React.createElement('button', { className: 'wfr-btn', onClick: () => { fontsCache = null; loadFonts() }, disabled: fontLoading }, fontLoading ? '加载字体中…' : '刷新字体列表'),
            ),
            React.createElement('div', { className: 'wfr-form-actions' },
              React.createElement('input', {
                className: 'wfr-form-input',
                placeholder: '输入已安装字体名称（如 DengXian）',
                value: fontInput,
                onChange: (e) => setFontInput(e.target.value),
                onKeyDown: (e) => { if (e.key === 'Enter') applyCustomFont() },
              }),
              React.createElement('button', { className: 'wfr-btn', onClick: applyCustomFont }, '使用该字体'),
            ),
          ),
        ),
        React.createElement('div', { className: 'wfr-desc' }, '主题、自定义主题与字体均保存在浏览器本地（localStorage），仅对当前浏览器生效。'),
      )
    }

    slots.inject('settings.section', () => slots.register(
      { name: 'settings.section', id: 'appearance', order: 30, label: '外观' },
      (props) => React.createElement(AppearancePage, props),
    ))

    ctx.effect(() => disposeStyles)
  
    };
    exports.name = "dsh-workspace-files";
    exports.apply = apply;
    return module.exports;
  }
});
