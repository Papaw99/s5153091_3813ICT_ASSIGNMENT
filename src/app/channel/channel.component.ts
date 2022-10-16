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
  message = ""

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.channelID = params.get('channelID')
    })

    if (this.userRole == "superAdmin" || this.userRole == "groupAdmin"){
      this.isAdmin = true
    }
    this.socketService.initSocket(this.userName, this.channelID)
    this.socketService.receiveMessage()
  }

  sendMessage(){
    this.socketService.sendMessage(this.userName, this.message, this.channelID)
  }

}
