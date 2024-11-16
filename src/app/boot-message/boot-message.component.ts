import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boot-message',
  templateUrl: './boot-message.component.html',
  styleUrl: './boot-message.component.css'
})
export class BootMessageComponent {
  @Input() message: string = '';
  @Input() showToast: boolean = false; 

}
