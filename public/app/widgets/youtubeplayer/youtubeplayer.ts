import {Component, Input} from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'youtubeplayer',
  templateUrl: 'app/widgets/youtubeplayer/youtubeplayer.html',
  styleUrls: ['app/widgets/youtubeplayer/youtubeplayer.css']
})
export class Youtubeplayer {

    @Input() channel : String = "PLfZeR4pSmgNb_qJGpWcDsCSwkNiZUCkjO";

    src : String = "https://www.youtube.com/embed/videoseries?list="+this.channel;

    newUrl($event){
      var newUrl = "https://www.youtube.com/embed/videoseries?list="+this.channel;
        jQuery("#youtubePlayer").attr("src", newUrl);
    }
}
