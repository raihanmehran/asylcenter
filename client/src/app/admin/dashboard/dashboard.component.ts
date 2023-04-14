import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { UsersByRoleAndMonth } from 'src/app/_models/usersByRoleAndMonth';
import { AccountService } from 'src/app/_services/account.service';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loggedUser: LoggedUser | undefined;
  members: UsersByRoleAndMonth[] = [];
  moderators: UsersByRoleAndMonth[] = [];
  admins: UsersByRoleAndMonth[] = [];
  membersCount: number = 0;
  moderatorsCount: number = 0;
  adminsCount: number = 0;
  membersData: number[] = [];
  OnlineUsersCount: number = 0;
  postsCount: number = 0;
  eventsCount: number = 0;

  constructor(
    public accountService: AccountService,
    public dashboardService: DashboardService,
    private presenceService: PresenceService
  ) {
    this.getUser();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this.loggedUser) {
      this.dashboardService.createHubConnection(this.loggedUser);

      this.dashboardService.memberUsers$.subscribe({
        next: (users) => {
          if (users) {
            this.members = users;
            this.membersCount = 0;

            for (let user of users) {
              this.membersCount += user.count;
            }

            this.getMembersData();
          }
        },
      });
      this.dashboardService.moderatorUsers$.subscribe({
        next: (moderators) => {
          this.moderators = moderators;
          this.moderatorsCount = 0;

          for (let m of moderators) {
            this.moderatorsCount += m.count;
          }
        },
      });
      this.dashboardService.adminUsers$.subscribe({
        next: (users) => {
          this.admins = users;
          this.adminsCount = 0;

          for (let user of users) {
            this.adminsCount += user.count;
          }
        },
      });

      this.dashboardService.postsCount$.subscribe({
        next: (posts) => {
          this.postsCount = posts;
        },
      });

      this.dashboardService.eventsCount$.subscribe({
        next: (events) => {
          this.eventsCount = events;
        },
      });

      this.presenceService.onlineUsers$.subscribe({
        next: (users) => {
          this.OnlineUsersCount = users.length;
        },
      });
    } else this.dashboardService.stopHubConnection();
  }

  getUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (loggedUser) => {
        if (loggedUser) {
          this.loggedUser = loggedUser;
        }
      },
    });
  }

  getMembersData() {
    this.dashboardService.membersData$.subscribe({
      next: (data) => {
        if (data) this.membersData = data;
      },
    });
  }

  navigate(route: string) {
    console.log(route);
  }
}
