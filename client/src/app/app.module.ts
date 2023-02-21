import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './admin/register/register.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { PostComponent } from './post/post/post.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwInterceptor } from './_interceptors/jw.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { UserCardComponent } from './user/user-card/user-card.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { PhotoEditorComponent } from './user/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TasksComponent,
    UserListComponent,
    UserDetailComponent,
    PostListComponent,
    PostDetailComponent,
    PostComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    UserCardComponent,
    UserEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
