import { useMemo, useState } from "react";

type Account = {
  name: string;
  location: string;
  type: string;
  status: "Available" | "Attention";
  replication: string;
  encryption: "Enabled";
  publicAccess: "Disabled" | "Selected networks";
  used: string;
  containers: number;
  security: "Protected" | "Review";
  resourceGroup: string;
};

const accounts: Account[] = [
  { name: "stsecurityproject001", location: "Central India", type: "StorageV2", status: "Available", replication: "GRS", encryption: "Enabled", publicAccess: "Disabled", used: "428 GB", containers: 12, security: "Protected", resourceGroup: "rg-security-project" },
  { name: "stsecurearchive002", location: "West Europe", type: "BlobStorage", status: "Available", replication: "RA-GRS", encryption: "Enabled", publicAccess: "Selected networks", used: "1.24 TB", containers: 8, security: "Protected", resourceGroup: "rg-data-archive" },
  { name: "stappdataeast003", location: "East US 2", type: "StorageV2", status: "Attention", replication: "LRS", encryption: "Enabled", publicAccess: "Selected networks", used: "86 GB", containers: 5, security: "Review", resourceGroup: "rg-app-production" },
  { name: "stauditlogs004", location: "Central India", type: "StorageV2", status: "Available", replication: "ZRS", encryption: "Enabled", publicAccess: "Disabled", used: "319 GB", containers: 3, security: "Protected", resourceGroup: "rg-security-logs" },
];

export default function StorageAccountsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [accessFilter, setAccessFilter] = useState("All");
  const [selected, setSelected] = useState<Account | null>(null);

  const filtered = useMemo(() => accounts.filter((account) => {
    const matchesQuery = `${account.name} ${account.location} ${account.type}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || account.security === statusFilter;
    const matchesAccess = accessFilter === "All" || account.publicAccess === accessFilter;
    return matchesQuery && matchesStatus && matchesAccess;
  }), [query, statusFilter, accessFilter]);

  return (
    <div className="space-y-6" style={{ fontFamily: "var(--font-body)" }}>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Storage Accounts</h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Security posture and capacity across connected Azure Storage resources</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--color-green)", background: "var(--color-green-light)" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-green)" }} />
          {accounts.filter((item) => item.security === "Protected").length} of {accounts.length} protected
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          ["Storage Accounts", accounts.length, "var(--color-azure)", "Connected resources"],
          ["Protected", accounts.filter((item) => item.security === "Protected").length, "var(--color-green)", "Passing security policy"],
          ["Used Storage", "2.07 TB", "var(--color-purple)", "Across all accounts"],
          ["Needs Review", accounts.filter((item) => item.security === "Review").length, "var(--color-amber)", "Configuration finding"],
        ].map(([label, value, color, sub]) => (
          <div key={label} className="p-5 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
            <div className="text-xs font-medium mb-2" style={{ color: "var(--color-text-muted)" }}>{label}</div>
            <div className="text-2xl font-bold" style={{ color: String(color), fontFamily: "var(--font-display)" }}>{value}</div>
            <div className="text-xs mt-1" style={{ color: "var(--color-text-light)" }}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex flex-wrap items-center gap-3 p-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="relative flex-1 min-w-64">
            <svg className="absolute left-3 top-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input aria-label="Search storage accounts" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by account, location, or type" className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", color: "var(--color-navy-text)", background: "var(--color-page-bg)" }} />
          </div>
          <select aria-label="Filter by security status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-body)", background: "var(--color-white)" }}>
            <option>All</option><option>Protected</option><option>Review</option>
          </select>
          <select aria-label="Filter by public access" value={accessFilter} onChange={(event) => setAccessFilter(event.target.value)} className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-body)", background: "var(--color-white)" }}>
            <option>All</option><option>Disabled</option><option>Selected networks</option>
          </select>
          {(query || statusFilter !== "All" || accessFilter !== "All") && (
            <button onClick={() => { setQuery(""); setStatusFilter("All"); setAccessFilter("All"); }} className="px-3 py-2 text-sm font-medium" style={{ color: "var(--color-azure)" }}>Clear filters</button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--color-page-bg)" }}>
              <tr>{["Account", "Location / Type", "Status", "Replication", "Encryption", "Public Access", "Usage", "Security", ""].map((heading) => <th key={heading} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)" }}>{heading}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((account) => (
                <tr key={account.name} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
                  <td className="px-4 py-4"><div className="font-semibold" style={{ color: "var(--color-azure)", fontFamily: "var(--font-mono)" }}>{account.name}</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{account.containers} containers</div></td>
                  <td className="px-4 py-4"><div style={{ color: "var(--color-navy-text)" }}>{account.location}</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{account.type}</div></td>
                  <td className="px-4 py-4"><StatusBadge label={account.status} tone={account.status === "Available" ? "green" : "amber"} /></td>
                  <td className="px-4 py-4" style={{ color: "var(--color-text-body)", fontFamily: "var(--font-mono)" }}>{account.replication}</td>
                  <td className="px-4 py-4"><StatusBadge label={account.encryption} tone="green" /></td>
                  <td className="px-4 py-4"><StatusBadge label={account.publicAccess} tone={account.publicAccess === "Disabled" ? "green" : "azure"} /></td>
                  <td className="px-4 py-4 font-semibold" style={{ color: "var(--color-navy-text)" }}>{account.used}</td>
                  <td className="px-4 py-4"><StatusBadge label={account.security} tone={account.security === "Protected" ? "green" : "amber"} /></td>
                  <td className="px-4 py-4 text-right"><button onClick={() => setSelected(account)} className="px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap" style={{ color: "var(--color-azure)", background: "var(--color-azure-light)" }}>View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="py-12 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>No storage accounts match these filters.</div>}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(7,27,58,0.38)" }} onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card-hover)" }} onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between mb-6"><div><div className="text-lg font-bold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>{selected.name}</div><div className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{selected.resourceGroup} · {selected.location}</div></div><button aria-label="Close details" onClick={() => setSelected(null)} className="w-9 h-9 rounded-lg text-lg" style={{ color: "var(--color-text-muted)", background: "var(--color-page-bg)" }}>×</button></div>
            <div className="grid grid-cols-2 gap-3">{[["Account type", selected.type], ["Replication", selected.replication], ["Encryption", selected.encryption], ["Public access", selected.publicAccess], ["Used storage", selected.used], ["Containers", selected.containers], ["Availability", selected.status], ["Security status", selected.security]].map(([label, value]) => <div key={label} className="p-3 rounded-xl" style={{ background: "var(--color-page-bg)" }}><div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>{label}</div><div className="text-sm font-semibold" style={{ color: "var(--color-navy-text)" }}>{value}</div></div>)}</div>
            <div className="mt-5 flex items-center gap-2 p-3 rounded-xl text-sm" style={{ color: selected.security === "Protected" ? "var(--color-green)" : "var(--color-amber)", background: selected.security === "Protected" ? "var(--color-green-light)" : "var(--color-amber-light)" }}>{selected.security === "Protected" ? "All required storage security controls are enabled." : "Review public network access and replication policy."}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: "green" | "amber" | "azure" }) {
  const style = tone === "green" ? { color: "var(--color-green)", background: "var(--color-green-light)" } : tone === "amber" ? { color: "var(--color-amber)", background: "var(--color-amber-light)" } : { color: "var(--color-azure)", background: "var(--color-azure-light)" };
  return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={style}>{label}</span>;
}
