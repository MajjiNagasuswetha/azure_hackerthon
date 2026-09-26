import { useState } from "react";

export default function DiagnosticsPage() {
  const logs = [
    { time: "14:32:11", level: "INFO", category: "StorageLogs", message: "BlobService.GetBlob — 200 OK", ip: "10.0.1.12", size: "4.2 KB" },
    { time: "14:31:58", level: "WARN", category: "FirewallLogs", message: "Request denied — unauthorized IP 104.45.23.18", ip: "104.45.23.18", size: "—" },
    { time: "14:31:44", level: "INFO", category: "AccessLogs", message: "Private endpoint connection verified — 10.0.1.5", ip: "10.0.1.5", size: "—" },
    { time: "14:30:22", level: "INFO", category: "StorageLogs", message: "BlobService.PutBlob — 201 Created", ip: "10.0.1.10", size: "18.7 MB" },
    { time: "14:29:03", level: "WARN", category: "FirewallLogs", message: "Unapproved subnet blocked — 10.0.2.14", ip: "10.0.2.14", size: "—" },
    { time: "14:28:57", level: "INFO", category: "StorageLogs", message: "Diagnostic log batch flushed to LAW", ip: "internal", size: "—" },
    { time: "14:27:11", level: "ERROR", category: "AccessLogs", message: "Authentication failed — expired SAS token", ip: "203.0.113.8", size: "—" },
    { time: "14:25:13", level: "WARN", category: "FirewallLogs", message: "SAS token from unrecognized IP rejected", ip: "104.20.45.9", size: "—" },
  ];

  const levelColors: Record<string, { color: string; bg: string }> = {
    INFO: { color: "var(--color-azure)", bg: "rgba(14,165,233,0.15)" },
    WARN: { color: "var(--color-amber)", bg: "rgba(245,158,11,0.15)" },
    ERROR: { color: "var(--color-red)", bg: "rgba(239,68,68,0.15)" },
  };

  const categories = ["StorageLogs", "FirewallLogs", "AccessLogs"];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Diagnostics & Logs</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Storage diagnostic data · stsecurityproject001 · Log Analytics Workspace
        </p>
      </div>

      {/* Delivery Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            name: "Storage Logs",
            destination: "law-security-workspace",
            statusColor: "green",
            events: 1247,
            latency: "4.2 min",
            icon: "🗄️",
          },
          {
            name: "Firewall Logs",
            destination: "law-security-workspace",
            statusColor: "green",
            events: 89,
            latency: "3.8 min",
            icon: "🛡️",
          },
          {
            name: "Access Logs",
            destination: "law-security-workspace",
            statusColor: "amber",
            events: 312,
            latency: "8.4 min",
            icon: "🔑",
          },
        ].map((cat) => (
          <div
            key={cat.name}
            className="rounded-xl p-5"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="text-xl flex items-center justify-center rounded-lg"
                style={{ width: 40, height: 40, background: "var(--color-surface)" }}
              >
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{cat.name}</div>
                <div className="text-xs truncate" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                  → {cat.destination}
                </div>
              </div>
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold"
                style={{
                  background: cat.statusColor === "green" ? "rgba(34,197,94,0.15)" : "rgba(245,158,11,0.15)",
                  color: cat.statusColor === "green" ? "var(--color-green)" : "var(--color-amber)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: cat.statusColor === "green" ? "var(--color-green)" : "var(--color-amber)" }}
                />
                {cat.statusColor === "green" ? "ACTIVE" : "REVIEW"}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg" style={{ background: "var(--color-surface)" }}>
                <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>Events (24h)</div>
                <div className="text-lg font-bold" style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }}>
                  {cat.events.toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 rounded-lg" style={{ background: "var(--color-surface)" }}>
                <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>Avg Latency</div>
                <div
                  className="text-lg font-bold"
                  style={{
                    color: cat.statusColor === "amber" ? "var(--color-amber)" : "var(--color-azure)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {cat.latency}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Filter:</span>
        {["All", ...categories].map((cat, i) => (
          <CategoryChip key={cat} label={cat} defaultActive={i === 0} />
        ))}
        <div className="ml-auto">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "var(--color-azure)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(14,165,233,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(14,165,233,0.1)")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export Logs
          </button>
        </div>
      </div>

      {/* Log Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid var(--color-border-subtle)", background: "var(--color-surface)" }}
        >
          <div className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>Recent Events</div>
          <div className="text-xs" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
            Showing 8 of 1,648 events · Last updated 14:32:11
          </div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
              {["Time (UTC)", "Level", "Category", "Message", "Source IP", "Data"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => {
              const lc = levelColors[log.level];
              return (
                <LogRow key={i} log={log} lc={lc} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LogRow({ log, lc }: { log: { time: string; level: string; category: string; message: string; ip: string; size: string }; lc: { color: string; bg: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      style={{ borderBottom: "1px solid var(--color-border-subtle)", background: hovered ? "var(--color-card-hover)" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td className="px-4 py-3" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
        {log.time}
      </td>
      <td className="px-4 py-3">
        <span
          className="px-2 py-0.5 rounded text-xs font-bold"
          style={{ background: lc.bg, color: lc.color, fontFamily: "var(--font-mono)" }}
        >
          {log.level}
        </span>
      </td>
      <td className="px-4 py-3" style={{ color: "var(--color-azure)", fontFamily: "var(--font-mono)" }}>{log.category}</td>
      <td className="px-4 py-3" style={{ color: "var(--color-text-primary)" }}>{log.message}</td>
      <td className="px-4 py-3" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{log.ip}</td>
      <td className="px-4 py-3" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{log.size}</td>
    </tr>
  );
}

function CategoryChip({ label, defaultActive }: { label: string; defaultActive?: boolean }) {
  const [active, setActive] = useState(defaultActive ?? false);
  return (
    <button
      onClick={() => setActive(!active)}
      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{
        background: active ? "rgba(14,165,233,0.15)" : "var(--color-surface)",
        color: active ? "var(--color-azure)" : "var(--color-text-muted)",
        border: active ? "1px solid rgba(14,165,233,0.4)" : "1px solid var(--color-border)",
      }}
    >
      {label}
    </button>
  );
}
