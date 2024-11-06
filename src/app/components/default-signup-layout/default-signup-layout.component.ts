import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-signup-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-signup-layout.component.html',
  styleUrl: './default-signup-layout.component.scss'
})
export class DefaultSignupLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Output("navigate") onNavigate = new EventEmitter();

  navigate(){
    this.onNavigate.emit();
  }
}
