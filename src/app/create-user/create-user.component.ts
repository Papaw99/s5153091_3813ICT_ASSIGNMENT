import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createUser(){
    let bodyData = {"userName": this.userName, "email": this.email, "password": this.password, "role": this.role}

    this.http.post('http://localhost:3000/api/createUser', bodyData).subscribe(res =>{
    })
  }

}
