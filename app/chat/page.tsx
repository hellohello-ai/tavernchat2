import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";

const sampleParticipants = [
  { name: "Bard of Ember 7", role: "Bard" },
  { name: "Seer of Ember 21", role: "Seer" },
  { name: "Runeweaver of Ember 42", role: "Runeweaver" }
];

const sampleMessages = [
  {
    speaker: "Bard of Ember 7",
    role: "Bard",
    content: "A toast to new tales! What brings you to our hearth?"
  },
  {
    speaker: "You",
    role: "Traveler",
    content: "I seek a quest that feels warm and wondrous."
  },
  {
    speaker: "Seer of Ember 21",
    role: "Seer",
    content:
      "Then listen for the melody of the lanterns. They hum when the right path appears."
  }
];

export default function ChatPage() {
  return (
    <main>
      <header className="container">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link className="badge" href="/">
            TavernChat
          </Link>
          <span style={{ color: "var(--muted)" }}>
            Group Session · The Hearth Council
          </span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ThemeSwitcher />
          <button className="cta secondary">Account</button>
        </div>
      </header>

      <section className="container panel" style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span className="badge">Dynamic speaker selection</span>
          <span className="badge">3 companions in this circle</span>
        </div>
        <div className="chat-shell">
          <aside className="panel chat-history">
            <strong>Recent conversations</strong>
            {[
              "The Lantern Festival",
              "Whispers of the Abbey",
              "Songs of the Moss Hall"
            ].map((title) => (
              <div key={title} className="card">
                <strong>{title}</strong>
                <span style={{ color: "var(--muted)" }}>Updated just now</span>
              </div>
            ))}
          </aside>

          <div className="panel" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {sampleParticipants.map((participant) => (
                <div key={participant.name} className="card" style={{ minWidth: "160px" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <div className="avatar" aria-hidden="true">
                      {participant.name
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <strong>{participant.name}</strong>
                      <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                        {participant.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {sampleMessages.map((message) => (
                <div
                  key={`${message.speaker}-${message.content}`}
                  className={`message ${message.speaker === "You" ? "user" : ""}`}
                >
                  <div className="meta">
                    {message.speaker} · {message.role}
                  </div>
                  {message.content}
                </div>
              ))}
            </div>
            <div className="bottom-input">
              <input
                className="input"
                placeholder="Share your next thought..."
              />
              <button className="cta">Send</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
