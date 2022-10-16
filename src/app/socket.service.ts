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

  // Initiating socket connection
  initSocket(userName: any, channelID: any): void {
    this.socket = io(SERVER_URL);
    console.log('connecting')
    this.joinRoom(userName, channelID)
  }

  // Socket to join a room
  joinRoom(userName: any, channelID: any): void {
    this.socket.emit("joinRoom", userName, channelID)
  }

  // When socket receives a new user from the server
  newUser(next: any){
    this.socket.on("newUser", (userName: String) =>{
      next({userName})
    })
  }

  // Sending a message
  sendMessage(userName: any, message: any, channelID: any){
    this.socket.emit("sendMessage", userName, message, channelID)
  }

  // Receiving a new message in the channel
  receiveMessage(next: any){
    this.socket.on("receiveMessage", (userName: String, message: String) =>{
      next({userName, message})
    })
  }

  // Sending to server when user disconnected
  userDisconnect(userName: any, channelID: any): void{
    this.socket.emit("userDisconnect", userName, channelID)
  }

  // Receiving from server when user disconnects
  userDisconnected(next: any){
    this.socket.on("userDIsconnected", (userName: String) =>{
      next({userName})
    })
  }
  
}
