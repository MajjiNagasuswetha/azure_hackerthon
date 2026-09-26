import { useEffect, useMemo, useState } from "react";

type Severity = "Critical" | "High" | "Medium" | "Low";
type AlertStatus = "Active" | "Resolved" | "Dismissed";
type Alert = { id: number; title: string; severity: Severity; type: string; resource: string; timestamp: string; status: AlertStatus; description: string; recommendation: string };

const initialAlerts: Alert[] = [
  { id: 1, title: "Repeated unauthorized access attempts", severity: "Critical", type: "Firewall", resource: "stsecurityproject001", timestamp: "Aug 26, 2026 · 14:31 UTC", status: "Active", description: "Twenty-seven requests from 104.45.23.18 were blocked within five minutes.", recommendation: "Confirm the address is not trusted and consider adding an explicit deny rule." },
  { id: 2, title: "Diagnostic log delivery delayed", severity: "High", type: "Monitoring", resource: "law-security-workspace", timestamp: "Aug 26, 2026 · 13:58 UTC", status: "Active", description: "Access log ingestion latency exceeded the configured eight-minute threshold.", recommendation: "Review workspace health and diagnostic setting delivery status." },
  { id: 3, title: "SAS token used from new location", severity: "Medium", type: "Identity", resource: "stsecurearchive002", timestamp: "Aug 26, 2026 · 12:42 UTC", status: "Active", description: "A valid SAS token was presented from an IP not seen in the previous 30 days.", recommendation: "Validate the activity with the token owner and rotate the token if unexpected." },
  { id: 4, title: "Replication policy below baseline", severity: "Low", type: "Configuration", resource: "stappdataeast003", timestamp: "Aug 26, 2026 · 10:19 UTC", status: "Active", description: "Locally redundant storage is configured where zone redundancy is recommended.", recommendation: "Evaluate ZRS for improved regional availability." },
  { id: 5, title: "Private endpoint DNS mismatch", severity: "High", type: "Private Endpoint", resource: "storage-private-endpoint", timestamp: "Aug 25, 2026 · 18:04 UTC", status: "Resolved", description: "The private DNS A record did not match the endpoint network interface.", recommendation: "No action required. DNS configuration has been corrected." },
  { id: 6, title: "Public blob access prevented", severity: "Medium", type: "Data Protection", resource: "stauditlogs004", timestamp: "Aug 25, 2026 · 09:16 UTC", status: "Dismissed", description: "A policy assignment prevented a container from enabling anonymous access.", recommendation: "No action required. The preventive control worked as expected." },
];

export default function AlertsPage({ onActiveCountChange }: { onActiveCountChange: (count: number) => void }) {
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    try {
      const saved = window.localStorage.getItem("securestore-alerts");
      return saved ? JSON.parse(saved) : initialAlerts;
    } catch {
      return initialAlerts;
    }
  });
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<Alert | null>(null);
  const [notice, setNotice] = useState("");
  const activeCount = alerts.filter((alert) => alert.status === "Active").length;

  useEffect(() => onActiveCountChange(activeCount), [activeCount, onActiveCountChange]);
  useEffect(() => {
    window.localStorage.setItem("securestore-alerts", JSON.stringify(alerts));
  }, [alerts]);

  const filtered = useMemo(() => alerts.filter((alert) => {
    const matchesQuery = `${alert.title} ${alert.type} ${alert.resource}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (severity === "All" || alert.severity === severity) && (status === "All" || alert.status === status);
  }), [alerts, query, severity, status]);

  const updateStatus = (alert: Alert, nextStatus: AlertStatus) => {
    setAlerts((current) => current.map((item) => item.id === alert.id ? { ...item, status: nextStatus } : item));
    setSelected((current) => current?.id === alert.id ? { ...current, status: nextStatus } : current);
    setNotice(`Alert ${nextStatus.toLowerCase()} successfully.`);
    window.setTimeout(() => setNotice(""), 3000);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: "var(--font-body)" }}>
      <div className="flex items-start justify-between"><div><h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Security Alerts</h2><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Investigate and respond to security findings across storage resources</p></div><div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold" style={{ color: activeCount ? "var(--color-red)" : "var(--color-green)", background: activeCount ? "var(--color-red-light)" : "var(--color-green-light)" }}><span className="w-2 h-2 rounded-full" style={{ background: activeCount ? "var(--color-red)" : "var(--color-green)" }} />{activeCount} active alerts</div></div>
      {notice && <div role="status" className="px-4 py-3 rounded-xl text-sm font-medium" style={{ color: "var(--color-green)", background: "var(--color-green-light)" }}>{notice}</div>}
      <div className="grid grid-cols-4 gap-4">{(["Critical", "High", "Medium", "Low"] as Severity[]).map((level) => <div key={level} className="p-5 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}><div className="flex items-center justify-between"><div><div className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>{level} severity</div><div className="text-2xl font-bold" style={{ color: severityColor(level), fontFamily: "var(--font-display)" }}>{alerts.filter((alert) => alert.severity === level && alert.status === "Active").length}</div></div><span className="w-3 h-3 rounded-full" style={{ background: severityColor(level) }} /></div></div>)}</div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex flex-wrap items-center gap-3 p-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="relative flex-1 min-w-64"><svg className="absolute left-3 top-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input aria-label="Search alerts" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search alerts, types, or resources" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", background: "var(--color-page-bg)" }} /></div>
          <select aria-label="Filter by severity" value={severity} onChange={(event) => setSeverity(event.target.value)} className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", background: "var(--color-white)" }}><option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", background: "var(--color-white)" }}><option>All</option><option>Active</option><option>Resolved</option><option>Dismissed</option></select>
        </div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead style={{ background: "var(--color-page-bg)" }}><tr>{["Alert", "Severity", "Type", "Affected Resource", "Timestamp", "Status", "Actions"].map((heading) => <th key={heading} className="text-left px-4 py-3 text-xs uppercase tracking-wider" style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)" }}>{heading}</th>)}</tr></thead>
          <tbody>{filtered.map((alert) => <tr key={alert.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}><td className="px-4 py-4"><button onClick={() => setSelected(alert)} className="text-left font-semibold" style={{ color: "var(--color-navy-text)" }}>{alert.title}</button></td><td className="px-4 py-4"><SeverityBadge value={alert.severity} /></td><td className="px-4 py-4" style={{ color: "var(--color-text-body)" }}>{alert.type}</td><td className="px-4 py-4" style={{ color: "var(--color-azure)", fontFamily: "var(--font-mono)" }}>{alert.resource}</td><td className="px-4 py-4 whitespace-nowrap text-xs" style={{ color: "var(--color-text-muted)" }}>{alert.timestamp}</td><td className="px-4 py-4"><StatusBadge value={alert.status} /></td><td className="px-4 py-4"><div className="flex gap-2"><button onClick={() => setSelected(alert)} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ color: "var(--color-azure)", background: "var(--color-azure-light)" }}>View</button>{alert.status === "Active" && <button onClick={() => updateStatus(alert, "Resolved")} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ color: "var(--color-green)", background: "var(--color-green-light)" }}>Resolve</button>}</div></td></tr>)}</tbody>
        </table>{filtered.length === 0 && <div className="py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No alerts match these filters.</div>}</div>
      </div>

      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(7,27,58,0.38)" }} onClick={() => setSelected(null)}><div className="w-full max-w-xl p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card-hover)" }} onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between mb-5"><div><div className="flex items-center gap-2 mb-2"><SeverityBadge value={selected.severity} /><StatusBadge value={selected.status} /></div><div className="text-lg font-bold" style={{ color: "var(--color-navy-text)" }}>{selected.title}</div></div><button aria-label="Close alert details" onClick={() => setSelected(null)} className="w-9 h-9 rounded-lg" style={{ color: "var(--color-text-muted)", background: "var(--color-page-bg)" }}>×</button></div><div className="grid grid-cols-2 gap-3 mb-5"><Info label="Alert type" value={selected.type} /><Info label="Affected resource" value={selected.resource} /><Info label="Detected" value={selected.timestamp} /><Info label="Current status" value={selected.status} /></div><div className="mb-4"><div className="text-xs font-semibold mb-2" style={{ color: "var(--color-text-muted)" }}>DESCRIPTION</div><div className="text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>{selected.description}</div></div><div className="p-4 rounded-xl mb-5" style={{ background: "var(--color-azure-light)" }}><div className="text-xs font-semibold mb-2" style={{ color: "var(--color-azure)" }}>RECOMMENDED ACTION</div><div className="text-sm" style={{ color: "var(--color-navy-text)" }}>{selected.recommendation}</div></div>{selected.status === "Active" && <div className="flex justify-end gap-3"><button onClick={() => updateStatus(selected, "Dismissed")} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-body)" }}>Dismiss</button><button onClick={() => updateStatus(selected, "Resolved")} className="px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "var(--color-green)", color: "var(--color-white)" }}>Mark Resolved</button></div>}</div></div>}
    </div>
  );
}

function severityColor(value: Severity) { return value === "Critical" ? "var(--color-red)" : value === "High" ? "var(--color-amber)" : value === "Medium" ? "var(--color-purple)" : "var(--color-azure)"; }
function SeverityBadge({ value }: { value: Severity }) { return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color: severityColor(value), background: value === "Critical" ? "var(--color-red-light)" : value === "High" ? "var(--color-amber-light)" : value === "Medium" ? "var(--color-purple-light)" : "var(--color-azure-light)" }}>{value}</span>; }
function StatusBadge({ value }: { value: AlertStatus }) { const active = value === "Active"; return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color: active ? "var(--color-red)" : value === "Resolved" ? "var(--color-green)" : "var(--color-text-muted)", background: active ? "var(--color-red-light)" : value === "Resolved" ? "var(--color-green-light)" : "var(--color-page-bg)" }}>{value}</span>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="p-3 rounded-xl" style={{ background: "var(--color-page-bg)" }}><div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>{label}</div><div className="text-sm font-semibold" style={{ color: "var(--color-navy-text)" }}>{value}</div></div>; }
