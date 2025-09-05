import { Routes } from '@angular/router';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'notifications'
    },
    { path: 'notifications', component: NotificationsPageComponent }
];
