import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-perms',
  templateUrl: './edit-perms.component.html',
  styleUrls: ['./edit-perms.component.css']
})
export class EditPermsComponent implements OnInit {

  userName = ""
  role = ""
  users: Array<{userName: string, role: string}> = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
      console.log(this.users[0])
    })

  }

}
