import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      });
    });
  }

  public onConnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('connect', () => observer.next());
    });
  }

  public onDisconnect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('disconnect', () => observer.next());
    });
  }
}
