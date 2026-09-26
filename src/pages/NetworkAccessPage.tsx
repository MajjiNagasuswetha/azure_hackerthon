import { useState } from "react";

type Rule = { id: number; name: string; type: "IP Address" | "Virtual Network"; source: string; action: "Allow" | "Deny"; enabled: boolean };

const initialRules: Rule[] = [
  { id: 1, name: "Corporate gateway", type: "IP Address", source: "203.0.113.24/32", action: "Allow", enabled: true },
  { id: 2, name: "Approved application subnet", type: "Virtual Network", source: "storage-security-vnet / approved-subnet", action: "Allow", enabled: true },
  { id: 3, name: "Legacy build agent", type: "IP Address", source: "198.51.100.42/32", action: "Deny", enabled: false },
];

export default function NetworkAccessPage() {
  const [publicAccess, setPublicAccess] = useState(false);
  const [selectedNetworks, setSelectedNetworks] = useState(true);
  const [privateEndpoint, setPrivateEndpoint] = useState(true);
  const [rules, setRules] = useState(initialRules);
  const [editing, setEditing] = useState<Rule | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [notice, setNotice] = useState("");

  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const saveRule = (rule: Rule) => {
    if (isAdding) setRules((current) => [...current, { ...rule, id: Date.now() }]);
    else setRules((current) => current.map((item) => item.id === rule.id ? rule : item));
    setEditing(null);
    setIsAdding(false);
    announce(isAdding ? "Access rule added successfully." : "Access rule updated successfully.");
  };

  const updateControl = (setter: (value: boolean) => void, value: boolean, label: string) => {
    setter(value);
    announce(`${label} ${value ? "enabled" : "disabled"}.`);
  };

  return (
    <div className="space-y-6" style={{ maxWidth: 1060, fontFamily: "var(--font-body)" }}>
      <div className="flex items-start justify-between">
        <div><h2 className="text-xl font-bold mb-1" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-display)" }}>Network Access</h2><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Configure approved routes and network boundaries for stsecurityproject001</p></div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold" style={{ color: "var(--color-green)", background: "var(--color-green-light)" }}><span className="w-2 h-2 rounded-full" style={{ background: "var(--color-green)" }} />Network locked down</div>
      </div>

      {notice && <div role="status" className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium" style={{ color: "var(--color-green)", background: "var(--color-green-light)", border: "1px solid var(--color-green)" }}><span>✓</span>{notice}</div>}

      <div className="grid grid-cols-3 gap-4">
        <ControlCard title="Public Network Access" description="Access from public internet endpoints" value={publicAccess} onChange={(value) => updateControl(setPublicAccess, value, "Public network access")} warning />
        <ControlCard title="Selected Networks" description="Restrict access to approved network rules" value={selectedNetworks} onChange={(value) => updateControl(setSelectedNetworks, value, "Selected networks")} />
        <ControlCard title="Private Endpoint" description="Azure Private Link at 10.0.1.5" value={privateEndpoint} onChange={(value) => updateControl(setPrivateEndpoint, value, "Private endpoint")} purple />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-bold" style={{ color: "var(--color-navy-text)" }}>Virtual Network</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Azure service endpoint enabled</div></div><Status label="Connected" tone="green" /></div>
          <InfoRow label="Virtual network" value="storage-security-vnet" />
          <InfoRow label="Subnet" value="approved-subnet" />
          <InfoRow label="Address range" value="10.0.1.0/24" />
          <InfoRow label="Service endpoint" value="Microsoft.Storage" last />
        </div>
        <div className="p-5 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-4"><div><div className="text-sm font-bold" style={{ color: "var(--color-navy-text)" }}>Private Connectivity</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Traffic stays on the Microsoft backbone</div></div><Status label={privateEndpoint ? "Approved" : "Disabled"} tone={privateEndpoint ? "purple" : "amber"} /></div>
          <InfoRow label="Endpoint" value="storage-private-endpoint" />
          <InfoRow label="Private IP" value="10.0.1.5" />
          <InfoRow label="DNS zone" value="privatelink.blob.core.windows.net" />
          <InfoRow label="Connection state" value={privateEndpoint ? "Approved" : "Disconnected"} last />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div><div className="text-sm font-bold" style={{ color: "var(--color-navy-text)" }}>Access Rules</div><div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{rules.filter((rule) => rule.enabled).length} active rules · IP and virtual network sources</div></div>
          <button onClick={() => { setEditing({ id: 0, name: "", type: "IP Address", source: "", action: "Allow", enabled: true }); setIsAdding(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ color: "var(--color-white)", background: "var(--color-azure)" }}><span>＋</span>Add Access Rule</button>
        </div>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--color-page-bg)" }}><tr>{["Rule", "Type", "Source", "Action", "Enabled", "Actions"].map((heading) => <th key={heading} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)" }}>{heading}</th>)}</tr></thead>
          <tbody>{rules.map((rule) => <tr key={rule.id} style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
            <td className="px-5 py-4 font-semibold" style={{ color: "var(--color-navy-text)" }}>{rule.name}</td>
            <td className="px-5 py-4" style={{ color: "var(--color-text-muted)" }}>{rule.type}</td>
            <td className="px-5 py-4" style={{ color: "var(--color-azure)", fontFamily: "var(--font-mono)" }}>{rule.source}</td>
            <td className="px-5 py-4"><Status label={rule.action} tone={rule.action === "Allow" ? "green" : "red"} /></td>
            <td className="px-5 py-4"><Toggle value={rule.enabled} onChange={(value) => { setRules((current) => current.map((item) => item.id === rule.id ? { ...item, enabled: value } : item)); announce(`${rule.name} ${value ? "enabled" : "disabled"}.`); }} /></td>
            <td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => { setEditing(rule); setIsAdding(false); }} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ color: "var(--color-azure)", background: "var(--color-azure-light)" }}>Edit</button><button onClick={() => { if (window.confirm(`Delete access rule "${rule.name}"?`)) { setRules((current) => current.filter((item) => item.id !== rule.id)); announce("Access rule deleted."); } }} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ color: "var(--color-red)", background: "var(--color-red-light)" }}>Delete</button></div></td>
          </tr>)}</tbody>
        </table>
      </div>

      {editing && <RuleDialog rule={editing} title={isAdding ? "Add Access Rule" : "Edit Access Rule"} onClose={() => { setEditing(null); setIsAdding(false); }} onSave={saveRule} />}
    </div>
  );
}

function ControlCard({ title, description, value, onChange, warning, purple }: { title: string; description: string; value: boolean; onChange: (value: boolean) => void; warning?: boolean; purple?: boolean }) {
  const activeColor = warning ? "var(--color-red)" : purple ? "var(--color-purple)" : "var(--color-azure)";
  return <div className="p-5 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card)" }}><div className="flex items-start justify-between gap-4"><div><div className="text-sm font-bold" style={{ color: "var(--color-navy-text)" }}>{title}</div><div className="text-xs mt-1 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{description}</div><div className="text-xs font-semibold mt-3" style={{ color: value ? activeColor : "var(--color-green)" }}>{value ? "Enabled" : "Disabled"}</div></div><Toggle value={value} onChange={onChange} color={activeColor} /></div></div>;
}

function Toggle({ value, onChange, color = "var(--color-azure)" }: { value: boolean; onChange: (value: boolean) => void; color?: string }) {
  return <button role="switch" aria-checked={value} onClick={() => onChange(!value)} className="relative rounded-full shrink-0 transition-all" style={{ width: 44, height: 24, background: value ? color : "var(--color-border-mid)" }}><span className="absolute top-1 w-4 h-4 rounded-full transition-all" style={{ left: value ? 24 : 4, background: "var(--color-white)" }} /></button>;
}

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return <div className="flex items-center justify-between py-2.5" style={{ borderBottom: last ? "none" : "1px solid var(--color-border-subtle)" }}><span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{label}</span><span className="text-sm font-medium text-right" style={{ color: "var(--color-navy-text)", fontFamily: "var(--font-mono)" }}>{value}</span></div>;
}

function Status({ label, tone }: { label: string; tone: "green" | "red" | "amber" | "purple" }) {
  const colors = { green: ["var(--color-green)", "var(--color-green-light)"], red: ["var(--color-red)", "var(--color-red-light)"], amber: ["var(--color-amber)", "var(--color-amber-light)"], purple: ["var(--color-purple)", "var(--color-purple-light)"] };
  return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color: colors[tone][0], background: colors[tone][1] }}>{label}</span>;
}

function RuleDialog({ rule, title, onClose, onSave }: { rule: Rule; title: string; onClose: () => void; onSave: (rule: Rule) => void }) {
  const [draft, setDraft] = useState(rule);
  const [error, setError] = useState("");
  const submit = () => {
    if (!draft.name.trim() || !draft.source.trim()) { setError("Rule name and source are required."); return; }
    onSave(draft);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(7,27,58,0.38)" }} onClick={onClose}><div className="w-full max-w-md p-6 rounded-2xl" style={{ background: "var(--color-white)", boxShadow: "var(--shadow-card-hover)" }} onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between mb-5"><div className="text-lg font-bold" style={{ color: "var(--color-navy-text)" }}>{title}</div><button aria-label="Close" onClick={onClose} className="w-9 h-9 rounded-lg" style={{ background: "var(--color-page-bg)", color: "var(--color-text-muted)" }}>×</button></div>
    <div className="space-y-4">
      <Field label="Rule name"><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)" }} placeholder="e.g. Corporate office" /></Field>
      <Field label="Rule type"><select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as Rule["type"], source: "" })} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", background: "var(--color-white)" }}><option>IP Address</option><option>Virtual Network</option></select></Field>
      <Field label={draft.type === "IP Address" ? "IP address or CIDR" : "Virtual network / subnet"}><input value={draft.source} onChange={(event) => setDraft({ ...draft, source: event.target.value })} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)" }} placeholder={draft.type === "IP Address" ? "203.0.113.24/32" : "vnet-name / subnet-name"} /></Field>
      <Field label="Action"><select value={draft.action} onChange={(event) => setDraft({ ...draft, action: event.target.value as Rule["action"] })} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid var(--color-border)", background: "var(--color-white)" }}><option>Allow</option><option>Deny</option></select></Field>
      {error && <div className="text-sm" style={{ color: "var(--color-red)" }}>{error}</div>}
      <div className="flex justify-end gap-3 pt-2"><button onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-body)" }}>Cancel</button><button onClick={submit} className="px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: "var(--color-azure)", color: "var(--color-white)" }}>Save Rule</button></div>
    </div>
  </div></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="block text-xs font-semibold mb-2" style={{ color: "var(--color-text-body)" }}>{label}</span>{children}</label>;
}
