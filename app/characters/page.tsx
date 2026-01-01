import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";
import CharacterBrowser from "../components/CharacterBrowser";

export default function CharactersPage() {
  return (
    <main>
      <header className="container">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link className="badge" href="/">
            TavernChat
          </Link>
          <span style={{ color: "var(--muted)" }}>
            Choose your companions
          </span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ThemeSwitcher />
          <Link className="cta secondary" href="/account">
            Account
          </Link>
        </div>
      </header>

      <section className="container">
        <h1>Character Library</h1>
        <p style={{ color: "var(--muted)", maxWidth: "600px" }}>
          Browse a growing cast of fantasy companions. Start a private chat or
          gather a group and let the conversation decide who speaks next.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <span className="badge">120+ characters</span>
          <span className="badge">Favorites & recents</span>
          <span className="badge">Dynamic group chat</span>
        </div>
      </section>

      <section className="container">
        <CharacterBrowser />
      </section>
    </main>
  );
}
