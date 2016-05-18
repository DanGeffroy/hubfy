import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'weather',
  templateUrl: 'app/widgets/weather/weather.html',
  styleUrls: ['app/widgets/weather/weather.css']
})
export class Weather implements OnInit{
  ngOnInit(){
    jQuery('.weather1').weather({
  		city: 'Nantes',
  		tempUnit: 'C',
  		displayDescription: true,
  		displayMinMaxTemp: true,
  		displayWind: true,
  		displayHumidity: true
  	});
  }
}
