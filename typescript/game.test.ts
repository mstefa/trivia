import { Game } from "./game";

describe("The test environment", function () {
  it("should pass", function () {
    expect(true).toBe(true);
  });

  it("should access game", function () {
    const game = new Game()
    expect(game).toBeDefined();
  });
});

describe("Your specs...", function () {
  // it ...
});
