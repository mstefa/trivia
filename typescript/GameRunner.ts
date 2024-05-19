import { Game, Logger } from "./Game";

var notAWinner = false;

class LoggerConsole implements Logger {

  log(message: string): void {
    console.log(message)
  }

}

const logger = new LoggerConsole()


var game = new Game(['Chet', 'Pat', 'Sue'], logger);

do {


  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);
