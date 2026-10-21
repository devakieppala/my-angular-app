import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface UserLogin {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private httpClient = inject(HttpClient);
  private apiUrl = "$environment.apiUrl/Login";

  constructor() { }

  userlogin(email: string, password: string) {
    return this.httpClient.post(this.apiUrl+'/userlogin', { userName:email, password:password });
  }
}
