import { Component, OnInit, Input } from '@angular/core';
import { Creature } from '../../../../models';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Creature;
  constructor() {}

  ngOnInit() {}
}
