import { Component } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'APMSystem';
  constructor(private themeService: ThemeService) {
  }
  switchTheme(theme: string): void {
    this.themeService.switchTheme(theme);
  }
}
