import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Dashboard, DashboardTab } from '../../models/dashboard.model';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http: HttpClient = inject(HttpClient);
  private readonly url = '/data/mock-data.json';

  getRaw(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.url);
  }

  getTab(tabId: string): Observable<DashboardTab | undefined> {
    return this.getTabs().pipe(map((tabs) => tabs.find((t) => t.id === tabId)));
  }

  getTabs(): Observable<DashboardTab[]> {
    return this.getRaw().pipe(map((d) => d.tabs ?? []));
  }
}
