import { useState } from "react";

interface TestResult {
  id: string;
  name: string;
  description: string;
  source: string;
  expected: string;
  result: "BLOCKED" | "ALLOWED" | "WARNING";
  latency?: string;
  detail: string;
}

const tests: TestResult[] = [
  {
    id: "t1",
    name: "Public Internet Access",
    description: "Attempt storage access from public internet IP",
    source: "104.45.23.18 (Public Internet)",
    expected: "BLOCKED",
    result: "BLOCKED",
    latency: "42ms",
    detail: "HTTP 403 — AuthorizationFailure. Firewall blocked request from public IP. No data exposed.",
  },
  {
    id: "t2",
    name: "Approved Subnet Access",
    description: "Access via approved VNet subnet 10.0.1.0/24",
    source: "10.0.1.12 → approved-subnet",
    expected: "ALLOWED",
    result: "ALLOWED",
    latency: "8ms",
    detail: "HTTP 200 OK. Subnet 10.0.1.0/24 matched firewall whitelist. Access granted.",
  },
  {
    id: "t3",
    name: "Unapproved Subnet Access",
    description: "Access from non-whitelisted subnet in same VNet",
    source: "10.0.2.14 → dev-subnet",
    expected: "BLOCKED",
    result: "BLOCKED",
    latency: "38ms",
    detail: "HTTP 403 — AuthorizationFailure. Subnet 10.0.2.0/24 not in firewall rules. Request denied.",
  },
  {
    id: "t4",
    name: "Private Endpoint Connection",
    description: "Storage blob access via private endpoint NIC",
    source: "10.0.1.5 → storage-private-endpoint",
    expected: "ALLOWED",
    result: "ALLOWED",
    latency: "5ms",
    detail: "HTTP 200 OK. Private endpoint NIC resolved via privatelink.blob.core.windows.net. DNS A record matched.",
  },
  {
    id: "t5",
    name: "Diagnostic Log Delivery",
    description: "Verify storage diagnostic logs reach Log Analytics workspace",
    source: "stsecurityproject001 → law-security-workspace",
    expected: "ALLOWED",
    result: "WARNING",
    latency: "—",
    detail: "Logs queued but 3 delivery gaps detected in last 24h. Workspace ingestion latency: 8.4min. Manual review recommended.",
  },
];

const resultConfig = {
  BLOCKED: { color: "var(--color-green)", bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", label: "✅ BLOCKED", icon: "🛡️" },
  ALLOWED: { color: "var(--color-azure-glow)", bg: "rgba(14,165,233,0.1)", border: "rgba(14,165,233,0.25)", label: "✅ ALLOWED", icon: "✔️" },
  WARNING: { color: "var(--color-amber)", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", label: "⚠️ REVIEW", icon: "⚠️" },
};

export default function SecurityTestsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runComplete, setRunComplete] = useState(false);

  const handleRunAll = () => {
    setRunning(true);
    setRunComplete(false);
    setTimeout(() => {
      setRunning(false);
      setRunComplete(true);
    }, 2200);
  };

  const passed = tests.filter((t) => t.result !== "WARNING").length;
  const warnings = tests.filter((t) => t.result === "WARNING").length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Security Tests</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Validate firewall rules and access controls against live storage account
          </p>
        </div>
        <button
          onClick={handleRunAll}
          disabled={running}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: running ? "var(--color-card)" : "linear-gradient(135deg, #0ea5e9, #0369a1)",
            color: running ? "var(--color-text-muted)" : "white",
            boxShadow: running ? "none" : "0 4px 14px rgba(14,165,233,0.3)",
            cursor: running ? "not-allowed" : "pointer",
          }}
        >
          {running ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Running Tests…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Run All Tests
            </>
          )}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Tests", value: tests.length, color: "var(--color-azure)", mono: true },
          { label: "Passed", value: passed, color: "var(--color-green)", mono: true },
          { label: "Warnings", value: warnings, color: "var(--color-amber)", mono: true },
          { label: "Failed", value: 0, color: "var(--color-red)", mono: true },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl px-5 py-4"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}
          >
            <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
            <div className="text-2xl font-bold" style={{ color: s.color, fontFamily: "var(--font-mono)" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {runComplete && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
          style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "var(--color-green)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          All tests completed — {passed} passed, {warnings} require review · Aug 26, 2026 14:32:07 UTC
        </div>
      )}

      {/* Test Results */}
      <div className="space-y-3">
        {tests.map((test) => {
          const cfg = resultConfig[test.result];
          const isExpanded = expanded === test.id;
          return (
            <div
              key={test.id}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: "var(--color-card)",
                border: `1px solid ${isExpanded ? cfg.border : "var(--color-border)"}`,
              }}
            >
              <button
                className="w-full flex items-center gap-4 p-5 text-left transition-all"
                onClick={() => setExpanded(isExpanded ? null : test.id)}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => { if (!isExpanded) (e.currentTarget.parentElement as HTMLElement).style.borderColor = cfg.border; }}
                onMouseLeave={(e) => { if (!isExpanded) (e.currentTarget.parentElement as HTMLElement).style.borderColor = "var(--color-border)"; }}
              >
                {/* Result badge */}
                <div
                  className="flex items-center justify-center rounded-lg shrink-0 text-base"
                  style={{ width: 40, height: 40, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  {cfg.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{test.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded font-bold"
                      style={{ background: cfg.bg, color: cfg.color, fontFamily: "var(--font-mono)", border: `1px solid ${cfg.border}` }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{test.description}</div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>Source</div>
                  <div className="text-xs" style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>{test.source}</div>
                </div>

                {test.latency && (
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>Latency</div>
                    <div className="text-xs font-semibold" style={{ color: cfg.color, fontFamily: "var(--font-mono)" }}>{test.latency}</div>
                  </div>
                )}

                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="shrink-0 transition-transform duration-200 ml-2"
                  style={{ color: "var(--color-text-muted)", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {isExpanded && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: "1px solid var(--color-border-subtle)" }}
                >
                  <div
                    className="mt-4 p-4 rounded-lg text-xs"
                    style={{
                      background: "var(--color-surface)",
                      border: `1px solid ${cfg.border}`,
                      color: cfg.color,
                      fontFamily: "var(--font-mono)",
                      lineHeight: 1.7,
                    }}
                  >
                    <span style={{ color: "var(--color-text-muted)" }}>$ </span>{test.detail}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
