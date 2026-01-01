import Link from "next/link";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import { characters } from "../../lib/characters";

type PageProps = {
  params: { id: string };
};

export default function CharacterChatPage({ params }: PageProps) {
  const character = characters.find((entry) => entry.id === params.id);

  if (!character) {
    return (
      <main>
        <header className="container">
          <Link className="badge" href="/">
            TavernChat
          </Link>
          <ThemeSwitcher />
        </header>
        <section className="container panel">
          <h1>Character not found</h1>
          <p style={{ color: "var(--muted)" }}>
            This companion has not been added to the tavern yet.
          </p>
          <Link className="cta" href="/characters">
            Return to the roster
          </Link>
        </section>
      </main>
    );
  }

  const initials = character.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <main>
      <header className="container">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link className="badge" href="/">
            TavernChat
          </Link>
          <span style={{ color: "var(--muted)" }}>Direct chat</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ThemeSwitcher />
          <button className="cta secondary">Account</button>
        </div>
      </header>

      <section className="container panel" style={{ display: "grid", gap: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>{character.name}</h1>
            <p style={{ color: "var(--muted)", margin: 0 }}>{character.summary}</p>
            <div className="tag-row" style={{ marginTop: "0.5rem" }}>
              <span className="badge">{character.role}</span>
              {character.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="panel" style={{ display: "grid", gap: "1rem" }}>
          <div className="message">
            <div className="meta">{character.name}</div>
            Welcome back, traveler. The hearth has been waiting for your voice.
          </div>
          <div className="bottom-input">
            <input className="input" placeholder={`Speak with ${character.name}...`} />
            <button className="cta">Send</button>
          </div>
        </div>
      </section>
    </main>
  );
}
