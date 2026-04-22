import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { UploadReceiptComponent } from './components/upload-receipt/upload-receipt';
import { StatsComponent } from './components/stats/stats';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'upload', component: UploadReceiptComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '' }
];