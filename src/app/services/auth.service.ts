import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly SESSION_KEY = 'userSession';
  private msalService = inject(MsalService);
 

  constructor(private router: Router) { }
  // Create session after login
  createSession(user: any): void {
    sessionStorage.setItem(
      this.SESSION_KEY,
      JSON.stringify(user)
    );
  }

  // Get current session
  getSession(): any {
    const session = sessionStorage.getItem(this.SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  getToken(): string {
    var session = this.getSession();
    return session.token;
  }

  // Check whether user is logged in
  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  // Destroy session during logout
  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }

  //msal get username
  getUsername(): string {
return'';
  }

}
