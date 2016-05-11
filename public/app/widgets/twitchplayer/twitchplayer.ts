import {Component} from '@angular/core';
import { OnInit } from '@angular/core';

declare var Twitch:any;
declare var jQuery:any;

@Component({
  selector: 'twitchplayer',
  templateUrl: 'app/widgets/twitchplayer/twitchplayer.html',
  styleUrls: ['app/widgets/twitchplayer/twitchplayer.css']
})
export class Twitchplayer implements OnInit{
  player;
  channel : String;

  ngOnInit(){
       var options = {
           channel: "monstercat",
           width: "100%",
           height: "100%",
       };
       this.player = new Twitch.Player("twitchPlayer", options);
       this.player.setVolume(0.5);
  }
  newUrl($event){
    jQuery("#twitchPlayer").empty();
    var options = {
        channel: this.channel,
        width: "100%",
        height: "100%",
    };
    this.player = new Twitch.Player("twitchPlayer", options);
    this.player.setVolume(0.5);
  }
}
