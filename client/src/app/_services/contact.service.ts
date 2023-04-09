import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  contactDeveloper(model: any) {
    this.http.post(this.baseUrl + 'contact', model).subscribe({
      next: (response) => {
        if (response === true) {
          this.toastr.success(
            'Your message sent to developer.',
            'Message Sent'
          );
        }
      },
      error: (error) => this.toastr.error(error.error, 'Error'),
    });
  }
}
