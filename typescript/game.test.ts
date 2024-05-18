import { Game } from "./game";

describe("Game Test", () => {
  it("A game should be create with the list of players", () => {
    const players = ['John', 'Alan']
    const game = new Game(players)
    expect(game).toBeDefined();
  });

  it("A game should be create with the list of players with at least two players", () => {
    const players = ['Lonely John']
    const test = () => { new Game(players) }

    expect(test).toThrow('The minimum number of player is <2>');
  });

  it("A game should be create with the list of players with at most six players", () => {
    const players = ['John', 'Alan', 'Matias', 'Claudio', 'Anyul', 'Marc', 'Robert']
    const test = () => { new Game(players) }

    expect(test).toThrow('Not all players can be added');
  });

  it("A player that respond wrong a question should go to prison", () => {
    const player1 = 'John';
    const player2 = 'Alan';
    const players = [player1, player2];
    const game = new Game(players)

    game.roll(4)
    game.wrongAnswer();

    const isInPrison = game.isPlayerInPrison(player1)

    expect(isInPrison).toBe(true);
  });

  it("A player that is in prison, can get out when it get an odd roll", () => {
    const player1 = 'John';
    const player2 = 'Alan';
    const players = [player1, player2];
    const game = new Game(players)

    game.roll(4)
    game.wrongAnswer();
    game.roll(4) // player2
    game.wasCorrectlyAnswered()
    game.roll(3)
    game.wasCorrectlyAnswered()

    const isInPrison = game.isPlayerInPrison(player1)

    expect(isInPrison).toBe(false);
  });

  it("A player win, after responding correctly 6 times", () => {
    const player1 = 'John';
    const player2 = 'Alan';
    const players = [player1, player2];
    const game = new Game(players)

    let notAWinner: boolean;

    game.roll(4) // player1
    notAWinner = game.wasCorrectlyAnswered()
    game.roll(4) // player2
    expect(notAWinner).toBe(true);
    game.wasCorrectlyAnswered()
    game.roll(2) // player1
    notAWinner = game.wasCorrectlyAnswered()
    expect(notAWinner).toBe(true);
    game.roll(4) // player2
    game.wasCorrectlyAnswered()
    game.roll(2) // player1
    notAWinner = game.wasCorrectlyAnswered()
    expect(notAWinner).toBe(true);
    game.roll(4) // player2
    game.wasCorrectlyAnswered()
    game.roll(2) // player1
    notAWinner = game.wasCorrectlyAnswered()
    expect(notAWinner).toBe(true);
    game.roll(4) // player2
    game.wasCorrectlyAnswered()
    game.roll(2) // player1
    notAWinner = game.wasCorrectlyAnswered()
    expect(notAWinner).toBe(true);
    game.roll(4) // player2
    game.wasCorrectlyAnswered()
    game.roll(2) // player1
    notAWinner = game.wasCorrectlyAnswered()
    expect(notAWinner).toBe(false);
  });

  it('A player should move the number of element given by the roll', () => {

    const player1 = 'John';
    const player2 = 'Alan';
    const players = [player1, player2];
    const game = new Game(players)

    const roll = 6;
    game.roll(roll) // player1
    game.wasCorrectlyAnswered()

    const playerPosition = game.getPlayerPosition(player1)

    expect(playerPosition).toBe(roll)
  })

  it('A player should move the number of element given by the roll, and return to start when surpasses the 12th position', () => {

    const player1 = 'John';
    const player2 = 'Alan';
    const players = [player1, player2];
    const game = new Game(players)

    const roll = 6;
    game.roll(roll) // player1
    game.wasCorrectlyAnswered()
    game.roll(roll) // player2
    game.wasCorrectlyAnswered()
    game.roll(roll) // player1
    game.wasCorrectlyAnswered()

    const playerPosition = game.getPlayerPosition(player1)

    expect(playerPosition).toBe(0)
  })
});
