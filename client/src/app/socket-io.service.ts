import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";

@Injectable()
export class SocketIoService {

  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect("http://localhost:3000");
  }

  on(eventName: any, callback: any) {
    if (this.socket) {
      this.socket.on(eventName, (data: any) => {
        callback(data);
      });
    }
  }

  emit(eventName: any, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  removeListener(eventName: any) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  }


  createObservable(event) {
    return new Observable<any>(observer => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

}
