import * as readline from 'readline';
import {
  PlayCreatureCommand,
  HearthstoneGame,
  GeneratePlayer,
  HearthstonePlayer,
  StartGameCommand,
  GetGameSummary,
  AttackCreatureCommand
} from '../demo';
import { Command, Game } from '../../models';

export interface GameController {
  processCommand(command: Command): Game | string;
}

export class HearthstoneController implements GameController {
  game: HearthstoneGame;
  constructor() {
    this.game = new HearthstoneGame(
      GeneratePlayer('p1') as HearthstonePlayer,
      GeneratePlayer('p2') as HearthstonePlayer
    );
  }
  processCommand = (command: Command): HearthstoneGame | string => {
    console.log('we got a command');
    if (command.commandIsLegal(this.game)) {
      const actions = command.handle(this.game);
      this.game.flushQueue(actions);
      return GetGameSummary(this.game);
    } else {
      return 'Command not legal';
    }
  };
}

export class CliGameHandler {
  parser: (string) => any;
  constructor() {}
  loop() {
    // Get process.stdin as the standard input object.
    const standard_input = process.stdin;
    const parse = this.parseInput;
    const engine: HearthstoneController = new HearthstoneController();
    // Set input character encoding.
    standard_input.setEncoding('utf-8');

    // Prompt user to input data in console.
    console.log('Please input text in command line.');

    // When user input data and click enter key.
    standard_input.on('data', function(data) {
      // User input exit.
      if (data.toString() === 'exit\n') {
        // Program exit.
        console.log('User input complete, program exit.');
        process.exit();
      } else {
        console.log('we got input: ' + data.toString());
        // Print user input in console.
        parse(data.toString(), engine);
        // game.flushQueue();
      }
    });
  }

  private parseInput(input: string, controller: HearthstoneController) {
    try {
      const commandName = input.substr(0, 2);
      const playerNumber = Number(input[2]);
      const targetPlayerNumber = playerNumber ? 0 : 1;

      const sourceCardNumber = input[3];
      const targetCardNumber = input[4];
      // const cardNumber = input[4];
      const playerId = Array.from(controller.game.players.values())[
        playerNumber
      ]?.id;
      const targetPlayerId = Array.from(controller.game.players.values())[
        targetPlayerNumber
      ]?.id;
      let command: Command = null;
      console.log(commandName);
      if (commandName === 'pc') {
        console.log('executing pc command');
        const sourceId = Array.from(
          controller.game.players.get(playerId).hand.cards.values()
        )[sourceCardNumber]?.id;

        command = new PlayCreatureCommand(playerId, sourceId);
      } else if (commandName === 'sg') {
        command = new StartGameCommand();
      } else if (commandName === 'ac') {
        const sourceId = Array.from(
          controller.game.players.get(playerId).battlefield.cards.values()
        )[sourceCardNumber]?.id;

        const targetId = Array.from(
          controller.game.players.get(targetPlayerId).battlefield.cards.values()
        )[targetCardNumber]?.id;
        command = new AttackCreatureCommand(
          controller.game,
          playerId,
          sourceId,
          targetId
        );
      }
      console.log(`command is: ${command}`);
      if (command) {
        console.log('we doing it');
        console.log(controller.processCommand(command));
      } else {
        console.log('command not found');
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
