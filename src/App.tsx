import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import FirewallPage from "./pages/FirewallPage";
import PrivateEndpointPage from "./pages/PrivateEndpointPage";
import SecurityTestsPage from "./pages/SecurityTestsPage";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import StorageAccountsPage from "./pages/StorageAccountsPage";
import NetworkAccessPage from "./pages/NetworkAccessPage";
import AlertsPage from "./pages/AlertsPage";
import SettingsPage from "./pages/SettingsPage";

export type NavItem =
  | "dashboard"
  | "storage"
  | "firewall"
  | "private-endpoint"
  | "network"
  | "security-tests"
  | "diagnostics"
  | "alerts"
  | "settings";

export default function App() {
  const [active, setActive] = useState<NavItem>("dashboard");
  const [activeAlerts, setActiveAlerts] = useState(4);

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <Dashboard onNavigate={setActive} />;
      case "storage": return <StorageAccountsPage />;
      case "firewall": return <FirewallPage />;
      case "private-endpoint": return <PrivateEndpointPage />;
      case "network": return <NetworkAccessPage />;
      case "security-tests": return <SecurityTestsPage />;
      case "diagnostics": return <DiagnosticsPage />;
      case "alerts": return <AlertsPage onActiveCountChange={setActiveAlerts} />;
      case "settings": return <SettingsPage />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "var(--color-background)" }}>
      <Sidebar active={active} onNavigate={setActive} alertCount={activeAlerts} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar active={active} alertCount={activeAlerts} onNavigate={setActive} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
