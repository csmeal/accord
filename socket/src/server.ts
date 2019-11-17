import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import { GameMessage } from '../../models';
import { GameHandler } from './game-handler';

export class Server {
  public static readonly PORT: number = 5000;
  public app: any;
  private server: any;
  private io: any;
  private port: string | number;
  private game: GameHandler = new GameHandler();

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
        let result: GameMessage = this.game.HandleAction(m);
        //  console.log(result);
        this.io.emit('message', result);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}
