import type { NavItem } from "../App";

interface Props {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  alertCount: number;
}

const sections = [
  {
    label: null,
    items: [
      { id: "dashboard" as NavItem, label: "Dashboard", icon: GridIcon },
    ],
  },
  {
    label: "Storage",
    items: [
      { id: "storage" as NavItem, label: "Storage Accounts", icon: DatabaseIcon },
    ],
  },
  {
    label: "Security",
    items: [
      { id: "firewall" as NavItem, label: "Firewall", icon: ShieldIcon },
      { id: "private-endpoint" as NavItem, label: "Private Endpoint", icon: LinkIcon },
      { id: "network" as NavItem, label: "Network Access", icon: NetworkIcon },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { id: "security-tests" as NavItem, label: "Security Tests", icon: ActivityIcon },
      { id: "diagnostics" as NavItem, label: "Diagnostics & Logs", icon: FileTextIcon },
      { id: "alerts" as NavItem, label: "Alerts", icon: BellIcon },
    ],
  },
  {
    label: null,
    items: [
      { id: "settings" as NavItem, label: "Settings", icon: SettingsIcon },
    ],
  },
];

export default function Sidebar({ active, onNavigate, alertCount }: Props) {
  return (
    <aside
      className="flex flex-col h-full shrink-0"
      style={{
        width: 248,
        background: "var(--color-navy)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 38, height: 38, background: "var(--color-azure)" }}
          >
            <ShieldIcon size={20} color="white" />
          </div>
          <div>
            <div
              className="font-bold text-base leading-tight"
              style={{ color: "white", fontFamily: "var(--font-display)" }}
            >
              SecureStore
            </div>
            <div className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>
              Azure Storage Security
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 8 }} />

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
        {sections.map((section, si) => (
          <div key={si} className={si > 0 ? "pt-3" : ""}>
            {section.label && (
              <div
                className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
              >
                {section.label}
              </div>
            )}
            {section.items.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left"
                  style={{
                    background: isActive ? "var(--color-azure)" : "transparent",
                    color: isActive ? "white" : "rgba(255,255,255,0.62)",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.62)";
                    }
                  }}
                >
                  <Icon size={17} color="currentColor" />
                  {label}
                  {id === "alerts" && alertCount > 0 && (
                    <span
                      className="ml-auto text-xs font-bold rounded-full flex items-center justify-center"
                      style={{ width: 18, height: 18, background: "var(--color-red)", color: "white", fontSize: 10 }}
                    >
                      {alertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer user */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 20px" }}>
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ width: 34, height: 34, background: "rgba(22,119,255,0.3)", color: "var(--color-azure-mid)" }}
          >
            AZ
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.88)" }}>Azure Admin</div>
            <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.38)" }}>Subscription Owner</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function GridIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  );
}
function DatabaseIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  );
}
function ShieldIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function LinkIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <polyline points="8.59 13.51 15.42 17.49"/><polyline points="15.41 6.51 8.59 10.49"/>
    </svg>
  );
}
function NetworkIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="6" height="6" rx="1.5"/><rect x="16" y="2" width="6" height="6" rx="1.5"/>
      <rect x="9" y="16" width="6" height="6" rx="1.5"/>
      <path d="M5 8v2a4 4 0 004 4h6a4 4 0 004-4V8"/><line x1="12" y1="16" x2="12" y2="12"/>
    </svg>
  );
}
function ActivityIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}
function FileTextIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}
function BellIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}
function SettingsIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}
