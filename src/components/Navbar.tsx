import type { NavItem } from "../App";

interface Props {
  active: NavItem;
  alertCount: number;
  onNavigate: (item: NavItem) => void;
}

const pageTitles: Record<NavItem, { title: string; subtitle: string }> = {
  dashboard: { title: "Storage Security Overview", subtitle: "Monitor and protect your Azure Storage Account" },
  storage: { title: "Storage Accounts", subtitle: "Manage your Azure Storage resources" },
  firewall: { title: "Firewall Configuration", subtitle: "Control network access to your storage account" },
  "private-endpoint": { title: "Private Endpoint", subtitle: "Manage private connectivity via Azure Private Link" },
  network: { title: "Network Access", subtitle: "Configure VNet and subnet rules" },
  "security-tests": { title: "Security Tests", subtitle: "Validate access controls and firewall policies" },
  diagnostics: { title: "Diagnostics & Logs", subtitle: "Storage and firewall event logs" },
  alerts: { title: "Alerts", subtitle: "Security notifications and incidents" },
  settings: { title: "Settings", subtitle: "Configure dashboard and workspace preferences" },
};

export default function Navbar({ active, alertCount, onNavigate }: Props) {
  const { title, subtitle } = pageTitles[active];

  return (
    <header
      className="flex items-center justify-between px-8"
      style={{
        height: 68,
        background: "var(--color-white)",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0,
      }}
    >
      {/* Left: Title */}
      <div>
        <h1
          className="text-lg font-bold leading-tight"
          style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{subtitle}</p>
      </div>

      {/* Right: Storage selector + actions */}
      <div className="flex items-center gap-4">
        {/* Storage account selector */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all"
          style={{
            background: "var(--color-page-bg)",
            border: "1px solid var(--color-border)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-azure)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
        >
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              stsecurityproject001
            </div>
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Central India</div>
          </div>
          <div className="flex items-center gap-1.5 pl-3" style={{ borderLeft: "1px solid var(--color-border)" }}>
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-green)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--color-green)" }}>Protected</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-text-muted)" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

        {/* Icon buttons */}
        {[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            ),
            badge: alertCount > 0,
            label: "Open alerts",
            onClick: () => onNavigate("alerts" as NavItem),
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ),
            badge: false,
            label: "Open help",
            onClick: () => window.open("https://learn.microsoft.com/azure/storage/common/storage-network-security", "_blank", "noopener,noreferrer"),
          },
        ].map((btn, i) => (
          <button
            key={i}
            aria-label={btn.label}
            onClick={btn.onClick}
            className="relative flex items-center justify-center rounded-xl transition-all"
            style={{
              width: 40, height: 40,
              background: "var(--color-page-bg)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-azure-light)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-azure)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-azure)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-page-bg)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
            }}
          >
            {btn.icon}
            {btn.badge && (
              <span
                className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full flex items-center justify-center text-white"
                style={{ background: "var(--color-red)", fontSize: 9, border: "2px solid var(--color-white)" }}
              >
                {alertCount}
              </span>
            )}
          </button>
        ))}

        {/* Avatar */}
        <button
          className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl transition-all"
          style={{ background: "var(--color-page-bg)", border: "1px solid var(--color-border)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-azure)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
          }}
        >
          <div
            className="rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ width: 30, height: 30, background: "var(--color-navy)", color: "white" }}
          >
            AZ
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold" style={{ color: "var(--color-navy-text)" }}>Azure Admin</div>
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Owner</div>
          </div>
        </button>
      </div>
    </header>
  );
}
