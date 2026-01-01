import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";
import ChatSessionPanel from "../components/ChatSessionPanel";
import { characters } from "../lib/characters";

const sampleParticipants = [
  { id: "character-7", name: "Bard of Ember 7", role: "Bard" },
  { id: "character-21", name: "Seer of Ember 21", role: "Seer" },
  { id: "character-42", name: "Runeweaver of Ember 42", role: "Runeweaver" }
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

type ChatPageProps = {
  searchParams?: { group?: string };
};

export default function ChatPage({ searchParams }: ChatPageProps) {
  const groupIds = searchParams?.group
    ? searchParams.group.split(",").filter(Boolean)
    : [];
  const groupParticipants =
    groupIds.length > 0
      ? characters.filter((character) => groupIds.includes(character.id)).slice(0, 5)
      : [];
  const participants =
    groupParticipants.length > 0
      ? groupParticipants.map((participant) => ({
          id: participant.id,
          name: participant.name,
          role: participant.role
        }))
      : sampleParticipants;
  const sessionKey =
    groupParticipants.length > 0
      ? `group-${groupParticipants.map((participant) => participant.id).join("-")}`
      : "group-hearth-council";

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
          <Link className="cta secondary" href="/account">
            Account
          </Link>
        </div>
      </header>

      <section className="container panel" style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span className="badge">Dynamic speaker selection</span>
          <span className="badge">{participants.length} companions in this circle</span>
          <span className="badge accent">Session saved automatically</span>
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
            <div className="divider" />
            <strong>Active party</strong>
            {sampleParticipants.map((participant) => (
              <div key={participant.name} className="card">
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
          </aside>

          <div className="panel" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {participants.map((participant) => (
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
            <ChatSessionPanel
              title="The Hearth Council"
              participants={participants.map((participant) => ({
                id: participant.id,
                name: participant.name
              }))}
              sessionKey={sessionKey}
            />
            <div className="divider" />
            <div className="notice-board">
              <strong>Suggested companions</strong>
              {characters.slice(0, 3).map((companion) => (
                <Link key={companion.id} href={`/chat/${companion.id}`} className="card">
                  <strong>{companion.name}</strong>
                  <span style={{ color: "var(--muted)" }}>{companion.summary}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
