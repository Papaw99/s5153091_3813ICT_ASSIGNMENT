import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  constructor() { }

  initSocket(userName: any, channelID: any): void {
    this.socket = io(SERVER_URL);
    console.log('connecting')
    this.joinRoom(userName, channelID)
  }

  joinRoom(userName: any, channelID: any): void {
    this.socket.emit("joinRoom", userName, channelID)
  }

  sendMessage(userName: any, message: any){
    this.socket.emit("sendMessage", userName, message)
  }

  receiveMessage(){
    this.socket.on("receiveMessage", {userName: String, message: String})
  }
  
}
