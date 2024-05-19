
export class Game {
  players: Player[] = [];
  popQuestions: string[] = [];
  scienceQuestions: string[] = [];
  sportsQuestions: string[] = [];
  rockQuestions: string[] = [];
  currentPlayer: number = 0;
  isGettingOutOfPenaltyBox: boolean = false;
  logger: Logger

  constructor(players: string[], logger: Logger) {

    this.logger = logger;

    if (players.length < 2) {
      throw Error('The minimum number of player is <2>')
    }

    players.forEach(player => {
      const playerWasAdded = this.add(player)

      if (!playerWasAdded) {
        throw Error('Not all players can be added')
      }
    })

    for (var i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  public roll(roll: number) {
    this.logger.log(this.players[this.currentPlayer].name + " is the current player");
    this.logger.log("They have rolled a " + roll);

    if (this.players[this.currentPlayer].isInPrison()) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        this.logger.log(this.players[this.currentPlayer].name + " is getting out of the penalty box");
        const newPosition = this.updatePlayerLocation(roll);

        this.askQuestion(newPosition);
      } else {
        this.logger.log(this.players[this.currentPlayer].name + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {

      const newPosition = this.updatePlayerLocation(roll);

      this.askQuestion(newPosition);
    }
  };

  public wasCorrectlyAnswered() {
    if (this.players[this.currentPlayer].isInPrison() && !this.isGettingOutOfPenaltyBox) {
      this.updateCurrentPlayer();
      return true;
    }

    this.rewardPlayer();

    var winner = this.playHasEnded();

    this.updateCurrentPlayer();

    return winner;

  };

  public wrongAnswer() {
    this.logger.log('Question was incorrectly answered');
    this.logger.log(this.players[this.currentPlayer].name + " was sent to the penalty box");

    this.players[this.currentPlayer].sendToPrison();

    this.updateCurrentPlayer()
    return true;
  };

  private updatePlayerLocation(roll: number): number {
    const newPosition = this.players[this.currentPlayer].movePlayerBy(roll)

    this.logger.log(this.players[this.currentPlayer].name + "'s new location is " + newPosition);
    this.logger.log("The category is " + this.currentCategory(newPosition));

    return newPosition;
  }

  private askQuestion(position: number) {
    if (this.currentCategory(position) == 'Pop')
      this.logger.log(this.popQuestions.shift() || '');
    if (this.currentCategory(position) == 'Science')
      this.logger.log(this.scienceQuestions.shift() || '');
    if (this.currentCategory(position) == 'Sports')
      this.logger.log(this.sportsQuestions.shift() || '');
    if (this.currentCategory(position) == 'Rock')
      this.logger.log(this.rockQuestions.shift() || '');
  };

  private currentCategory(position: number) {
    if (position == 0)
      return 'Pop';
    if (position == 1)
      return 'Science';
    if (position == 2)
      return 'Sports';
    if (position == 4)
      return 'Pop';
    if (position == 5)
      return 'Science';
    if (position == 6)
      return 'Sports';
    if (position == 8)
      return 'Pop';
    if (position == 9)
      return 'Science';
    if (position == 10)
      return 'Sports';
    return 'Rock';
  };

  private rewardPlayer() {
    this.logger.log('Answer was correct!!!!');
    const playersCoins = this.players[this.currentPlayer].reward();
    this.logger.log(this.players[this.currentPlayer].name + " now has " +
      playersCoins + " Gold Coins.");
  }

  private updateCurrentPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
  }

  private playHasEnded() {
    return !this.players[this.currentPlayer].didWin()
  };

  private createRockQuestion(index: number) {
    return "Rock Question " + index;
  };


  private add(playerName: string) {

    if (this.players.length >= 6) {
      this.logger.log(playerName + "Can not be added");
      this.logger.log("The maximum number of players was reach");
      return false;
    }
    this.players.push(new Player(playerName));

    this.logger.log(playerName + " was added");
    this.logger.log("They are player number " + this.players.length);

    return true;
  };

}


export interface Logger {

  log(message: string): void
}


class Player {
  readonly name: string;
  private position: number;
  private coins: number;
  private inPrison: boolean;
  // private isGettingOutOfPenaltyBox: boolean;

  constructor(name: string) {
    this.name = name;
    this.position = 0;
    this.coins = 0;
    this.inPrison = false;
    // this.isGettingOutOfPenaltyBox = false;
  }

  public reward(): number {
    this.coins++
    return this.coins
  }

  public movePlayerBy(steps: number): number {
    this.position = this.position + steps;
    if (this.position > 11) {
      this.position = this.position - 12;
    }

    return this.position
  }

  public isInPrison(): boolean {
    return this.inPrison
  }

  public sendToPrison(): void {
    this.inPrison = true
  }

  public setFree(): void {
    this.inPrison = false
  }

  didWin(): boolean {
    return this.coins === 6;
  }

}
