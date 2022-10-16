import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private socketService: SocketService, private router: Router) { }

  channelID: any
  userRole = localStorage.getItem('role')
  userName = localStorage.getItem('userName')
  isAdmin = false
  message = ""
  receivedMessage: any
  newUser: any
  userDisconnected: any
  messages: any = [];
  newUsers: any = []
  disconnectedUsers: any = []

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.channelID = params.get('channelID')
    })

    // Check if connected user is logged in
    if(localStorage.getItem('valid') === "true"){
      
    }
    else{
      alert("Access denied!!!")
      this.router.navigate(['/'])
    }

    // Check if user is an admin. Used to display admin actions based on whether user is admin or not
    if (this.userRole == "superAdmin" || this.userRole == "groupAdmin"){
      this.isAdmin = true
    }

    // Initiate socket connection
    this.socketService.initSocket(this.userName, this.channelID)

    // Receive messages from other clients
    this.receivedMessage = this.socketService.receiveMessage((message: any)=>{
      this.messages.push({userName: message.userName, message: message.message})
    })

    // Receive messages when another client joings the channel
    this.newUser = this.socketService.newUser((message: any)=>{
      this.newUsers.push({userName: message.userName})
    })
    this.userDisconnected = this.socketService.userDisconnected((message: any)=>{
      console.log(message.userName)
      this.disconnectedUsers.push({userName: message.userName})
    })
  }

  ngOnDestroy(): void {
    this.socketService.userDisconnect(this.userName, this.channelID)
  }

  // Send message to the channel
  sendMessage(){
    // SocketService used to send message. Passing the userName, message and channelID
    this.socketService.sendMessage(this.userName, this.message, this.channelID)
  }

}
