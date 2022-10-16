import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  groupName = ""

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    // Checking to make sure user is an admin
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

  // API call to make a group on the MongoDB database
  createGroup(){

    if (this.groupName === ""){
      alert("Please fill in the group name!")
    }
    else {
      let bodyData = {"groupName": this.groupName}

      this.http.post('http://localhost:3000/api/createGroup', bodyData).subscribe(res =>{
      })
      alert(this.groupName+ " created")
    }
  }

}
