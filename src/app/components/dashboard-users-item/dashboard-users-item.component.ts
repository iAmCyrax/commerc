import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/interfaces";

@Component({
  selector: 'app-dashboard-users-item',
  templateUrl: './dashboard-users-item.component.html',
  styleUrls: ['./dashboard-users-item.component.scss']
})
export class DashboardUsersItemComponent implements OnInit {
  hide = true;
  routeSub: Subscription;
  @Input() user: User;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.user.userId = params['id'];
    });
  }

  seeDetails() {
    debugger;
    this.router.navigate(['dashboard', 'user', this.user.userId])
  }
}
