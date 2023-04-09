import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Post } from 'src/app/_models/post';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { PostService } from 'src/app/_services/post.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // users$: Observable<User[]> | undefined;
  users: User[] = [];
  posts: Post[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];
  modalRef: BsModalRef | undefined;
  @ViewChild('poststDialog', { static: true }) poststDialogRef:
    | TemplateRef<any>
    | undefined;

  constructor(
    private usersService: UsersService,
    private postService: PostService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.userParams = this.usersService.getUserParams();
  }

  ngOnInit(): void {
    // this.users$ = this.usersService.getUsers();
    this.loadUsers();
  }

  openPostModal() {
    this.modalRef = this.modalService.show(this.poststDialogRef!, {
      class: 'modal-lg',
    });
  }

  loadUsers() {
    if (this.userParams) {
      this.usersService.setUserParams(this.userParams);
      this.usersService.getUsers(this.userParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.users = response.result;
            this.pagination = response.pagination;
          }
        },
      });
    }
  }

  resetFilter() {
    this.userParams = this.usersService.resetUserParams();
    this.loadUsers();
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.usersService.setUserParams(this.userParams);
      this.loadUsers();
    }
  }

  viewUserPosts($event: number) {
    const userId = $event;
    this.postService.getPostForUser(userId).subscribe({
      next: (response) => {
        if (response) {
          this.posts = response;
          if (!this.posts || this.posts.length === 0) {
            this.toastr.show('No posts found for the selected user!');
          } else {
            this.openPostModal();
          }
        }
      },
    });
  }
  hideModel() {
    this.modalService.hide();
  }
}
