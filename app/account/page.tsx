import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";
import SessionHistory from "../components/SessionHistory";

export default function AccountPage() {
  return (
    <main>
      <header className="container">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link className="badge" href="/">
            TavernChat
          </Link>
          <span style={{ color: "var(--muted)" }}>Account</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ThemeSwitcher />
          <Link className="cta secondary" href="/characters">
            Characters
          </Link>
        </div>
      </header>

      <section className="container panel" style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ margin: 0 }}>Your tavern passport</h1>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
              Account features are active. Your chats now save to the backend,
              so you can pick up where you left off on any device.
            </p>
          </div>
          <div className="panel" style={{ minWidth: "240px" }}>
            <strong>Next steps</strong>
            <ul style={{ color: "var(--muted)", paddingLeft: "1.2rem" }}>
              <li>Add your OpenAI API key in Vercel.</li>
              <li>Run Prisma migrations once.</li>
              <li>Invite more companions.</li>
            </ul>
          </div>
        </div>
        <SessionHistory />
      </section>
    </main>
  );
}
