
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from '../services/authservice.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private msal = inject(MsalService);
  isLoggedIn = signal(false);
  private router = inject(Router);

  constructor() {

  }

  ngOnInit(): void {



    const account =
      this.msal.instance.getActiveAccount() ??
      this.msal.instance.getAllAccounts()[0];

    if (account) {
      this.msal.instance.setActiveAccount(account);
      this.isLoggedIn.set(true);
      this.router.navigate(['/dashboard']);

    } else {
      this.isLoggedIn.set(false);
    }
  }


  login(): void {
    this.msal.loginRedirect({
      scopes: ['openid', 'profile']
    });
  }
}

