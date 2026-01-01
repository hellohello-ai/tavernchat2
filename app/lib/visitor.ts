export const getVisitorId = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const key = "tavern-visitor-id";
  const existing = window.localStorage.getItem(key);
  if (existing) {
    return existing;
  }
  const generated = Math.random().toString(36).slice(2, 10);
  window.localStorage.setItem(key, generated);
  return generated;
};
