export default {
  name: "dsh-workspace-files",
  inject: ["webServer"],
  apply(ctx) {
    const shell = ctx.get('shell')
    const fs = ctx.get('fs')
    if (shell === undefined || fs === undefined) return

    function q(s) {
      return "'" + String(s).replace(/'/g, "''") + "'"
    }

    async function runShell(script, timeoutMs) {
      try {
        const target = await fs.resolve('.')
        const root = fs.processPath(target)
        const spec = shell.resolve({
          command: script,
          workdir: root,
          timeoutMs: timeoutMs || 20000,
          sandboxPolicy: { mode: 'danger-full-access', workspaceRoot: root },
        })
        const result = await shell.run(spec)
        const stdout = (result.stdout && result.stdout.text) || ''
        const stderr = (result.stderr && result.stderr.text) || ''
        if (result.exitCode !== 0) return { error: '命令执行失败，退出码 ' + String(result.exitCode), stdout: stdout, stderr: stderr }
        return { ok: true, stdout: stdout }
      } catch (err) {
        return { error: String((err && err.message) || err) }
      }
    }

    const handlers = {}

    handlers['list-fonts'] = async () => {
      // 纯注册表读取字体名（不依赖 System.Drawing，兼容受限 shell 环境）
      const script =
        " $names = @(); " +
        " try { $reg = Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts' -ErrorAction Stop } catch { $reg = $null }; " +
        " if ($reg) { foreach ($p in $reg.PSObject.Properties) { $n = $p.Name; if ($n -and $n -notlike 'PS*') { $names += ($n -replace '\\(TrueType\\)$','' -replace '\\(OpenType\\)$','') } } }; " +
        " $uniq = @($names | Where-Object { $_ -and $_.Trim() } | ForEach-Object { $_.Trim() } | Sort-Object -Unique); " +
        " $uniq -join [char]10"
      const res = await runShell(script, 30000)
      if (res.error) return { error: res.error, stdout: res.stdout || '', stderr: res.stderr || '' }
      const text = res.stdout || ''
      const names = text.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && s.length <= 80)
      return { fonts: Array.from(new Set(names)).sort((a, b) => a.localeCompare(b)) }
    }

    const webServer = ctx.get('webServer')
    if (webServer !== undefined) {
      async function readBody(req) {
        const chunks = []
        for await (const c of req) chunks.push(Buffer.from(c))
        return Buffer.concat(chunks).toString('utf8')
      }
      ctx.effect(() => webServer.register({
        kind: 'prefix',
        path: '/wfr/api',
        handler: async (req, res) => {
          const send = (code, obj) => {
            res.writeHead(code, { 'content-type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(obj))
          }
          try {
            const url = new URL(req.url || '/', 'http://localhost')
            let method = url.searchParams.get('method') || ''
            let args
            if (req.method === 'POST') {
              const raw = await readBody(req)
              if (raw) {
                const parsed = JSON.parse(raw)
                method = parsed.method || method
                args = parsed.args
              }
            }
            const fn = handlers[method]
            if (!fn) return send(404, { error: 'unknown method: ' + method })
            const result = await fn(args)
            return send(200, result === undefined ? { ok: true } : result)
          } catch (e) {
            return send(500, { error: String((e && e.message) || e) })
          }
        }
      }), 'wfr: api')
    }

  },
}
