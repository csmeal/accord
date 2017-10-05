import { Card } from "../../../../models/card";
import { Component, Input } from '@angular/core';

@Component({
    selector: 'hand',
    templateUrl: './hand.component.html',
    styleUrls: ['./hand.component.css']
  })
  export class HandComponent {
    @Input() cards: Card[];
  }