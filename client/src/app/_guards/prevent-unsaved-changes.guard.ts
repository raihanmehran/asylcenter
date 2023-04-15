import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<UserEditComponent>
{
  constructor(private confirmService: ConfirmService) {}

  // canDeactivate(component: UserEditComponent): boolean {
  //   if (component.editForm?.dirty) {
  //     return confirm('Are you sure you want to leave?');
  //   }
  //   return true;
  // }

  canDeactivate(component: UserEditComponent): Observable<boolean> {
    if (component.editForm?.dirty) {
      return this.confirmService.confirm();
    }
    return of(true);
  }


}
