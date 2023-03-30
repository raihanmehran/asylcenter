import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { LoggedUser } from 'src/app/_models/loggedUser';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  loggedUsers: LoggedUser[] = [];
  availableRoles = ['Member', 'Moderator', 'Admin'];
  bsModalRef: BsModalRef<RolesModalComponent> =
    new BsModalRef<RolesModalComponent>();

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (users) => (this.loggedUsers = users),
    });
  }

  openRolesModal(user: LoggedUser) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.username,
        name: user.firstName,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles],
      },
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);

    // const initialState: ModalOptions = {
    //   initialState: {
    //     list: ['Do thing', 'Another thing'],
    //     title: 'Test modal',
    //   },
    // };
    // this.bsModalRef = this.modalService.show(RolesModalComponent, initialState);
  }
}
