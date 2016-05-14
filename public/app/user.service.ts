import { Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { User }     from './user';
declare var jQuery:any;

@Injectable()
export class UserService {


  _id : String;
  constructor(private http: Http) {}
  getUser() : Observable<User> {
    this._id = jQuery("#_id").val();
    var route = "./hub/getUserById?_id="+this._id;

    //return this.http.get(route).map(res => res.json())
    return this.http.get(route)
                  .map(res => res.json());
  }
  persisteWidget($event,widgetName){

        this._id = jQuery("#_id").val();
        var widgetName = widgetName;
        var col=  $event.col;
        var row = $event.row;
        var sizex = $event.sizex;
        var sizey = $event.sizey;
        var width = $event.width;
        var height = $event.height;
        var route = "./hub/persistewidget?_id="+this._id+"&widgetName="+widgetName+"&col="+col+"&row="+row+"&sizex="+sizex+"&sizey="+sizey+"&width="+width+"&height="+height;

        return this.http.get(route).map(res => console.log("Response came!!!"))
  }
}
