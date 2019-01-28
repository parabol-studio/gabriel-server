import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './auth.html'
})
export class AuthComponent {
  public password: string;
  public notification: Object;

  constructor(private http: HttpClient, private router: Router) {
    this.password = null;
  }

  public authenticate(event) {
    event.preventDefault();

    this.http.post('http://localhost:8002/gabriel/auth', { password: this.password }).subscribe(
      auth => {
        sessionStorage.setItem('gabriel-session', JSON.stringify(auth));
        this.router.navigate(['/gabriel/view']);
      },
      err => this.notification = { type: 'error', payload: err.error.error }
    );
  }
}
