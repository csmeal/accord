import { Card } from "../../../../models/";
import { Component, Input } from '@angular/core';

@Component({
    selector: 'battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.css']
  })
  export class BattlefieldComponent {
    @Input() creatures: Card[];
  }