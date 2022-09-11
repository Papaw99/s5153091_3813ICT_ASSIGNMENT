import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's5153091_3813ICT_ASSIGNMENT';

  valid = false as any
  role = "" as any
  isSuperAdmin = false as any

  ngDoCheck(): void{
    this.valid = localStorage.getItem('valid')
    this.role = localStorage.getItem('role')
    if (this.role == "superAdmin"){
      this.isSuperAdmin = true
    }
  }
}
