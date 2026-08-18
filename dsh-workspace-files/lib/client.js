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
    const timer = ctx.get('timer')

    const disposeStyles = styles.insert(`
.wfr-toggle-btn { display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; color: var(--dsw-alias-label-secondary); cursor: pointer; width: 26px; height: 26px; padding: 0; border-radius: 6px; }
.wfr-toggle-btn:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.wfr-toggle-btn svg { display: block; }
.wfr-drawer { position: absolute; top: 0; right: 0; bottom: 0; width: var(--wfr-pw, 320px); max-width: 82vw; background: var(--dsw-alias-bg-layer-1); border-left: 1px solid var(--dsw-alias-border-l2); display: flex; flex-direction: column; pointer-events: auto; font-size: 13px; color: var(--dsw-alias-label-primary); z-index: 200; }
.wfr-resize { position: absolute; left: -4px; top: 0; bottom: 0; width: 8px; cursor: col-resize; z-index: 6; touch-action: none; }
.wfr-resize::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 4px; height: 34px; border-radius: 4px; background: var(--dsw-alias-border-l2); opacity: 0; transition: opacity 0.15s ease, background 0.15s ease; }
.wfr-resize:hover::after, .wfr-resize.wfr-resizing::after { opacity: 1; background: var(--dsw-alias-brand-primary); }
.wfr-drawer-head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.wfr-drawer-title { font-weight: 600; }
.wfr-drawer-close { margin-left: auto; background: transparent; border: none; color: var(--dsw-alias-label-secondary); cursor: pointer; font-size: 14px; padding: 2px 8px; border-radius: 6px; }
.wfr-drawer-close:hover { background: var(--dsw-alias-bg-layer-2); }
.wfr-rootline { padding: 4px 12px; color: var(--dsw-alias-label-secondary); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.wfr-search { margin: 8px 12px; padding: 5px 8px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font-size: 12px; box-sizing: border-box; width: calc(100% - 24px); }
.wfr-search:focus { outline: none; border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary); }
.wfr-tree { flex: 1; overflow-y: auto; padding: 4px 0 12px; }
.wfr-trow { display: flex; align-items: center; gap: 6px; padding: 3px 8px; cursor: default; white-space: nowrap; overflow: hidden; border-radius: 5px; }
.wfr-trow:hover { background: var(--dsw-alias-bg-layer-2); }
.wfr-trow.wfr-selected { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent); }
.wfr-tdir { cursor: pointer; }
.wfr-tic { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 16px; color: var(--dsw-alias-label-secondary); }
.wfr-tic svg { display: block; width: 13px; height: 13px; }
.wfr-tdir .wfr-tic { color: var(--dsw-alias-label-primary); }
.wfr-tname { overflow: hidden; text-overflow: ellipsis; }
.wfr-tdir .wfr-tname { color: var(--dsw-alias-label-primary); }
.wfr-hint { padding: 4px 12px; color: var(--dsw-alias-label-secondary); font-size: 11px; }
.wfr-error { padding: 8px 12px; color: var(--dsw-alias-state-error-primary); font-size: 12px; }
.wfr-empty { padding: 8px 12px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
.wfr-menu-backdrop { position: fixed; inset: 0; z-index: 300; }
.wfr-menu { position: fixed; z-index: 301; min-width: 172px; background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; box-shadow: 0 8px 28px rgba(0,0,0,0.28); padding: 5px; display: flex; flex-direction: column; gap: 1px; }
.wfr-menu-item { padding: 6px 10px; border-radius: 6px; font-size: 12.5px; cursor: pointer; color: var(--dsw-alias-label-primary); white-space: nowrap; }
.wfr-menu-item:hover { background: var(--dsw-alias-bg-layer-2); }
.wfr-menu-danger { color: var(--dsw-alias-state-error-primary); }
.wfr-form { padding: 10px; gap: 8px; min-width: 230px; }
.wfr-form-body { display: flex; flex-direction: column; gap: 8px; }
.wfr-form-msg { font-size: 12.5px; color: var(--dsw-alias-label-primary); }
.wfr-form-input { padding: 5px 8px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); font-size: 12.5px; box-sizing: border-box; width: 100%; }
.wfr-form-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.wfr-form-btns { display: flex; justify-content: flex-end; gap: 6px; }
.wfr-btn { padding: 4px 10px; border-radius: 6px; border: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); cursor: pointer; font-size: 12px; }
.wfr-btn:hover { border-color: var(--dsw-alias-border-l2); }
.wfr-btn-primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-label-primary-foreground, #ffffff); }
.wfr-btn:disabled { opacity: 0.5; cursor: default; }
.wfr-preview { border-top: 1px solid var(--dsw-alias-border-l1); max-height: 42%; display: flex; flex-direction: column; flex: none; }
.wfr-preview-head { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.wfr-preview-name { font-size: 12px; color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.wfr-preview-code { margin: 0; padding: 8px 12px; overflow: auto; font-family: var(--ds-font-family-code, ui-monospace, 'SF Mono', Menlo, Consolas, monospace); font-size: 11.5px; line-height: 1.6; color: var(--dsw-alias-label-primary); white-space: pre-wrap; word-break: break-all; background: var(--dsw-alias-bg-layer-2); }
.wfr-lightbox { position: fixed; inset: 0; z-index: 400; background: rgba(0,0,0,0.62); display: flex; align-items: center; justify-content: center; }
.wfr-lightbox-card { max-width: 92vw; max-height: 92vh; display: flex; flex-direction: column; background: var(--dsw-alias-bg-layer-1); border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; overflow: hidden; box-shadow: 0 16px 60px rgba(0,0,0,0.5); }
.wfr-lightbox-head { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
.wfr-lightbox-name { font-size: 12.5px; color: var(--dsw-alias-label-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.wfr-lightbox-body { overflow: auto; display: flex; align-items: center; justify-content: center; padding: 12px; }
.wfr-lightbox-img { max-width: 100%; max-height: calc(92vh - 46px); object-fit: contain; display: block; }
.wfr-notice { position: absolute; left: 50%; bottom: 12px; transform: translateX(-50%); background: var(--dsw-alias-bg-overlay); border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; padding: 5px 12px; font-size: 12px; color: var(--dsw-alias-label-primary); z-index: 305; box-shadow: 0 4px 16px rgba(0,0,0,0.25); max-width: 85%; }
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
`)

    const MERGE_CSS = `
:root { --wfr-pw: 320px; }
.pI_x6G_centerCol { margin-right: var(--wfr-pw); }
`

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

    const PANEL_ICON_PATH = 'M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C' +
    '14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C3.81478 14.0642 3.99127 14.0774 4.1828 14.0873V1.91166Z';

    const FOLDER_CLOSE_PATH = 'M5.05582 0.518756L4.50669 0.86654L5.05582 0.518756ZM13 9.4837L13.65 9.4837L13.65 3.53962L13 3.53962L12.35 3.53962L12.35 9.4837L13 9.4837ZM11.3264 1.86603L11.3264 1.21603L6.52313 1.21603L6.52313 1.86603L6.52313 2.51603L11.3264 2.51603L11.3264 1.86603ZM5.58054 1.34727L6.12968 0.999489L5.60495 0.170972L5.05582 0.518756L4.50669 0.86654L5.03141 1.69506L5.58054 1.34727ZM4.11323 1.23058e-13L4.11323 -0.65L1.67359 -0.65L1.67359 5.00699e-14L1.67359 0.65L4.11323 0.65L4.11323 1.23058e-13ZM0 1.67359L-0.65 1.67359L-0.65 9.4837L0 9.4837L0.65 9.4837L0.65 1.67359L0 1.67359ZM11.3264 11.1573L11.3264 10.5073L1.67359 10.5073L1.67359 11.1573L1.67359 11.8073L11.3264 11.8073L11.3264 11.1573ZM0 9.4837L-0.65 9.4837C-0.65 10.767 0.390308 11.8073 1.67359 11.8073L1.67359 11.1573L1.67359 10.5073C1.10828 10.5073 0.65 10.049 0.65 9.4837L0 9.4837ZM1.67359 5.00699e-14L1.67359 -0.65C0.390307 -0.65 -0.65 0.390309 -0.65 1.67359L0 1.67359L0.65 1.67359C0.65 1.10828 1.10828 0.65 1.67359 0.65L1.67359 5.00699e-14ZM5.05582 0.518756L5.60495 0.170972C5.28121 -0.340193 4.71829 -0.65 4.11323 -0.65L4.11323 1.23058e-13L4.11323 0.65C4.27282 0.65 4.4213 0.731715 4.50669 0.86654L5.05582 0.518756ZM6.52313 1.86603L6.52313 1.21603C6.36354 1.21603 6.21507 1.13431 6.12968 0.999489L5.58054 1.34727L5.03141 1.69506C5.35515 2.20622 5.91808 2.51603 6.52313 2.51603L6.52313 1.86603ZM13 3.53962L13.65 3.53962C13.65 2.25634 12.6097 1.21603 11.3264 1.21603L11.3264 1.86603L11.3264 2.51603C11.8917 2.51603 12.35 2.97431 12.35 3.53962L13 3.53962ZM13 9.4837L12.35 9.4837C12.35 10.049 11.8917 10.5073 11.3264 10.5073L11.3264 11.1573L11.3264 11.8073C12.6097 11.8073 13.65 10.767 13.65 9.4837L13 9.4837Z'
    const FOLDER_OPEN_PATH = 'M5.19629 1.57104C5.81144 1.5711 6.38623 1.8786 6.72754 2.39038L7.19922 3.09839C7.28454 3.22635 7.42824 3.30344 7.58203 3.30347H12.1699C13.5039 3.30348 14.5859 4.38548 14.5859 5.71948V6.62671C15.2694 7.02689 15.6605 7.85012 15.4385 8.68726L14.3848 12.658C14.1037 13.7164 13.1449 14.4527 12.0498 14.4529H2.91699C1.51651 14.4529 0.451662 13.2814 0.501954 11.9519V3.98706C0.501954 2.65305 1.58396 1.57104 2.91797 1.57104H5.19629ZM3.7793 7.75562C3.30994 7.75562 2.89883 8.07153 2.77832 8.52515L1.91602 11.7722C1.74167 12.4291 2.23734 13.073 2.91699 13.073H12.0498C12.5191 13.0728 12.9304 12.757 13.0508 12.3035L14.1045 8.33374C14.1819 8.04202 13.9619 7.756 13.6602 7.75562H3.7793ZM2.91797 2.9519C2.34625 2.9519 1.88281 3.41534 1.88281 3.98706V7.2937C2.33068 6.7269 3.02249 6.37476 3.7793 6.37476H13.2051V5.71948C13.2051 5.14777 12.7416 4.68434 12.1699 4.68433H7.58203C6.96675 4.6843 6.39209 4.37595 6.05078 3.86401L5.5791 3.15601C5.49379 3.02821 5.34995 2.95196 5.19629 2.9519H2.91797Z'
    const FOLDER_OPEN_INNER = 'M13.6602 7.75525C13.9618 7.7556 14.1815 8.04179 14.1045 8.33337L13.0508 12.3031C12.9304 12.7567 12.5191 13.0725 12.0498 13.0726H2.91701C2.23744 13.0725 1.7417 12.4287 1.91603 11.7719L2.77834 8.52478C2.89898 8.07146 3.31018 7.75532 3.77931 7.75525H13.6602ZM5.1963 2.95154C5.34985 2.95159 5.49377 3.02803 5.57912 3.15564L6.0508 3.86365C6.39205 4.37553 6.96685 4.68385 7.58205 4.68396H12.1699C12.7416 4.68396 13.2049 5.14754 13.2051 5.71912V6.37439H3.77931C3.02267 6.37444 2.33067 6.72671 1.88283 7.29333V3.98669C1.88299 3.4152 2.34649 2.95168 2.91798 2.95154H5.1963Z'

    function PanelIcon({ size, flipped, className }) {
      return React.createElement('svg', {
        width: size || 14,
        height: size || 14,
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        className: className,
        style: flipped ? { transform: 'scaleX(-1)' } : undefined,
        'aria-hidden': true,
      }, React.createElement('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        fill: 'currentColor',
        d: PANEL_ICON_PATH,
      }))
    }

    function FolderIcon({ size, open }) {
      if (open) {
        return React.createElement('svg', {
          width: size || 14,
          height: size || 14,
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': true,
        },
          React.createElement('path', { d: FOLDER_OPEN_PATH, fill: 'currentColor' }),
          React.createElement('path', { opacity: 0.2, d: FOLDER_OPEN_INNER, fill: 'currentColor' }),
        )
      }
      return React.createElement('svg', {
        width: size || 14,
        height: size || 14,
        viewBox: '0 0 16 16',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        'aria-hidden': true,
      }, React.createElement('path', {
        transform: 'translate(1.5 2.429)',
        d: FOLDER_CLOSE_PATH,
        fill: 'currentColor',
      }))
    }

// Generated from Trae icube-seti-icon-theme.json (dark variant)
const TRAE_EXT_ICONS = {"h":"icon.14.explorer.type.h.svg","config":"icon.14.explorer.file.settings.svg","cson":"icon.14.explorer.lang.json.svg","css.map":"icon.14.explorer.lang.css.svg","sss":"icon.14.explorer.lang.css.svg","xls":"icon.14.explorer.type.xlsx.svg","xlsx":"icon.14.explorer.type.xlsx.svg","doc":"icon.14.explorer.type.docx.svg","docx":"icon.14.explorer.type.docx.svg","ico":"icon.14.explorer.type.ico.svg","gitconfig":"icon.14.explorer.type.git.svg","gitkeep":"icon.14.explorer.type.git.svg","gitattributes":"icon.14.explorer.type.git.svg","gitmodules":"icon.14.explorer.type.git.svg","slide":"icon.14.explorer.lang.go.svg","article":"icon.14.explorer.lang.go.svg","classpath":"icon.14.explorer.lang.java.svg","js.map":"icon.14.explorer.lang.js.svg","cjs.map":"icon.14.explorer.lang.js.svg","mjs.map":"icon.14.explorer.lang.js.svg","es":"icon.14.explorer.lang.js.svg","es5":"icon.14.explorer.lang.js.svg","es7":"icon.14.explorer.lang.js.svg","npmignore":"icon.14.explorer.npm.svg","npmrc":"icon.14.explorer.npm.svg","cjsx":"icon.14.explorer.lang.react.svg","toml":"icon.14.explorer.file.settings.svg","component":"icon.14.explorer.lang.html.svg","vue":"icon.14.explorer.lang.vue.svg","pdf":"icon.14.explorer.type.pdf.svg",
    "avif":"icon.14.explorer.type.image.svg","gif":"icon.14.explorer.type.image.svg","jpg":"icon.14.explorer.type.image.svg","jpeg":"icon.14.explorer.type.image.svg","png":"icon.14.explorer.type.image.svg","pxm":"icon.14.explorer.type.image.svg","svg":"icon.14.explorer.type.svg.svg","svgx":"icon.14.explorer.type.image.svg","tiff":"icon.14.explorer.type.image.svg","webp":"icon.14.explorer.type.image.svg","eslintrc":"icon.14.explorer.eslint.svg","eslintrc.js":"icon.14.explorer.eslint.svg","eslintrc.cjs":"icon.14.explorer.eslint.svg","eslintrc.yaml":"icon.14.explorer.eslint.svg","eslintrc.yml":"icon.14.explorer.eslint.svg","eslintrc.json":"icon.14.explorer.eslint.svg","eslintignore":"icon.14.explorer.eslintignore.svg","direnv":"icon.14.explorer.file.settings.svg","static":"icon.14.explorer.file.settings.svg","slugignore":"icon.14.explorer.file.settings.svg","htaccess":"icon.14.explorer.file.settings.svg","key":"icon.14.explorer.type.key.svg","ppt":"icon.14.explorer.type.pptx.svg","pptx":"icon.14.explorer.type.pptx.svg","txt":"icon.14.explorer.type.txt.svg","d.ts":"icon.14.explorer.lang.dts.svg","env":"icon.14.explorer.file.settings.svg","mime.types":"icon.14.explorer.file.settings.svg","documents/md":"icon.16.explorer.file.soloPreview.svg",
    "pages":"icon.14.explorer.type.pages.svg","numbers":"icon.14.explorer.type.numbers.svg"}
const TRAE_NAME_ICONS = {"readme.md":"icon.14.explorer.file.readme.svg","readme.txt":"icon.14.explorer.file.readme.svg","readme":"icon.14.explorer.file.readme.svg","tsconfig.json":"icon.14.explorer.file.settings.svg","eslint.config.js":"icon.14.explorer.eslint.svg","license":"icon.14.explorer.type.license.svg","licence":"icon.14.explorer.type.license.svg","license.txt":"icon.14.explorer.type.license.svg","licence.txt":"icon.14.explorer.type.license.svg","license.md":"icon.14.explorer.type.license.svg","licence.md":"icon.14.explorer.type.license.svg","copying":"icon.14.explorer.type.license.svg","copying.txt":"icon.14.explorer.type.license.svg","copying.md":"icon.14.explorer.type.license.svg","contributing":"icon.14.explorer.type.license.svg","contributing.txt":"icon.14.explorer.type.license.svg","contributing.md":"icon.14.explorer.type.license.svg","settingseditor":"icon.14.explorer.file.settings.svg","user_rules.md":"icon.14.explorer.file.user.rule.svg","project_rules.md":"icon.14.explorer.file.workspace.rule.svg"};
const TRAE_LANG_ICONS = {"bat":"icon.14.explorer.lang.bat.svg","jsonc":"icon.14.explorer.lang.json.svg","json":"icon.14.explorer.lang.json.svg","c":"icon.14.explorer.lang.c.svg","cpp":"icon.14.explorer.lang.c++.svg","csharp":"icon.14.explorer.lang.c#.svg","css":"icon.14.explorer.lang.css.svg","dockerfile":"icon.14.explorer.type.docker.svg","ignore":"icon.14.explorer.type.git.svg","git-commit":"icon.14.explorer.type.git.svg","go":"icon.14.explorer.lang.go.svg","html":"icon.14.explorer.lang.html.svg","properties":"icon.14.explorer.file.settings.svg","java":"icon.14.explorer.lang.java.svg","javascriptreact":"icon.14.explorer.lang.react.svg","javascript":"icon.14.explorer.lang.js.svg","markdown":"icon.14.explorer.type.markdown.svg","python":"icon.14.explorer.lang.python.svg","rust":"icon.14.explorer.lang.rs.svg","shellscript":"icon.14.explorer.type.bash.svg","typescript":"icon.14.explorer.lang.ts.svg","typescriptreact":"icon.14.explorer.lang.react.svg","xml":"icon.14.explorer.lang.xml.svg","yaml":"icon.14.explorer.lang.yaml.svg","vue":"icon.14.explorer.lang.vue.svg","jsonl":"icon.14.explorer.lang.json.svg","postcss":"icon.14.explorer.lang.css.svg","django-html":"icon.14.explorer.lang.html.svg","CommandLabel":"icon.14.explorer.type.command.svg","SettingSet":"icon.14.explorer.file.settings.svg","SettingView":"icon.14.explorer.file.settings.svg"};
const TRAE_BASE_ICONS = {"js":"icon.14.explorer.lang.js.svg","jsx":"icon.14.explorer.lang.react.svg","ts":"icon.14.explorer.lang.ts.svg","tsx":"icon.14.explorer.lang.react.svg","mts":"icon.14.explorer.lang.ts.svg","cts":"icon.14.explorer.lang.ts.svg","json":"icon.14.explorer.lang.json.svg","jsonc":"icon.14.explorer.lang.json.svg","md":"icon.14.explorer.type.markdown.svg","markdown":"icon.14.explorer.type.markdown.svg","html":"icon.14.explorer.lang.html.svg","htm":"icon.14.explorer.lang.html.svg","css":"icon.14.explorer.lang.css.svg","scss":"icon.14.explorer.lang.css.svg","less":"icon.14.explorer.lang.css.svg","sass":"icon.14.explorer.lang.css.svg","py":"icon.14.explorer.lang.python.svg","go":"icon.14.explorer.lang.go.svg","rs":"icon.14.explorer.lang.rs.svg","c":"icon.14.explorer.lang.c.svg","h":"icon.14.explorer.type.h.svg","cpp":"icon.14.explorer.lang.c++.svg","cc":"icon.14.explorer.lang.c++.svg","cxx":"icon.14.explorer.lang.c++.svg","hpp":"icon.14.explorer.type.h.svg","cs":"icon.14.explorer.lang.c#.svg","java":"icon.14.explorer.lang.java.svg","sh":"icon.14.explorer.type.bash.svg","bash":"icon.14.explorer.type.bash.svg","zsh":"icon.14.explorer.type.bash.svg","bat":"icon.14.explorer.lang.bat.svg","cmd":"icon.14.explorer.lang.bat.svg",
    "ps1":"icon.14.explorer.type.command.svg","xml":"icon.14.explorer.lang.xml.svg","yml":"icon.14.explorer.lang.yaml.svg","yaml":"icon.14.explorer.lang.yaml.svg","vue":"icon.14.explorer.lang.vue.svg","sql":"icon.14.explorer.file.settings.svg","txt":"icon.14.explorer.type.txt.svg","log":"icon.14.explorer.type.txt.svg","ini":"icon.14.explorer.file.settings.svg","toml":"icon.14.explorer.file.settings.svg","env":"icon.14.explorer.file.settings.svg","conf":"icon.14.explorer.file.settings.svg","cfg":"icon.14.explorer.file.settings.svg","config":"icon.14.explorer.file.settings.svg","pdf":"icon.14.explorer.type.pdf.svg","doc":"icon.14.explorer.type.docx.svg","docx":"icon.14.explorer.type.docx.svg","xls":"icon.14.explorer.type.xlsx.svg","xlsx":"icon.14.explorer.type.xlsx.svg","ppt":"icon.14.explorer.type.pptx.svg","pptx":"icon.14.explorer.type.pptx.svg","png":"icon.14.explorer.type.image.svg","jpg":"icon.14.explorer.type.image.svg","jpeg":"icon.14.explorer.type.image.svg","gif":"icon.14.explorer.type.image.svg","webp":"icon.14.explorer.type.image.svg","bmp":"icon.14.explorer.type.image.svg","svg":"icon.14.explorer.type.svg.svg","ico":"icon.14.explorer.type.ico.svg","zip":"icon.14.explorer.type.license.svg",
    "gz":"icon.14.explorer.type.license.svg","tar":"icon.14.explorer.type.license.svg","rar":"icon.14.explorer.type.license.svg","7z":"icon.14.explorer.type.license.svg","lock":"icon.14.explorer.type.license.svg","gitignore":"icon.14.explorer.type.git.svg","gitattributes":"icon.14.explorer.type.git.svg","gitmodules":"icon.14.explorer.type.git.svg","gitkeep":"icon.14.explorer.type.git.svg","gitconfig":"icon.14.explorer.type.git.svg","gitlab":"icon.14.explorer.gitlab.svg","dockerignore":"icon.14.explorer.type.docker.svg","editorconfig":"icon.14.explorer.file.settings.svg","npmrc":"icon.14.explorer.npm.svg","nvmrc":"icon.14.explorer.npm.svg","makefile":"icon.14.explorer.type.command.svg","cmake":"icon.14.explorer.type.command.svg"}

    const ICON_SVG_CACHE = new Map()
    function isDarkTheme() {
      try {
        if (typeof document === 'undefined') return true
        const el = document.body || document.documentElement
        return !!(el && el.hasAttribute('data-ds-dark-theme'))
      } catch (e) { return true }
    }
    function fileIconKey(name) {
      const lower = String(name || '').toLowerCase()
      if (TRAE_NAME_ICONS[lower]) return TRAE_NAME_ICONS[lower]
      const parts = lower.split('.')
      for (let i = 1; i < parts.length; i++) {
        const ext = parts.slice(i).join('.')
        if (TRAE_EXT_ICONS[ext]) return TRAE_EXT_ICONS[ext]
        if (TRAE_BASE_ICONS[ext]) return TRAE_BASE_ICONS[ext]
      }
      if (TRAE_LANG_ICONS[lower]) return TRAE_LANG_ICONS[lower]
      return 'icon.14.explorer.file.svg'
    }
    function FileTypeIcon({ name }) {
      const [svg, setSvg] = React.useState('')
      React.useEffect(() => {
        let alive = true
        const file = fileIconKey(name)
        const dark = isDarkTheme()
        const key = (dark ? 'd' : 'l') + '|' + file
        const hit = ICON_SVG_CACHE.get(key)
        if (hit !== undefined) { if (alive) setSvg(hit); return }
        host.call('read-icon', { file: file, dark: dark }).then((res) => {
          const s = (res && res.svg) || ''
          ICON_SVG_CACHE.set(key, s)
          if (alive) setSvg(s)
        }).catch(() => { if (alive) setSvg('') })
        return () => { alive = false }
      }, [name])
      if (!svg) return React.createElement('span', { className: 'wfr-tic' })
      return React.createElement('span', {
        className: 'wfr-tic wfr-ftic',
        dangerouslySetInnerHTML: { __html: svg },
      })
    }

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

    const store = {
      open: false,
      inputActions: null,
      draft: '',
      workspacePath: '',
      listeners: new Set(),
      setOpen(v) { if (this.open !== v) { this.open = v; this.emit() } },
      setInput(actions, draft) { this.inputActions = actions; if (typeof draft === 'string') this.draft = draft },
      setWorkspace(path) {
        const p = path || ''
        if (this.workspacePath !== p) { this.workspacePath = p; this.emit() }
      },
      subscribe(fn) { this.listeners.add(fn); return () => { this.listeners.delete(fn) } },
      emit() { this.listeners.forEach((fn) => fn()) },
    }

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

    function HeaderToggle(props) {
      const input = props.useInput((s) => s)
      const wsState = props.useWorkspaces((s) => s)
      let wsPath = ''
      const items = (wsState && wsState.items) || []
      const mine = items.find((w) => w.sessionIds.indexOf(props.sessionId) >= 0)
      if (mine) {
        wsPath = mine.path
      } else if (wsState && wsState.recentWorkspaceId) {
        const recent = items.find((w) => w.workspaceId === wsState.recentWorkspaceId)
        if (recent) wsPath = recent.path
      }
      React.useEffect(() => {
        store.setInput(props.inputActions, input ? input.draft : '')
        store.setWorkspace(wsPath)
      }, [props.inputActions, input, wsPath])
      return React.createElement('button', {
        className: 'wfr-toggle-btn',
        title: store.open ? '关闭右侧工作区文件面板' : '打开右侧工作区文件面板',
        onClick: () => store.setOpen(!store.open),
      }, React.createElement(PanelIcon, { size: 15, flipped: true }))
    }

    const IMG_RE = /\.(png|jpe?g|gif|webp|bmp|svg)$/i

    function FileDrawer(props) {
      const [open, setOpen] = React.useState(store.open)
      const [workspacePath, setWorkspacePath] = React.useState(store.workspacePath)
      const [root, setRoot] = React.useState('')
      const [tree, setTree] = React.useState({})
      const [error, setError] = React.useState('')
      const [query, setQuery] = React.useState('')
      const [searchMode, setSearchMode] = React.useState(false)
      const [searchResults, setSearchResults] = React.useState([])
      const [fullList, setFullList] = React.useState(null)
      const [searchLoading, setSearchLoading] = React.useState(false)
      const [selected, setSelected] = React.useState(null)
      const [menu, setMenu] = React.useState(null)
      const [form, setForm] = React.useState(null)
      const [formValue, setFormValue] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const [preview, setPreview] = React.useState(null)
      const [lightbox, setLightbox] = React.useState(null)
      const [notice, setNotice] = React.useState('')
      const [panelW, setPanelW] = React.useState(320)
      const [drag, setDrag] = React.useState(null)
      const [resizing, setResizing] = React.useState(false)

      const showNotice = (text) => {
        setNotice(text)
        if (timer) timer.timeout(() => setNotice(''), 2600)
      }

      React.useEffect(() => store.subscribe(() => {
        setOpen(store.open)
        setWorkspacePath(store.workspacePath)
      }), [])

      React.useEffect(() => {
        setRoot('')
        setTree({})
        setFullList(null)
        setSearchResults([])
        setQuery('')
        setSearchMode(false)
        setError('')
        setSelected(null)
        setMenu(null)
        setForm(null)
        setPreview(null)
        setLightbox(null)
      }, [workspacePath])

      React.useEffect(() => {
        if (!open) return
        const dispose = styles.insert(MERGE_CSS)
        return () => dispose()
      }, [open])

      React.useEffect(() => {
        if (!open) return
        if (typeof document !== 'undefined' && document.documentElement) {
          document.documentElement.style.setProperty('--wfr-pw', panelW + 'px')
        }
        return () => {
          if (typeof document !== 'undefined' && document.documentElement) {
            document.documentElement.style.removeProperty('--wfr-pw')
          }
        }
      }, [open, panelW])

      React.useEffect(() => {
        if (!lightbox) return
        if (typeof window === 'undefined') return
        const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [lightbox])

      const onResizeDown = (e) => {
        e.preventDefault()
        e.currentTarget.setPointerCapture(e.pointerId)
        setDrag({ startX: e.clientX, startW: panelW })
        setResizing(true)
      }
      const onResizeMove = (e) => {
        if (!drag) return
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        const vw = (typeof window !== 'undefined' ? window.innerWidth : 1400)
        const raw = drag.startW + (drag.startX - e.clientX)
        if (raw < 140 || e.clientX >= vw - 48) {
          setPanelW(320)
          setDrag(null)
          setResizing(false)
          store.setOpen(false)
          return
        }
        const maxW = Math.max(240, Math.min(680, vw - 420))
        setPanelW(Math.max(240, Math.min(maxW, raw)))
      }
      const onResizeUp = (e) => {
        if (!drag) return
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
        setDrag(null)
        setResizing(false)
      }

      const loadDir = (path) => {
        setTree((prev) => ({ ...prev, [path]: { ...(prev[path] || {}), loading: true } }))
        host.call('list-dir', { path }).then((res) => {
          setTree((prev) => ({ ...prev, [path]: { ...(prev[path] || {}), loading: false, children: (res && res.entries) || [] } }))
        }).catch((err) => {
          setError(String((err && err.message) || err))
          setTree((prev) => ({ ...prev, [path]: { ...(prev[path] || {}), loading: false, children: [] } }))
        })
      }

      const refreshTree = () => {
        setRoot('')
        setTree({})
        setFullList(null)
        setSearchResults([])
        setQuery('')
        setSelected(null)
      }

      React.useEffect(() => {
        if (!open) return
        if (!root) {
          const load = workspacePath
            ? Promise.resolve(workspacePath)
            : host.call('workspace-root', {}).then((res) => (res && res.root) || '')
          load.then((r) => {
            setRoot(r)
            return r
          }).then((r) => {
            if (r) loadDir(r)
          }).catch((err) => {
            setError(String((err && err.message) || err))
          })
        } else if (!tree[root]) {
          loadDir(root)
        }
      }, [open, root, workspacePath])

      const insertRef = (path) => {
        const actions = store.inputActions
        if (!actions) return
        const cur = store.draft || ''
        const ref = '`' + path + '`'
        const next = cur.length === 0 ? ref : cur + ' ' + ref
        actions.setDraft(next)
        store.setInput(actions, next)
        showNotice('已引用到输入框')
      }

      const copyPath = (path) => {
        try {
          if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(path).then(
              () => showNotice('已复制路径'),
              () => showNotice('复制失败')
            )
          } else {
            showNotice('剪贴板不可用')
          }
        } catch (err) {
          showNotice('复制失败')
        }
      }

      const toggleDir = (path) => {
        if (tree[path] && tree[path].children) {
          setTree((prev) => {
            const next = { ...prev }
            delete next[path]
            return next
          })
        } else {
          loadDir(path)
        }
      }

      const openImage = (t) => {
        setMenu(null)
        setLightbox({ path: t.path, name: t.name, loading: true, src: '', error: '', tooLarge: false })
        host.call('read-image', { path: t.path }).then((res) => {
          if (res && res.error) setLightbox({ path: t.path, name: t.name, loading: false, src: '', error: res.error, tooLarge: false })
          else if (res && res.tooLarge) setLightbox({ path: t.path, name: t.name, loading: false, src: '', error: '', tooLarge: true, size: res.size })
          else {
            const ext = (t.name.match(/\.([a-z0-9]+)$/i) || [])[1] || 'png'
            setLightbox({ path: t.path, name: t.name, loading: false, src: 'data:image/' + ext.toLowerCase() + ';base64,' + (res.base64 || ''), error: '', tooLarge: false })
          }
        }).catch((err) => {
          setLightbox({ path: t.path, name: t.name, loading: false, src: '', error: String((err && err.message) || err), tooLarge: false })
        })
      }

      const openText = (t) => {
        setMenu(null)
        setPreview({ path: t.path, name: t.name, loading: true, content: '', error: '', tooLarge: false })
        host.call('read-file', { path: t.path }).then((res) => {
          if (res && res.error) setPreview({ path: t.path, name: t.name, loading: false, content: '', error: res.error, tooLarge: false })
          else if (res && res.tooLarge) setPreview({ path: t.path, name: t.name, loading: false, content: '', error: '', tooLarge: true, size: res.size })
          else setPreview({ path: t.path, name: t.name, loading: false, content: (res && res.content) || '', error: '', tooLarge: false })
        }).catch((err) => {
          setPreview({ path: t.path, name: t.name, loading: false, content: '', error: String((err && err.message) || err), tooLarge: false })
        })
      }

      const openFile = (t) => {
        if (IMG_RE.test(t.name)) openImage(t)
        else openText(t)
      }

      const doDelete = (t) => {
        setBusy(true)
        setForm(null)
        setMenu(null)
        host.call('delete', { path: t.path, isDir: t.type === 'directory' }).then((res) => {
          setBusy(false)
          if (res && res.error) showNotice('删除失败: ' + res.error)
          else { showNotice('已删除'); refreshTree() }
        }).catch((err) => {
          setBusy(false)
          showNotice('删除失败: ' + String((err && err.message) || err))
        })
      }

      const doReveal = (path) => {
        setBusy(true)
        setMenu(null)
        host.call('reveal', { path }).then((res) => {
          setBusy(false)
          if (res && res.error) showNotice('打开失败: ' + res.error)
        }).catch((err) => {
          setBusy(false)
          showNotice('打开失败: ' + String((err && err.message) || err))
        })
      }

      const submitForm = (value) => {
        const f = form
        if (!f || busy) return
        const v = String(value || '').trim()
        if (f.kind !== 'confirm' && !v) { showNotice('名称不能为空'); return }
        setBusy(true)
        const call = (method, args) => host.call(method, args).then((res) => {
          setBusy(false)
          setForm(null)
          setMenu(null)
          if (res && res.error) showNotice('操作失败: ' + res.error)
          else { showNotice('操作成功'); refreshTree() }
        }).catch((err) => {
          setBusy(false)
          setForm(null)
          setMenu(null)
          showNotice('操作失败: ' + String((err && err.message) || err))
        })
        if (f.kind === 'new-file') call('create-file', { dir: f.dir, name: v })
        else if (f.kind === 'new-dir') call('create-dir', { dir: f.dir, name: v })
        else if (f.kind === 'rename') call('rename', { path: f.path, newName: v })
      }

      const openForm = (kind, args) => {
        setMenu(null)
        setFormValue('')
        setForm({ kind, ...args })
      }

      const closePop = () => {
        if (busy) return
        setForm(null)
        setMenu(null)
      }

      const renderRows = (path, depth) => {
        const node = tree[path]
        const children = (node && node.children) || []
        const rows = []
        for (const c of children) {
          const isDir = c.type === 'directory'
          const expanded = !!(tree[c.path] && tree[c.path].children)
          const loading = !!(tree[c.path] && tree[c.path].loading)
          const t = { path: c.path, name: c.name, type: c.type, rel: c.rel || c.name }
          rows.push(React.createElement('div', {
            key: c.path,
            className: 'wfr-trow' + (isDir ? ' wfr-tdir' : '') + (selected === c.path ? ' wfr-selected' : ''),
            style: { paddingLeft: (6 + depth * 14) + 'px' },
            onClick: () => { setSelected(c.path); if (isDir) toggleDir(c.path) },
            onDoubleClick: () => { if (isDir) toggleDir(c.path); else openFile(t) },
            onContextMenu: (e) => { e.preventDefault(); e.stopPropagation(); setSelected(c.path); setPreview(null); setMenu({ x: e.clientX, y: e.clientY, target: t }) },
          },
            React.createElement('span', { className: 'wfr-tic' }, isDir ? React.createElement(FolderIcon, { size: 13, open: expanded }) : React.createElement(FileTypeIcon, { name: c.name })),
            React.createElement('span', { className: 'wfr-tname' }, c.name),
            loading ? React.createElement('span', { className: 'wfr-hint' }, '…') : null,
          ))
          if (isDir && expanded) rows.push(renderRows(c.path, depth + 1))
        }
        return rows
      }

      React.useEffect(() => {
        const q = query.trim().toLowerCase()
        if (!q) { setSearchMode(false); return }
        setSearchMode(true)
        setSearchLoading(true)
        const ensure = fullList ? Promise.resolve(fullList) : host.call('workspace-files', { root: workspacePath || undefined }).then((res) => {
          const list = (res && res.files) || []
          setFullList(list)
          return list
        }).catch((err) => {
          setError(String((err && err.message) || err))
          return []
        })
        ensure.then((list) => {
          setSearchLoading(false)
          setSearchResults(list.filter((f) => f.rel.toLowerCase().indexOf(q) >= 0))
        })
      }, [query])

      if (!open) return null

      const fileItems = [
        { key: 'open', label: '打开', run: (t) => openFile(t) },
        { key: 'ref', label: '引用到输入框', run: (t) => { setMenu(null); insertRef(t.path) } },
        { key: 'copy', label: '复制路径', run: (t) => { setMenu(null); copyPath(t.path) } },
        { key: 'rename', label: '重命名', run: (t) => openForm('rename', { path: t.path, name: t.name }) },
        { key: 'delete', label: '删除', danger: true, run: (t) => openForm('confirm', { message: '确定删除「' + t.name + '」？此操作不可撤销。', onConfirm: () => doDelete(t) }) },
        { key: 'reveal', label: '在文件管理器中显示', run: (t) => doReveal(t.path) },
        { key: 'refresh', label: '刷新', run: () => { setMenu(null); refreshTree() } },
      ]
      const dirItems = [
        { key: 'open', label: '展开/收起', run: (t) => { setMenu(null); toggleDir(t.path) } },
        { key: 'newfile', label: '新建文件', run: (t) => openForm('new-file', { dir: t.path }) },
        { key: 'newdir', label: '新建文件夹', run: (t) => openForm('new-dir', { dir: t.path }) },
        { key: 'ref', label: '引用到输入框', run: (t) => { setMenu(null); insertRef(t.path) } },
        { key: 'copy', label: '复制路径', run: (t) => { setMenu(null); copyPath(t.path) } },
        { key: 'rename', label: '重命名', run: (t) => openForm('rename', { path: t.path, name: t.name }) },
        { key: 'delete', label: '删除', danger: true, run: (t) => openForm('confirm', { message: '确定删除文件夹「' + t.name + '」及其全部内容？', onConfirm: () => doDelete(t) }) },
        { key: 'reveal', label: '在文件管理器中显示', run: (t) => doReveal(t.path) },
        { key: 'refresh', label: '刷新', run: () => { setMenu(null); refreshTree() } },
      ]
      const blankItems = [
        { key: 'newfile', label: '新建文件', run: () => openForm('new-file', { dir: root || workspacePath || '' }) },
        { key: 'newdir', label: '新建文件夹', run: () => openForm('new-dir', { dir: root || workspacePath || '' }) },
        { key: 'refresh', label: '刷新', run: () => { setMenu(null); refreshTree() } },
      ]

      const menuItems = menu ? (menu.target === null ? blankItems : menu.target.type === 'directory' ? dirItems : fileItems) : []
      const menuW = 190
      const menuH = menuItems.length * 30 + 14
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1400
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900

      let body
      if (error) {
        body = React.createElement('div', { className: 'wfr-error' }, error)
      } else if (searchMode) {
        body = React.createElement('div', { className: 'wfr-tree', onContextMenu: (e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY, target: null }) } },
          searchResults.length === 0
            ? React.createElement('div', { className: 'wfr-empty' }, searchLoading ? '搜索中…' : '无匹配文件')
            : searchResults.map((f) => {
              const t = { path: f.path, name: f.name, type: f.type, rel: f.rel }
              return React.createElement('div', {
                key: f.path,
                className: 'wfr-trow' + (f.type === 'directory' ? ' wfr-tdir' : '') + (selected === f.path ? ' wfr-selected' : ''),
                style: { paddingLeft: '8px' },
                onClick: () => { setSelected(f.path); if (f.type === 'directory') toggleDir(f.path) },
                onDoubleClick: () => { if (f.type === 'directory') toggleDir(f.path); else openFile(t) },
                onContextMenu: (e) => { e.preventDefault(); e.stopPropagation(); setSelected(f.path); setPreview(null); setMenu({ x: e.clientX, y: e.clientY, target: t }) },
              },
                React.createElement('span', { className: 'wfr-tic' }, f.type === 'directory' ? React.createElement(FolderIcon, { size: 13 }) : React.createElement(FileTypeIcon, { name: f.name })),
                React.createElement('span', { className: 'wfr-tname' }, f.rel),
              )
            }),
        )
      } else {
        const rows = (root && tree[root]) ? renderRows(root, 0) : []
        body = React.createElement('div', { className: 'wfr-tree', onContextMenu: (e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY, target: null }) } },
          rows.length === 0 ? React.createElement('div', { className: 'wfr-empty' }, '正在加载…') : rows,
        )
      }

      return React.createElement('div', { className: 'wfr-drawer' },
        React.createElement('div', { className: 'wfr-resize' + (resizing ? ' wfr-resizing' : ''), onPointerDown: onResizeDown, onPointerMove: onResizeMove, onPointerUp: onResizeUp, title: '拖动调整宽度（拖到最右侧关闭面板）' }),
        React.createElement('div', { className: 'wfr-drawer-head' },
          React.createElement('span', { className: 'wfr-drawer-title' }, '工作区文件'),
          React.createElement('button', { className: 'wfr-drawer-close', onClick: () => store.setOpen(false), title: '关闭' }, '✕'),
        ),
        root ? React.createElement('div', { className: 'wfr-rootline', title: root }, root) : null,
        React.createElement('input', {
          className: 'wfr-search',
          placeholder: '搜索全部文件…',
          value: query,
          onChange: (e) => setQuery(e.target.value),
        }),
        body,
        preview ? React.createElement('div', { className: 'wfr-preview' },
          React.createElement('div', { className: 'wfr-preview-head' },
            React.createElement('span', { className: 'wfr-preview-name', title: preview.path }, preview.name),
            React.createElement('button', { className: 'wfr-drawer-close', onClick: () => setPreview(null) }, '✕'),
          ),
          preview.loading ? React.createElement('div', { className: 'wfr-empty' }, '加载中…')
          : preview.tooLarge ? React.createElement('div', { className: 'wfr-error' }, '文件过大（' + Math.round(preview.size / 1024) + ' KB），超过预览上限')
          : preview.error ? React.createElement('div', { className: 'wfr-error' }, preview.error)
          : React.createElement('pre', { className: 'wfr-preview-code' }, preview.content),
        ) : null,
        React.createElement('div', { className: 'wfr-hint' }, '单击选择 · 双击打开 · 右键菜单'),
        menu && !form ? React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'wfr-menu-backdrop', onClick: closePop, onContextMenu: (e) => { e.preventDefault(); closePop() } }),
          React.createElement('div', { className: 'wfr-menu', style: { left: Math.min(menu.x, vw - menuW - 8), top: Math.min(menu.y, vh - menuH - 8) } },
            menuItems.map((it) => React.createElement('div', {
              key: it.key,
              className: 'wfr-menu-item' + (it.danger ? ' wfr-menu-danger' : ''),
              onClick: () => { if (!busy) it.run(menu.target) },
            }, it.label)),
          ),
        ) : null,
        form ? React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'wfr-menu-backdrop', onClick: closePop }),
          React.createElement('div', { className: 'wfr-menu wfr-form', style: { left: Math.min((menu ? menu.x : vw / 2) - 130, vw - 240), top: Math.min(menu ? menu.y : vh / 2, vh - 160) } },
            form.kind === 'confirm'
              ? React.createElement('div', { className: 'wfr-form-body' },
                  React.createElement('div', { className: 'wfr-form-msg' }, form.message),
                  React.createElement('div', { className: 'wfr-form-btns' },
                    React.createElement('button', { className: 'wfr-btn', onClick: closePop, disabled: busy }, '取消'),
                    React.createElement('button', { className: 'wfr-btn wfr-btn-primary', onClick: () => form.onConfirm(), disabled: busy }, '确定'),
                  ),
                )
              : React.createElement('div', { className: 'wfr-form-body' },
                  React.createElement('div', { className: 'wfr-form-msg' }, form.label),
                  React.createElement('input', {
                    className: 'wfr-form-input',
                    autoFocus: true,
                    value: formValue,
                    placeholder: form.placeholder || '',
                    onChange: (e) => setFormValue(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === 'Enter') submitForm(formValue)
                      if (e.key === 'Escape') closePop()
                    },
                  }),
                  React.createElement('div', { className: 'wfr-form-btns' },
                    React.createElement('button', { className: 'wfr-btn', onClick: closePop, disabled: busy }, '取消'),
                    React.createElement('button', { className: 'wfr-btn wfr-btn-primary', onClick: () => submitForm(formValue), disabled: busy }, '确定'),
                  ),
                ),
          ),
        ) : null,
        lightbox ? React.createElement('div', { className: 'wfr-lightbox', onClick: () => setLightbox(null) },
          React.createElement('div', { className: 'wfr-lightbox-card', onClick: (e) => e.stopPropagation() },
            React.createElement('div', { className: 'wfr-lightbox-head' },
              React.createElement('span', { className: 'wfr-lightbox-name', title: lightbox.path }, lightbox.name),
              React.createElement('button', { className: 'wfr-drawer-close', onClick: () => setLightbox(null) }, '✕'),
            ),
            React.createElement('div', { className: 'wfr-lightbox-body' },
              lightbox.loading ? React.createElement('div', { className: 'wfr-empty' }, '加载中…')
              : lightbox.tooLarge ? React.createElement('div', { className: 'wfr-error' }, '图片过大（' + Math.round(lightbox.size / 1024) + ' KB），超过 4 MB 预览上限')
              : lightbox.error ? React.createElement('div', { className: 'wfr-error' }, lightbox.error)
              : React.createElement('img', { className: 'wfr-lightbox-img', src: lightbox.src, alt: lightbox.name }),
            ),
          ),
        ) : null,
        notice ? React.createElement('div', { className: 'wfr-notice' }, notice) : null,
      )
    }

    slots.inject('shell.overlay', () => slots.register(
      { name: 'shell.overlay', id: 'workspace-file-drawer', order: 10 },
      (props) => React.createElement(FileDrawer, props),
    ))

    slots.inject('conversation.session.header.actions', () => slots.register(
      { name: 'conversation.session.header.actions', id: 'workspace-file-toggle', order: -20 },
      (props) => React.createElement(HeaderToggle, props),
    ))

    slots.inject('settings.section', () => slots.register(
      { name: 'settings.section', id: 'appearance', order: 30, label: '外观' },
      (props) => React.createElement(AppearancePage, props),
    ))

    // ===== 每条消息 token 价格 + 未命中率（显示在分支按钮右边） =====
    function wfrIsPeak(timeMs) {
      if (!timeMs) return false
      const bj = new Date(timeMs + 8 * 3600 * 1000) // 北京时间
      const h = bj.getUTCHours()
      return (h >= 9 && h < 12) || (h >= 14 && h < 18)
    }


    const WFR_PIAI_PRICES = {"amazon-bedrock":{"amazon.nova-2-lite-v1:0":{"in":0.33,"out":2.75,"read":0,"write":0,"name":"Nova 2 Lite"},"amazon.nova-lite-v1:0":{"in":0.06,"out":0.24,"read":0.015,"write":0,"name":"Nova Lite"},"amazon.nova-micro-v1:0":{"in":0.035,"out":0.14,"read":0.00875,"write":0,"name":"Nova Micro"},"amazon.nova-pro-v1:0":{"in":0.8,"out":3.2,"read":0.2,"write":0,"name":"Nova Pro"},"anthropic.claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5"},"anthropic.claude-haiku-4-5-20251001-v1:0":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5"},"anthropic.claude-opus-4-1-20250805-v1:0":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1"},"anthropic.claude-opus-4-5-20251101-v1:0":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5"},"anthropic.claude-opus-4-6-v1":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6"},"anthropic.claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7"},"anthropic.claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8"},"anthropic.claude-sonnet-4-5-20250929-v1:0":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5"},"anthropic.claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6"},"anthropic.claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5"},"au.anthropic.claude-haiku-4-5-20251001-v1:0":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (AU)"},"au.anthropic.claude-opus-4-6-v1":{"in":16.5,"out":82.5,"read":1.65,"write":20.625,"name":"AU Anthropic Claude Opus 4.6"},"au.anthropic.claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8 (AU)"},"au.anthropic.claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5 (AU)"},"au.anthropic.claude-sonnet-4-5-20250929-v1:0":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (AU)"},"au.anthropic.claude-sonnet-4-6":{"in":3.3,"out":16.5,"read":0.33,"write":4.125,"name":"AU Anthropic Claude Sonnet 4.6"},"au.anthropic.claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5 (AU)"},"deepseek.r1-v1:0":{"in":1.35,"out":5.4,"read":0,"write":0,"name":"DeepSeek-R1"},"deepseek.v3-v1:0":{"in":0.58,"out":1.68,"read":0,"write":0,"name":"DeepSeek-V3.1"},"deepseek.v3.2":{"in":0.62,"out":1.85,"read":0,"write":0,"name":"DeepSeek-V3.2"},"eu.anthropic.claude-fable-5":{"in":11,"out":55,"read":1.1,"write":13.75,"name":"Claude Fable 5 (EU)"},"eu.anthropic.claude-haiku-4-5-20251001-v1:0":{"in":1.1,"out":5.5,"read":0.11,"write":1.375,"name":"Claude Haiku 4.5 (EU)"},"eu.anthropic.claude-opus-4-5-20251101-v1:0":{"in":5.5,"out":27.5,"read":0.55,"write":6.875,"name":"Claude Opus 4.5 (EU)"},"eu.anthropic.claude-opus-4-6-v1":{"in":5.5,"out":27.5,"read":0.55,"write":6.875,"name":"Claude Opus 4.6 (EU)"},"eu.anthropic.claude-opus-4-7":{"in":5.5,"out":27.5,"read":0.55,"write":6.875,"name":"Claude Opus 4.7 (EU)"},"eu.anthropic.claude-opus-4-8":{"in":5.5,"out":27.5,"read":0.55,"write":6.875,"name":"Claude Opus 4.8 (EU)"},"eu.anthropic.claude-opus-5":{"in":5.5,"out":27.5,"read":0.55,"write":6.875,"name":"Claude Opus 5 (EU)"},"eu.anthropic.claude-sonnet-4-5-20250929-v1:0":{"in":3.3,"out":16.5,"read":0.33,"write":4.125,"name":"Claude Sonnet 4.5 (EU)"},"eu.anthropic.claude-sonnet-4-6":{"in":3.3,"out":16.5,"read":0.33,"write":4.125,"name":"Claude Sonnet 4.6 (EU)"},"eu.anthropic.claude-sonnet-5":{"in":2.2,"out":11,"read":0.22,"write":2.75,"name":"Claude Sonnet 5 (EU)"},"global.anthropic.claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5 (Global)"},"global.anthropic.claude-haiku-4-5-20251001-v1:0":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (Global)"},"global.anthropic.claude-opus-4-5-20251101-v1:0":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5 (Global)"},"global.anthropic.claude-opus-4-6-v1":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6 (Global)"},"global.anthropic.claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7 (Global)"},"global.anthropic.claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8 (Global)"},"global.anthropic.claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5 (Global)"},"global.anthropic.claude-sonnet-4-5-20250929-v1:0":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (Global)"},"global.anthropic.claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6 (Global)"},"global.anthropic.claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5 (Global)"},"google.gemma-3-27b-it":{"in":0.12,"out":0.2,"read":0,"write":0,"name":"Google Gemma 3 27B Instruct"},"google.gemma-3-4b-it":{"in":0.04,"out":0.08,"read":0,"write":0,"name":"Gemma 3 4B IT"},"jp.anthropic.claude-haiku-4-5-20251001-v1:0":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (JP)"},"jp.anthropic.claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7 (JP)"},"jp.anthropic.claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8 (JP)"},"jp.anthropic.claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5 (JP)"},"jp.anthropic.claude-sonnet-4-5-20250929-v1:0":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (JP)"},"jp.anthropic.claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6 (JP)"},"jp.anthropic.claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5 (JP)"},"meta.llama3-1-70b-instruct-v1:0":{"in":0.72,"out":0.72,"read":0,"write":0,"name":"Llama 3.1 70B Instruct"},"meta.llama3-1-8b-instruct-v1:0":{"in":0.22,"out":0.22,"read":0,"write":0,"name":"Llama 3.1 8B Instruct"},"meta.llama3-3-70b-instruct-v1:0":{"in":0.72,"out":0.72,"read":0,"write":0,"name":"Llama 3.3 70B Instruct"},"meta.llama4-maverick-17b-instruct-v1:0":{"in":0.24,"out":0.97,"read":0,"write":0,"name":"Llama 4 Maverick 17B Instruct"},"meta.llama4-scout-17b-instruct-v1:0":{"in":0.17,"out":0.66,"read":0,"write":0,"name":"Llama 4 Scout 17B Instruct"},"minimax.minimax-m2":{"in":0.3,"out":1.2,"read":0,"write":0,"name":"MiniMax M2"},"minimax.minimax-m2.1":{"in":0.3,"out":1.2,"read":0,"write":0,"name":"MiniMax M2.1"},"minimax.minimax-m2.5":{"in":0.3,"out":1.2,"read":0,"write":0,"name":"MiniMax M2.5"},"mistral.devstral-2-123b":{"in":0.4,"out":2,"read":0,"write":0,"name":"Devstral 2 123B"},"mistral.magistral-small-2509":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"Magistral Small 1.2"},"mistral.ministral-3-14b-instruct":{"in":0.2,"out":0.2,"read":0,"write":0,"name":"Ministral 14B 3.0"},"mistral.ministral-3-3b-instruct":{"in":0.1,"out":0.1,"read":0,"write":0,"name":"Ministral 3 3B"},"mistral.ministral-3-8b-instruct":{"in":0.15,"out":0.15,"read":0,"write":0,"name":"Ministral 3 8B"},"mistral.mistral-large-3-675b-instruct":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"Mistral Large 3"},"mistral.pixtral-large-2502-v1:0":{"in":2,"out":6,"read":0,"write":0,"name":"Pixtral Large (25.02)"},"mistral.voxtral-mini-3b-2507":{"in":0.04,"out":0.04,"read":0,"write":0,"name":"Voxtral Mini 3B 2507"},"mistral.voxtral-small-24b-2507":{"in":0.15,"out":0.35,"read":0,"write":0,"name":"Voxtral Small 24B 2507"},"moonshot.kimi-k2-thinking":{"in":0.6,"out":2.5,"read":0,"write":0,"name":"Kimi K2 Thinking"},"moonshotai.kimi-k2.5":{"in":0.6,"out":3,"read":0,"write":0,"name":"Kimi K2.5"},"nvidia.nemotron-nano-12b-v2":{"in":0.2,"out":0.6,"read":0,"write":0,"name":"NVIDIA Nemotron Nano 12B v2 VL BF16"},"nvidia.nemotron-nano-3-30b":{"in":0.06,"out":0.24,"read":0,"write":0,"name":"NVIDIA Nemotron Nano 3 30B"},"nvidia.nemotron-nano-9b-v2":{"in":0.06,"out":0.23,"read":0,"write":0,"name":"NVIDIA Nemotron Nano 9B v2"},"nvidia.nemotron-super-3-120b":{"in":0.15,"out":0.65,"read":0,"write":0,"name":"NVIDIA Nemotron 3 Super 120B A12B"},"openai.gpt-5.4":{"in":2.75,"out":16.5,"read":0.275,"write":0,"name":"GPT-5.4"},"openai.gpt-5.5":{"in":5.5,"out":33,"read":0.55,"write":0,"name":"GPT-5.5"},"openai.gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT-5.6 Luna"},"openai.gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT-5.6 Sol"},"openai.gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT-5.6 Terra"},"openai.gpt-oss-120b":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"gpt-oss-120b"},"openai.gpt-oss-120b-1:0":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"gpt-oss-120b"},"openai.gpt-oss-20b":{"in":0.07,"out":0.3,"read":0,"write":0,"name":"gpt-oss-20b"},"openai.gpt-oss-20b-1:0":{"in":0.07,"out":0.3,"read":0,"write":0,"name":"gpt-oss-20b"},"openai.gpt-oss-safeguard-120b":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"GPT OSS Safeguard 120B"},"openai.gpt-oss-safeguard-20b":{"in":0.07,"out":0.2,"read":0,"write":0,"name":"GPT OSS Safeguard 20B"},"qwen.qwen3-235b-a22b-2507-v1:0":{"in":0.22,"out":0.88,"read":0,"write":0,"name":"Qwen3 235B A22B 2507"},"qwen.qwen3-32b-v1:0":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"Qwen3 32B (dense)"},"qwen.qwen3-coder-30b-a3b-v1:0":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"Qwen3 Coder 30B A3B Instruct"},"qwen.qwen3-coder-480b-a35b-v1:0":{"in":0.22,"out":1.8,"read":0,"write":0,"name":"Qwen3 Coder 480B A35B Instruct"},"qwen.qwen3-coder-next":{"in":0.22,"out":1.8,"read":0,"write":0,"name":"Qwen3 Coder Next"},"qwen.qwen3-next-80b-a3b":{"in":0.14,"out":1.4,"read":0,"write":0,"name":"Qwen/Qwen3-Next-80B-A3B-Instruct"},"qwen.qwen3-vl-235b-a22b":{"in":0.3,"out":1.5,"read":0,"write":0,"name":"Qwen/Qwen3-VL-235B-A22B-Instruct"},"us.anthropic.claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5 (US)"},"us.anthropic.claude-haiku-4-5-20251001-v1:0":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (US)"},"us.anthropic.claude-opus-4-1-20250805-v1:0":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1 (US)"},"us.anthropic.claude-opus-4-5-20251101-v1:0":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5 (US)"},"us.anthropic.claude-opus-4-6-v1":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6 (US)"},"us.anthropic.claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7 (US)"},"us.anthropic.claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8 (US)"},"us.anthropic.claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5 (US)"},"us.anthropic.claude-sonnet-4-5-20250929-v1:0":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (US)"},"us.anthropic.claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6 (US)"},"us.anthropic.claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5 (US)"},"us.deepseek.r1-v1:0":{"in":1.35,"out":5.4,"read":0,"write":0,"name":"DeepSeek-R1 (US)"},"us.meta.llama4-maverick-17b-instruct-v1:0":{"in":0.24,"out":0.97,"read":0,"write":0,"name":"Llama 4 Maverick 17B Instruct (US)"},"us.meta.llama4-scout-17b-instruct-v1:0":{"in":0.17,"out":0.66,"read":0,"write":0,"name":"Llama 4 Scout 17B Instruct (US)"},"writer.palmyra-x4-v1:0":{"in":2.5,"out":10,"read":0,"write":0,"name":"Palmyra X4"},"writer.palmyra-x5-v1:0":{"in":0.6,"out":6,"read":0,"write":0,"name":"Palmyra X5"},"xai.grok-4.3":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.3"},"zai.glm-4.7":{"in":0.6,"out":2.2,"read":0,"write":0,"name":"GLM-4.7"},"zai.glm-4.7-flash":{"in":0.07,"out":0.4,"read":0,"write":0,"name":"GLM-4.7-Flash"},"zai.glm-5":{"in":1,"out":3.2,"read":0,"write":0,"name":"GLM-5"}},"ant-ling":{"Ling-2.6-1T":{"in":0.06,"out":0.25,"read":0,"write":0,"name":"Ling 2.6 1T"},"Ling-2.6-flash":{"in":0.01,"out":0.02,"read":0,"write":0,"name":"Ling 2.6 Flash"},"Ring-2.6-1T":{"in":0.06,"out":0.25,"read":0,"write":0,"name":"Ring 2.6 1T"}},"anthropic":{"claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5"},"claude-haiku-4-5":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (latest)"},"claude-haiku-4-5-20251001":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5"},"claude-opus-4-1":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1 (latest)"},"claude-opus-4-1-20250805":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1"},"claude-opus-4-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5 (latest)"},"claude-opus-4-5-20251101":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5"},"claude-opus-4-6":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6"},"claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7"},"claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8"},"claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5"},"claude-sonnet-4-5":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (latest)"},"claude-sonnet-4-5-20250929":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5"},"claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6"},"claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5"}},"azure-openai-responses":{"gpt-4":{"in":30,"out":60,"read":0,"write":0,"name":"GPT-4"},"gpt-4-turbo":{"in":10,"out":30,"read":0,"write":0,"name":"GPT-4 Turbo"},"gpt-4.1":{"in":2,"out":8,"read":0.5,"write":0,"name":"GPT-4.1"},"gpt-4.1-mini":{"in":0.4,"out":1.6,"read":0.1,"write":0,"name":"GPT-4.1 mini"},"gpt-4.1-nano":{"in":0.1,"out":0.4,"read":0.025,"write":0,"name":"GPT-4.1 nano"},"gpt-4o":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o"},"gpt-4o-2024-05-13":{"in":5,"out":15,"read":0,"write":0,"name":"GPT-4o (2024-05-13)"},"gpt-4o-2024-08-06":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o (2024-08-06)"},"gpt-4o-2024-11-20":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o (2024-11-20)"},"gpt-4o-mini":{"in":0.15,"out":0.6,"read":0.075,"write":0,"name":"GPT-4o mini"},"gpt-5":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5"},"gpt-5-chat-latest":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5 Chat Latest"},"gpt-5-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"GPT-5 Mini"},"gpt-5-nano":{"in":0.05,"out":0.4,"read":0.005,"write":0,"name":"GPT-5 Nano"},"gpt-5-pro":{"in":15,"out":120,"read":0,"write":0,"name":"GPT-5 Pro"},"gpt-5.1":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5.1"},"gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2"},"gpt-5.2-chat-latest":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2 Chat"},"gpt-5.2-pro":{"in":21,"out":168,"read":0,"write":0,"name":"GPT-5.2 Pro"},"gpt-5.3-chat-latest":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Chat (latest)"},"gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex"},"gpt-5.3-codex-spark":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex Spark"},"gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.4"},"gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"GPT-5.4 mini"},"gpt-5.4-nano":{"in":0.2,"out":1.25,"read":0.02,"write":0,"name":"GPT-5.4 nano"},"gpt-5.4-pro":{"in":30,"out":180,"read":0,"write":0,"name":"GPT-5.4 Pro"},"gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.5"},"gpt-5.5-pro":{"in":30,"out":180,"read":0,"write":0,"name":"GPT-5.5 Pro"},"gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT-5.6 Luna"},"gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT-5.6 Sol"},"gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT-5.6 Terra"},"gpt-realtime-2.1":{"in":4,"out":24,"read":0.4,"write":0,"name":"GPT-Realtime-2.1"},"o1":{"in":15,"out":60,"read":7.5,"write":0,"name":"o1"},"o1-pro":{"in":150,"out":600,"read":0,"write":0,"name":"o1-pro"},"o3":{"in":2,"out":8,"read":0.5,"write":0,"name":"o3"},"o3-mini":{"in":1.1,"out":4.4,"read":0.55,"write":0,"name":"o3-mini"},"o3-pro":{"in":20,"out":80,"read":0,"write":0,"name":"o3-pro"},"o4-mini":{"in":1.1,"out":4.4,"read":0.275,"write":0,"name":"o4-mini"}},"cerebras":{"gemma-4-31b":{"in":0.99,"out":1.49,"read":0,"write":0,"name":"Gemma 4 31B IT"},"gpt-oss-120b":{"in":0.35,"out":0.75,"read":0,"write":0,"name":"GPT OSS 120B"},"zai-glm-4.7":{"in":2.25,"out":2.75,"read":2.25,"write":0,"name":"Z.AI GLM-4.7"}},"cloudflare-ai-gateway":{"claude-3-5-haiku":{"in":0.8,"out":4,"read":0.08,"write":1,"name":"Claude Haiku 3.5 (latest)"},"claude-3-haiku":{"in":0.25,"out":1.25,"read":0.03,"write":0.3,"name":"Claude Haiku 3"},"claude-3-opus":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 3"},"claude-3-sonnet":{"in":3,"out":15,"read":0.3,"write":0.3,"name":"Claude Sonnet 3"},"claude-3.5-haiku":{"in":0.8,"out":4,"read":0.08,"write":1,"name":"Claude Haiku 3.5 (latest)"},"claude-3.5-sonnet":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 3.5 v2"},"claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5"},"claude-haiku-4-5":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (latest)"},"claude-opus-4":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4 (latest)"},"claude-opus-4-1":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1 (latest)"},"claude-opus-4-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5 (latest)"},"claude-opus-4-6":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6 (latest)"},"claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7"},"claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8"},"claude-sonnet-4":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4 (latest)"},"claude-sonnet-4-5":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (latest)"},"claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6"},"claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5"},"workers-ai/@cf/moonshotai/kimi-k2.5":{"in":0.6,"out":3,"read":0.1,"write":0,"name":"Kimi K2.5"},"workers-ai/@cf/moonshotai/kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"workers-ai/@cf/nvidia/nemotron-3-120b-a12b":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"Nemotron 3 Super 120B"},"workers-ai/@cf/zai-org/glm-4.7-flash":{"in":0.06,"out":0.4,"read":0,"write":0,"name":"GLM-4.7-Flash"},"workers-ai/@cf/zai-org/glm-5.2":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"Glm 5.2"},"gpt-4":{"in":30,"out":60,"read":0,"write":0,"name":"GPT-4"},"gpt-4-turbo":{"in":10,"out":30,"read":0,"write":0,"name":"GPT-4 Turbo"},"gpt-4o":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o"},"gpt-4o-mini":{"in":0.15,"out":0.6,"read":0.08,"write":0,"name":"GPT-4o mini"},"gpt-5.1":{"in":1.25,"out":10,"read":0.13,"write":0,"name":"GPT-5.1"},"gpt-5.1-codex":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5.1 Codex"},"gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2"},"gpt-5.2-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2 Codex"},"gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex"},"gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.4"},"gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.5"},"gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":0,"name":"GPT-5.6 Luna"},"gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.6 Sol"},"gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.6 Terra"},"o1":{"in":15,"out":60,"read":7.5,"write":0,"name":"o1"},"o3":{"in":2,"out":8,"read":0.5,"write":0,"name":"o3"},"o3-mini":{"in":1.1,"out":4.4,"read":0.55,"write":0,"name":"o3-mini"},"o3-pro":{"in":20,"out":80,"read":0,"write":0,"name":"o3-pro"},"o4-mini":{"in":1.1,"out":4.4,"read":0.28,"write":0,"name":"o4-mini"}},"cloudflare-workers-ai":{"@cf/google/gemma-4-26b-a4b-it":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"Gemma 4 26B A4B IT"},"@cf/ibm-granite/granite-4.0-h-micro":{"in":0.017,"out":0.112,"read":0,"write":0,"name":"Granite 4.0 H Micro"},"@cf/meta/llama-3.3-70b-instruct-fp8-fast":{"in":0.293,"out":2.253,"read":0,"write":0,"name":"Llama 3.3 70B Instruct fp8 Fast"},"@cf/meta/llama-4-scout-17b-16e-instruct":{"in":0.27,"out":0.85,"read":0,"write":0,"name":"Llama 4 Scout 17B 16E Instruct"},"@cf/mistralai/mistral-small-3.1-24b-instruct":{"in":0.351,"out":0.555,"read":0,"write":0,"name":"Mistral Small 3.1 24B Instruct"},"@cf/moonshotai/kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"@cf/moonshotai/kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"@cf/nvidia/nemotron-3-120b-a12b":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"Nemotron 3 Super 120B"},"@cf/openai/gpt-oss-120b":{"in":0.35,"out":0.75,"read":0,"write":0,"name":"GPT OSS 120B"},"@cf/openai/gpt-oss-20b":{"in":0.2,"out":0.3,"read":0,"write":0,"name":"GPT OSS 20B"},"@cf/qwen/qwen3-30b-a3b-fp8":{"in":0.0509,"out":0.335,"read":0,"write":0,"name":"Qwen3 30B A3b fp8"},"@cf/zai-org/glm-4.7-flash":{"in":0.0605,"out":0.4,"read":0,"write":0,"name":"GLM-4.7-Flash"},"@cf/zai-org/glm-5.2":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"Glm 5.2"}},"deepseek":{"deepseek-v4-flash":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"DeepSeek V4 Flash"},"deepseek-v4-pro":{"in":0.435,"out":0.87,"read":0.003625,"write":0,"name":"DeepSeek V4 Pro"}},"fireworks":{"accounts/fireworks/models/deepseek-v4-flash":{"in":0.14,"out":0.28,"read":0.028,"write":0,"name":"DeepSeek V4 Flash"},"accounts/fireworks/models/deepseek-v4-pro":{"in":1.74,"out":3.48,"read":0.145,"write":0,"name":"DeepSeek V4 Pro"},"accounts/fireworks/models/glm-5p1":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM 5.1"},"accounts/fireworks/models/gpt-oss-120b":{"in":0.15,"out":0.6,"read":0.015,"write":0,"name":"GPT OSS 120B"},"accounts/fireworks/models/gpt-oss-20b":{"in":0.07,"out":0.3,"read":0.035,"write":0,"name":"GPT OSS 20B"},"accounts/fireworks/models/kimi-k2p6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"accounts/fireworks/models/kimi-k2p7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"accounts/fireworks/models/minimax-m2p7":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M2.7"},"accounts/fireworks/models/minimax-m3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M3"},"accounts/fireworks/models/qwen3p7-plus":{"in":0.4,"out":1.6,"read":0.08,"write":0,"name":"Qwen 3.7 Plus"},"accounts/fireworks/routers/glm-5p1-fast":{"in":2.8,"out":8.8,"read":0.52,"write":0,"name":"GLM 5.1 Fast"},"accounts/fireworks/routers/kimi-k2p6-fast":{"in":2,"out":8,"read":0.3,"write":0,"name":"Kimi K2.6 Fast"},"accounts/fireworks/routers/kimi-k2p6-turbo":{"in":2,"out":8,"read":0.3,"write":0,"name":"Kimi K2.6 Turbo"},"accounts/fireworks/routers/kimi-k2p7-code-fast":{"in":1.9,"out":8,"read":0.38,"write":0,"name":"Kimi K2.7 Code Fast"},"accounts/fireworks/models/glm-5p2":{"in":1.4,"out":4.4,"read":0.14,"write":0,"name":"GLM 5.2"},"accounts/fireworks/routers/glm-5p2-fast":{"in":2.1,"out":6.6,"read":0.21,"write":0,"name":"GLM 5.2 Fast"}},"github-copilot":{"claude-haiku-4.5":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5 (latest)"},"claude-opus-4.5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5 (latest)"},"claude-opus-4.6":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6"},"claude-opus-4.7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7"},"claude-opus-4.8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8"},"claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5"},"claude-sonnet-4":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4 (latest)"},"claude-sonnet-4.5":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5 (latest)"},"claude-sonnet-4.6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6"},"claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5"},"claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5"},"gemini-2.5-pro":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"Gemini 2.5 Pro"},"gemini-3-flash-preview":{"in":0.5,"out":3,"read":0.05,"write":0,"name":"Gemini 3 Flash Preview"},"gemini-3.1-pro-preview":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview"},"gemini-3.5-flash":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini 3.5 Flash"},"gpt-4.1":{"in":2,"out":8,"read":0.5,"write":0,"name":"GPT-4.1"},"kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"gpt-5-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"GPT-5 Mini"},"gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2"},"gpt-5.2-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2 Codex"},"gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex"},"gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.4"},"gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"GPT-5.4 mini"},"gpt-5.4-nano":{"in":0.2,"out":1.25,"read":0.02,"write":0,"name":"GPT-5.4 nano"},"gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.5"},"gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT-5.6 Luna"},"gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT-5.6 Sol"},"gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT-5.6 Terra"},"mai-code-1-flash-picker":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"MAI-Code-1-Flash"}},"google-vertex":{"gemini-2.5-flash":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 2.5 Flash"},"gemini-2.5-flash-lite":{"in":0.1,"out":0.4,"read":0.01,"write":0,"name":"Gemini 2.5 Flash-Lite"},"gemini-2.5-pro":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"Gemini 2.5 Pro"},"gemini-3-flash-preview":{"in":0.5,"out":3,"read":0.05,"write":0,"name":"Gemini 3 Flash Preview"},"gemini-3.1-flash-lite":{"in":0.25,"out":1.5,"read":0.025,"write":0,"name":"Gemini 3.1 Flash Lite"},"gemini-3.1-pro-preview":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview"},"gemini-3.1-pro-preview-customtools":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview Custom Tools"},"gemini-3.5-flash":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini 3.5 Flash"},"gemini-3.5-flash-lite":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 3.5 Flash Lite"},"gemini-3.6-flash":{"in":1.5,"out":7.5,"read":0.15,"write":0,"name":"Gemini 3.6 Flash"},"gemini-flash-latest":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini Flash Latest"},"gemini-flash-lite-latest":{"in":0.25,"out":1.5,"read":0.025,"write":0,"name":"Gemini Flash-Lite Latest"}},"google":{"deep-research-max-preview-04-2026":{"in":2,"out":12,"read":0.2,"write":0,"name":"Deep Research Max Preview (Apr-21-2026)"},"deep-research-preview-04-2026":{"in":2,"out":12,"read":0.2,"write":0,"name":"Deep Research Preview (Apr-21-2026)"},"gemini-2.0-flash":{"in":0.1,"out":0.4,"read":0.025,"write":0,"name":"Gemini 2.0 Flash"},"gemini-2.0-flash-lite":{"in":0.075,"out":0.3,"read":0,"write":0,"name":"Gemini 2.0 Flash-Lite"},"gemini-2.5-computer-use-preview-10-2025":{"in":1.25,"out":10,"read":0,"write":0,"name":"Gemini 2.5 Computer Use Preview 10-2025"},"gemini-2.5-flash":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 2.5 Flash"},"gemini-2.5-flash-lite":{"in":0.1,"out":0.4,"read":0.01,"write":0,"name":"Gemini 2.5 Flash-Lite"},"gemini-2.5-pro":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"Gemini 2.5 Pro"},"gemini-3-flash-preview":{"in":0.5,"out":3,"read":0.05,"write":0,"name":"Gemini 3 Flash Preview"},"gemini-3-pro-preview":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3 Pro Preview"},"gemini-3.1-flash-lite":{"in":0.25,"out":1.5,"read":0.025,"write":0,"name":"Gemini 3.1 Flash Lite"},"gemini-3.1-flash-lite-image":{"in":0.25,"out":30,"read":0,"write":0,"name":"Nano Banana 2 Lite"},"gemini-3.1-flash-lite-preview":{"in":0.25,"out":1.5,"read":0.025,"write":0,"name":"Gemini 3.1 Flash Lite Preview"},"gemini-3.1-flash-live-preview":{"in":0.75,"out":4.5,"read":0,"write":0,"name":"Gemini 3.1 Flash Live Preview"},"gemini-3.1-pro-preview":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview"},"gemini-3.1-pro-preview-customtools":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview Custom Tools"},"gemini-3.5-flash":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini 3.5 Flash"},"gemini-3.5-flash-lite":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 3.5 Flash Lite"},"gemini-3.6-flash":{"in":1.5,"out":7.5,"read":0.15,"write":0,"name":"Gemini 3.6 Flash"},"gemini-flash-latest":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini Flash Latest"},"gemini-flash-lite-latest":{"in":0.25,"out":1.5,"read":0.025,"write":0,"name":"Gemini Flash-Lite Latest"},"gemini-robotics-er-1.6-preview":{"in":1,"out":5,"read":0,"write":0,"name":"Gemini Robotics-ER 1.6 Preview"},"gemma-4-26b-a4b-it":{"in":0,"out":0,"read":0,"write":0,"name":"Gemma 4 26B A4B IT"},"gemma-4-31b-it":{"in":0,"out":0,"read":0,"write":0,"name":"Gemma 4 31B IT"}},"groq":{"llama-3.1-8b-instant":{"in":0.05,"out":0.08,"read":0,"write":0,"name":"Llama 3.1 8B"},"llama-3.3-70b-versatile":{"in":0.59,"out":0.79,"read":0,"write":0,"name":"Llama 3.3 70B"},"meta-llama/llama-4-scout-17b-16e-instruct":{"in":0.11,"out":0.34,"read":0,"write":0,"name":"Llama 4 Scout 17B 16E"},"openai/gpt-oss-120b":{"in":0.15,"out":0.6,"read":0.075,"write":0,"name":"GPT OSS 120B"},"openai/gpt-oss-20b":{"in":0.075,"out":0.3,"read":0.0375,"write":0,"name":"GPT OSS 20B"},"openai/gpt-oss-safeguard-20b":{"in":0.075,"out":0.3,"read":0,"write":0,"name":"Safety GPT OSS 20B"},"qwen/qwen3-32b":{"in":0.29,"out":0.59,"read":0,"write":0,"name":"Qwen3-32B"}},"huggingface":{"MiniMaxAI/MiniMax-M2":{"in":0.3,"out":1.2,"read":0,"write":0,"name":"MiniMax-M2"},"MiniMaxAI/MiniMax-M2.1":{"in":0.3,"out":1.2,"read":0,"write":0,"name":"MiniMax-M2.1"},"MiniMaxAI/MiniMax-M2.5":{"in":0.3,"out":1.2,"read":0.03,"write":0,"name":"MiniMax-M2.5"},"MiniMaxAI/MiniMax-M2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M2.7"},"MiniMaxAI/MiniMax-M3":{"in":0.3,"out":1.2,"read":0,"write":0,"name":"MiniMax-M3"},"Qwen/Qwen3-235B-A22B":{"in":0.2,"out":0.8,"read":0,"write":0,"name":"Qwen3 235B-A22B"},"Qwen/Qwen3-235B-A22B-Thinking-2507":{"in":0.3,"out":3,"read":0,"write":0,"name":"Qwen3-235B-A22B-Thinking-2507"},"Qwen/Qwen3-32B":{"in":0.29,"out":0.59,"read":0,"write":0,"name":"Qwen3 32B"},"Qwen/Qwen3-Coder-30B-A3B-Instruct":{"in":0.07,"out":0.26,"read":0,"write":0,"name":"Qwen3-Coder 30B-A3B Instruct"},"Qwen/Qwen3-Coder-480B-A35B-Instruct":{"in":2,"out":2,"read":0,"write":0,"name":"Qwen3-Coder-480B-A35B-Instruct"},"Qwen/Qwen3-Coder-Next":{"in":0.2,"out":1.5,"read":0,"write":0,"name":"Qwen3-Coder-Next"},"Qwen/Qwen3-Next-80B-A3B-Instruct":{"in":0.25,"out":1,"read":0,"write":0,"name":"Qwen3-Next-80B-A3B-Instruct"},"Qwen/Qwen3-Next-80B-A3B-Thinking":{"in":0.3,"out":2,"read":0,"write":0,"name":"Qwen3-Next-80B-A3B-Thinking"},"Qwen/Qwen3.5-122B-A10B":{"in":0.4,"out":3.2,"read":0,"write":0,"name":"Qwen3.5 122B-A10B"},"Qwen/Qwen3.5-27B":{"in":0.3,"out":2.4,"read":0,"write":0,"name":"Qwen3.5 27B"},"Qwen/Qwen3.5-35B-A3B":{"in":0.25,"out":2,"read":0,"write":0,"name":"Qwen3.5 35B-A3B"},"Qwen/Qwen3.5-397B-A17B":{"in":0.6,"out":3.6,"read":0,"write":0,"name":"Qwen3.5-397B-A17B"},"Qwen/Qwen3.5-9B":{"in":0.17,"out":0.25,"read":0,"write":0,"name":"Qwen3.5 9B"},"Qwen/Qwen3.6-27B":{"in":0.47,"out":3.19,"read":0,"write":0,"name":"Qwen3.6 27B"},"Qwen/Qwen3.6-35B-A3B":{"in":0.15,"out":0.95,"read":0,"write":0,"name":"Qwen3.6 35B-A3B"},"XiaomiMiMo/MiMo-V2-Flash":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"MiMo-V2-Flash"},"XiaomiMiMo/MiMo-V2.5":{"in":0.4,"out":2,"read":0,"write":0,"name":"MiMo-V2.5"},"XiaomiMiMo/MiMo-V2.5-Pro":{"in":1,"out":3,"read":0,"write":0,"name":"MiMo-V2.5-Pro"},"deepseek-ai/DeepSeek-R1":{"in":0.7,"out":2.5,"read":0,"write":0,"name":"DeepSeek-R1"},"deepseek-ai/DeepSeek-R1-0528":{"in":3,"out":5,"read":0,"write":0,"name":"DeepSeek-R1-0528"},"deepseek-ai/DeepSeek-V3.2":{"in":0.28,"out":0.4,"read":0,"write":0,"name":"DeepSeek-V3.2"},"deepseek-ai/DeepSeek-V4-Flash":{"in":0.14,"out":0.28,"read":0,"write":0,"name":"DeepSeek V4 Flash"},"deepseek-ai/DeepSeek-V4-Pro":{"in":0.435,"out":0.87,"read":0.003625,"write":0,"name":"DeepSeek V4 Pro"},"google/gemma-4-26B-A4B-it":{"in":0.13,"out":0.4,"read":0,"write":0,"name":"Gemma 4 26B A4B IT"},"google/gemma-4-31B-it":{"in":0.14,"out":0.4,"read":0,"write":0,"name":"Gemma 4 31B IT"},"meta-llama/Llama-3.3-70B-Instruct":{"in":0.59,"out":0.79,"read":0,"write":0,"name":"Llama-3.3-70B-Instruct"},"moonshotai/Kimi-K2-Instruct":{"in":1,"out":3,"read":0,"write":0,"name":"Kimi-K2-Instruct"},"moonshotai/Kimi-K2-Instruct-0905":{"in":1,"out":3,"read":0,"write":0,"name":"Kimi-K2-Instruct-0905"},"moonshotai/Kimi-K2-Thinking":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi-K2-Thinking"},"moonshotai/Kimi-K2.5":{"in":0.6,"out":3,"read":0.1,"write":0,"name":"Kimi-K2.5"},"moonshotai/Kimi-K2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi-K2.6"},"moonshotai/Kimi-K2.7-Code":{"in":0.95,"out":4,"read":0,"write":0,"name":"Kimi K2.7 Code"},"openai/gpt-oss-120b":{"in":0.25,"out":0.69,"read":0,"write":0,"name":"GPT OSS 120B"},"openai/gpt-oss-20b":{"in":0.1,"out":0.5,"read":0,"write":0,"name":"GPT OSS 20B"},"stepfun-ai/Step-3.5-Flash":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"Step 3.5 Flash"},"stepfun-ai/Step-3.7-Flash":{"in":0.2,"out":1.15,"read":0,"write":0,"name":"Step 3.7 Flash"},"zai-org/GLM-4.5":{"in":0.6,"out":2.2,"read":0,"write":0,"name":"GLM-4.5"},"zai-org/GLM-4.5-Air":{"in":0.13,"out":0.85,"read":0,"write":0,"name":"GLM-4.5-Air"},"zai-org/GLM-4.5V":{"in":0.6,"out":1.8,"read":0,"write":0,"name":"GLM-4.5V"},"zai-org/GLM-4.6":{"in":0.55,"out":2.2,"read":0,"write":0,"name":"GLM-4.6"},"zai-org/GLM-4.7":{"in":0.6,"out":2.2,"read":0.11,"write":0,"name":"GLM-4.7"},"zai-org/GLM-4.7-Flash":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-4.7-Flash"},"zai-org/GLM-5":{"in":1,"out":3.2,"read":0.2,"write":0,"name":"GLM-5"},"zai-org/GLM-5.1":{"in":1,"out":3.2,"read":0.2,"write":0,"name":"GLM-5.1"},"zai-org/GLM-5.2":{"in":1.4,"out":4.4,"read":0,"write":0,"name":"GLM-5.2"}},"kimi-coding":{"k3":{"in":3,"out":15,"read":0.3,"write":0,"name":"Kimi K3"},"k3-256k":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K3-256K"},"kimi-for-coding":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"kimi-for-coding-highspeed":{"in":1.9,"out":8,"read":0.38,"write":0,"name":"Kimi For Coding HighSpeed"}},"minimax-cn":{"MiniMax-M2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0.375,"name":"MiniMax-M2.7"},"MiniMax-M2.7-highspeed":{"in":0.6,"out":2.4,"read":0.06,"write":0.375,"name":"MiniMax-M2.7-highspeed"},"MiniMax-M3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M3"}},"minimax":{"MiniMax-M2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0.375,"name":"MiniMax-M2.7"},"MiniMax-M2.7-highspeed":{"in":0.6,"out":2.4,"read":0.06,"write":0.375,"name":"MiniMax-M2.7-highspeed"},"MiniMax-M3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M3"}},"mistral":{"codestral-latest":{"in":0.3,"out":0.9,"read":0.03,"write":0,"name":"Codestral (latest)"},"devstral-2512":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Devstral 2"},"devstral-latest":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Devstral 2"},"devstral-medium-2507":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Devstral Medium"},"devstral-medium-latest":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Devstral 2 (latest)"},"devstral-small-2505":{"in":0.1,"out":0.3,"read":0.01,"write":0,"name":"Devstral Small 2505"},"devstral-small-2507":{"in":0.1,"out":0.3,"read":0.01,"write":0,"name":"Devstral Small"},"labs-devstral-small-2512":{"in":0,"out":0,"read":0,"write":0,"name":"Devstral Small 2"},"magistral-medium-latest":{"in":2,"out":5,"read":0.2,"write":0,"name":"Magistral Medium (latest)"},"magistral-small":{"in":0.5,"out":1.5,"read":0.05,"write":0,"name":"Magistral Small"},"ministral-3b-latest":{"in":0.04,"out":0.04,"read":0.004,"write":0,"name":"Ministral 3B (latest)"},"ministral-8b-latest":{"in":0.1,"out":0.1,"read":0.01,"write":0,"name":"Ministral 8B (latest)"},"mistral-large-2411":{"in":2,"out":6,"read":0.2,"write":0,"name":"Mistral Large 2.1"},"mistral-large-2512":{"in":0.5,"out":1.5,"read":0.05,"write":0,"name":"Mistral Large 3"},"mistral-large-latest":{"in":0.5,"out":1.5,"read":0.05,"write":0,"name":"Mistral Large (latest)"},"mistral-medium-2505":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Mistral Medium 3"},"mistral-medium-2508":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Mistral Medium 3.1"},"mistral-medium-2604":{"in":1.5,"out":7.5,"read":0.15,"write":0,"name":"Mistral Medium 3.5"},"mistral-medium-3.5":{"in":1.5,"out":7.5,"read":0,"write":0,"name":"Mistral Medium 3.5"},"mistral-medium-latest":{"in":1.5,"out":7.5,"read":0.15,"write":0,"name":"Mistral Medium (latest)"},"mistral-nemo":{"in":0.15,"out":0.15,"read":0.015,"write":0,"name":"Mistral Nemo"},"mistral-small-2506":{"in":0.1,"out":0.3,"read":0.01,"write":0,"name":"Mistral Small 3.2"},"mistral-small-2603":{"in":0.15,"out":0.6,"read":0.015,"write":0,"name":"Mistral Small 4"},"mistral-small-latest":{"in":0.15,"out":0.6,"read":0.015,"write":0,"name":"Mistral Small (latest)"},"open-mistral-7b":{"in":0.25,"out":0.25,"read":0.025,"write":0,"name":"Mistral 7B"},"open-mistral-nemo":{"in":0.15,"out":0.15,"read":0.015,"write":0,"name":"Open Mistral Nemo"},"open-mixtral-8x22b":{"in":2,"out":6,"read":0.2,"write":0,"name":"Mixtral 8x22B"},"open-mixtral-8x7b":{"in":0.7,"out":0.7,"read":0.07,"write":0,"name":"Mixtral 8x7B"},"pixtral-12b":{"in":0.15,"out":0.15,"read":0.015,"write":0,"name":"Pixtral 12B"},"pixtral-large-latest":{"in":2,"out":6,"read":0.2,"write":0,"name":"Pixtral Large (latest)"}},"moonshotai-cn":{"kimi-k2-0711-preview":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi K2 0711"},"kimi-k2-0905-preview":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi K2 0905"},"kimi-k2-thinking":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi K2 Thinking"},"kimi-k2-thinking-turbo":{"in":1.15,"out":8,"read":0.15,"write":0,"name":"Kimi K2 Thinking Turbo"},"kimi-k2-turbo-preview":{"in":2.4,"out":10,"read":0.6,"write":0,"name":"Kimi K2 Turbo"},"kimi-k2.5":{"in":0.6,"out":3,"read":0.1,"write":0,"name":"Kimi K2.5"},"kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"kimi-k2.7-code-highspeed":{"in":1.9,"out":8,"read":0.38,"write":0,"name":"Kimi K2.7 Code HighSpeed"},"kimi-k3":{"in":3,"out":15,"read":0.3,"write":0,"name":"Kimi K3"}},"moonshotai":{"kimi-k2-0711-preview":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi K2 0711"},"kimi-k2-0905-preview":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi K2 0905"},"kimi-k2-thinking":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"Kimi K2 Thinking"},"kimi-k2-thinking-turbo":{"in":1.15,"out":8,"read":0.15,"write":0,"name":"Kimi K2 Thinking Turbo"},"kimi-k2-turbo-preview":{"in":2.4,"out":10,"read":0.6,"write":0,"name":"Kimi K2 Turbo"},"kimi-k2.5":{"in":0.6,"out":3,"read":0.1,"write":0,"name":"Kimi K2.5"},"kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"kimi-k2.7-code-highspeed":{"in":1.9,"out":8,"read":0.38,"write":0,"name":"Kimi K2.7 Code HighSpeed"},"kimi-k3":{"in":3,"out":15,"read":0.3,"write":0,"name":"Kimi K3"}},"nvidia":{"meta/llama-3.1-70b-instruct":{"in":0,"out":0,"read":0,"write":0,"name":"Llama 3.1 70b Instruct"},"meta/llama-3.1-8b-instruct":{"in":0,"out":0,"read":0,"write":0,"name":"Llama 3.1 8B Instruct"},"meta/llama-3.2-11b-vision-instruct":{"in":0,"out":0,"read":0,"write":0,"name":"Llama 3.2 11b Vision Instruct"},"meta/llama-3.2-90b-vision-instruct":{"in":0,"out":0,"read":0,"write":0,"name":"Llama-3.2-90B-Vision-Instruct"},"meta/llama-3.3-70b-instruct":{"in":0,"out":0,"read":0,"write":0,"name":"Llama 3.3 70b Instruct"},"minimaxai/minimax-m3":{"in":0,"out":0,"read":0,"write":0,"name":"MiniMax-M3"},"mistralai/mistral-small-4-119b-2603":{"in":0,"out":0,"read":0,"write":0,"name":"mistral-small-4-119b-2603"},"moonshotai/kimi-k2.6":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.6"},"nvidia/nemotron-3-nano-30b-a3b":{"in":0,"out":0,"read":0,"write":0,"name":"nemotron-3-nano-30b-a3b"},"nvidia/nemotron-3-nano-omni-30b-a3b-reasoning":{"in":0,"out":0,"read":0,"write":0,"name":"Nemotron 3 Nano Omni"},"nvidia/nemotron-3-super-120b-a12b":{"in":0.2,"out":0.8,"read":0,"write":0,"name":"Nemotron 3 Super"},"nvidia/nemotron-3-ultra-550b-a55b":{"in":0.5,"out":2.5,"read":0.15,"write":0,"name":"Nemotron 3 Ultra 550B A55B"},"nvidia/nvidia-nemotron-nano-9b-v2":{"in":0,"out":0,"read":0,"write":0,"name":"nvidia-nemotron-nano-9b-v2"},"openai/gpt-oss-120b":{"in":0,"out":0,"read":0,"write":0,"name":"GPT-OSS-120B"},"openai/gpt-oss-20b":{"in":0,"out":0,"read":0,"write":0,"name":"GPT OSS 20B"},"stepfun-ai/step-3.5-flash":{"in":0,"out":0,"read":0,"write":0,"name":"Step 3.5 Flash"},"stepfun-ai/step-3.7-flash":{"in":0,"out":0,"read":0,"write":0,"name":"Step 3.7 Flash"},"z-ai/glm-5.2":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.2"}},"openai-codex":{"gpt-5.3-codex-spark":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex Spark"},"gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.4"},"gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"GPT-5.4 mini"},"gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.5"},"gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT-5.6 Luna"},"gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT-5.6 Sol"},"gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT-5.6 Terra"}},"openai":{"gpt-4":{"in":30,"out":60,"read":0,"write":0,"name":"GPT-4"},"gpt-4-turbo":{"in":10,"out":30,"read":0,"write":0,"name":"GPT-4 Turbo"},"gpt-4.1":{"in":2,"out":8,"read":0.5,"write":0,"name":"GPT-4.1"},"gpt-4.1-mini":{"in":0.4,"out":1.6,"read":0.1,"write":0,"name":"GPT-4.1 mini"},"gpt-4.1-nano":{"in":0.1,"out":0.4,"read":0.025,"write":0,"name":"GPT-4.1 nano"},"gpt-4o":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o"},"gpt-4o-2024-05-13":{"in":5,"out":15,"read":0,"write":0,"name":"GPT-4o (2024-05-13)"},"gpt-4o-2024-08-06":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o (2024-08-06)"},"gpt-4o-2024-11-20":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o (2024-11-20)"},"gpt-4o-mini":{"in":0.15,"out":0.6,"read":0.075,"write":0,"name":"GPT-4o mini"},"gpt-5":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5"},"gpt-5-chat-latest":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5 Chat Latest"},"gpt-5-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"GPT-5 Mini"},"gpt-5-nano":{"in":0.05,"out":0.4,"read":0.005,"write":0,"name":"GPT-5 Nano"},"gpt-5-pro":{"in":15,"out":120,"read":0,"write":0,"name":"GPT-5 Pro"},"gpt-5.1":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5.1"},"gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2"},"gpt-5.2-chat-latest":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2 Chat"},"gpt-5.2-pro":{"in":21,"out":168,"read":0,"write":0,"name":"GPT-5.2 Pro"},"gpt-5.3-chat-latest":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Chat (latest)"},"gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex"},"gpt-5.3-codex-spark":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex Spark"},"gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.4"},"gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"GPT-5.4 mini"},"gpt-5.4-nano":{"in":0.2,"out":1.25,"read":0.02,"write":0,"name":"GPT-5.4 nano"},"gpt-5.4-pro":{"in":30,"out":180,"read":0,"write":0,"name":"GPT-5.4 Pro"},"gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.5"},"gpt-5.5-pro":{"in":30,"out":180,"read":0,"write":0,"name":"GPT-5.5 Pro"},"gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT-5.6 Luna"},"gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT-5.6 Sol"},"gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT-5.6 Terra"},"gpt-realtime-2.1":{"in":4,"out":24,"read":0.4,"write":0,"name":"GPT-Realtime-2.1"},"o1":{"in":15,"out":60,"read":7.5,"write":0,"name":"o1"},"o1-pro":{"in":150,"out":600,"read":0,"write":0,"name":"o1-pro"},"o3":{"in":2,"out":8,"read":0.5,"write":0,"name":"o3"},"o3-mini":{"in":1.1,"out":4.4,"read":0.55,"write":0,"name":"o3-mini"},"o3-pro":{"in":20,"out":80,"read":0,"write":0,"name":"o3-pro"},"o4-mini":{"in":1.1,"out":4.4,"read":0.275,"write":0,"name":"o4-mini"}},"opencode-go":{"minimax-m3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M3"},"qwen3.7-max":{"in":2.5,"out":7.5,"read":0.5,"write":3.125,"name":"Qwen3.7 Max"},"qwen3.7-plus":{"in":0.4,"out":1.6,"read":0.04,"write":0.5,"name":"Qwen3.7 Plus"},"deepseek-v4-flash":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"DeepSeek V4 Flash"},"deepseek-v4-pro":{"in":0.435,"out":0.87,"read":0.003625,"write":0,"name":"DeepSeek V4 Pro"},"glm-5.1":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM-5.1"},"glm-5.2":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM-5.2"},"hy3":{"in":0.14,"out":0.58,"read":0.035,"write":0,"name":"Hy3"},"kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"kimi-k3":{"in":3,"out":15,"read":0.3,"write":0,"name":"Kimi K3 (2x usage)"},"mimo-v2.5":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"MiMo V2.5"},"mimo-v2.5-pro":{"in":0.435,"out":0.87,"read":0.003625,"write":0,"name":"MiMo V2.5 Pro"},"minimax-m2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M2.7"},"qwen3.6-plus":{"in":0.5,"out":3,"read":0.05,"write":0.625,"name":"Qwen3.6 Plus"},"grok-4.5":{"in":2,"out":6,"read":0.5,"write":0,"name":"Grok 4.5"}},"opencode":{"claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5"},"claude-haiku-4-5":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5"},"claude-opus-4-1":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1"},"claude-opus-4-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5"},"claude-opus-4-6":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6"},"claude-opus-4-7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7"},"claude-opus-4-8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8"},"claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5"},"claude-sonnet-4":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4"},"claude-sonnet-4-5":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5"},"claude-sonnet-4-6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6"},"claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5"},"qwen3.5-plus":{"in":0.2,"out":1.2,"read":0.02,"write":0.25,"name":"Qwen3.5 Plus"},"qwen3.6-plus":{"in":0.5,"out":3,"read":0.05,"write":0.625,"name":"Qwen3.6 Plus"},"gemini-3-flash":{"in":0.5,"out":3,"read":0.05,"write":0,"name":"Gemini 3 Flash"},"gemini-3.1-pro":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview"},"gemini-3.5-flash":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini 3.5 Flash"},"gemini-3.5-flash-lite":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 3.5 Flash Lite"},"gemini-3.6-flash":{"in":1.5,"out":7.5,"read":0.15,"write":0,"name":"Gemini 3.6 Flash"},"big-pickle":{"in":0,"out":0,"read":0,"write":0,"name":"Big Pickle"},"deepseek-v4-flash":{"in":0.14,"out":0.28,"read":0.028,"write":0,"name":"DeepSeek V4 Flash"},"deepseek-v4-flash-free":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V4 Flash Free"},"deepseek-v4-pro":{"in":1.74,"out":3.84,"read":0.145,"write":0,"name":"DeepSeek V4 Pro"},"glm-5":{"in":1,"out":3.2,"read":0.2,"write":0,"name":"GLM-5"},"glm-5.1":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM-5.1"},"glm-5.2":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM-5.2"},"grok-build-0.1":{"in":1,"out":2,"read":0.2,"write":0,"name":"Grok Build 0.1"},"kimi-k2.5":{"in":0.6,"out":3,"read":0.08,"write":0,"name":"Kimi K2.5"},"kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"laguna-s-2.1-free":{"in":0,"out":0,"read":0,"write":0,"name":"Laguna S 2.1 Free"},"ling-3.0-flash-free":{"in":0,"out":0,"read":0,"write":0,"name":"Ling-3.0-flash Free"},"mimo-v2.5-free":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo V2.5 Free"},"minimax-m2.5":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M2.5"},"minimax-m2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M2.7"},"minimax-m3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M3"},"nemotron-3-ultra-free":{"in":0,"out":0,"read":0,"write":0,"name":"Nemotron 3 Ultra Free"},"north-mini-code-free":{"in":0,"out":0,"read":0,"write":0,"name":"North Mini Code Free"},"gpt-5":{"in":1.07,"out":8.5,"read":0.107,"write":0,"name":"GPT-5"},"gpt-5-codex":{"in":1.07,"out":8.5,"read":0.107,"write":0,"name":"GPT-5 Codex"},"gpt-5-nano":{"in":0.05,"out":0.4,"read":0.005,"write":0,"name":"GPT-5 Nano"},"gpt-5.1":{"in":1.07,"out":8.5,"read":0.107,"write":0,"name":"GPT-5.1"},"gpt-5.1-codex":{"in":1.07,"out":8.5,"read":0.107,"write":0,"name":"GPT-5.1 Codex"},"gpt-5.1-codex-max":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5.1 Codex Max"},"gpt-5.1-codex-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"GPT-5.1 Codex Mini"},"gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2"},"gpt-5.2-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.2 Codex"},"gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Codex"},"gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT-5.4"},"gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"GPT-5.4 Mini"},"gpt-5.4-nano":{"in":0.2,"out":1.25,"read":0.02,"write":0,"name":"GPT-5.4 Nano"},"gpt-5.4-pro":{"in":30,"out":180,"read":30,"write":0,"name":"GPT-5.4 Pro"},"gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT-5.5"},"gpt-5.5-pro":{"in":30,"out":180,"read":30,"write":0,"name":"GPT-5.5 Pro"},"gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT-5.6 Luna"},"gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT-5.6 Sol"},"gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT-5.6 Terra"},"grok-4.5":{"in":2,"out":6,"read":0.5,"write":0,"name":"Grok 4.5"}},"openrouter":{"ai21/jamba-large-1.7":{"in":2,"out":8,"read":0,"write":0,"name":"AI21: Jamba Large 1.7"},"aion-labs/aion-2.0":{"in":0.8,"out":1.6,"read":0.2,"write":0,"name":"AionLabs: Aion-2.0"},"aion-labs/aion-3.0":{"in":3,"out":6,"read":0.75,"write":0,"name":"AionLabs: Aion-3.0"},"aion-labs/aion-3.0-mini":{"in":0.7,"out":1.4,"read":0.18,"write":0,"name":"AionLabs: Aion-3.0-Mini"},"amazon/nova-2-lite-v1":{"in":0.3,"out":2.5,"read":0,"write":0,"name":"Amazon: Nova 2 Lite"},"amazon/nova-lite-v1":{"in":0.06,"out":0.24,"read":0,"write":0,"name":"Amazon: Nova Lite 1.0"},"amazon/nova-micro-v1":{"in":0.035,"out":0.14,"read":0,"write":0,"name":"Amazon: Nova Micro 1.0"},"amazon/nova-premier-v1":{"in":2.5,"out":12.5,"read":0.625,"write":0,"name":"Amazon: Nova Premier 1.0"},"amazon/nova-pro-v1":{"in":0.8,"out":3.2,"read":0,"write":0,"name":"Amazon: Nova Pro 1.0"},"anthropic/claude-3-haiku":{"in":0.25,"out":1.25,"read":0.03,"write":0.3,"name":"Anthropic: Claude 3 Haiku"},"anthropic/claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Anthropic: Claude Fable 5"},"anthropic/claude-haiku-4.5":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Anthropic: Claude Haiku 4.5"},"anthropic/claude-opus-4":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Anthropic: Claude Opus 4"},"anthropic/claude-opus-4.1":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Anthropic: Claude Opus 4.1"},"anthropic/claude-opus-4.5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Anthropic: Claude Opus 4.5"},"anthropic/claude-opus-4.6":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Anthropic: Claude Opus 4.6"},"anthropic/claude-opus-4.7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Anthropic: Claude Opus 4.7"},"anthropic/claude-opus-4.7-fast":{"in":30,"out":150,"read":3,"write":37.5,"name":"Anthropic: Claude Opus 4.7 (Fast)"},"anthropic/claude-opus-4.8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Anthropic: Claude Opus 4.8"},"anthropic/claude-opus-4.8-fast":{"in":10,"out":50,"read":1,"write":12.5,"name":"Anthropic: Claude Opus 4.8 (Fast)"},"anthropic/claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5"},"anthropic/claude-opus-5-fast":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Opus 5 (Fast)"},"anthropic/claude-sonnet-4":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Anthropic: Claude Sonnet 4"},"anthropic/claude-sonnet-4.5":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Anthropic: Claude Sonnet 4.5"},"anthropic/claude-sonnet-4.6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Anthropic: Claude Sonnet 4.6"},"anthropic/claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Anthropic: Claude Sonnet 5"},"arcee-ai/trinity-large-thinking":{"in":0.22,"out":0.85,"read":0.06,"write":0,"name":"Arcee AI: Trinity Large Thinking"},"arcee-ai/virtuoso-large":{"in":0.75,"out":1.2,"read":0,"write":0,"name":"Arcee AI: Virtuoso Large"},"auto":{"in":0,"out":0,"read":0,"write":0,"name":"Auto"},"bytedance-seed/seed-1.6":{"in":0.25,"out":2,"read":0,"write":0,"name":"ByteDance Seed: Seed 1.6"},"bytedance-seed/seed-1.6-flash":{"in":0.075,"out":0.3,"read":0,"write":0,"name":"ByteDance Seed: Seed 1.6 Flash"},"bytedance-seed/seed-2.0-lite":{"in":0.25,"out":2,"read":0,"write":0,"name":"ByteDance Seed: Seed-2.0-Lite"},"bytedance-seed/seed-2.0-mini":{"in":0.1,"out":0.4,"read":0,"write":0,"name":"ByteDance Seed: Seed-2.0-Mini"},"cohere/command-r-08-2024":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"Cohere: Command R (08-2024)"},"cohere/command-r-plus-08-2024":{"in":2.5,"out":10,"read":0,"write":0,"name":"Cohere: Command R+ (08-2024)"},"cohere/north-mini-code:free":{"in":0,"out":0,"read":0,"write":0,"name":"Cohere: North Mini Code (free)"},"deepseek/deepseek-chat":{"in":0.2002,"out":0.8001,"read":0,"write":0,"name":"DeepSeek: DeepSeek V3"},"deepseek/deepseek-chat-v3-0324":{"in":0.27,"out":1.12,"read":0.135,"write":0,"name":"DeepSeek: DeepSeek V3 0324"},"deepseek/deepseek-chat-v3.1":{"in":0.25,"out":0.95,"read":0.13,"write":0,"name":"DeepSeek: DeepSeek V3.1"},"deepseek/deepseek-r1":{"in":0.7,"out":2.5,"read":0,"write":0,"name":"DeepSeek: R1"},"deepseek/deepseek-r1-0528":{"in":0.5,"out":2.15,"read":0.35,"write":0,"name":"DeepSeek: R1 0528"},"deepseek/deepseek-v3.1-terminus":{"in":0.27,"out":1,"read":0.135,"write":0,"name":"DeepSeek: DeepSeek V3.1 Terminus"},"deepseek/deepseek-v3.2":{"in":0.269,"out":0.4,"read":0.1345,"write":0,"name":"DeepSeek: DeepSeek V3.2"},"deepseek/deepseek-v3.2-exp":{"in":0.27,"out":0.41,"read":0,"write":0,"name":"DeepSeek: DeepSeek V3.2 Exp"},"deepseek/deepseek-v4-flash":{"in":0.0938,"out":0.1876,"read":0.01876,"write":0,"name":"DeepSeek: DeepSeek V4 Flash"},"deepseek/deepseek-v4-pro":{"in":0.435,"out":0.87,"read":0.003625,"write":0,"name":"DeepSeek: DeepSeek V4 Pro"},"google/gemini-2.5-flash":{"in":0.3,"out":2.5,"read":0.03,"write":0.083333,"name":"Google: Gemini 2.5 Flash"},"google/gemini-2.5-flash-lite":{"in":0.1,"out":0.4,"read":0.01,"write":0.083333,"name":"Google: Gemini 2.5 Flash Lite"},"google/gemini-2.5-pro":{"in":1.25,"out":10,"read":0.125,"write":0.375,"name":"Google: Gemini 2.5 Pro"},"google/gemini-2.5-pro-preview":{"in":1.25,"out":10,"read":0.125,"write":0.375,"name":"Google: Gemini 2.5 Pro Preview 06-05"},"google/gemini-2.5-pro-preview-05-06":{"in":1.25,"out":10,"read":0.125,"write":0.375,"name":"Google: Gemini 2.5 Pro Preview 05-06"},"google/gemini-3-flash-preview":{"in":0.5,"out":3,"read":0.05,"write":0.083333,"name":"Google: Gemini 3 Flash Preview"},"google/gemini-3-pro-image":{"in":2,"out":12,"read":0.2,"write":0.375,"name":"Google: Nano Banana Pro (Gemini 3 Pro Image)"},"google/gemini-3.1-flash-lite":{"in":0.25,"out":1.5,"read":0.025,"write":0.083333,"name":"Google: Gemini 3.1 Flash Lite"},"google/gemini-3.1-flash-lite-preview":{"in":0.25,"out":1.5,"read":0.025,"write":0.083333,"name":"Google: Gemini 3.1 Flash Lite Preview"},"google/gemini-3.1-pro-preview":{"in":2,"out":12,"read":0.2,"write":0.375,"name":"Google: Gemini 3.1 Pro Preview"},"google/gemini-3.1-pro-preview-customtools":{"in":2,"out":12,"read":0.2,"write":0.375,"name":"Google: Gemini 3.1 Pro Preview Custom Tools"},"google/gemini-3.5-flash":{"in":1.5,"out":9,"read":0.15,"write":0.083333,"name":"Google: Gemini 3.5 Flash"},"google/gemini-3.5-flash-lite":{"in":0.3,"out":2.5,"read":0.03,"write":0.083333,"name":"Google: Gemini 3.5 Flash Lite"},"google/gemini-3.6-flash":{"in":1.5,"out":7.5,"read":0.15,"write":0.083333,"name":"Google: Gemini 3.6 Flash"},"google/gemma-3-12b-it":{"in":0.05,"out":0.15,"read":0,"write":0,"name":"Google: Gemma 3 12B"},"google/gemma-3-27b-it":{"in":0.08,"out":0.45,"read":0.04,"write":0,"name":"Google: Gemma 3 27B"},"google/gemma-4-26b-a4b-it":{"in":0.12,"out":0.35,"read":0.05,"write":0,"name":"Google: Gemma 4 26B A4B "},"google/gemma-4-26b-a4b-it:free":{"in":0,"out":0,"read":0,"write":0,"name":"Google: Gemma 4 26B A4B  (free)"},"google/gemma-4-31b-it":{"in":0.14,"out":0.4,"read":0,"write":0,"name":"Google: Gemma 4 31B"},"google/gemma-4-31b-it:free":{"in":0,"out":0,"read":0,"write":0,"name":"Google: Gemma 4 31B (free)"},"ibm-granite/granite-4.1-8b":{"in":0.05,"out":0.1,"read":0.05,"write":0,"name":"IBM: Granite 4.1 8B"},"inception/mercury-2":{"in":0.25,"out":0.75,"read":0.025,"write":0,"name":"Inception: Mercury 2"},"inclusionai/ling-2.6-1t":{"in":0.075,"out":0.625,"read":0.015,"write":0,"name":"inclusionAI: Ling-2.6-1T"},"inclusionai/ling-2.6-flash":{"in":0.01,"out":0.03,"read":0.002,"write":0,"name":"inclusionAI: Ling-2.6-flash"},"inclusionai/ling-3.0-flash:free":{"in":0,"out":0,"read":0,"write":0,"name":"Ling-3.0-flash (free)"},"inclusionai/ring-2.6-1t":{"in":0.075,"out":0.625,"read":0.015,"write":0,"name":"inclusionAI: Ring-2.6-1T"},"kwaipilot/kat-coder-air-v2.5":{"in":0.15,"out":0.6,"read":0.03,"write":0,"name":"Kwaipilot: KAT-Coder-Air V2.5"},"kwaipilot/kat-coder-pro-v2":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"Kwaipilot: KAT-Coder-Pro V2"},"kwaipilot/kat-coder-pro-v2.5":{"in":0.74,"out":2.96,"read":0.15,"write":0,"name":"Kwaipilot: KAT-Coder-Pro V2.5"},"meituan/longcat-2.0":{"in":0.3,"out":1.2,"read":0.006,"write":0,"name":"Meituan: LongCat 2.0"},"meta-llama/llama-3.1-70b-instruct":{"in":0.4,"out":0.4,"read":0,"write":0,"name":"Meta: Llama 3.1 70B Instruct"},"meta-llama/llama-3.1-8b-instruct":{"in":0.05,"out":0.08,"read":0.025,"write":0,"name":"Meta: Llama 3.1 8B Instruct"},"meta-llama/llama-3.3-70b-instruct":{"in":0.13,"out":0.4,"read":0,"write":0,"name":"Meta: Llama 3.3 70B Instruct"},"meta-llama/llama-4-maverick":{"in":0.2,"out":0.8,"read":0,"write":0,"name":"Meta: Llama 4 Maverick"},"meta-llama/llama-4-scout":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"Meta: Llama 4 Scout"},"meta/muse-spark-1.1":{"in":1.25,"out":4.25,"read":0.15,"write":0,"name":"Meta: Muse Spark 1.1"},"minimax/minimax-m1":{"in":0.55,"out":2.2,"read":0,"write":0,"name":"MiniMax: MiniMax M1"},"minimax/minimax-m2":{"in":0.255,"out":1.02,"read":0,"write":0,"name":"MiniMax: MiniMax M2"},"minimax/minimax-m2.1":{"in":0.3,"out":1.2,"read":0.03,"write":0,"name":"MiniMax: MiniMax M2.1"},"minimax/minimax-m2.5":{"in":0.15,"out":0.9,"read":0.05,"write":0,"name":"MiniMax: MiniMax M2.5"},"minimax/minimax-m2.7":{"in":0.25,"out":1,"read":0.05,"write":0,"name":"MiniMax: MiniMax M2.7"},"minimax/minimax-m3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax: MiniMax M3"},"mistralai/codestral-2508":{"in":0.3,"out":0.9,"read":0.03,"write":0,"name":"Mistral: Codestral 2508"},"mistralai/devstral-2512":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Mistral: Devstral 2 2512"},"mistralai/ministral-14b-2512":{"in":0.2,"out":0.2,"read":0.02,"write":0,"name":"Mistral: Ministral 3 14B 2512"},"mistralai/ministral-3b-2512":{"in":0.1,"out":0.1,"read":0.01,"write":0,"name":"Mistral: Ministral 3 3B 2512"},"mistralai/ministral-8b-2512":{"in":0.15,"out":0.15,"read":0.015,"write":0,"name":"Mistral: Ministral 3 8B 2512"},"mistralai/mistral-large":{"in":2,"out":6,"read":0.2,"write":0,"name":"Mistral Large"},"mistralai/mistral-large-2407":{"in":2,"out":6,"read":0.2,"write":0,"name":"Mistral Large 2407"},"mistralai/mistral-large-2512":{"in":0.5,"out":1.5,"read":0.05,"write":0,"name":"Mistral: Mistral Large 3 2512"},"mistralai/mistral-medium-3":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Mistral: Mistral Medium 3"},"mistralai/mistral-medium-3-5":{"in":1.5,"out":7.5,"read":0,"write":0,"name":"Mistral: Mistral Medium 3.5"},"mistralai/mistral-medium-3.1":{"in":0.4,"out":2,"read":0.04,"write":0,"name":"Mistral: Mistral Medium 3.1"},"mistralai/mistral-nemo":{"in":0.019,"out":0.03,"read":0,"write":0,"name":"Mistral: Mistral Nemo"},"mistralai/mistral-saba":{"in":0.2,"out":0.6,"read":0.02,"write":0,"name":"Mistral: Saba"},"mistralai/mistral-small-2603":{"in":0.15,"out":0.6,"read":0.015,"write":0,"name":"Mistral: Mistral Small 4"},"mistralai/mistral-small-3.2-24b-instruct":{"in":0.1,"out":0.3,"read":0.01,"write":0,"name":"Mistral: Mistral Small 3.2 24B"},"mistralai/mixtral-8x22b-instruct":{"in":2,"out":6,"read":0.2,"write":0,"name":"Mistral: Mixtral 8x22B Instruct"},"mistralai/voxtral-small-24b-2507":{"in":0.1,"out":0.3,"read":0.01,"write":0,"name":"Mistral: Voxtral Small 24B 2507"},"moonshotai/kimi-k2":{"in":0.57,"out":2.3,"read":0,"write":0,"name":"MoonshotAI: Kimi K2 0711"},"moonshotai/kimi-k2-0905":{"in":0.6,"out":2.5,"read":0,"write":0,"name":"MoonshotAI: Kimi K2 0905"},"moonshotai/kimi-k2-thinking":{"in":0.6,"out":2.5,"read":0.15,"write":0,"name":"MoonshotAI: Kimi K2 Thinking"},"moonshotai/kimi-k2.5":{"in":0.41,"out":2.06,"read":0.07,"write":0,"name":"MoonshotAI: Kimi K2.5"},"moonshotai/kimi-k2.6":{"in":0.646,"out":2.72,"read":0.1088,"write":0,"name":"MoonshotAI: Kimi K2.6"},"moonshotai/kimi-k2.7-code":{"in":0.78,"out":3.5,"read":0.15,"write":0,"name":"MoonshotAI: Kimi K2.7 Code"},"moonshotai/kimi-k3":{"in":3,"out":15,"read":0.3,"write":0,"name":"MoonshotAI: Kimi K3"},"nex-agi/nex-n2-mini":{"in":0.025,"out":0.1,"read":0.0025,"write":0,"name":"Nex AGI: Nex-N2-Mini"},"nex-agi/nex-n2-pro":{"in":0.25,"out":1,"read":0.025,"write":0,"name":"Nex AGI: Nex-N2-Pro"},"nvidia/nemotron-3-nano-30b-a3b":{"in":0.05,"out":0.2,"read":0,"write":0,"name":"NVIDIA: Nemotron 3 Nano 30B A3B"},"nvidia/nemotron-3-nano-30b-a3b:free":{"in":0,"out":0,"read":0,"write":0,"name":"NVIDIA: Nemotron 3 Nano 30B A3B (free)"},"nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free":{"in":0,"out":0,"read":0,"write":0,"name":"NVIDIA: Nemotron 3 Nano Omni (free)"},"nvidia/nemotron-3-super-120b-a12b":{"in":0.085,"out":0.4,"read":0,"write":0,"name":"NVIDIA: Nemotron 3 Super"},"nvidia/nemotron-3-super-120b-a12b:free":{"in":0,"out":0,"read":0,"write":0,"name":"NVIDIA: Nemotron 3 Super (free)"},"nvidia/nemotron-3-ultra-550b-a55b":{"in":0.6,"out":3.6,"read":0.2,"write":0,"name":"NVIDIA: Nemotron 3 Ultra"},"nvidia/nemotron-3-ultra-550b-a55b:free":{"in":0,"out":0,"read":0,"write":0,"name":"NVIDIA: Nemotron 3 Ultra (free)"},"nvidia/nemotron-nano-12b-v2-vl:free":{"in":0,"out":0,"read":0,"write":0,"name":"NVIDIA: Nemotron Nano 12B 2 VL (free)"},"nvidia/nemotron-nano-9b-v2:free":{"in":0,"out":0,"read":0,"write":0,"name":"NVIDIA: Nemotron Nano 9B V2 (free)"},"openai/gpt-3.5-turbo":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"OpenAI: GPT-3.5 Turbo"},"openai/gpt-3.5-turbo-0613":{"in":1,"out":2,"read":0,"write":0,"name":"OpenAI: GPT-3.5 Turbo (older v0613)"},"openai/gpt-3.5-turbo-16k":{"in":3,"out":4,"read":0,"write":0,"name":"OpenAI: GPT-3.5 Turbo 16k"},"openai/gpt-4":{"in":30,"out":60,"read":0,"write":0,"name":"OpenAI: GPT-4"},"openai/gpt-4-turbo":{"in":10,"out":30,"read":0,"write":0,"name":"OpenAI: GPT-4 Turbo"},"openai/gpt-4-turbo-preview":{"in":10,"out":30,"read":0,"write":0,"name":"OpenAI: GPT-4 Turbo Preview"},"openai/gpt-4.1":{"in":2,"out":8,"read":0.5,"write":0,"name":"OpenAI: GPT-4.1"},"openai/gpt-4.1-mini":{"in":0.4,"out":1.6,"read":0.1,"write":0,"name":"OpenAI: GPT-4.1 Mini"},"openai/gpt-4.1-nano":{"in":0.1,"out":0.4,"read":0.025,"write":0,"name":"OpenAI: GPT-4.1 Nano"},"openai/gpt-4o":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"OpenAI: GPT-4o"},"openai/gpt-4o-2024-05-13":{"in":5,"out":15,"read":0,"write":0,"name":"OpenAI: GPT-4o (2024-05-13)"},"openai/gpt-4o-2024-08-06":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"OpenAI: GPT-4o (2024-08-06)"},"openai/gpt-4o-2024-11-20":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"OpenAI: GPT-4o (2024-11-20)"},"openai/gpt-4o-mini":{"in":0.15,"out":0.6,"read":0.075,"write":0,"name":"OpenAI: GPT-4o-mini"},"openai/gpt-4o-mini-2024-07-18":{"in":0.15,"out":0.6,"read":0.075,"write":0,"name":"OpenAI: GPT-4o-mini (2024-07-18)"},"openai/gpt-5":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"OpenAI: GPT-5"},"openai/gpt-5-codex":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"OpenAI: GPT-5 Codex"},"openai/gpt-5-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"OpenAI: GPT-5 Mini"},"openai/gpt-5-nano":{"in":0.05,"out":0.4,"read":0.005,"write":0,"name":"OpenAI: GPT-5 Nano"},"openai/gpt-5-pro":{"in":15,"out":120,"read":0,"write":0,"name":"OpenAI: GPT-5 Pro"},"openai/gpt-5.1":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"OpenAI: GPT-5.1"},"openai/gpt-5.1-chat":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"OpenAI: GPT-5.1 Chat"},"openai/gpt-5.1-codex":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"OpenAI: GPT-5.1-Codex"},"openai/gpt-5.1-codex-max":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"OpenAI: GPT-5.1-Codex-Max"},"openai/gpt-5.1-codex-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"OpenAI: GPT-5.1-Codex-Mini"},"openai/gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"OpenAI: GPT-5.2"},"openai/gpt-5.2-chat":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"OpenAI: GPT-5.2 Chat"},"openai/gpt-5.2-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"OpenAI: GPT-5.2-Codex"},"openai/gpt-5.2-pro":{"in":21,"out":168,"read":0,"write":0,"name":"OpenAI: GPT-5.2 Pro"},"openai/gpt-5.3-chat":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"OpenAI: GPT-5.3 Chat"},"openai/gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"OpenAI: GPT-5.3-Codex"},"openai/gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"OpenAI: GPT-5.4"},"openai/gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"OpenAI: GPT-5.4 Mini"},"openai/gpt-5.4-nano":{"in":0.2,"out":1.25,"read":0.02,"write":0,"name":"OpenAI: GPT-5.4 Nano"},"openai/gpt-5.4-pro":{"in":30,"out":180,"read":0,"write":0,"name":"OpenAI: GPT-5.4 Pro"},"openai/gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"OpenAI: GPT-5.5"},"openai/gpt-5.5-pro":{"in":30,"out":180,"read":0,"write":0,"name":"OpenAI: GPT-5.5 Pro"},"openai/gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"OpenAI: GPT-5.6 Luna"},"openai/gpt-5.6-luna-pro":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"OpenAI: GPT-5.6 Luna Pro"},"openai/gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"OpenAI: GPT-5.6 Sol"},"openai/gpt-5.6-sol-pro":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"OpenAI: GPT-5.6 Sol Pro"},"openai/gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"OpenAI: GPT-5.6 Terra"},"openai/gpt-5.6-terra-pro":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"OpenAI: GPT-5.6 Terra Pro"},"openai/gpt-audio":{"in":2.5,"out":10,"read":0,"write":0,"name":"OpenAI: GPT Audio"},"openai/gpt-audio-mini":{"in":0.6,"out":2.4,"read":0,"write":0,"name":"OpenAI: GPT Audio Mini"},"openai/gpt-chat-latest":{"in":5,"out":30,"read":0.5,"write":0,"name":"OpenAI: GPT Chat Latest"},"openai/gpt-oss-120b":{"in":0.037,"out":0.17,"read":0,"write":0,"name":"OpenAI: gpt-oss-120b"},"openai/gpt-oss-20b":{"in":0.03,"out":0.13,"read":0.03,"write":0,"name":"OpenAI: gpt-oss-20b"},"openai/gpt-oss-20b:free":{"in":0,"out":0,"read":0,"write":0,"name":"OpenAI: gpt-oss-20b (free)"},"openai/gpt-oss-safeguard-20b":{"in":0.075,"out":0.3,"read":0.0375,"write":0,"name":"OpenAI: gpt-oss-safeguard-20b"},"openai/o1":{"in":15,"out":60,"read":7.5,"write":0,"name":"OpenAI: o1"},"openai/o3":{"in":2,"out":8,"read":0.5,"write":0,"name":"OpenAI: o3"},"openai/o3-deep-research":{"in":10,"out":40,"read":2.5,"write":0,"name":"OpenAI: o3 Deep Research"},"openai/o3-mini":{"in":1.1,"out":4.4,"read":0.55,"write":0,"name":"OpenAI: o3 Mini"},"openai/o3-mini-high":{"in":1.1,"out":4.4,"read":0.55,"write":0,"name":"OpenAI: o3 Mini High"},"openai/o3-pro":{"in":20,"out":80,"read":0,"write":0,"name":"OpenAI: o3 Pro"},"openai/o4-mini":{"in":1.1,"out":4.4,"read":0.275,"write":0,"name":"OpenAI: o4 Mini"},"openai/o4-mini-deep-research":{"in":2,"out":8,"read":0.5,"write":0,"name":"OpenAI: o4 Mini Deep Research"},"openai/o4-mini-high":{"in":1.1,"out":4.4,"read":0.275,"write":0,"name":"OpenAI: o4 Mini High"},"openrouter/auto":{"in":-1000000,"out":-1000000,"read":0,"write":0,"name":"Auto Router"},"openrouter/auto-beta":{"in":-1000000,"out":-1000000,"read":0,"write":0,"name":"Auto Router (Beta)"},"openrouter/free":{"in":0,"out":0,"read":0,"write":0,"name":"Free Models Router"},"openrouter/fusion":{"in":0,"out":0,"read":0,"write":0,"name":"OpenRouter: Fusion"},"poolside/laguna-m.1":{"in":0.2,"out":0.4,"read":0.1,"write":0,"name":"Poolside: Laguna M.1"},"poolside/laguna-m.1:free":{"in":0,"out":0,"read":0,"write":0,"name":"Poolside: Laguna M.1 (free)"},"poolside/laguna-s-2.1":{"in":0.1,"out":0.2,"read":0.01,"write":0,"name":"Poolside: Laguna S 2.1"},"poolside/laguna-s-2.1:free":{"in":0,"out":0,"read":0,"write":0,"name":"Poolside: Laguna S 2.1 (free)"},"poolside/laguna-xs-2.1":{"in":0.06,"out":0.12,"read":0.03,"write":0,"name":"Poolside: Laguna XS 2.1"},"poolside/laguna-xs-2.1:free":{"in":0,"out":0,"read":0,"write":0,"name":"Poolside: Laguna XS 2.1 (free)"},"qwen/qwen-2.5-72b-instruct":{"in":0.36,"out":0.4,"read":0,"write":0,"name":"Qwen2.5 72B Instruct"},"qwen/qwen-2.5-7b-instruct":{"in":0.04,"out":0.1,"read":0,"write":0,"name":"Qwen: Qwen2.5 7B Instruct"},"qwen/qwen-plus":{"in":0.26,"out":0.78,"read":0.052,"write":0.325,"name":"Qwen: Qwen-Plus"},"qwen/qwen-plus-2025-07-28":{"in":0.26,"out":0.78,"read":0,"write":0,"name":"Qwen: Qwen Plus 0728"},"qwen/qwen-plus-2025-07-28:thinking":{"in":0.26,"out":0.78,"read":0,"write":0.325,"name":"Qwen: Qwen Plus 0728 (thinking)"},"qwen/qwen3-14b":{"in":0.2275,"out":0.91,"read":0,"write":0,"name":"Qwen: Qwen3 14B"},"qwen/qwen3-235b-a22b":{"in":0.455,"out":1.82,"read":0,"write":0,"name":"Qwen: Qwen3 235B A22B"},"qwen/qwen3-235b-a22b-2507":{"in":0.09,"out":0.55,"read":0,"write":0,"name":"Qwen: Qwen3 235B A22B Instruct 2507"},"qwen/qwen3-235b-a22b-thinking-2507":{"in":0.3,"out":3,"read":0,"write":0,"name":"Qwen: Qwen3 235B A22B Thinking 2507"},"qwen/qwen3-30b-a3b":{"in":0.13,"out":0.52,"read":0,"write":0,"name":"Qwen: Qwen3 30B A3B"},"qwen/qwen3-30b-a3b-instruct-2507":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"Qwen: Qwen3 30B A3B Instruct 2507"},"qwen/qwen3-30b-a3b-thinking-2507":{"in":0.13,"out":1.56,"read":0,"write":0,"name":"Qwen: Qwen3 30B A3B Thinking 2507"},"qwen/qwen3-32b":{"in":0.08,"out":0.28,"read":0,"write":0,"name":"Qwen: Qwen3 32B"},"qwen/qwen3-8b":{"in":0.117,"out":0.455,"read":0,"write":0,"name":"Qwen: Qwen3 8B"},"qwen/qwen3-coder":{"in":0.3,"out":1,"read":0.1,"write":0,"name":"Qwen: Qwen3 Coder 480B A35B"},"qwen/qwen3-coder-30b-a3b-instruct":{"in":0.07,"out":0.27,"read":0,"write":0,"name":"Qwen: Qwen3 Coder 30B A3B Instruct"},"qwen/qwen3-coder-flash":{"in":0.195,"out":0.975,"read":0.039,"write":0.24375,"name":"Qwen: Qwen3 Coder Flash"},"qwen/qwen3-coder-next":{"in":0.11,"out":0.8,"read":0.07,"write":0,"name":"Qwen: Qwen3 Coder Next"},"qwen/qwen3-coder-plus":{"in":0.65,"out":3.25,"read":0.13,"write":0.8125,"name":"Qwen: Qwen3 Coder Plus"},"qwen/qwen3-max":{"in":0.78,"out":3.9,"read":0.156,"write":0.975,"name":"Qwen: Qwen3 Max"},"qwen/qwen3-max-thinking":{"in":0.78,"out":3.9,"read":0,"write":0,"name":"Qwen: Qwen3 Max Thinking"},"qwen/qwen3-next-80b-a3b-instruct":{"in":0.1,"out":1.1,"read":0.07,"write":0,"name":"Qwen: Qwen3 Next 80B A3B Instruct"},"qwen/qwen3-next-80b-a3b-thinking":{"in":0.0975,"out":0.78,"read":0,"write":0,"name":"Qwen: Qwen3 Next 80B A3B Thinking"},"qwen/qwen3-vl-235b-a22b-instruct":{"in":0.21,"out":1.9,"read":0.1,"write":0,"name":"Qwen: Qwen3 VL 235B A22B Instruct"},"qwen/qwen3-vl-235b-a22b-thinking":{"in":0.26,"out":2.6,"read":0,"write":0,"name":"Qwen: Qwen3 VL 235B A22B Thinking"},"qwen/qwen3-vl-30b-a3b-instruct":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"Qwen: Qwen3 VL 30B A3B Instruct"},"qwen/qwen3-vl-30b-a3b-thinking":{"in":0.13,"out":1.56,"read":0,"write":0,"name":"Qwen: Qwen3 VL 30B A3B Thinking"},"qwen/qwen3-vl-32b-instruct":{"in":0.104,"out":0.416,"read":0,"write":0,"name":"Qwen: Qwen3 VL 32B Instruct"},"qwen/qwen3-vl-8b-instruct":{"in":0.117,"out":0.455,"read":0,"write":0,"name":"Qwen: Qwen3 VL 8B Instruct"},"qwen/qwen3-vl-8b-thinking":{"in":0.117,"out":1.365,"read":0,"write":0,"name":"Qwen: Qwen3 VL 8B Thinking"},"qwen/qwen3.5-122b-a10b":{"in":0.26,"out":2.08,"read":0,"write":0,"name":"Qwen: Qwen3.5-122B-A10B"},"qwen/qwen3.5-27b":{"in":0.195,"out":1.56,"read":0,"write":0,"name":"Qwen: Qwen3.5-27B"},"qwen/qwen3.5-35b-a3b":{"in":0.14,"out":1,"read":0,"write":0,"name":"Qwen: Qwen3.5-35B-A3B"},"qwen/qwen3.5-397b-a17b":{"in":0.39,"out":2.34,"read":0,"write":0,"name":"Qwen: Qwen3.5 397B A17B"},"qwen/qwen3.5-9b":{"in":0.1,"out":0.15,"read":0,"write":0,"name":"Qwen: Qwen3.5-9B"},"qwen/qwen3.5-flash-02-23":{"in":0.065,"out":0.26,"read":0,"write":0,"name":"Qwen: Qwen3.5-Flash"},"qwen/qwen3.5-plus-02-15":{"in":0.26,"out":1.56,"read":0,"write":0,"name":"Qwen: Qwen3.5 Plus 2026-02-15"},"qwen/qwen3.5-plus-20260420":{"in":0.3,"out":1.8,"read":0,"write":0.375,"name":"Qwen: Qwen3.5 Plus 2026-04-20"},"qwen/qwen3.6-27b":{"in":0.289,"out":2.4,"read":0,"write":0,"name":"Qwen: Qwen3.6 27B"},"qwen/qwen3.6-35b-a3b":{"in":0.14,"out":1,"read":0,"write":0,"name":"Qwen: Qwen3.6 35B A3B"},"qwen/qwen3.6-flash":{"in":0.1875,"out":1.125,"read":0,"write":0.234375,"name":"Qwen: Qwen3.6 Flash"},"qwen/qwen3.6-max-preview":{"in":1.04,"out":6.24,"read":0,"write":1.3,"name":"Qwen: Qwen3.6 Max Preview"},"qwen/qwen3.6-plus":{"in":0.325,"out":1.95,"read":0,"write":0.40625,"name":"Qwen: Qwen3.6 Plus"},"qwen/qwen3.7-max":{"in":1.475,"out":4.425,"read":0.295,"write":1.84375,"name":"Qwen: Qwen3.7 Max"},"qwen/qwen3.7-plus":{"in":0.32,"out":1.28,"read":0.064,"write":0.4,"name":"Qwen: Qwen3.7 Plus"},"rekaai/reka-edge":{"in":0.1,"out":0.1,"read":0,"write":0,"name":"Reka Edge"},"relace/relace-search":{"in":1,"out":3,"read":0,"write":0,"name":"Relace: Relace Search"},"sakana/fugu-ultra":{"in":5,"out":30,"read":0.5,"write":0,"name":"Sakana: Fugu Ultra"},"sao10k/l3.1-euryale-70b":{"in":0.85,"out":0.85,"read":0,"write":0,"name":"Sao10K: Llama 3.1 Euryale 70B v2.2"},"stepfun/step-3.5-flash":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"StepFun: Step 3.5 Flash"},"stepfun/step-3.7-flash":{"in":0.2,"out":1.15,"read":0.04,"write":0,"name":"StepFun: Step 3.7 Flash"},"tencent/hy3":{"in":0.132,"out":0.528,"read":0.033,"write":0,"name":"Tencent: Hy3"},"tencent/hy3-preview":{"in":0.063,"out":0.21,"read":0.021,"write":0,"name":"Tencent: Hy3 preview"},"thedrummer/unslopnemo-12b":{"in":0.4,"out":0.4,"read":0,"write":0,"name":"TheDrummer: UnslopNemo 12B"},"thinkingmachines/inkling":{"in":1,"out":4.05,"read":0.17,"write":0,"name":"Thinking Machines: Inkling"},"upstage/solar-pro-3":{"in":0.15,"out":0.6,"read":0.015,"write":0,"name":"Upstage: Solar Pro 3"},"x-ai/grok-4.20":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"xAI: Grok 4.20"},"x-ai/grok-4.3":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"xAI: Grok 4.3"},"x-ai/grok-4.5":{"in":2,"out":6,"read":0.3,"write":0,"name":"xAI: Grok 4.5"},"x-ai/grok-build-0.1":{"in":1,"out":2,"read":0.2,"write":0,"name":"xAI: Grok Build 0.1"},"xiaomi/mimo-v2.5":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"Xiaomi: MiMo-V2.5"},"xiaomi/mimo-v2.5-pro":{"in":0.435,"out":0.87,"read":0.0036,"write":0,"name":"Xiaomi: MiMo-V2.5-Pro"},"z-ai/glm-4.5":{"in":0.6,"out":2.2,"read":0.11,"write":0,"name":"Z.ai: GLM 4.5"},"z-ai/glm-4.5-air":{"in":0.13,"out":0.85,"read":0.025,"write":0,"name":"Z.ai: GLM 4.5 Air"},"z-ai/glm-4.5v":{"in":0.6,"out":1.8,"read":0.11,"write":0,"name":"Z.ai: GLM 4.5V"},"z-ai/glm-4.6":{"in":0.5,"out":2,"read":0.1,"write":0,"name":"Z.ai: GLM 4.6"},"z-ai/glm-4.6v":{"in":0.3,"out":0.9,"read":0.055,"write":0,"name":"Z.ai: GLM 4.6V"},"z-ai/glm-4.7":{"in":0.4,"out":1.75,"read":0.08,"write":0,"name":"Z.ai: GLM 4.7"},"z-ai/glm-4.7-flash":{"in":0.06,"out":0.4,"read":0.01,"write":0,"name":"Z.ai: GLM 4.7 Flash"},"z-ai/glm-5":{"in":0.6,"out":1.9,"read":0.119,"write":0,"name":"Z.ai: GLM 5"},"z-ai/glm-5-turbo":{"in":1.2,"out":4,"read":0.24,"write":0,"name":"Z.ai: GLM 5 Turbo"},"z-ai/glm-5.1":{"in":0.966,"out":3.036,"read":0.1794,"write":0,"name":"Z.ai: GLM 5.1"},"z-ai/glm-5.2":{"in":0.721,"out":2.266,"read":0.1339,"write":0,"name":"Z.ai: GLM 5.2"},"z-ai/glm-5v-turbo":{"in":1.2,"out":4,"read":0.24,"write":0,"name":"Z.ai: GLM 5V Turbo"},"~anthropic/claude-fable-latest":{"in":10,"out":50,"read":1,"write":12.5,"name":"Anthropic: Claude Fable Latest"},"~anthropic/claude-haiku-latest":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Anthropic Claude Haiku Latest"},"~anthropic/claude-opus-latest":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Anthropic: Claude Opus Latest"},"~anthropic/claude-sonnet-latest":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Anthropic Claude Sonnet Latest"},"~google/gemini-flash-latest":{"in":1.5,"out":7.5,"read":0.15,"write":0.083333,"name":"Google Gemini Flash Latest"},"~google/gemini-pro-latest":{"in":2,"out":12,"read":0.2,"write":0.375,"name":"Google Gemini Pro Latest"},"~moonshotai/kimi-latest":{"in":3,"out":15,"read":0.3,"write":0,"name":"MoonshotAI Kimi Latest"},"~openai/gpt-latest":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"OpenAI GPT Latest"},"~openai/gpt-mini-latest":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"OpenAI GPT Mini Latest"},"~x-ai/grok-latest":{"in":2,"out":6,"read":0.3,"write":0,"name":"xAI: Grok Latest"}},"qwen-token-plan-cn":{"MiniMax-M2.5":{"in":0,"out":0,"read":0,"write":0,"name":"MiniMax-M2.5"},"deepseek-v3.2":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V3.2"},"deepseek-v4-flash":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V4 Flash"},"deepseek-v4-pro":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V4 Pro"},"glm-5":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5"},"glm-5.1":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.1"},"glm-5.2":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.2"},"kimi-k2.5":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.5"},"kimi-k2.6":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.6"},"kimi-k2.7-code":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.7 Code"},"qwen3.6-flash":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.6 Flash"},"qwen3.6-plus":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.6 Plus"},"qwen3.7-max":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.7 Max"},"qwen3.7-plus":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.7 Plus"},"qwen3.8-max-preview":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.8 Max Preview"}},"qwen-token-plan":{"MiniMax-M2.5":{"in":0,"out":0,"read":0,"write":0,"name":"MiniMax-M2.5"},"deepseek-v3.2":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V3.2"},"deepseek-v4-flash":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V4 Flash"},"deepseek-v4-pro":{"in":0,"out":0,"read":0,"write":0,"name":"DeepSeek V4 Pro"},"glm-5":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5"},"glm-5.1":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.1"},"glm-5.2":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.2"},"kimi-k2.5":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.5"},"kimi-k2.6":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.6"},"kimi-k2.7-code":{"in":0,"out":0,"read":0,"write":0,"name":"Kimi K2.7 Code"},"qwen3.6-flash":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.6 Flash"},"qwen3.6-plus":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.6 Plus"},"qwen3.7-max":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.7 Max"},"qwen3.7-plus":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.7 Plus"},"qwen3.8-max-preview":{"in":0,"out":0,"read":0,"write":0,"name":"Qwen3.8 Max Preview"}},"together":{"MiniMaxAI/MiniMax-M2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M2.7"},"MiniMaxAI/MiniMax-M3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax-M3"},"Qwen/Qwen2.5-7B-Instruct-Turbo":{"in":0.3,"out":0.3,"read":0,"write":0,"name":"Qwen 2.5 7B Instruct Turbo"},"Qwen/Qwen3.5-9B":{"in":0.17,"out":0.25,"read":0,"write":0,"name":"Qwen3.5 9B"},"Qwen/Qwen3.6-Plus":{"in":0.5,"out":3,"read":0,"write":0,"name":"Qwen3.6 Plus"},"Qwen/Qwen3.7-Max":{"in":1.25,"out":3.75,"read":0,"write":0,"name":"Qwen3.7 Max"},"deepseek-ai/DeepSeek-V4-Pro":{"in":1.74,"out":3.48,"read":0.2,"write":0,"name":"DeepSeek V4 Pro"},"google/gemma-4-31B-it":{"in":0.39,"out":0.97,"read":0,"write":0,"name":"Gemma 4 31B Instruct"},"meta-llama/Llama-3.3-70B-Instruct-Turbo":{"in":1.04,"out":1.04,"read":0,"write":0,"name":"Llama 3.3 70B"},"moonshotai/Kimi-K2.6":{"in":1.2,"out":4.5,"read":0.2,"write":0,"name":"Kimi K2.6"},"moonshotai/Kimi-K2.7-Code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"nvidia/nemotron-3-ultra-550b-a55b":{"in":0.6,"out":3.6,"read":0.2,"write":0,"name":"Nemotron 3 Ultra 550B A55B"},"openai/gpt-oss-120b":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"GPT OSS 120B"},"openai/gpt-oss-20b":{"in":0.05,"out":0.2,"read":0,"write":0,"name":"GPT OSS 20B"},"thinkingmachines/Inkling":{"in":1,"out":4.05,"read":0.17,"write":0,"name":"Inkling"},"zai-org/GLM-5.2":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM-5.2"}},"vercel-ai-gateway":{"alibaba/qwen-3-14b":{"in":0.12,"out":0.24,"read":0,"write":0,"name":"Qwen3-14B"},"alibaba/qwen-3-235b":{"in":0.22,"out":0.88,"read":0,"write":0,"name":"Qwen3 235B A22B"},"alibaba/qwen-3-30b":{"in":0.12,"out":0.5,"read":0,"write":0,"name":"Qwen3-30B-A3B"},"alibaba/qwen-3-32b":{"in":0.16,"out":0.64,"read":0,"write":0,"name":"Qwen 3 32B"},"alibaba/qwen-3.6-max-preview":{"in":1.3,"out":7.8,"read":0.26,"write":1.625,"name":"Qwen 3.6 Max Preview"},"alibaba/qwen3-235b-a22b-thinking":{"in":0.4,"out":4,"read":0,"write":0,"name":"Qwen3 VL 235B A22B Thinking"},"alibaba/qwen3-coder":{"in":1.5,"out":7.5,"read":0.3,"write":0,"name":"Qwen3 Coder 480B A35B Instruct"},"alibaba/qwen3-coder-30b-a3b":{"in":0.15,"out":0.6,"read":0,"write":0,"name":"Qwen 3 Coder 30B A3B Instruct"},"alibaba/qwen3-coder-next":{"in":0.5,"out":1.2,"read":0,"write":0,"name":"Qwen3 Coder Next"},"alibaba/qwen3-coder-plus":{"in":1,"out":5,"read":0.2,"write":0,"name":"Qwen3 Coder Plus"},"alibaba/qwen3-max":{"in":1.2,"out":6,"read":0.24,"write":0,"name":"Qwen3 Max"},"alibaba/qwen3-max-preview":{"in":1.2,"out":6,"read":0.24,"write":0,"name":"Qwen3 Max Preview"},"alibaba/qwen3-max-thinking":{"in":1.2,"out":6,"read":0.24,"write":0,"name":"Qwen 3 Max Thinking"},"alibaba/qwen3-next-80b-a3b-instruct":{"in":0.15,"out":1.2,"read":0,"write":0,"name":"Qwen3 Next 80B A3B Instruct"},"alibaba/qwen3-next-80b-a3b-thinking":{"in":0.15,"out":1.2,"read":0,"write":0,"name":"Qwen3 Next 80B A3B Thinking"},"alibaba/qwen3-vl-235b-a22b-instruct":{"in":0.4,"out":1.6,"read":0,"write":0,"name":"Qwen3 VL 235B A22B Instruct"},"alibaba/qwen3-vl-instruct":{"in":0.4,"out":1.6,"read":0,"write":0,"name":"Qwen3 VL 235B A22B Instruct"},"alibaba/qwen3-vl-thinking":{"in":0.4,"out":4,"read":0,"write":0,"name":"Qwen3 VL 235B A22B Thinking"},"alibaba/qwen3.5-flash":{"in":0.1,"out":0.4,"read":0.001,"write":0.125,"name":"Qwen 3.5 Flash"},"alibaba/qwen3.5-plus":{"in":0.4,"out":2.4,"read":0.04,"write":0.5,"name":"Qwen 3.5 Plus"},"alibaba/qwen3.6-27b":{"in":0.6,"out":3.6,"read":0,"write":0,"name":"Qwen 3.6 27B"},"alibaba/qwen3.6-plus":{"in":0.5,"out":3,"read":0.1,"write":0.625,"name":"Qwen 3.6 Plus"},"alibaba/qwen3.7-max":{"in":2.5,"out":7.5,"read":0.5,"write":3.125,"name":"Qwen 3.7 Max"},"alibaba/qwen3.7-plus":{"in":0.4,"out":1.6,"read":0.08,"write":0.5,"name":"Qwen 3.7 Plus"},"amazon/nova-2-lite":{"in":0.3,"out":2.5,"read":0.075,"write":0,"name":"Nova 2 Lite"},"amazon/nova-lite":{"in":0.06,"out":0.24,"read":0,"write":0,"name":"Nova Lite"},"amazon/nova-micro":{"in":0.035,"out":0.14,"read":0,"write":0,"name":"Nova Micro"},"amazon/nova-pro":{"in":0.8,"out":3.2,"read":0,"write":0,"name":"Nova Pro"},"anthropic/claude-3-haiku":{"in":0.25,"out":1.25,"read":0.03,"write":0.3,"name":"Claude 3 Haiku"},"anthropic/claude-fable-5":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Fable 5"},"anthropic/claude-haiku-4.5":{"in":1,"out":5,"read":0.1,"write":1.25,"name":"Claude Haiku 4.5"},"anthropic/claude-opus-4":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4"},"anthropic/claude-opus-4.1":{"in":15,"out":75,"read":1.5,"write":18.75,"name":"Claude Opus 4.1"},"anthropic/claude-opus-4.5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.5"},"anthropic/claude-opus-4.6":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.6"},"anthropic/claude-opus-4.7":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.7"},"anthropic/claude-opus-4.8":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 4.8"},"anthropic/claude-opus-4.8-fast":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Opus 4.8 (Fast)"},"anthropic/claude-opus-5":{"in":5,"out":25,"read":0.5,"write":6.25,"name":"Claude Opus 5"},"anthropic/claude-opus-5-fast":{"in":10,"out":50,"read":1,"write":12.5,"name":"Claude Opus 5 (Fast)"},"anthropic/claude-sonnet-4":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4"},"anthropic/claude-sonnet-4.5":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.5"},"anthropic/claude-sonnet-4.6":{"in":3,"out":15,"read":0.3,"write":3.75,"name":"Claude Sonnet 4.6"},"anthropic/claude-sonnet-5":{"in":2,"out":10,"read":0.2,"write":2.5,"name":"Claude Sonnet 5"},"arcee-ai/trinity-large-thinking":{"in":0.25,"out":0.9,"read":0,"write":0,"name":"Trinity Large Thinking"},"arcee-ai/trinity-mini":{"in":0.045,"out":0.15,"read":0,"write":0,"name":"Trinity Mini"},"bytedance/seed-1.6":{"in":0.25,"out":2,"read":0.05,"write":0,"name":"Seed 1.6"},"bytedance/seed-1.8":{"in":0.25,"out":2,"read":0.05,"write":0,"name":"Bytedance Seed 1.8"},"cohere/command-a":{"in":2.5,"out":10,"read":0,"write":0,"name":"Command A"},"deepseek/deepseek-r1":{"in":1.35,"out":5.4,"read":0,"write":0,"name":"DeepSeek-R1"},"deepseek/deepseek-v3":{"in":0.27,"out":1.12,"read":0.135,"write":0,"name":"DeepSeek V3 0324"},"deepseek/deepseek-v3.1":{"in":0.25,"out":0.95,"read":0.13,"write":0,"name":"DeepSeek V3.1"},"deepseek/deepseek-v3.1-terminus":{"in":0.27,"out":1,"read":0.135,"write":0,"name":"DeepSeek V3.1 Terminus"},"deepseek/deepseek-v3.2":{"in":0.28,"out":0.42,"read":0.028,"write":0,"name":"DeepSeek V3.2"},"deepseek/deepseek-v3.2-thinking":{"in":0.62,"out":1.85,"read":0,"write":0,"name":"DeepSeek V3.2 Thinking"},"deepseek/deepseek-v4-flash":{"in":0.14,"out":0.28,"read":0.028,"write":0,"name":"DeepSeek V4 Flash"},"deepseek/deepseek-v4-pro":{"in":0.435,"out":0.87,"read":0.0036,"write":0,"name":"DeepSeek V4 Pro"},"google/gemini-2.5-flash":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 2.5 Flash"},"google/gemini-2.5-flash-lite":{"in":0.1,"out":0.4,"read":0.01,"write":0,"name":"Gemini 2.5 Flash Lite"},"google/gemini-2.5-pro":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"Gemini 2.5 Pro"},"google/gemini-3-flash":{"in":0.5,"out":3,"read":0.05,"write":0,"name":"Gemini 3 Flash"},"google/gemini-3-pro-preview":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3 Pro Preview"},"google/gemini-3.1-flash-lite":{"in":0.25,"out":1.5,"read":0.03,"write":0,"name":"Gemini 3.1 Flash Lite"},"google/gemini-3.1-pro-preview":{"in":2,"out":12,"read":0.2,"write":0,"name":"Gemini 3.1 Pro Preview"},"google/gemini-3.5-flash":{"in":1.5,"out":9,"read":0.15,"write":0,"name":"Gemini 3.5 Flash"},"google/gemini-3.5-flash-lite":{"in":0.3,"out":2.5,"read":0.03,"write":0,"name":"Gemini 3.5 Flash Lite"},"google/gemini-3.6-flash":{"in":1.5,"out":7.5,"read":0.15,"write":0,"name":"Gemini 3.6 Flash"},"google/gemma-4-26b-a4b-it":{"in":0.15,"out":0.6,"read":0.015,"write":0,"name":"Gemma 4 26B A4B IT"},"google/gemma-4-31b-it":{"in":0.14,"out":0.4,"read":0,"write":0,"name":"Gemma 4 31B IT"},"inception/mercury-2":{"in":0.25,"out":0.75,"read":0.025,"write":0,"name":"Mercury 2"},"inception/mercury-coder-small":{"in":0.25,"out":1,"read":0,"write":0,"name":"Mercury Coder Small Beta"},"inclusionai/ling-3.0-flash-free":{"in":0,"out":0,"read":0,"write":0,"name":"Ling 3.0 Flash"},"interfaze/interfaze-beta":{"in":1.5,"out":3.5,"read":0,"write":0,"name":"Interfaze Beta"},"kwaipilot/kat-coder-air-v2.5":{"in":0.15,"out":0.6,"read":0.03,"write":0,"name":"Kat Coder Air V2.5"},"kwaipilot/kat-coder-pro-v1":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"KAT-Coder-Pro V1"},"kwaipilot/kat-coder-pro-v2":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"Kat Coder Pro V2"},"kwaipilot/kat-coder-pro-v2.5":{"in":0.74,"out":2.96,"read":0.15,"write":0,"name":"Kat Coder Pro V2.5"},"meta/llama-3.1-70b":{"in":0.72,"out":0.72,"read":0,"write":0,"name":"Llama 3.1 70B Instruct"},"meta/llama-3.1-8b":{"in":0.22,"out":0.22,"read":0,"write":0,"name":"Llama 3.1 8B Instruct"},"meta/llama-3.3-70b":{"in":0.72,"out":0.72,"read":0,"write":0,"name":"Llama 3.3 70B Instruct"},"meta/llama-4-maverick":{"in":0.24,"out":0.97,"read":0,"write":0,"name":"Llama 4 Maverick 17B Instruct"},"meta/llama-4-scout":{"in":0.17,"out":0.66,"read":0,"write":0,"name":"Llama 4 Scout 17B Instruct"},"meta/muse-spark-1.1":{"in":1.25,"out":4.25,"read":0.15,"write":0,"name":"Muse Spark 1.1"},"minimax/minimax-m2":{"in":0.3,"out":1.2,"read":0.03,"write":0.375,"name":"MiniMax M2"},"minimax/minimax-m2.1":{"in":0.3,"out":1.2,"read":0.03,"write":0.375,"name":"MiniMax M2.1"},"minimax/minimax-m2.1-lightning":{"in":0.3,"out":2.4,"read":0.03,"write":0.375,"name":"MiniMax M2.1 Lightning"},"minimax/minimax-m2.5":{"in":0.3,"out":1.2,"read":0.03,"write":0.375,"name":"MiniMax M2.5"},"minimax/minimax-m2.5-highspeed":{"in":0.6,"out":2.4,"read":0.03,"write":0.375,"name":"MiniMax M2.5 High Speed"},"minimax/minimax-m2.7":{"in":0.3,"out":1.2,"read":0.06,"write":0.375,"name":"MiniMax M2.7"},"minimax/minimax-m2.7-highspeed":{"in":0.6,"out":2.4,"read":0.06,"write":0.375,"name":"MiniMax M2.7 High Speed"},"minimax/minimax-m3":{"in":0.3,"out":1.2,"read":0.06,"write":0,"name":"MiniMax M3"},"mistral/codestral":{"in":0.3,"out":0.9,"read":0,"write":0,"name":"Mistral Codestral"},"mistral/devstral-2":{"in":0.4,"out":2,"read":0,"write":0,"name":"Devstral 2"},"mistral/devstral-small-2":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"Devstral Small 2"},"mistral/magistral-medium":{"in":2,"out":5,"read":0,"write":0,"name":"Magistral Medium 2509"},"mistral/magistral-small":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"Magistral Small 2509"},"mistral/ministral-14b":{"in":0.2,"out":0.2,"read":0,"write":0,"name":"Ministral 14B"},"mistral/ministral-3b":{"in":0.1,"out":0.1,"read":0,"write":0,"name":"Ministral 3B"},"mistral/ministral-8b":{"in":0.15,"out":0.15,"read":0,"write":0,"name":"Ministral 8B"},"mistral/mistral-large-3":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"Mistral Large 3"},"mistral/mistral-medium":{"in":0.4,"out":2,"read":0,"write":0,"name":"Mistral Medium 3.1"},"mistral/mistral-medium-3.5":{"in":1.5,"out":7.5,"read":0,"write":0,"name":"Mistral Medium Latest"},"mistral/mistral-nemo":{"in":0.15,"out":0.15,"read":0,"write":0,"name":"Mistral Nemo 12B"},"mistral/mistral-small":{"in":0.1,"out":0.3,"read":0,"write":0,"name":"Mistral Small"},"mistral/pixtral-12b":{"in":0.15,"out":0.15,"read":0,"write":0,"name":"Pixtral 12B 2409"},"moonshotai/kimi-k2":{"in":0.57,"out":2.3,"read":0,"write":0,"name":"Kimi K2 Instruct"},"moonshotai/kimi-k2-thinking":{"in":0.47,"out":2,"read":0.141,"write":0,"name":"Kimi K2 Thinking"},"moonshotai/kimi-k2.5":{"in":0.6,"out":3,"read":0.1,"write":0,"name":"Kimi K2.5"},"moonshotai/kimi-k2.6":{"in":0.95,"out":4,"read":0.16,"write":0,"name":"Kimi K2.6"},"moonshotai/kimi-k2.7-code":{"in":0.95,"out":4,"read":0.19,"write":0,"name":"Kimi K2.7 Code"},"moonshotai/kimi-k2.7-code-highspeed":{"in":1.9,"out":8,"read":0.38,"write":0,"name":"Kimi K2.7 Code High Speed"},"moonshotai/kimi-k3":{"in":3,"out":15,"read":0.3,"write":0,"name":"Kimi K3"},"nvidia/nemotron-3-nano-30b-a3b":{"in":0.05,"out":0.24,"read":0,"write":0,"name":"Nemotron 3 Nano 30B A3B"},"nvidia/nemotron-3-super-120b-a12b":{"in":0.15,"out":0.65,"read":0,"write":0,"name":"NVIDIA Nemotron 3 Super 120B A12B"},"nvidia/nemotron-3-ultra-550b-a55b":{"in":0.6,"out":2.4,"read":0.12,"write":0,"name":"Nemotron 3 Ultra"},"nvidia/nemotron-nano-12b-v2-vl":{"in":0.2,"out":0.6,"read":0,"write":0,"name":"Nvidia Nemotron Nano 12B V2 VL"},"nvidia/nemotron-nano-9b-v2":{"in":0.06,"out":0.23,"read":0,"write":0,"name":"Nvidia Nemotron Nano 9B V2"},"openai/gpt-3.5-turbo":{"in":0.5,"out":1.5,"read":0,"write":0,"name":"GPT-3.5 Turbo"},"openai/gpt-4-turbo":{"in":10,"out":30,"read":0,"write":0,"name":"GPT-4 Turbo"},"openai/gpt-4.1":{"in":2,"out":8,"read":0.5,"write":0,"name":"GPT-4.1"},"openai/gpt-4.1-mini":{"in":0.4,"out":1.6,"read":0.1,"write":0,"name":"GPT-4.1 mini"},"openai/gpt-4.1-nano":{"in":0.1,"out":0.4,"read":0.025,"write":0,"name":"GPT-4.1 nano"},"openai/gpt-4o":{"in":2.5,"out":10,"read":1.25,"write":0,"name":"GPT-4o"},"openai/gpt-4o-mini":{"in":0.15,"out":0.6,"read":0.075,"write":0,"name":"GPT-4o mini"},"openai/gpt-5":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5"},"openai/gpt-5-codex":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5-Codex"},"openai/gpt-5-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"GPT-5 mini"},"openai/gpt-5-nano":{"in":0.05,"out":0.4,"read":0.005,"write":0,"name":"GPT-5 nano"},"openai/gpt-5-pro":{"in":15,"out":120,"read":0,"write":0,"name":"GPT-5 pro"},"openai/gpt-5.1-codex":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5.1-Codex"},"openai/gpt-5.1-codex-max":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT 5.1 Codex Max"},"openai/gpt-5.1-codex-mini":{"in":0.25,"out":2,"read":0.025,"write":0,"name":"GPT 5.1 Codex Mini"},"openai/gpt-5.1-instant":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT-5.1 Instant"},"openai/gpt-5.1-thinking":{"in":1.25,"out":10,"read":0.125,"write":0,"name":"GPT 5.1 Thinking"},"openai/gpt-5.2":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT 5.2"},"openai/gpt-5.2-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT 5.2 Codex"},"openai/gpt-5.2-pro":{"in":21,"out":168,"read":0,"write":0,"name":"GPT 5.2 "},"openai/gpt-5.3-chat":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT-5.3 Chat"},"openai/gpt-5.3-codex":{"in":1.75,"out":14,"read":0.175,"write":0,"name":"GPT 5.3 Codex"},"openai/gpt-5.4":{"in":2.5,"out":15,"read":0.25,"write":0,"name":"GPT 5.4"},"openai/gpt-5.4-mini":{"in":0.75,"out":4.5,"read":0.075,"write":0,"name":"GPT 5.4 Mini"},"openai/gpt-5.4-nano":{"in":0.2,"out":1.25,"read":0.02,"write":0,"name":"GPT 5.4 Nano"},"openai/gpt-5.4-pro":{"in":30,"out":180,"read":0,"write":0,"name":"GPT 5.4 Pro"},"openai/gpt-5.5":{"in":5,"out":30,"read":0.5,"write":0,"name":"GPT 5.5"},"openai/gpt-5.5-pro":{"in":30,"out":180,"read":0,"write":0,"name":"GPT 5.5 Pro"},"openai/gpt-5.6-luna":{"in":1,"out":6,"read":0.1,"write":1.25,"name":"GPT 5.6 Luna"},"openai/gpt-5.6-sol":{"in":5,"out":30,"read":0.5,"write":6.25,"name":"GPT 5.6 Sol"},"openai/gpt-5.6-terra":{"in":2.5,"out":15,"read":0.25,"write":3.125,"name":"GPT 5.6 Terra"},"openai/gpt-oss-120b":{"in":0.1,"out":0.5,"read":0,"write":0,"name":"GPT OSS 120B"},"openai/gpt-oss-20b":{"in":0.05,"out":0.2,"read":0,"write":0,"name":"GPT OSS 20B"},"openai/gpt-oss-safeguard-20b":{"in":0.075,"out":0.3,"read":0.037,"write":0,"name":"GPT OSS Safeguard 20B"},"openai/o1":{"in":15,"out":60,"read":7.5,"write":0,"name":"o1"},"openai/o3":{"in":2,"out":8,"read":0.5,"write":0,"name":"o3"},"openai/o3-deep-research":{"in":10,"out":40,"read":2.5,"write":0,"name":"o3-deep-research"},"openai/o3-mini":{"in":1.1,"out":4.4,"read":0.55,"write":0,"name":"o3-mini"},"openai/o3-pro":{"in":20,"out":80,"read":0,"write":0,"name":"o3 Pro"},"openai/o4-mini":{"in":1.1,"out":4.4,"read":0.275,"write":0,"name":"o4-mini"},"poolside/laguna-s-2.1":{"in":0.1,"out":0.2,"read":0.01,"write":0,"name":"Laguna S 2.1"},"poolside/laguna-s-2.1-free":{"in":0,"out":0,"read":0,"write":0,"name":"Laguna S 2.1 Free"},"sakana/fugu-ultra":{"in":5,"out":30,"read":0.5,"write":0,"name":"Fugu Ultra"},"stepfun/step-3.5-flash":{"in":0.09,"out":0.3,"read":0.02,"write":0,"name":"StepFun 3.5 Flash"},"stepfun/step-3.7-flash":{"in":0.2,"out":1.15,"read":0.04,"write":0,"name":"Step 3.7 Flash"},"tencent/hy3":{"in":0.14,"out":0.58,"read":0.035,"write":0,"name":"Hy3"},"thinkingmachines/inkling":{"in":1,"out":4.05,"read":0.17,"write":0,"name":"Inkling"},"xai/grok-4.1-fast-non-reasoning":{"in":0.2,"out":0.5,"read":0.05,"write":0,"name":"Grok 4.1 Fast Non-Reasoning"},"xai/grok-4.1-fast-reasoning":{"in":0.2,"out":0.5,"read":0.05,"write":0,"name":"Grok 4.1 Fast Reasoning"},"xai/grok-4.20-multi-agent":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.20 Multi-Agent"},"xai/grok-4.20-multi-agent-beta":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.20 Multi Agent Beta"},"xai/grok-4.20-non-reasoning":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.20 Non-Reasoning"},"xai/grok-4.20-non-reasoning-beta":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.20 Beta Non-Reasoning"},"xai/grok-4.20-reasoning":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.20 Reasoning"},"xai/grok-4.20-reasoning-beta":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.20 Beta Reasoning"},"xai/grok-4.3":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.3"},"xai/grok-4.5":{"in":2,"out":6,"read":0.3,"write":0,"name":"Grok 4.5"},"xai/grok-build-0.1":{"in":1,"out":2,"read":0.2,"write":0,"name":"Grok Build 0.1"},"xiaomi/mimo-v2.5":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"MiMo M2.5"},"xiaomi/mimo-v2.5-pro":{"in":0.435,"out":0.87,"read":0.0036,"write":0,"name":"MiMo V2.5 Pro"},"zai/glm-4.5":{"in":0.6,"out":2.2,"read":0.11,"write":0,"name":"GLM 4.5"},"zai/glm-4.5-air":{"in":0.2,"out":1.1,"read":0.03,"write":0,"name":"GLM 4.5 Air"},"zai/glm-4.5v":{"in":0.6,"out":1.8,"read":0.11,"write":0,"name":"GLM 4.5V"},"zai/glm-4.6":{"in":0.6,"out":2.2,"read":0.11,"write":0,"name":"GLM 4.6"},"zai/glm-4.6v":{"in":0.3,"out":0.9,"read":0.05,"write":0,"name":"GLM-4.6V"},"zai/glm-4.6v-flash":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-4.6V-Flash"},"zai/glm-4.7":{"in":0.6,"out":2.2,"read":0.12,"write":0,"name":"GLM 4.7"},"zai/glm-4.7-flash":{"in":0.07,"out":0.4,"read":0,"write":0,"name":"GLM 4.7 Flash"},"zai/glm-4.7-flashx":{"in":0.06,"out":0.4,"read":0.01,"write":0,"name":"GLM 4.7 FlashX"},"zai/glm-5":{"in":0.95,"out":3.15,"read":0.2,"write":0,"name":"GLM 5"},"zai/glm-5-turbo":{"in":1.2,"out":4,"read":0.24,"write":0,"name":"GLM 5 Turbo"},"zai/glm-5.1":{"in":1.3,"out":4.3,"read":0.26,"write":0,"name":"GLM 5.1"},"zai/glm-5.2":{"in":1.4,"out":4.4,"read":0.26,"write":0,"name":"GLM 5.2"},"zai/glm-5.2-fast":{"in":2.1,"out":6.6,"read":0.21,"write":0,"name":"GLM 5.2 Fast"},"zai/glm-5v-turbo":{"in":1.2,"out":4,"read":0.24,"write":0,"name":"GLM 5V Turbo"}},"xai":{"grok-4.3":{"in":1.25,"out":2.5,"read":0.2,"write":0,"name":"Grok 4.3"},"grok-build-0.1":{"in":1,"out":2,"read":0.2,"write":0,"name":"Grok Build 0.1"},"grok-4.5":{"in":2,"out":6,"read":0.3,"write":0,"name":"Grok 4.5"}},"xiaomi-token-plan-ams":{"mimo-v2-pro":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2-Pro"},"mimo-v2.5":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2.5"},"mimo-v2.5-pro":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2.5-Pro"}},"xiaomi-token-plan-cn":{"mimo-v2-pro":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2-Pro"},"mimo-v2.5":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2.5"},"mimo-v2.5-pro":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2.5-Pro"}},"xiaomi-token-plan-sgp":{"mimo-v2-pro":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2-Pro"},"mimo-v2.5":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2.5"},"mimo-v2.5-pro":{"in":0,"out":0,"read":0,"write":0,"name":"MiMo-V2.5-Pro"}},"xiaomi":{"mimo-v2-flash":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"MiMo-V2-Flash"},"mimo-v2-omni":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"MiMo-V2-Omni"},"mimo-v2-pro":{"in":0.435,"out":0.87,"read":0.0036,"write":0,"name":"MiMo-V2-Pro"},"mimo-v2.5":{"in":0.14,"out":0.28,"read":0.0028,"write":0,"name":"MiMo-V2.5"},"mimo-v2.5-pro":{"in":0.435,"out":0.87,"read":0.0036,"write":0,"name":"MiMo-V2.5-Pro"},"mimo-v2.5-pro-ultraspeed":{"in":1.305,"out":2.61,"read":0.0108,"write":0,"name":"MiMo-V2.5-Pro-UltraSpeed"}},"zai-coding-cn":{"glm-4.5-air":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-4.5-Air"},"glm-4.7":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-4.7"},"glm-5-turbo":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5-Turbo"},"glm-5.1":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.1"},"glm-5.2":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.2"},"glm-5v-turbo":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5V-Turbo"}},"zai":{"glm-4.5-air":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-4.5-Air"},"glm-4.7":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-4.7"},"glm-5-turbo":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5-Turbo"},"glm-5.1":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.1"},"glm-5.2":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5.2"},"glm-5v-turbo":{"in":0,"out":0,"read":0,"write":0,"name":"GLM-5V-Turbo"}}};

    const WFR_PRICES = {
      'deepseek-v4-pro': { hit: [0.15, 0.30], miss: [4.5, 9.0], out: [13.5, 27.0] },
      'deepseek-v4-flash': { hit: [0.05, 0.10], miss: [1.5, 3.0], out: [4.5, 9.0] },
    }
    function TokenCostCell(props) {
      const sid = props.useSession ? props.useSession((s) => (s && typeof s.sessionId === 'string') ? s.sessionId : undefined) : undefined
      const nodes = props.useSession ? props.useSession((s) => (s && s.chat) ? s.chat.nodes : undefined) : undefined
      const effectiveSessionId = (props.sessionId && typeof props.sessionId === 'string' && props.sessionId) ? props.sessionId : sid
      const messageId = props.messageId
      const [modelInfo, setModelInfo] = React.useState(null)
      React.useEffect(() => {
        let alive = true
        if (effectiveSessionId && messageId) {
          host.call('turn-model', { sessionId: effectiveSessionId, messageId: messageId }).then((res) => {
            if (alive && res && typeof res.model === 'string') {
              setModelInfo({ model: res.model, provider: typeof res.provider === 'string' ? res.provider : null })
            }
          }).catch(() => {})
        }
        return () => { alive = false }
      }, [effectiveSessionId, messageId])
      let turn = null
      let peak = false
      let matched = false
      if (nodes) {
        for (const node of nodes.values()) {
          if (node && node.kind === 'assistant-step' && node.data && node.data.finalNode && node.data.finalNode.messageId === messageId) {
            turn = node.data.turn
            peak = wfrIsPeak(node.data.time)
            matched = true
            break
          }
        }
      }
      let hit = 0, miss = 0, out = 0, reason = 0, write = 0
      let sawUsage = false
      if (nodes && turn !== null) {
        for (const node of nodes.values()) {
          if (node && node.kind === 'assistant-step' && node.data && node.data.turn === turn && node.data.usage) {
            const u = node.data.usage
            sawUsage = true
            hit += typeof u.cacheReadTokens === 'number' ? u.cacheReadTokens : 0
            miss += (typeof u.uncachedInputTokens === 'number' ? u.uncachedInputTokens : 0) + (typeof u.inputTokens === 'number' ? u.inputTokens : 0)
            out += typeof u.outputTokens === 'number' ? u.outputTokens : 0
            reason += typeof u.reasoningTokens === 'number' ? u.reasoningTokens : 0
            write += typeof u.cacheWriteTokens === 'number' ? u.cacheWriteTokens : 0
          }
        }
      }
      const totalInput = hit + miss
      const M = 1000000
      const model = modelInfo ? modelInfo.model : null
      const provider = modelInfo ? modelInfo.provider : null
      // 计费：DeepSeek 官方人民币峰谷价优先；其他模型用 pi-ai 目录的美元价
      let cost = null
      let currency = '¥'
      let priceNote = ''
      let peakNote = ''
      let modelKnown = false
      if (model && WFR_PRICES[model]) {
        const price = WFR_PRICES[model]
        const pi = peak ? 1 : 0
        cost = hit / M * price.hit[pi] + miss / M * price.miss[pi] + (out + reason) / M * price.out[pi]
        currency = '¥'
        peakNote = peak ? '（高峰时段）' : '（空闲时段）'
        modelKnown = true
      } else if (model && provider && WFR_PIAI_PRICES[provider] && WFR_PIAI_PRICES[provider][model]) {
        const p = WFR_PIAI_PRICES[provider][model]
        cost = hit / M * (typeof p.read === 'number' ? p.read : 0) + miss / M * (typeof p.in === 'number' ? p.in : 0) + (out + reason) / M * (typeof p.out === 'number' ? p.out : 0) + write / M * (typeof p.write === 'number' ? p.write : 0)
        currency = '$'
        priceNote = ' · 美元价(USD/百万)'
        modelKnown = true
      } else if (model) {
        // 回退：按模型名在全部 provider 里找
        for (const provKey of Object.keys(WFR_PIAI_PRICES)) {
          const entry = WFR_PIAI_PRICES[provKey][model]
          if (entry) {
            cost = hit / M * (typeof entry.read === 'number' ? entry.read : 0) + miss / M * (typeof entry.in === 'number' ? entry.in : 0) + (out + reason) / M * (typeof entry.out === 'number' ? entry.out : 0) + write / M * (typeof entry.write === 'number' ? entry.write : 0)
            currency = '$'
            priceNote = ' · 美元价(USD/百万)'
            modelKnown = true
            break
          }
        }
      }
      // 模型未知（turn-model 未返回/失败）：按 DeepSeek flash 空闲价兜底估算，与旧版本行为一致
      if (cost === null && !modelKnown) {
        const price = WFR_PRICES['deepseek-v4-flash']
        cost = hit / M * price.hit[0] + miss / M * price.miss[0] + (out + reason) / M * price.out[0]
        currency = '¥'
        priceNote = ' · 模型未知，按 flash 空闲价估算'
      }
      const missRate = totalInput > 0 ? miss / totalInput : 0
      const baseStyle = { order: 99, color: 'var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary))', fontSize: '12px', whiteSpace: 'nowrap', marginLeft: '4px' }
      if (!matched) {
        return React.createElement('span', {
          className: 'wfr-tokencost',
          title: '未匹配 messageId=' + String(messageId) + ' nodes=' + String(nodes ? nodes.size : 'none'),
          style: baseStyle,
        }, '·')
      }
      if (!sawUsage || (totalInput <= 0 && out <= 0 && reason <= 0)) {
        return React.createElement('span', {
          className: 'wfr-tokencost',
          title: '匹配到 turn=' + String(turn) + ' 但 usage 为空',
          style: baseStyle,
        }, '∅')
      }
      let label
      if (cost === null) {
        label = '?'
      } else {
        label = currency + cost.toFixed(4) + ' · 未命中 ' + (missRate * 100).toFixed(1) + '%'
      }
      const title = '模型 ' + (model || '未知') + (provider ? ' (' + provider + ')' : '') + ' · 本轮 token：缓存命中 ' + hit.toLocaleString() + ' / 未命中 ' + miss.toLocaleString() + ' / 输出 ' + (out + reason).toLocaleString() + (write > 0 ? ' / 缓存写入 ' + write.toLocaleString() : '') + priceNote + peakNote + ' [sid=' + String(props.sessionId) + ' mid=' + String(messageId) + ']'
      return React.createElement('span', {
        className: 'wfr-tokencost',
        title: title,
        style: baseStyle,
      }, label)
    }

    slots.inject('conversation.chat.assistant-actions', () => slots.register(
      { name: 'conversation.chat.assistant-actions', id: 'token-cost', order: 20 },
      (props) => React.createElement(TokenCostCell, props),
    ))

    ctx.effect(() => disposeStyles)
  
    };
    exports.name = "dsh-workspace-files";
    exports.apply = apply;
    return module.exports;
  }
});
