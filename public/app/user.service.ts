import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import { USER } from './mock-user';

@Injectable()
export class UserService {

  constructor(private http: Http) {}
  getUser() {
    return Promise.resolve(USER);
  }
  persisteWidget($event,widgetName){

        var _id = "573614e645e0bf4c26e512de";
        var widgetName = widgetName;
        var col=  $event.col;
        var row = $event.row;
        var sizex = $event.sizex;
        var sizey = $event.sizey;
        var width = $event.width;
        var height = $event.height;
        var route = "./hub/persistewidget?_id="+_id+"&widgetName="+widgetName+"&col="+col+"&row="+row+"&sizex="+sizex+"&sizey="+sizey+"&width="+width+"&height="+height;

        return this.http.get(route).map(res => console.log("Response came!!!"))
  }
}
