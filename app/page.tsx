import Link from "next/link";
import ThemeSwitcher from "./components/ThemeSwitcher";
import NoticeBoard from "./components/NoticeBoard";
import QuestHook from "./components/QuestHook";
import AmbiencePanel from "./components/AmbiencePanel";

export default function HomePage() {
  return (
    <main>
      <header className="container">
        <div>
          <span className="badge">TavernChat</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ThemeSwitcher />
          <button className="cta secondary">Sign in</button>
        </div>
      </header>

      <section className="container panel hero">
        <div>
          <h1>Welcome to a cozy fantasy tavern where every story speaks back.</h1>
          <p>
            Meet over 100 richly imagined characters, save your conversations, and
            slip into group chats where the cast decides who responds. Pick a
            theme, set the mood, and let the hearthlight guide your adventures.
          </p>
          <div className="cta-row">
            <Link className="cta" href="/characters">
              Browse Characters
            </Link>
            <Link className="cta secondary" href="/chat">
              Enter the Tavern
            </Link>
          </div>
        </div>
        <div className="panel" style={{ display: "grid", gap: "1rem" }}>
          <h2 style={{ margin: 0 }}>Today&apos;s highlights</h2>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "var(--muted)" }}>
            <li>Dynamic group chats with multi-character replies.</li>
            <li>Personalized themes for moonlit, forest, or candlelit moods.</li>
            <li>Conversation history tied to your account.</li>
          </ul>
          <div className="card">
            <strong>Ambient flair</strong>
            <span style={{ color: "var(--muted)" }}>
              Candlelight glows, drifting motes, and soft transitions keep it
              cozy while feeling snappy.
            </span>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="grid">
          {[
            {
              title: "Choose your cast",
              description:
                "Filter by role, mood, or favorite, then dive into 1:1 or group chats."
            },
            {
              title: "Keep the story",
              description:
                "Every conversation is saved to your account so you can return anytime."
            },
            {
              title: "Set the ambiance",
              description:
                "Switch themes and backgrounds for a magical, cozy atmosphere."
            }
          ].map((feature) => (
            <div key={feature.title} className="panel">
              <h3>{feature.title}</h3>
              <p style={{ color: "var(--muted)" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ display: "grid", gap: "1.5rem" }}>
        <div className="grid">
          <QuestHook />
          <AmbiencePanel />
        </div>
        <NoticeBoard />
      </section>
    </main>
  );
}
