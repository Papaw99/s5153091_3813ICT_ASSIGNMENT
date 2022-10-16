import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userName = ""
  email = ""
  password = ""
  role = "user"

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
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

  createUser(){
    if (this.userName === "" || this.email === "" || this.password === ""){
      alert("Please fill in all the information!")
    }
    else{ 
      let bodyData = {"userName": this.userName, "email": this.email, "password": this.password, "role": this.role}

      this.http.post('http://localhost:3000/api/createUser', bodyData).subscribe(res =>{
      })
      alert(this.userName+" created!")
    }
  }

}
