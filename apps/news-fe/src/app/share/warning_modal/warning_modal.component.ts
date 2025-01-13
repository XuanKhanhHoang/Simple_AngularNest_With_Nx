import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'warning_modal',
  imports: [],
  templateUrl: './warning_modal.component.html',
})
export class WarningModalComponent {
  @Input() title!: string;
  @Input() content!: string;

  @Output() dataEmitter = new EventEmitter<boolean>();
  accept() {
    this.dataEmitter.emit(true);
  }
  refuse() {
    this.dataEmitter.emit(false);
  }
}
