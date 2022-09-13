import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  userName = ""
  users: Array<{userName: string, role: string}> = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
    })

  }

  deleteUser(){
    let bodyData = {"userName": this.userName}
    this.http.post('http://localhost:3000/api/deleteUser', bodyData).subscribe(res=>{
      alert(this.userName + "Deteled!")
    })
  }

}
