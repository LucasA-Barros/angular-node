import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _apiURL = ENVIRONMENT.API;
  private _socket: Socket = io('http://localhost:3000', {
    transports: ['websocket']
  });

  constructor(
    private http: HttpClient
  ) {
    // this._socket.on('connect', () => console.log('Conectou Angular', this._socket.id));
    // this._socket.on('statusAtualizado', (data) => console.log('Status:', data));
  }

  // onStatusAtualizado(): Observable<any> {
  //   return new Observable(observer => {
  //     this._socket.on('statusAtualizado', (data: any) => {
  //       observer.next(data);
  //     });
  //   });
  // }

  // enviarMensagem(payload: any) {
  //   this._socket.emit('novaMensagem', payload);
  // }

  public generateMensagemId(): string {
    const mensagemId = uuidv4();
    return mensagemId;
  }

  public postNotification(data: any) {
    return this.http.post(`${this._apiURL}/api/notificar`, data);
  }
}
