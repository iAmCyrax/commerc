import { Component, OnInit } from '@angular/core';
import { User } from "src/app/interfaces";
import { UsersService } from "src/app/services";

@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.scss']
})
export class DashboardUsersComponent implements OnInit {
  hide = true;
  users: User[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    debugger;
    this.userList();
  }

  userList(){
    debugger
    this.usersService.getAllUsers().then((success: User[])  => {
     this.users = success;
     // console.log(users);
     console.log(this.users);
     this.users.forEach((user: any) => console.log(user.userId));
   });

 }

}
