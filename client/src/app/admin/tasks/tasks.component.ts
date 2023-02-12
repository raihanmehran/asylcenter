import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this.navigate('/admin/user/register');
  }

  usersList() {
    this.navigate('/users');
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
