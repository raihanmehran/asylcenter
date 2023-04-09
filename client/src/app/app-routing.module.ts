import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './admin/tasks/tasks.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { RegisterComponent } from './admin/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { PostEditorComponent } from './post/post-editor/post-editor.component';
import { SearchPostComponent } from './post/search-post/search-post.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventEditorComponent } from './event/event-editor/event-editor.component';
import { EventSearchComponent } from './event/event-search/event-search.component';
import { AdminGuard } from './_guards/admin.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { MemberGuard } from './_guards/member.guard';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { ContactComponent } from './developer/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'admin', component: TasksComponent, canActivate: [AdminGuard] },
      {
        path: 'admin/user/register',
        component: RegisterComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/panel',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'users/:username',
        component: UserDetailComponent,
      },
      {
        path: 'user/edit',
        component: UserEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      {
        path: 'post/list',
        component: PostListComponent,
        canActivate: [MemberGuard],
      },
      {
        path: 'post/post-editor',
        component: PostEditorComponent,
        canActivate: [AdminGuard],
      },
      { path: 'post/list/:id', component: PostDetailComponent },
      {
        path: 'post/search',
        component: SearchPostComponent,
        canActivate: [AdminGuard],
      },

      {
        path: 'events/editor',
        component: EventEditorComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'events/list',
        component: EventListComponent,
        canActivate: [MemberGuard],
      },
      {
        path: 'events/search',
        component: EventSearchComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/reset-password',
        component: ResetPasswordComponent,
        canActivate: [AdminGuard],
      },
      { path: 'errors', component: TestErrorComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'server-error', component: ServerErrorComponent },
    ],
  },
  { path: 'developer/contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
