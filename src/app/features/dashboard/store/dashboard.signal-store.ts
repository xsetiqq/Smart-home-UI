import { signalStore, withMethods, withState } from "@ngrx/signals";
import { DashboardTab } from "../../../shared/models/dashboard.model";
;
import { DashboardsService } from "../service/dashboards.service";
import { patchState } from "@ngrx/signals";
import { inject } from "@angular/core";

interface DashboardStoreState {
  dashboardId: string | null;
  tabs: DashboardTab[];

  snapshotTabs: DashboardTab[] | null;

  loading: boolean;
}
export const DashboardSignalStore = signalStore(
  withState<DashboardStoreState>({
    dashboardId: null,
    tabs: [],
    snapshotTabs: null,
    loading: false,
  }),

  withMethods((store, dashboardsService = inject(DashboardsService)) => ({
    loadDashboard(dashboardId: string) {
      patchState(store, { loading: true });

      dashboardsService.getDashboard(dashboardId).subscribe({
        next: (dashboard) => {
          patchState(store, {
            dashboardId,
            tabs: dashboard.tabs,
            loading: false,
          });
        },
        error: () => {
          patchState(store, { loading: false });
        },
      });
    },
  }))
);

