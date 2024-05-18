
export class Game {
  players: string[] = [];
  places: number[] = [];
  purses: number[] = [];
  inPenaltyBox: boolean[] = [];
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


  createRockQuestion(index: number) {
    return "Rock Question " + index;
  };

  isPlayable(howManyPlayers: number) {
    return howManyPlayers >= 2;
  };

  add(playerName: string) {

    if (this.players.length >= 6) {
      this.logger.log(playerName + "Can not be added");
      this.logger.log("The maximum number of players was reach");
      return false;
    }
    this.players.push(playerName);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    this.logger.log(playerName + " was added");
    this.logger.log("They are player number " + this.players.length);

    return true;
  };

  howManyPlayers() {
    return this.players.length;
  };

  roll(roll: number) {
    this.logger.log(this.players[this.currentPlayer] + " is the current player");
    this.logger.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        this.logger.log(this.players[this.currentPlayer] + " is getting out of the penalty box");

        this.updatePlayerLocation(roll);

        this.askQuestion();
      } else {
        this.logger.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {

      this.updatePlayerLocation(roll);

      this.askQuestion();
    }
  };

  private updatePlayerLocation(roll: number) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
    }

    this.logger.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
    this.logger.log("The category is " + this.currentCategory());
  }

  askQuestion() {
    if (this.currentCategory() == 'Pop')
      this.logger.log(this.popQuestions.shift() || '');
    if (this.currentCategory() == 'Science')
      this.logger.log(this.scienceQuestions.shift() || '');
    if (this.currentCategory() == 'Sports')
      this.logger.log(this.sportsQuestions.shift() || '');
    if (this.currentCategory() == 'Rock')
      this.logger.log(this.rockQuestions.shift() || '');
  };

  currentCategory() {
    if (this.places[this.currentPlayer] == 0)
      return 'Pop';
    if (this.places[this.currentPlayer] == 4)
      return 'Pop';
    if (this.places[this.currentPlayer] == 8)
      return 'Pop';
    if (this.places[this.currentPlayer] == 1)
      return 'Science';
    if (this.places[this.currentPlayer] == 5)
      return 'Science';
    if (this.places[this.currentPlayer] == 9)
      return 'Science';
    if (this.places[this.currentPlayer] == 2)
      return 'Sports';
    if (this.places[this.currentPlayer] == 6)
      return 'Sports';
    if (this.places[this.currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  wasCorrectlyAnswered() {
    if (this.inPenaltyBox[this.currentPlayer] && !this.isGettingOutOfPenaltyBox) {
      this.updateCurrentPlayer();
      return true;
    }

    this.rewardPlayer();

    var winner = this.didPlayerWin();

    this.updateCurrentPlayer();

    return winner;

  };

  private rewardPlayer() {
    this.logger.log('Answer was correct!!!!');
    this.purses[this.currentPlayer] += 1;
    this.logger.log(this.players[this.currentPlayer] + " now has " +
      this.purses[this.currentPlayer] + " Gold Coins.");
  }

  private updateCurrentPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
  }

  wrongAnswer() {
    this.logger.log('Question was incorrectly answered');
    this.logger.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.updateCurrentPlayer()
    return true;
  };

  didPlayerWin() {
    return !(this.purses[this.currentPlayer] == 6)
  };

}


export interface Logger {

  log(message: string): void
}
