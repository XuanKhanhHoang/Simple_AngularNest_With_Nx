import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from './share/header_layout/header_layout.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
@Component({
  selector: 'app-root',
  imports: [HeaderLayoutComponent, AngularToastifyModule],
  templateUrl: './app.component.html',
  providers: [ToastService],
})
export class AppComponent {
  title = 'news_project_fe';
}
