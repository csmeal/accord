import { Component, OnInit, Input } from '@angular/core';
import { HearthstonePlayer, BattleField } from 'src/models';

@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {
  @Input() battlefield: BattleField;

  constructor() {}

  ngOnInit() {}
}
