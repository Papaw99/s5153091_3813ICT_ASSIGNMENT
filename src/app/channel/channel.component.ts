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

    if(localStorage.getItem('valid') === "true"){
      
    }
    else{
      alert("Access denied!!!")
      this.router.navigate(['/'])
    }

    if (this.userRole == "superAdmin" || this.userRole == "groupAdmin"){
      this.isAdmin = true
    }
    this.socketService.initSocket(this.userName, this.channelID)
    this.receivedMessage = this.socketService.receiveMessage((message: any)=>{
      this.messages.push({userName: message.userName, message: message.message})
    })
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

  sendMessage(){
    this.socketService.sendMessage(this.userName, this.message, this.channelID)
  }

}
