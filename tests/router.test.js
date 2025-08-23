import { describe, it, expect, beforeEach } from "vitest";
import { readHash, navigateHash } from "../src/lib/router";

beforeEach(() => {
  window.location.hash = "";
});

describe("hash router helpers", () => {
  it("readHash returns default when empty", () => {
    expect(readHash("home")).toBe("home");
  });

  it("readHash reads the current hash (without #)", () => {
    window.location.hash = "#about";
    expect(readHash("home")).toBe("about");
  });

  it("navigateHash writes the hash with #", () => {
    navigateHash("contact");
    expect(window.location.hash).toBe("#contact");
  });

  it("navigateHash preserves leading # if provided", () => {
    navigateHash("#research");
    expect(window.location.hash).toBe("#research");
  });
});
