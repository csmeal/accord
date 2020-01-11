import { Component, Input } from '@angular/core';
import { UiZone } from '../../models';

@Component({
  selector: 'hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.scss']
})
export class HandComponent {
  @Input() hand: UiZone;
}
