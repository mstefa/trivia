
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

  constructor(players: string[]) {

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
      console.log(playerName + "Can not be added");
      console.log("The maximum number of players was reach");
      return false;
    }
    this.players.push(playerName);
    this.places[this.howManyPlayers() - 1] = 0;
    this.purses[this.howManyPlayers() - 1] = 0;
    this.inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + this.players.length);

    return true;
  };

  howManyPlayers() {
    return this.players.length;
  };

  roll(roll: number) {
    console.log(this.players[this.currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(this.players[this.currentPlayer] + " is getting out of the penalty box");

        this.updatePlayerLocation(roll);

        console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
        console.log("The category is " + this.currentCategory());
        this.askQuestion();
      } else {
        console.log(this.players[this.currentPlayer] + " is not getting out of the penalty box");
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {

      this.updatePlayerLocation(roll);

      console.log(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
      console.log("The category is " + this.currentCategory());
      this.askQuestion();
    }
  };

  private updatePlayerLocation(roll: number) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
    }
  }

  askQuestion() {
    if (this.currentCategory() == 'Pop')
      console.log(this.popQuestions.shift());
    if (this.currentCategory() == 'Science')
      console.log(this.scienceQuestions.shift());
    if (this.currentCategory() == 'Sports')
      console.log(this.sportsQuestions.shift());
    if (this.currentCategory() == 'Rock')
      console.log(this.rockQuestions.shift());
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
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        this.purses[this.currentPlayer] += 1;
        console.log(this.players[this.currentPlayer] + " now has " +
          this.purses[this.currentPlayer] + " Gold Coins.");

        var winner = this.didPlayerWin();
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
          this.currentPlayer = 0;

        return winner;
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
          this.currentPlayer = 0;
        return true;
      }



    } else {

      console.log("Answer was correct!!!!");

      this.purses[this.currentPlayer] += 1;
      console.log(this.players[this.currentPlayer] + " now has " +
        this.purses[this.currentPlayer] + " Gold Coins.");

      var winner = this.didPlayerWin();

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length)
        this.currentPlayer = 0;

      return winner;
    }
  };

  wrongAnswer() {
    console.log('Question was incorrectly answered');
    console.log(this.players[this.currentPlayer] + " was sent to the penalty box");
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length)
      this.currentPlayer = 0;
    return true;
  };

  didPlayerWin() {
    return !(this.purses[this.currentPlayer] == 6)
  };

  public isPlayerInPrison(player: string) {
    const index = this.players.indexOf(player)
    return this.inPenaltyBox[index]
  }

  public getPlayerPosition(player: string) {
    const index = this.players.indexOf(player)
    return this.places[index]
  }

}
