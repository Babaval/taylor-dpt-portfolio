import { describe, it, expect } from "vitest";

const PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Clinical Experience" },
  { id: "research", label: "Research & Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" }
];

describe("PAGES config", () => {
  it("has unique ids", () => {
    const ids = new Set(PAGES.map(p => p.id));
    expect(ids.size).toBe(PAGES.length);
  });

  it("each page has id and label strings", () => {
    for (const p of PAGES) {
      expect(typeof p.id).toBe("string");
      expect(typeof p.label).toBe("string");
    }
  });
});
