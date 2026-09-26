import { useState } from "react";

function Toggle({ value, onChange, danger }: { value: boolean; onChange: (v: boolean) => void; danger?: boolean }) {
  const on = danger ? "var(--color-red)" : "var(--color-azure)";
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative rounded-full transition-all duration-300 shrink-0"
      style={{ width: 48, height: 26, background: value ? on : "#D1D9E8" }}
    >
      <span
        className="absolute top-1 rounded-full bg-white shadow transition-all duration-300"
        style={{ width: 18, height: 18, left: value ? 26 : 4 }}
      />
    </button>
  );
}

export default function FirewallPage() {
  const [publicAccess, setPublicAccess] = useState(false);
  const [trustedServices, setTrustedServices] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6" style={{ maxWidth: 820, fontFamily: "var(--font-body)" }}>
      <div>
        <h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>
          Firewall Configuration
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Network-level access controls for stsecurityproject001
        </p>
      </div>

      {/* Public Network Access */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--color-navy-text)" }}>Public Network Access</div>
            <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Controls whether the storage account can be reached from public internet endpoints.
            </div>
          </div>
          <div className="flex items-center gap-3 ml-6 shrink-0">
            <span className="text-sm font-semibold" style={{ color: publicAccess ? "var(--color-red)" : "var(--color-green)" }}>
              {publicAccess ? "Enabled" : "Disabled"}
            </span>
            <Toggle value={publicAccess} onChange={setPublicAccess} danger />
          </div>
        </div>
        {!publicAccess && (
          <div
            className="mt-4 flex items-center gap-3 p-3.5 rounded-xl text-sm"
            style={{ background: "var(--color-green-light)", color: "var(--color-green)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Public internet access is blocked. All traffic must route through the approved VNet or Private Endpoint.
          </div>
        )}
      </Card>

      {/* VNet Rules */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-navy-text)" }}>Virtual Network Rules</div>
            <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>Subnets permitted to access storage</div>
          </div>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ color: "var(--color-green)", background: "var(--color-green-light)", fontFamily: "var(--font-mono)" }}
          >
            1 RULE ACTIVE
          </span>
        </div>

        <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--color-border)" }}>
          <table className="w-full text-sm">
            <thead style={{ background: "var(--color-page-bg)" }}>
              <tr>
                {["Virtual Network", "Subnet", "CIDR Range", "Action", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", borderBottom: "1px solid var(--color-border)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-4 text-sm font-medium" style={{ color: "var(--color-azure)", fontFamily: "var(--font-mono)" }}>
                  storage-security-vnet
                </td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)" }}>
                  approved-subnet
                </td>
                <td className="px-5 py-4 text-sm" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)" }}>
                  10.0.1.0/24
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ color: "var(--color-green)", background: "var(--color-green-light)", fontFamily: "var(--font-mono)" }}
                  >
                    ALLOW
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-green)" }} />
                    <span className="text-sm" style={{ color: "var(--color-green)" }}>Active</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          className="mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
          style={{ color: "var(--color-azure)", background: "var(--color-azure-light)", border: "1px solid rgba(22,119,255,0.2)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#D9EAFF")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-azure-light)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Network Rule
        </button>
      </Card>

      {/* Trusted Azure Services */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold mb-1" style={{ color: "var(--color-navy-text)" }}>Trusted Azure Services</div>
            <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Allow Azure Backup, Site Recovery, Event Grid, and other Microsoft-managed services to bypass the firewall.
            </div>
          </div>
          <div className="flex items-center gap-3 ml-6 shrink-0">
            <span className="text-sm font-semibold" style={{ color: trustedServices ? "var(--color-azure)" : "var(--color-text-muted)" }}>
              {trustedServices ? "Enabled" : "Disabled"}
            </span>
            <Toggle value={trustedServices} onChange={setTrustedServices} />
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: saved ? "var(--color-green-light)" : "var(--color-azure)",
            color: saved ? "var(--color-green)" : "white",
            boxShadow: saved ? "none" : "0 4px 14px rgba(22,119,255,0.35)",
          }}
        >
          {saved ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Saved Successfully
            </>
          ) : (
            "Save Firewall Rules"
          )}
        </button>
        <button
          className="px-5 py-3 rounded-xl text-sm font-medium transition-all"
          style={{ color: "var(--color-text-body)", background: "var(--color-white)", border: "1px solid var(--color-border)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-page-bg)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-white)")}
        >
          Discard Changes
        </button>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-6"
      style={{
        background: "var(--color-white)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {children}
    </div>
  );
}
