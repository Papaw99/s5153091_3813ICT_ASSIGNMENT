import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  groupID: any
  channel = ""
  channels: Array<{channelID: number, groupID: number, channelName: string}> = []
  channelsMemberships: Array<{userID: number, channelID: number}> = []
  usersChannels: Array<{channelID: number, groupID: number, channelName: string}> = []
  groupChannels: Array<{channelID: number, groupID: number, channelName: string}> = []
  userRole = localStorage.getItem("role")
  userID = localStorage.getItem("userID") as unknown as number

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>
      {this.groupID = params.get('groupID')}
    )

    this.http.get('http://localhost:3000/api/getChannels').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.channels.push(response[i])
      }
      for (let i = 0; i < this.channels.length; i++){
        if(this.channels[i].groupID == this.groupID){
          this.groupChannels.push(this.channels[i])
        } else {
          continue
        }
      }
      console.log(this.groupChannels)
    })

    this.http.get('http://localhost:3000/api/getChannelMemberships').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.channelsMemberships.push(response[i])
      }
      
      if(this.userRole == "groupAdmin" || this.userRole == "superAdmin"){
        this.usersChannels = this.groupChannels
      } else {
        for(let i = 0; i < this.channelsMemberships.length; i++){
          if(this.channelsMemberships[i].userID == this.userID){
            for(let j = 0; j < this.groupChannels.length; j++){
              if(this.channelsMemberships[i].channelID == this.groupChannels[j].channelID){
                this.usersChannels.push(this.groupChannels[j])
                continue
              } else {
                continue;
              }
            }
          } else{
            continue
          }
        }
      }

    })
    
  }

  deleteChannel(){
    let bodyData = {"channelID": this.channel}
    this.http.post('http://localhost:3000/api/deleteChannel', bodyData).subscribe(res=>{
      alert(this.channel + " deteled!")
    })
  }

}
