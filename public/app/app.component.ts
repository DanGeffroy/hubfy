import {Component} from '@angular/core';
import {NgGrid, NgGridItem} from 'angular2-grid';
import { UserService } from './user.service';
import { User } from './user';
import { OnInit } from '@angular/core';
import { Youtubeplayer} from "./widgets/youtubeplayer/Youtubeplayer";
import { Twitchplayer} from "./widgets/twitchplayer/twitchplayer";
import { Twitchchat} from "./widgets/twitchchat/twitchchat";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NgGrid, NgGridItem,Youtubeplayer,Twitchplayer,Twitchchat],
    providers: [UserService]
})
export class AppComponent implements OnInit{
  user : User;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.userService.getUser().then(user => this.user = user);
  }
}
