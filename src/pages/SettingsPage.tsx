import { useState } from "react";

type Preferences = {
  enforcePrivateLink: boolean;
  blockPublicAccess: boolean;
  encryptionAlerts: boolean;
  criticalEmail: boolean;
  weeklyDigest: boolean;
  browserNotifications: boolean;
  continuousMonitoring: boolean;
  diagnosticLogs: boolean;
  anomalyDetection: boolean;
  requireMfa: boolean;
  sessionTimeout: boolean;
  privilegedApproval: boolean;
};

const defaults: Preferences = {
  enforcePrivateLink: true, blockPublicAccess: true, encryptionAlerts: true,
  criticalEmail: true, weeklyDigest: true, browserNotifications: false,
  continuousMonitoring: true, diagnosticLogs: true, anomalyDetection: true,
  requireMfa: true, sessionTimeout: true, privilegedApproval: false,
};

export default function SettingsPage() {
  const [preferences, setPreferences] = useState(defaults);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const update = (key: keyof Preferences, value: boolean) => { setPreferences((current) => ({ ...current, [key]: value })); setSaved(false); };
  const save = () => { setSaved(true); setNotice("Settings saved successfully."); window.setTimeout(() => setNotice(""), 3000); };
  const reset = () => {
    if (window.confirm("Reset all settings to the SecureStore recommended defaults?")) {
      setPreferences(defaults);
      setSaved(false);
      setNotice("Recommended defaults restored. Save changes to apply them.");
      window.setTimeout(() => setNotice(""), 3500);
    }
  };

  return (
    <div className="space-y-6" style={{ maxWidth: 980, fontFamily: "var(--font-body)" }}>
      <div><h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Settings</h2><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Manage SecureStore security, monitoring, and access preferences</p></div>
      {notice && <div role="status" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium" style={{ color: saved ? "var(--color-green)" : "var(--color-azure)", background: saved ? "var(--color-green-light)" : "var(--color-azure-light)" }}><span>{saved ? "✓" : "↻"}</span>{notice}</div>}
      <SettingsSection title="Security Settings" description="Storage account protection requirements" color="var(--color-azure)" items={[
        { key: "enforcePrivateLink", title: "Enforce Private Link", description: "Require private endpoint connectivity for production storage accounts" },
        { key: "blockPublicAccess", title: "Block public network access", description: "Prevent storage resources from accepting public internet traffic" },
        { key: "encryptionAlerts", title: "Encryption policy alerts", description: "Alert when encryption settings drift from the security baseline" },
      ]} values={preferences} onChange={update} />
      <SettingsSection title="Notification Preferences" description="Choose how security events are delivered" color="var(--color-purple)" items={[
        { key: "criticalEmail", title: "Critical alert emails", description: "Immediately email workspace owners for critical and high alerts" },
        { key: "weeklyDigest", title: "Weekly security digest", description: "Receive a Monday summary of posture, alerts, and policy changes" },
        { key: "browserNotifications", title: "Browser notifications", description: "Show real-time notifications while SecureStore is open" },
      ]} values={preferences} onChange={update} />
      <SettingsSection title="Monitoring Settings" description="Continuous assessment and diagnostic controls" color="var(--color-green)" items={[
        { key: "continuousMonitoring", title: "Continuous security monitoring", description: "Evaluate network and storage configuration every five minutes" },
        { key: "diagnosticLogs", title: "Diagnostic log collection", description: "Send storage, firewall, and access logs to Log Analytics" },
        { key: "anomalyDetection", title: "Access anomaly detection", description: "Detect unusual IP addresses, locations, and access patterns" },
      ]} values={preferences} onChange={update} />
      <SettingsSection title="Authentication & Access" description="Controls for SecureStore administrators" color="var(--color-amber)" items={[
        { key: "requireMfa", title: "Require multi-factor authentication", description: "Require MFA for all users accessing the SecureStore workspace" },
        { key: "sessionTimeout", title: "Automatic session timeout", description: "Sign out inactive administrator sessions after 30 minutes" },
        { key: "privilegedApproval", title: "Privileged change approval", description: "Require a second administrator to approve firewall changes" },
      ]} values={preferences} onChange={update} />
      <div className="flex items-center justify-between pt-1 pb-6"><div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Workspace: securestore-production · Subscription Owner permissions</div><div className="flex gap-3"><button onClick={reset} className="px-5 py-3 rounded-xl text-sm font-medium" style={{ color: "var(--color-text-body)", background: "var(--color-white)", border: "1px solid var(--color-border)" }}>Reset to Defaults</button><button onClick={save} className="px-6 py-3 rounded-xl text-sm font-semibold" style={{ color: "var(--color-white)", background: saved ? "var(--color-green)" : "var(--color-azure)", boxShadow: "var(--shadow-card)" }}>{saved ? "Changes Saved" : "Save Changes"}</button></div></div>
    </div>
  );
}

function SettingsSection({ title, description, color, items, values, onChange }: { title: string; description: string; color: string; items: { key: keyof Preferences; title: string; description: string }[]; values: Preferences; onChange: (key: keyof Preferences, value: boolean) => void }) {
  return <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}><div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid var(--color-border)" }}><span className="w-1 h-9 rounded-full" style={{ background: color }} /><div><div className="text-sm font-bold" style={{ color: "var(--color-navy-text)" }}>{title}</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{description}</div></div></div><div>{items.map((item, index) => <div key={item.key} className="flex items-center justify-between gap-8 px-6 py-4" style={{ borderBottom: index === items.length - 1 ? "none" : "1px solid var(--color-border-subtle)" }}><div><div className="text-sm font-semibold" style={{ color: "var(--color-navy-text)" }}>{item.title}</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{item.description}</div></div><Toggle value={values[item.key]} onChange={(value) => onChange(item.key, value)} /></div>)}</div></div>;
}

function Toggle({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) {
  return <button role="switch" aria-checked={value} onClick={() => onChange(!value)} className="relative rounded-full shrink-0 transition-all" style={{ width: 46, height: 26, background: value ? "var(--color-azure)" : "var(--color-border-mid)" }}><span className="absolute top-1 rounded-full transition-all" style={{ width: 18, height: 18, left: value ? 24 : 4, background: "var(--color-white)", boxShadow: "var(--shadow-card)" }} /></button>;
}
