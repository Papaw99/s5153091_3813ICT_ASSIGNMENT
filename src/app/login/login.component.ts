import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = ""
  password = ""

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  checkCredentials(){
    let bodyData = {"userName": this.userName, "password": this.password}
    this.http.post('http://localhost:3000/api/auth', bodyData).subscribe(res =>{
      let response:any = res
      if (response.valid == true) {
        localStorage.setItem("userID", response.userID)
        localStorage.setItem("userName",response.userName)
        localStorage.setItem("email",response.email)
        localStorage.setItem("role", response.role)
        localStorage.setItem("valid", "true")
        this.router.navigateByUrl('/groups')
      }
      else {
        alert("Incorrect Credentials")
      }
    })
  }

}
