import {Component, Input, ViewChild, Renderer} from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'twitchchat',
  templateUrl: 'app/widgets/twitchchat/twitchchat.html',
  styleUrls: ['app/widgets/twitchchat/twitchchat.css']
})
export class Twitchchat {
  @Input() channel : String = "monstercat";

  src : String = "http://www.twitch.tv/"+this.channel+"/chat";

  constructor(public renderer: Renderer) {}
  newUrl($event){
    var newUrl = "http://www.twitch.tv/"+this.channel+"/chat";
      jQuery("#chat_embed").attr("src", newUrl);
  }
}
