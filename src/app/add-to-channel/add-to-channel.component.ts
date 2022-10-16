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
  users: Array<{userName: string, userID: number}> = [] // Array to store all the users on the app

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.channelID = params.get('channelID')
    })
    
    // API call top get all the users on the application from the MongoDB database
    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
    })

    // Checks if the user is logged in and is an admin
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

  // Adding user to a channel
  addToChannel(){
    let bodyData = {"userID": this.user, "channelID": this.channelID}

    // API call to add user to the channel in the MongoDB database
    this.http.post('http://localhost:3000/api/addToChannel', bodyData).subscribe(res =>{
      alert("Added to channel")
    })
  }

}
