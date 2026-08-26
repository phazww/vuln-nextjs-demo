/**
 * INTENTIONALLY VULNERABLE demo app for phaz-lite.
 * DO NOT copy any pattern from this file. All "secrets" are fake.
 */
import { useEffect, useState } from "react";

const nav = ["Overview", "Deployments", "Logs", "API Keys", "Billing", "Settings"];
const metrics = [
  { label: "API Requests (24h)", value: "1,284,503", delta: "+12.4%", up: true },
  { label: "Active API Keys", value: "37", delta: "+3", up: true },
  { label: "Tokens Used", value: "84.2M", delta: "+8.1%", up: true },
  { label: "Error Rate", value: "0.42%", delta: "-0.08%", up: false },
];

function Spark() {
  const pts = [8, 14, 11, 18, 16, 24, 21, 29, 26, 34, 31, 40].map((v, i) => `${i * 30},${70 - v}`).join(" ");
  return (
    <svg width="360" height="80" style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline points={`0,80 ${pts} 360,80`} fill="rgba(99,102,241,.12)" stroke="none" />
    </svg>
  );
}

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    // VULNERABLE: hash value flows into innerHTML (reflected DOM XSS)
    const el = document.getElementById("deploy-status");
    if (el) {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      el.innerHTML = hash.get("status") || "";
    }
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "-apple-system, 'Segoe UI', Roboto, sans-serif", background: "#f8fafc", color: "#0f172a", margin: 0 }}>
      <aside style={{ width: 220, background: "#0f172a", color: "#94a3b8", padding: "24px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 24px 24px", fontWeight: 800, fontSize: 18, color: "#fff" }}>
          Acme<span style={{ color: "#6366f1" }}>AI</span>
        </div>
        {nav.map((n, i) => (
          <div key={n} style={{ padding: "11px 24px", fontSize: 14, background: i === 0 ? "rgba(99,102,241,.15)" : "none", color: i === 0 ? "#e0e7ff" : "#94a3b8", borderLeft: i === 0 ? "3px solid #6366f1" : "3px solid transparent" }}>
            {n}
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 20, padding: "0 24px", fontSize: 12, color: "#475569" }}>
          internal build 4.2.1
        </div>
      </aside>

      <main style={{ flex: 1, padding: "32px 40px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, margin: 0 }}>Overview</h1>
            <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: 14 }}>
              Internal analytics console. Employees only.{" "}
              <span id="deploy-status" style={{ color: "#dc2626", fontWeight: 600 }} />
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>prod-eu-west · all systems operational</span>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#a855f7)" }} />
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>{m.value}</div>
              <div style={{ fontSize: 13, color: m.up ? "#059669" : "#dc2626", fontWeight: 600 }}>{m.delta} vs last week</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Token consumption — last 12 hours</div>
          <Spark />
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Recent deployments</div>
          {[
            ["api-gateway v2.14.0", "prod-eu-west", "12 min ago", "#059669"],
            ["inference-proxy v1.9.2", "prod-us-east", "1 h ago", "#059669"],
            ["billing-worker v0.8.1", "staging", "3 h ago", "#d97706"],
          ].map(([name, env, when, c]) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9", fontSize: 14 }}>
              <span style={{ fontWeight: 600 }}>{name}</span>
              <span style={{ color: "#64748b" }}>{env}</span>
              <span style={{ color: c, fontWeight: 600 }}>● {when}</span>
            </div>
          ))}
        </div>
      </main>

      {/* VULNERABLE: fake production secret shipped to the client */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.CONFIG={apiKey:"sk-proj-4f8a2b91c7d3e60518fa29bc47d10e83",region:"us-east-1",billingEmail:"ops@acme-ai.example"};`,
        }}
      />
    </div>
  );
}
