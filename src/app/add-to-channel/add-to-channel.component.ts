import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-to-channel',
  templateUrl: './add-to-channel.component.html',
  styleUrls: ['./add-to-channel.component.css']
})
export class AddToChannelComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  user = ""
  channelID: any
  users: Array<{userName: string, userID: number}> = []

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.channelID = params.get('channelID')
    })

    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
      console.log(this.users[0])
    })

  }

  addToChannel(){
    let bodyData = {"userID": this.user, "channelID": this.channelID}

    this.http.post('http://localhost:3000/api/addToChannel', bodyData).subscribe(res =>{
      alert("Added to channel")
    })
  }

}
