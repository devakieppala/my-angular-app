import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl =  environment.apiUrl+"/WeatherForecast";

  constructor(private httpClient: HttpClient) { }
  
  getData() {
    return this.httpClient.get(this.apiUrl);
  }
}
