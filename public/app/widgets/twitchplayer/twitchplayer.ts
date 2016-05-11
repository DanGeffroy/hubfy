import {Component} from '@angular/core';
import { OnInit } from '@angular/core';

declare var Twitch:any;

@Component({
  selector: 'twitchplayer',
  templateUrl: 'app/widgets/twitchplayer/twitchplayer.html',
  styleUrls: ['app/widgets/twitchplayer/twitchplayer.css']
})
export class Twitchplayer implements OnInit{

  player;

  ngOnInit(){
    console.log("executed?")
       var options = {
           channel: "tarik_tv",
           width: "100%",
           height: "100%",
       };
       this.player = new Twitch.Player("twitchPlayer", options);
       this.player.setVolume(0.5);
       this.player.play();
  }
}
