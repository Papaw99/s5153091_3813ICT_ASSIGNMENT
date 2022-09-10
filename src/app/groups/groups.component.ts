import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  group = ""
  groups: Array<{groupName: string, groupID: number}> = []
  groupMemberships: Array<{groupID: number, userID: number, role: string}> = []
  userRole = localStorage.getItem("role")
  userID = localStorage.getItem("userID") as unknown as number
  usersGroups: Array<{groupName: string, groupID: number}> = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get('http://localhost:3000/api/getGroups').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.groups.push(response[i])
      }
      console.log(this.groups)
    })

    this.http.get('http://localhost:3000/api/getGroupMemberships').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.groupMemberships.push(response[i])
      }

      if(this.userRole == "groupAdmin" || this.userRole == "superAdmin"){
          this.usersGroups = this.groups
      } else {
        for(let i = 0; i < this.groupMemberships.length; i++){
          if(this.groupMemberships[i].userID == this.userID){
            for(let j = 0; j < this.groups.length; j++){
              if(this.groupMemberships[i].groupID == this.groups[j].groupID){
                this.usersGroups.push(this.groups[j])
                continue
              } else {
                continue;
              }
            }
          } else{
            continue
          }
        }
      }
    }) 
  }

  deleteGroup(){
    let bodyData = {"groupID": this.group}
    this.http.post('http://localhost:3000/api/deleteGroup', bodyData).subscribe(res=>{
      alert(this.group + "Deteled!")
    })
  }

}
