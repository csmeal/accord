import { Component, OnInit, Input } from '@angular/core';
import { HearthstoneGame, HearthstonePlayer } from 'src/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: HearthstonePlayer;
  constructor() {}

  ngOnInit() {}
}
