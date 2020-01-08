// import * as readline from 'readline';
// import {
//   Game,
//   PlayCreatureCommand,
//   HearthstoneGame,
//   GeneratePlayer,
//   HearthstonePlayer,
//   StartGameCommand,
//   GetGameSummary,
//   AttackCreatureCommand
// } from '../lib.models';
// export class TestController {
//   private rl: any;
//   game: HearthstoneGame;
//   parser: (string) => any;
//   constructor() {}
//   loop() {
//     // Get process.stdin as the standard input object.
//     const standard_input = process.stdin;
//     const parse = this.parseInput;
//     // Set input character encoding.
//     standard_input.setEncoding('utf-8');
//     const game = new HearthstoneGame(
//       GeneratePlayer('p1') as HearthstonePlayer,
//       GeneratePlayer('p2') as HearthstonePlayer
//     );
//     // Prompt user to input data in console.
//     console.log('Please input text in command line.');

//     // When user input data and click enter key.
//     standard_input.on('data', function(data) {
//       // User input exit.
//       if (data.toString() === 'exit\n') {
//         // Program exit.
//         console.log('User input complete, program exit.');
//         process.exit();
//       } else {
//         // Print user input in console.
//         parse(data.toString(), game);
//         // game.flushQueue();
//         console.log(GetGameSummary(game));
//       }
//     });
//   }

//   private parseInput(input: string, game: HearthstoneGame) {
//     try {
//       const commandName = input.substr(0, 2);
//       const playerNumber = Number(input[2]);
//       const targetPlayerNumber = playerNumber ? 0 : 1;

//       const sourceCardNumber = input[3];
//       const targetCardNumber = input[4];
//       // const cardNumber = input[4];
//       const playerId = Array.from(game.players.values())[playerNumber]?.id;
//       const targetPlayerId = Array.from(game.players.values())[
//         targetPlayerNumber
//       ].id;

//       if (commandName === 'pc') {
//         console.log('executing pc command');
//         const sourceId = Array.from(
//           game.players.get(playerId).hand.cards.values()
//         )[sourceCardNumber]?.id;

//         const command = new PlayCreatureCommand(playerId, sourceId);
//         if (command.commandIsLegal(game)) {
//           const actions = command.handle(game);
//           game.flushQueue(actions);
//         } else {
//           console.log('commnad not legal');
//         }
//       } else if (commandName === 'sg') {
//         const command = new StartGameCommand('');
//         if (command.commandIsLegal(game)) {
//           const actions = command.handle(game);
//           game.flushQueue(actions);
//         } else {
//           console.log('commnad not legal');
//         }
//       } else if (commandName === 'ac') {
//         const sourceId = Array.from(
//           game.players.get(playerId).battlefield.cards.values()
//         )[sourceCardNumber]?.id;

//         const targetId = Array.from(
//           game.players.get(targetPlayerId).battlefield.cards.values()
//         )[targetCardNumber]?.id;
//         const command = new AttackCreatureCommand(
//           game,
//           playerId,
//           sourceId,
//           targetId
//         );
//         if (command.commandIsLegal(game)) {
//           const actions = command.handle(game);
//           game.flushQueue(actions);
//         } else {
//           console.log('commnad not legal');
//         }
//       }
//     } catch (e) {
//       console.log(e);
//       return null;
//     }
//   }
// }
