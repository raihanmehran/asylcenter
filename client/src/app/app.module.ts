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
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { PostEditorComponent } from './post/post-editor/post-editor.component';
import { PostCardComponent } from './post/post-card/post-card.component';
import { TextAreaComponent } from './_forms/text-area/text-area.component';
import { SearchPostComponent } from './post/search-post/search-post.component';
import { SearchPostCardComponent } from './post/search-post-card/search-post-card.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventCardComponent } from './event/event-card/event-card.component';
import { EventEditorComponent } from './event/event-editor/event-editor.component';
import { TimepickerComponent } from './_forms/timepicker/timepicker.component';
import { EventSearchComponent } from './event/event-search/event-search.component';
import { EventSearchCardComponent } from './event/event-search-card/event-search-card.component';
import { EventUpdateComponent } from './event/event-update/event-update.component';
import { EventFeedbackComponent } from './event/event-feedback/event-feedback.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { ContactComponent } from './developer/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LineChartComponent } from './admin/charts/line-chart/line-chart.component';

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
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    UserCardComponent,
    UserEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    PostEditorComponent,
    PostCardComponent,
    TextAreaComponent,
    SearchPostComponent,
    SearchPostCardComponent,
    EventListComponent,
    EventCardComponent,
    EventEditorComponent,
    TimepickerComponent,
    EventSearchComponent,
    EventSearchCardComponent,
    EventUpdateComponent,
    EventFeedbackComponent,
    HasRoleDirective,
    UserManagementComponent,
    AdminPanelComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ResetPasswordComponent,
    ContactComponent,
    FooterComponent,
    DashboardComponent,
    LineChartComponent,
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
