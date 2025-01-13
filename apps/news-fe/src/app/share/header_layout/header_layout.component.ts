import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header_layout',
  imports: [RouterOutlet],
  templateUrl: './header_layout.component.html',
})
export class HeaderLayoutComponent {}
