import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.css']
})
export class AddToGroupComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  user = ""
  groupID: any 
  users: Array<{userName: string, userID: number}> = []

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.groupID = params.get('groupID')
    })

    // API call to get users from the MongoDB database
    this.http.get('http://localhost:3000/api/getUsers').subscribe(res =>{
      let response:any = res;
      for (let i = 0; i < response.length; i++){
        this.users.push(response[i])
      }
    })
     
    // Check if user is an admin and logged in
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

  // Add user to a group
  addToGroup(){
    let bodyData = {"userID": this.user, "groupID": this.groupID}
     
    // API call to add user to the group on MongoDB
    this.http.post('http://localhost:3000/api/addToGroup', bodyData).subscribe(res =>{
    })
  }

}
