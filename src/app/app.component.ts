import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private msal = inject(MsalService);
  private router = inject(Router);

  isLoggedIn = signal(false);

  ngOnInit(): void {
    this.msal.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult | null) => {
        if (result?.account) {
          this.msal.instance.setActiveAccount(result.account);
        }

        const account =
          this.msal.instance.getActiveAccount() ??
          this.msal.instance.getAllAccounts()[0];

        if (account) {
          this.msal.instance.setActiveAccount(account);
          this.isLoggedIn.set(true);

          // if (result?.account) {
          //   this.router.navigate(['/dashboard']);
          // }
        } else {
          this.isLoggedIn.set(false);
        }
      },
      error: error => console.error('MSAL redirect error:', error)
    });
  }

  login(): void {
    this.msal.loginRedirect({
      scopes: ['openid', 'profile']
    });
  }
}