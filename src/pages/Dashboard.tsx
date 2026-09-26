const SCORE = 92;
const CIRCUMFERENCE = 2 * Math.PI * 54;

export default function Dashboard({ onNavigate }: { onNavigate: (page: "diagnostics") => void }) {
  return (
    <div style={{ maxWidth: 1200, fontFamily: "var(--font-body)" }} className="space-y-6">

      {/* ── Row 1: Summary cards ── */}
      <div className="grid grid-cols-4 gap-5">
        <SummaryCard
          label="Security Status"
          value="PROTECTED"
          sub="Excellent security posture"
          accent="var(--color-green)"
          bg="var(--color-green-light)"
          icon={<ShieldCheckIcon color="var(--color-green)" />}
        />
        <SummaryCard
          label="Firewall"
          value="ENABLED"
          sub="Public access blocked"
          accent="var(--color-azure)"
          bg="var(--color-azure-light)"
          icon={<FirewallIcon color="var(--color-azure)" />}
        />
        <SummaryCard
          label="Private Endpoint"
          value="CONNECTED"
          sub="Private connectivity active"
          accent="var(--color-purple)"
          bg="var(--color-purple-light)"
          icon={<LinkIcon color="var(--color-purple)" />}
        />
        {/* Score card */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{
            background: "var(--color-white)",
            boxShadow: "var(--shadow-card)",
            borderRadius: "var(--radius-card)",
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-muted)" }}>
            Security Score
          </div>
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E9F2" strokeWidth="10"/>
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="url(#scoreG)" strokeWidth="10"
                strokeDasharray={`${(SCORE / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="scoreG" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1677FF"/>
                  <stop offset="100%" stopColor="#16A34A"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span className="text-3xl font-bold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                {SCORE}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>/ 100</span>
            </div>
          </div>
          <div className="mt-2 text-xs font-medium" style={{ color: "var(--color-green)" }}>Excellent protection</div>
        </div>
      </div>

      {/* ── Row 2: Network diagram + Status sidebar ── */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1fr 320px" }}>

        {/* Network Architecture Card */}
        <div
          className="p-7"
          style={{
            background: "var(--color-white)",
            borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="mb-6">
            <div className="text-base font-bold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>
              Network Security Architecture
            </div>
            <div className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              Traffic flow and access control enforcement
            </div>
          </div>

          <NetworkDiagram />
        </div>

        {/* Security Status panel */}
        <div
          className="p-6"
          style={{
            background: "var(--color-white)",
            borderRadius: "var(--radius-card)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="text-base font-bold mb-5" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>
            Security Status
          </div>
          <div className="space-y-4">
            {[
              { label: "Public Access", status: "BLOCKED", color: "var(--color-red)", bg: "var(--color-red-light)" },
              { label: "Firewall", status: "ACTIVE", color: "var(--color-azure)", bg: "var(--color-azure-light)" },
              { label: "Private Endpoint", status: "CONNECTED", color: "var(--color-purple)", bg: "var(--color-purple-light)" },
              { label: "Private DNS", status: "CONNECTED", color: "var(--color-purple)", bg: "var(--color-purple-light)" },
              { label: "Approved Subnet", status: "ALLOWED", color: "var(--color-green)", bg: "var(--color-green-light)" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "var(--color-text-body)" }}>{row.label}</span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ color: row.color, background: row.bg, fontFamily: "var(--font-mono)" }}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4 rounded-xl"
            style={{ background: "var(--color-green-light)", border: "1px solid rgba(22,163,74,0.2)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheckIcon color="var(--color-green)" size={16} />
              <span className="text-sm font-semibold" style={{ color: "var(--color-green)" }}>Fully Secured</span>
            </div>
            <p className="text-xs" style={{ color: "var(--color-green)", opacity: 0.8 }}>
              All access routes comply with security policy. No public exposure detected.
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span style={{ color: "var(--color-text-muted)" }}>Last assessed</span>
              <span className="font-medium" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)" }}>Aug 26, 2026</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: "var(--color-text-muted)" }}>Resource group</span>
              <span className="font-medium" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)" }}>rg-security-project</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: "var(--color-text-muted)" }}>Private IP</span>
              <span className="font-medium" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)" }}>10.0.1.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Events table ── */}
      <div
        className="p-6"
        style={{
          background: "var(--color-white)",
          borderRadius: "var(--radius-card)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-base font-bold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>
              Recent Security Events
            </div>
            <div className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>Live firewall and access control activity</div>
          </div>
          <button
            onClick={() => onNavigate("diagnostics")}
            className="text-sm font-medium px-4 py-2 rounded-xl transition-all"
            style={{ color: "var(--color-azure)", background: "var(--color-azure-light)", border: "1px solid rgba(22,119,255,0.2)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D9EAFF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-azure-light)")}
          >
            View All Logs
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              {["Event", "Source", "Status", "Time"].map((h) => (
                <th
                  key={h}
                  className="text-left pb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ "--tw-divide-color": "var(--color-border)" } as React.CSSProperties}>
            {[
              { event: "Firewall rule evaluated", source: "Internet", status: "BLOCKED", statusColor: "var(--color-red)", statusBg: "var(--color-red-light)", time: "14:32" },
              { event: "Private endpoint verified", source: "10.0.1.5", status: "ALLOWED", statusColor: "var(--color-green)", statusBg: "var(--color-green-light)", time: "14:31" },
              { event: "Subnet access validated", source: "10.0.1.0/24", status: "ALLOWED", statusColor: "var(--color-green)", statusBg: "var(--color-green-light)", time: "14:30" },
              { event: "Diagnostic logs flushed", source: "Azure Service", status: "SUCCESS", statusColor: "var(--color-azure)", statusBg: "var(--color-azure-light)", time: "14:28" },
              { event: "Unauthorized request", source: "Internet", status: "BLOCKED", statusColor: "var(--color-red)", statusBg: "var(--color-red-light)", time: "14:25" },
            ].map((row, i) => (
              <EventRow key={i} {...row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EventRow({ event, source, status, statusColor, statusBg, time }: {
  event: string; source: string; status: string;
  statusColor: string; statusBg: string; time: string;
}) {
  return (
    <tr
      className="transition-colors"
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td className="py-3.5 pr-6">
        <span className="text-sm font-medium" style={{ color: "var(--color-navy-text)" }}>{event}</span>
      </td>
      <td className="py-3.5 pr-6">
        <span className="text-sm" style={{ color: "var(--color-text-body)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{source}</span>
      </td>
      <td className="py-3.5 pr-6">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ color: statusColor, background: statusBg, fontFamily: "var(--font-mono)" }}
        >
          {status}
        </span>
      </td>
      <td className="py-3.5">
        <span className="text-sm" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>{time}</span>
      </td>
    </tr>
  );
}

function NetworkDiagram() {
  const nodes = [
    {
      icon: <GlobeIcon />,
      label: "Internet",
      sub: "Public Network",
      color: "var(--color-text-muted)",
      bg: "#F3F4F6",
      border: "#D1D5DB",
    },
    null, // arrow with BLOCKED label
    {
      icon: <BlockIcon />,
      label: "Public Access",
      sub: "BLOCKED",
      color: "var(--color-red)",
      bg: "var(--color-red-light)",
      border: "rgba(239,68,68,0.3)",
      pill: { text: "BLOCKED", color: "var(--color-red)", bg: "var(--color-red-light)" },
    },
    null, // arrow
    {
      icon: <SubnetIcon />,
      label: "Approved Subnet",
      sub: "10.0.1.0/24",
      color: "var(--color-green)",
      bg: "var(--color-green-light)",
      border: "rgba(22,163,74,0.3)",
      pill: { text: "ALLOWED", color: "var(--color-green)", bg: "var(--color-green-light)" },
    },
    null, // arrow
    {
      icon: <EndpointIcon />,
      label: "Private Endpoint",
      sub: "10.0.1.5",
      color: "var(--color-purple)",
      bg: "var(--color-purple-light)",
      border: "rgba(124,58,237,0.3)",
      pill: { text: "CONNECTED", color: "var(--color-purple)", bg: "var(--color-purple-light)" },
    },
    null, // arrow
    {
      icon: <StorageIcon />,
      label: "Storage Account",
      sub: "stsecurityproject001",
      color: "var(--color-azure)",
      bg: "var(--color-azure-light)",
      border: "rgba(22,119,255,0.3)",
      pill: { text: "SECURE", color: "var(--color-green)", bg: "var(--color-green-light)" },
    },
  ];

  return (
    <div className="flex items-center justify-between px-2">
      {nodes.map((node, i) => {
        if (!node) {
          return (
            <div key={i} className="flex items-center justify-center" style={{ flex: "0 0 48px" }}>
              <ArrowRight />
            </div>
          );
        }
        return (
          <div key={i} className="flex flex-col items-center text-center" style={{ flex: "0 0 120px" }}>
            <div
              className="flex items-center justify-center rounded-2xl mb-3 transition-all duration-200"
              style={{
                width: 72,
                height: 72,
                background: node.bg,
                border: `2px solid ${node.border}`,
                color: node.color,
              }}
            >
              {node.icon}
            </div>
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>
              {node.label}
            </div>
            <div className="text-xs mb-2" style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
              {node.sub}
            </div>
            {node.pill && (
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{ color: node.pill.color, background: node.pill.bg, fontFamily: "var(--font-mono)" }}
              >
                {node.pill.text}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SummaryCard({ label, value, sub, accent, bg, icon }: {
  label: string; value: string; sub: string; accent: string; bg: string; icon: React.ReactNode;
}) {
  return (
    <div
      className="p-6 rounded-2xl transition-all duration-200 cursor-default"
      style={{
        background: "var(--color-white)",
        boxShadow: "var(--shadow-card)",
        borderRadius: "var(--radius-card)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card)")}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 44, height: 44, background: bg }}
        >
          {icon}
        </div>
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </div>
      <div
        className="text-xl font-bold mb-1"
        style={{ color: accent, fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
      >
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{sub}</div>
    </div>
  );
}

/* ── Icons ── */
function ShieldCheckIcon({ color = "currentColor", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
function FirewallIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      <line x1="7" y1="8" x2="7" y2="12"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="17" y1="9" x2="17" y2="12"/>
    </svg>
  );
}
function LinkIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <polyline points="8.59 13.51 15.42 17.49"/><polyline points="15.41 6.51 8.59 10.49"/>
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}
function BlockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    </svg>
  );
}
function SubnetIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
function EndpointIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <polyline points="8.59 13.51 15.42 17.49"/><polyline points="15.41 6.51 8.59 10.49"/>
    </svg>
  );
}
function StorageIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
      <line x1="0" y1="8" x2="22" y2="8" stroke="#D1D9E8" strokeWidth="2"/>
      <polyline points="16,3 23,8 16,13" fill="none" stroke="#D1D9E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
