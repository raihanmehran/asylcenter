import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './admin/tasks/tasks.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostComponent } from './post/post/post.component';
import { RegisterComponent } from './admin/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: TasksComponent },
  { path: 'admin/user/register', component: RegisterComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'post', component: PostComponent },
  { path: 'post/list', component: PostListComponent },
  { path: 'post/list/:id', component: PostDetailComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
