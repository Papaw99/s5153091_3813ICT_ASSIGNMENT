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

  newUser(next: any){
    this.socket.on("newUser", (userName: String) =>{
      next({userName})
    })
  }

  sendMessage(userName: any, message: any, channelID: any){
    this.socket.emit("sendMessage", userName, message, channelID)
  }

  receiveMessage(next: any){
    this.socket.on("receiveMessage", (userName: String, message: String) =>{
      next({userName, message})
    })
  }

  userDisconnect(userName: any, channelID: any): void{
    this.socket.emit("userDisconnect", userName, channelID)
  }

  userDisconnected(next: any){
    this.socket.on("userDIsconnected", (userName: String) =>{
      next({userName})
    })
  }
  
}
