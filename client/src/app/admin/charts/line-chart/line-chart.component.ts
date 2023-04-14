import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { take } from 'rxjs';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { AccountService } from 'src/app/_services/account.service';
import { DashboardService } from 'src/app/_services/dashboard.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  loggedUser: LoggedUser | undefined;

  membersData: number[] = [];
  moderatorsData: number[] = [];
  adminsData: number[] = [];

  constructor(
    private dashboardService: DashboardService,
    private accountService: AccountService
  ) {
    Chart.register(Annotation);
    this.getUser();
  }

  ngOnInit(): void {
    if (this.loggedUser) {
      this.dashboardService.calculateData();
      this.dashboardService.membersData$.subscribe({
        next: (data) => {
          this.lineChartData.datasets[0].data = data;
          this.chart?.update();
        },
      });

      this.dashboardService.moderatorsData$.subscribe({
        next: (data) => {
          this.lineChartData.datasets[1].data = data;
          this.chart?.update();
        },
      });

      this.dashboardService.adminsData$.subscribe({
        next: (data) => {
          this.lineChartData.datasets[2].data = data;
          this.chart?.update();
        },
      });
    }
  }

  getUser() {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.loggedUser = user;
      },
    });
  }

  private newLabel? = 'Admins';

  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Members',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Moderators',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Admins',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  };

  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },
  };

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  // events

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
          LineChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public hideOne(dataSet: number): void {
    const isHidden = this.chart?.isDatasetHidden(dataSet);
    this.chart?.hideDataset(dataSet, !isHidden);
  }

  public pushOne(): void {
    // this.lineChartData.datasets.forEach((x, i) => {
    //   const num = LineChartComponent.generateNumber(i);
    //   x.data.push(num);
    // });
    // this.lineChartData?.labels?.push(
    //   `Label ${this.lineChartData.labels.length}`
    // );
    // this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
}
