import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-success',
  standalone: true,
  templateUrl: './login-success.html'
})
export class LoginSuccessComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');

    if (token) {

      localStorage.setItem('token', token);

      this.router.navigate(['/profile']);

    } else {

      this.router.navigate(['/login']);

    }

  }

}