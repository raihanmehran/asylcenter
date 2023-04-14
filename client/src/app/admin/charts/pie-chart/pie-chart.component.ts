import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AccountService } from 'src/app/_services/account.service';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  membersCount: number = 0;
  moderatorsCount: number = 0;
  adminsCount: number = 0;
  OnlineUsers: number = 0;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(
    private dashboardService: DashboardService,
    private presenceService: PresenceService
  ) {
    this.getChartData();
  }
  ngOnInit(): void {}

  getChartData() {
    this.dashboardService.memberUsers$.subscribe({
      next: (users) => {
        this.membersCount = 0;
        for (let user of users) {
          this.membersCount += user.count;
        }
        this.setChartData();
      },
    });

    this.dashboardService.moderatorUsers$.subscribe({
      next: (users) => {
        this.moderatorsCount = 0;
        for (let user of users) {
          this.moderatorsCount += user.count;
        }
        this.setChartData();
      },
    });

    this.dashboardService.adminUsers$.subscribe({
      next: (users) => {
        this.adminsCount = 0;
        for (let user of users) {
          this.adminsCount += user.count;
        }
        this.setChartData();
      },
    });

    this.presenceService.onlineUsers$.subscribe({
      next: (users) => {
        this.OnlineUsers = users.length;
        this.setChartData();
      },
    });
  }

  setChartData() {
    this.pieChartData.labels = ['Online', 'Members', 'Moderators', 'Admins'];
    this.pieChartData.datasets[0].data = [
      this.OnlineUsers,
      this.membersCount,
      this.moderatorsCount,
      this.adminsCount,
    ];
    this.chart?.update();
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
