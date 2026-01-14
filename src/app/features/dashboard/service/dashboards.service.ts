import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dashboard, DashboardTab } from '../../../shared/models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  private http = inject(HttpClient);
  private readonly url = '/dashboards';
  
  deleteDashboard(dashboardId: string) {
    return this.http.delete<void>(`${this.url}/${dashboardId}`);
  }
  
  getDashboard(dashboardId: string) {
    return this.http.get<Dashboard>(`${this.url}/${dashboardId}`);
  }

  saveDashboard(dashboardId: string, payload: { tabs: DashboardTab[] }) {
    return this.http.put<void>(`${this.url}/${dashboardId}`, payload);
  }

  updateDashboard(dashboardId: string, payload: { tabs: DashboardTab[] }) {
    return this.http.put(`${this.url}/${dashboardId}`, payload);
  }
}
