import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-to-channel',
  templateUrl: './add-to-channel.component.html',
  styleUrls: ['./add-to-channel.component.css']
})
export class AddToChannelComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router) { }

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
    })

    
    if(localStorage.getItem('role') === "superAdmin" || localStorage.getItem('role') === "groupAdmin"){
      
    }
    else{
      alert("Access denied!!!")
      if(localStorage.getItem('valid') === "true"){
        this.router.navigate(['/groups'])
      }
      else{
        this.router.navigate(['/'])
      }
    }

  }

  addToChannel(){
    let bodyData = {"userID": this.user, "channelID": this.channelID}

    this.http.post('http://localhost:3000/api/addToChannel', bodyData).subscribe(res =>{
      alert("Added to channel")
    })
  }

}
