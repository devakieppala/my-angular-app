import { Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


interface WeatherForecast {
  date: Date,
  temperatureC: bigint,
  temperatureF: bigint,
  summary?: string
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {

  private msalService = inject(MsalService);
  private ngZone = inject(NgZone);
  isLoggedIn = true;
  username = '';
 //Signal is a way to store value and notify Angular when that value changes
 foreCast = signal<WeatherForecast[]>([]); 

  constructor(private dashboardService: DashboardService,  private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    const account: AccountInfo | null =
      this.msalService.instance.getActiveAccount();
    this.username = account?.name ?? '';
    this.dashboardService.getData().subscribe({
      next: (data: any) => {
       this.ngZone.run(() => {
        this.foreCast.set(data);
        console.log('Forecast count:', this.foreCast.length);
      });
      },
      error: (err: unknown) => {
        console.error('Login failed', err);
      }

    });
  }
}
