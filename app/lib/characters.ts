export type Character = {
  id: string;
  name: string;
  role: string;
  summary: string;
  tags: string[];
  avatarSeed: string;
};

const roles = [
  "Bard",
  "Alchemist",
  "Knight",
  "Seer",
  "Cartographer",
  "Innkeeper",
  "Runeweaver",
  "Beast Whisperer",
  "Archivist",
  "Mistwalker"
];

const tagPool = [
  "cozy",
  "mystic",
  "heroic",
  "candid",
  "playful",
  "wise",
  "curious",
  "dramatic",
  "gentle",
  "mischievous"
];

export const characters: Character[] = Array.from({ length: 120 }, (_, index) => {
  const role = roles[index % roles.length];
  const tagA = tagPool[index % tagPool.length];
  const tagB = tagPool[(index + 3) % tagPool.length];
  return {
    id: `character-${index + 1}`,
    name: `${role} of Ember ${index + 1}`,
    role,
    summary: `A ${tagA} ${role.toLowerCase()} known for ${tagB} tales by the hearthfire.`,
    tags: [role.toLowerCase(), tagA, tagB],
    avatarSeed: `${role}-${index + 1}`
  };
});
