import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './admin/post/post.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { UserDetailComponent } from './admin/user-detail/user-detail.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: TasksComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'post', component: PostComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
