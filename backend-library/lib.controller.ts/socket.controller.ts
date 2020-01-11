import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import { HearthstoneController } from './cli.controller';
import { Command, Game, UiGame } from '../../models';
import { StartGameCommand } from '../lib.models';

export const ConvertGameToUi = (game: Game): UiGame => {
  return {
    name: game.name,
    players: Array.from(game.players.values()).map(p => {
      return {
        ...p,
        hand: {
          ...p.hand,
          cards: Array.from(p.hand.cards.values())
        },
        battlefield: {
          ...p.battlefield,
          cards: Array.from(p.battlefield.cards.values())
        },
        deck: {
          ...p.deck,
          cards: Array.from(p.battlefield.cards.values())
        },
        graveyard: {
          ...p.graveyard,
          cards: Array.from(p.graveyard.cards.values())
        }
      };
    })
  };
};
export class Server {
  public static readonly PORT: number = 5000;
  public app: any;
  private server: any;
  private io: any;
  private port: string | number;
  private controller = new HearthstoneController();

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private handleMessage(message: any): void {
    let command: Command;
    if (message.command === 'sg') {
      command = new StartGameCommand();
    }
    if (command) {
      console.log(command);
      this.controller.processCommand(command);
    }
    console.log('emitting message');
    const a = Array.from(this.controller.game.players.values());
    console.log(a[0].hand.cards);
    this.io.emit('message', {
      data: ConvertGameToUi(this.controller.game)
    });
  }

  private config(): void {
    this.port = Server.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', this.port);
      socket.on('message', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m));

        // let result: GameMessage = this.game.HandleAction(m);
        //  console.log(result);
        this.handleMessage(m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}
