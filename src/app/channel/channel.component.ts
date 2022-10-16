import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private socketService: SocketService) { }

  channelID: any
  userRole = localStorage.getItem('role')
  userName = localStorage.getItem('userName')
  isAdmin = false
  message = "test"
  receivedMessage: any
  receivedUser: any;
  messages: any = [];

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.channelID = params.get('channelID')
    })

    if (this.userRole == "superAdmin" || this.userRole == "groupAdmin"){
      this.isAdmin = true
    }
    this.socketService.initSocket(this.userName, this.channelID)
    this.receivedMessage = this.socketService.receiveMessage((message: any)=>{
      this.receivedUser = message.userName 
      this.receivedMessage = message.message
      this.messages.push({userName: this.receivedUser, message: this.receivedMessage})
    })
  }

  sendMessage(){
    this.socketService.sendMessage(this.userName, this.message, this.channelID)
  }

}
