import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from '../../interfaces/notification.interface';

@Component({
	selector: 'app-notification',
	imports: [
		MatListModule,
		MatIconModule
	],
	templateUrl: './notification.component.html',
	styleUrl: './notification.component.scss'
})
export class NotificationComponent {
	@Input({required: true})
	notifications: Notification[] = [];

	folders: any[] = [
    {
		name: 'Photos',
		updated: new Date('1/1/16'),
    },
    {
		name: 'Recipes',
		updated: new Date('1/17/16'),
    },
    {
		name: 'Work',
		updated: new Date('1/28/16'),
    },
  ];
}
