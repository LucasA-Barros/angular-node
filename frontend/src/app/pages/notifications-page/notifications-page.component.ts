import { Component, OnInit } from '@angular/core';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notification } from '../../shared/interfaces/notification.interface';
import { NotificationService } from '../../core/services/notification.service';

@Component({
	selector: 'app-notifications-page',
	imports: [
		NotificationComponent,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './notifications-page.component.html',
	styleUrl: './notifications-page.component.scss'
})
export class NotificationsPageComponent implements OnInit {
	protected form!: FormGroup;
	protected notifications: Notification[] = [];

	constructor(
		private notificationService: NotificationService,
		private formBuilder: FormBuilder
	) {
		this.form = this.formBuilder.group({
			conteudoMensagem: ['', [ Validators.required ]],
			mensagemId: ['', [ Validators.required ]],
		});
	}

	ngOnInit(): void {
		// this.notificationService.onStatusAtualizado().subscribe((payload) => {
		// 	const index = this.notifications.findIndex(n => n.mensagemId === payload.mensagemId);
		// 	if (index > -1) {
		// 		this.notifications[index].status = payload.status;
		// 	}

		// 	console.log('Payload recebido via WebSocket:', payload);
		// });
	}

	private _setMensagemId(): void {
		const mensagemId = this.notificationService.generateMensagemId();
		this.form.get('mensagemId')?.setValue(mensagemId);
	}

	protected sendNotification(): void {
		this._setMensagemId();

		if (!this.form.valid) {
			return;
		}

		this.notificationService.postNotification(this.form.value).subscribe({
			next: (response) => {
				this.notifications.push(this.form.value);
				this.form.reset();
				this._setMensagemId();
			}
		});

	}
}
