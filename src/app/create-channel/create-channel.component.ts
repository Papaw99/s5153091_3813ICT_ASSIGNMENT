import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css']
})
export class CreateChannelComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  groupID: any
  channelName = ""

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {this.groupID = params.get('groupID')}
    )

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

  createChannel(){
    let bodyData = {"groupID":this.groupID, "channelName": this.channelName}
  
    this.http.post('http://localhost:3000/api/createChannel', bodyData).subscribe(res =>{
    })
    alert(this.channelName+ " created")
  }

}
