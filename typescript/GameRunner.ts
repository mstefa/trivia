import { Game } from "./game";

var notAWinner = false;

var game = new Game(['Chet', 'Pat', 'Sue']);

do {


  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);
