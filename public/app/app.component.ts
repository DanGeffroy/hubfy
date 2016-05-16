import {Component} from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {NgGrid, NgGridItem, NgGridItemEvent} from 'angular2-grid';
import { UserService } from './user.service';
import { User } from './user';
import { OnInit } from '@angular/core';
import { Youtubeplayer} from "./widgets/youtubeplayer/Youtubeplayer";
import { Twitchplayer} from "./widgets/twitchplayer/twitchplayer";
import { Twitchchat} from "./widgets/twitchchat/twitchchat";
import { Simpletodo} from "./widgets/simpletodo/simpletodo";
import { Weather} from "./widgets/weather/weather";

import 'rxjs/add/operator/map';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls:['app/app.component.css'],
    directives: [CORE_DIRECTIVES, NgGrid, NgGridItem,Youtubeplayer,Twitchplayer,Twitchchat,Simpletodo, FORM_DIRECTIVES,Weather],
    providers: [UserService]
})
export class AppComponent implements OnInit{

  user : User;

  constructor(private userService: UserService) {
  }
  ngOnInit() {
      this.getUser();
  }
  getUser() {
    this.userService.getUser().subscribe(
                     user => this.user = user);
  }
  onDragStop($event,widgetName){
    this.persisteWidget($event,widgetName);
  }
  onResizeStop($event,widgetName){
    this.persisteWidget($event,widgetName);
  }

  onItemChange($event,widgetName){
    this.persisteWidget($event,widgetName);
  }

  persisteWidget($event,widgetName){
    console.log(widgetName);
    this.userService.persisteWidget($event,widgetName).subscribe((result) => console.log(result));
  }
}
