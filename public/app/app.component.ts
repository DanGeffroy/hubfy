import {Component} from '@angular/core';
import {NgGrid, NgGridItem} from 'angular2-grid';
import { UserService } from './user.service';
import { User } from './user';
import { OnInit } from '@angular/core';
import { Youtubeplayer} from "./widgets/youtubeplayer/Youtubeplayer";

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NgGrid, NgGridItem,Youtubeplayer],
    providers: [UserService]
})
export class AppComponent implements OnInit{
  user : User;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes() {
    this.userService.getUser().then(user => this.user = user);
  }
}
