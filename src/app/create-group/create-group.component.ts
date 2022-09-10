import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  groupName = ""

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createGroup(){
    let bodyData = {"groupName": this.groupName}

    this.http.post('http://localhost:3000/api/createGroup', bodyData).subscribe(res =>{
    })
    alert(this.groupName+ " created")
  }

}
