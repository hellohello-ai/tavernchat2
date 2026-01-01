"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { characters } from "../lib/characters";

const sections = [
  { id: "favorites", label: "Favorites" },
  { id: "recent", label: "Recently Visited" },
  { id: "all", label: "All Characters" }
];

const tagOptions = ["bard", "alchemist", "knight", "seer", "cozy", "mystic", "heroic"];

export default function CharacterBrowser() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    favorites: true,
    recent: true,
    all: true
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(18);

  const filtered = useMemo(() => {
    return characters.filter((character) => {
      const matchesQuery = character.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => character.tags.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const toggleSelected = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedCount = selected.length;
  const favorites = characters.slice(0, 6);
  const recent = characters.slice(6, 12);
  const visibleCharacters = filtered.slice(0, visibleCount);

  return (
    <div className="panel" style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <input
          className="input"
          style={{ flex: "1 1 220px" }}
          placeholder="Search characters"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="cta secondary">
          {selectedCount > 0
            ? `Start group chat (${selectedCount})`
            : "Start group chat"}
        </button>
      </div>

      <div className="tag-row">
        {tagOptions.map((tag) => (
          <button
            key={tag}
            className="badge"
            onClick={() => toggleTag(tag)}
            style={{
              border: activeTags.includes(tag)
                ? "1px solid var(--accent)"
                : "1px solid transparent",
              cursor: "pointer"
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {sections.map((section) => {
        const isExpanded = expanded[section.id];
        const items =
          section.id === "favorites"
            ? favorites
            : section.id === "recent"
            ? recent
            : visibleCharacters;
        return (
          <div key={section.id}>
            <button
              className="cta secondary"
              style={{ width: "100%", justifyContent: "space-between" }}
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [section.id]: !prev[section.id]
                }))
              }
            >
              {section.label}
              <span>{isExpanded ? "−" : "+"}</span>
            </button>
            {isExpanded && (
              <div
                className="grid"
                style={{
                  marginTop: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))"
                }}
              >
                {items.length === 0 ? (
                  <div className="card">
                    <strong>No characters here yet.</strong>
                    <span style={{ color: "var(--muted)" }}>
                      Your favorites and recent chats will appear in this
                      section.
                    </span>
                  </div>
                ) : (
                  items.map((character) => (
                    <div key={character.id} className="card">
                      <Link
                        href={`/chat/${character.id}`}
                        aria-label={`Open chat with ${character.name}`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "16px",
                          zIndex: 0
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                          <div className="avatar" aria-hidden="true">
                            {character.name
                              .split(" ")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <h3 style={{ margin: 0 }}>{character.name}</h3>
                            <span className="badge">{character.role}</span>
                          </div>
                          <div>
                            <span className="badge accent">Click to chat</span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={selected.includes(character.id)}
                          onChange={() => toggleSelected(character.id)}
                          aria-label={`Select ${character.name} for group chat`}
                          onClick={(event) => event.stopPropagation()}
                          style={{ position: "relative", zIndex: 1 }}
                        />
                      </div>
                      <p style={{ color: "var(--muted)" }}>{character.summary}</p>
                      <div className="tag-row">
                        {character.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="badge">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: "0.75rem" }}>
                        <Link
                          className="cta secondary"
                          href={`/chat/${character.id}`}
                          style={{ position: "relative", zIndex: 1 }}
                        >
                          Chat now
                        </Link>
                        <button className="cta ghost" type="button" style={{ position: "relative", zIndex: 1 }}>
                          Preview
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {section.id === "all" && isExpanded && filtered.length > visibleCharacters.length && (
              <button
                className="cta secondary"
                style={{ marginTop: "1rem" }}
                onClick={() => setVisibleCount((prev) => prev + 18)}
              >
                Show more ({filtered.length - visibleCharacters.length} remaining)
              </button>
            )}
          </div>
        );
      })}
      <p style={{ color: "var(--muted)", margin: 0 }}>
        Showing a curated slice of the roster. Use filters or expand the list to
        reveal more of the 120+ companions.
      </p>
    </div>
  );
}
