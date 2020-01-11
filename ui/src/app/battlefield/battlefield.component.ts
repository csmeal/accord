import { Component, OnInit, Input } from '@angular/core';
import { UiZone } from '../../../../models';

@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {
  @Input() battlefield: UiZone;

  constructor() {}

  ngOnInit() {}
}
