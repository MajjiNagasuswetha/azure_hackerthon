export default function PrivateEndpointPage() {
  return (
    <div className="space-y-6" style={{ maxWidth: 900, fontFamily: "var(--font-body)" }}>
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>
          Private Endpoint
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Secure private connectivity via Azure Private Link for stsecurityproject001
        </p>
      </div>

      {/* Status banner */}
      <div
        className="flex items-center gap-5 p-5 rounded-2xl"
        style={{ background: "var(--color-purple-light)", border: "1px solid rgba(124,58,237,0.18)" }}
      >
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{ width: 52, height: 52, background: "rgba(124,58,237,0.12)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple)" strokeWidth="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <polyline points="8.59 13.51 15.42 17.49"/><polyline points="15.41 6.51 8.59 10.49"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-base font-bold mb-0.5" style={{ color: "var(--color-purple)", fontFamily: "var(--font-display)" }}>
            Private Endpoint Connected
          </div>
          <div className="text-sm" style={{ color: "rgba(124,58,237,0.7)" }}>
            All storage traffic is routed through a private network link. No public internet exposure.
          </div>
        </div>
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full shrink-0"
          style={{ background: "rgba(124,58,237,0.12)", color: "var(--color-purple)", fontFamily: "var(--font-mono)" }}
        >
          CONNECTED
        </span>
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
          <div className="text-sm font-bold mb-4" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Endpoint Details</div>
          <DetailRows rows={[
            { label: "Name", value: "storage-private-endpoint", mono: true },
            { label: "Private IP Address", value: "10.0.1.5", mono: true, accent: "var(--color-azure)" },
            { label: "Connection State", value: "Approved", badge: "CONNECTED", badgeColor: "purple" },
            { label: "Group ID", value: "blob", mono: true },
            { label: "NIC Resource", value: "storage-pe-nic.xyz", mono: true },
          ]} />
        </div>

        <div className="p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
          <div className="text-sm font-bold mb-4" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Network Configuration</div>
          <DetailRows rows={[
            { label: "Virtual Network", value: "storage-security-vnet", mono: true },
            { label: "Subnet", value: "approved-subnet", mono: true },
            { label: "Subnet CIDR", value: "10.0.1.0/24", mono: true },
            { label: "Resource Group", value: "rg-security-project" },
            { label: "Location", value: "Central India" },
          ]} />
        </div>
      </div>

      {/* DNS */}
      <div className="p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm font-bold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Private DNS Zone</div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ color: "var(--color-green)", background: "var(--color-green-light)", fontFamily: "var(--font-mono)" }}
          >
            CONNECTED
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "DNS Zone", value: "privatelink.blob.core.windows.net" },
            { label: "A Record", value: "stsecurityproject001 → 10.0.1.5" },
            { label: "TTL", value: "10 seconds" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl"
              style={{ background: "var(--color-page-bg)", border: "1px solid var(--color-border)" }}
            >
              <div className="text-xs font-medium mb-1.5" style={{ color: "var(--color-text-muted)" }}>{item.label}</div>
              <div className="text-sm font-semibold" style={{ color: "var(--color-azure)", fontFamily: "var(--font-mono)" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topology */}
      <div className="p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
        <div className="text-sm font-bold mb-6" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Connection Topology</div>
        <div className="flex items-center justify-around">
          {[
            { label: "Virtual Machine", sub: "vm-security-test", color: "var(--color-azure)", bg: "var(--color-azure-light)" },
            { label: "Subnet", sub: "10.0.1.0/24", color: "var(--color-azure)", bg: "var(--color-azure-light)" },
            { label: "Private Endpoint", sub: "10.0.1.5", color: "var(--color-purple)", bg: "var(--color-purple-light)" },
            { label: "Storage Account", sub: "stsecurityproject001", color: "var(--color-green)", bg: "var(--color-green-light)" },
          ].map((node, i, arr) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center text-center" style={{ width: 130 }}>
                <div
                  className="flex items-center justify-center rounded-2xl mb-3"
                  style={{ width: 64, height: 64, background: node.bg, border: `2px solid ${node.color}22` }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <><rect x="2" y="3" width="20" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="16" x2="12" y2="21"/></>}
                    {i === 1 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>}
                    {i === 2 && <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><polyline points="8.59 13.51 15.42 17.49"/><polyline points="15.41 6.51 8.59 10.49"/></>}
                    {i === 3 && <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></>}
                  </svg>
                </div>
                <div className="text-sm font-semibold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>{node.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{node.sub}</div>
              </div>
              {i < arr.length - 1 && (
                <div className="mx-2 shrink-0">
                  <svg width="36" height="14" viewBox="0 0 36 14" fill="none">
                    <line x1="0" y1="7" x2="28" y2="7" stroke="#D1D9E8" strokeWidth="2"/>
                    <polyline points="22,2 30,7 22,12" fill="none" stroke="#D1D9E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="flex items-center justify-center gap-2 mt-6 text-sm font-medium"
          style={{ color: "var(--color-green)" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          All traffic encrypted end-to-end via Azure Private Link
        </div>
      </div>
    </div>
  );
}

function DetailRows({ rows }: {
  rows: { label: string; value: string; mono?: boolean; accent?: string; badge?: string; badgeColor?: string }[];
}) {
  const badgeStyles: Record<string, { color: string; bg: string }> = {
    purple: { color: "var(--color-purple)", bg: "var(--color-purple-light)" },
    green: { color: "var(--color-green)", bg: "var(--color-green-light)" },
    azure: { color: "var(--color-azure)", bg: "var(--color-azure-light)" },
  };
  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const bs = row.badgeColor ? badgeStyles[row.badgeColor] : null;
        return (
          <div key={row.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{row.label}</span>
            <div className="flex items-center gap-2">
              {bs && row.badge && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ color: bs.color, background: bs.bg, fontFamily: "var(--font-mono)" }}
                >
                  {row.badge}
                </span>
              )}
              <span
                className="text-sm font-medium"
                style={{
                  color: row.accent ?? "var(--color-navy-text)",
                  fontFamily: row.mono ? "var(--font-mono)" : undefined,
                }}
              >
                {row.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
