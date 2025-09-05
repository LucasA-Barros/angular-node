import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToggleDarkModeComponent } from './shared/components/toggle-dark-mode/toggle-dark-mode.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToggleDarkModeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
