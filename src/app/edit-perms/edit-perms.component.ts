import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-perms',
  templateUrl: './edit-perms.component.html',
  styleUrls: ['./edit-perms.component.css']
})
export class EditPermsComponent implements OnInit {

  userName = ""
  role = ""
  users: Array<{userName: string, role: string}> = []

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    // API call to get list of users from MongoDB database
    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
    })

    // Checking to see if the user is admin or not.
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

  // API call to change user role
  changeRole(){
    let bodyData = {"userName": this.userName, "role": this.role}
    this.http.post('http://localhost:3000/api/changeRole', bodyData).subscribe(res=>{
    })
  }

}
