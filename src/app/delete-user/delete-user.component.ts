import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userName = ""
  users: Array<{userName: string, role: string}> = []

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    // API call to get all the users in the server
    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
    })

    // Checking to see if user is an admin
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

  // API call to delete the user from MongoDB database
  deleteUser(){
    let bodyData = {"userName": this.userName}
    this.http.post('http://localhost:3000/api/deleteUser', bodyData).subscribe(res=>{
      alert(this.userName + "Deteled!")
    })
  }

}
