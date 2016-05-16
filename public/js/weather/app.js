(function ($, window, document, undefined) {
	'use strict';
	var pluginName = "weather";

	var defaults = {
		city: null,
		tempUnit: 'C',
		autocompleteMinLength: 3,
		displayDescription: true,
		displayMinMaxTemp: true,
		displayWind: false,
		displayHumidity: false,
		fixLocation: false,
		url: 'http://api.openweathermap.org/data/2.5/forecast',
		urlParams: {
			appid: '92dc516761ab79d7549453f569efe533',
			cnt: 1,
			units: 'metric',
			lang: 'en'
		}
	};

	function Plugin (element, options) {
		var _this = this;
		this.element = element;
		this.settings = $.extend({}, defaults, options, this._loadStorage());
		this._options = options;
		this._name = pluginName + $(this.element).index();
		this._icons = icons;
		this._init();
	}

	$.fn[pluginName] = function (options) {
		this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) 
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
		});
		return this;
	};

	var icons = {		
		'01d': 'sunny',		
		'01n': 'moon',		
		'02d': 'cloudy_day',		
		'02n': 'cloudy_night',		
		'03d': 'cloudy_day',		
		'03n': 'cloudy_night',		
		'04d': 'overcast',		
		'04n': 'overcast',		
		'09d': 'rain',		
		'09n': 'rain',		
		'10d': 'rain',		
		'10n': 'rain',		
		'11d': 'thunderstorm',		
		'11n': 'thunderstorm',		
		'13d': 'snowy',		
		'13n': 'snowy',		
		'50d': 'fog',		
		'50n': 'fog'		
	};

	$.extend(Plugin.prototype, {

		_init: function() {
			var promise = $.Deferred();
			var location = this._getLocation(promise);
			this._mainChain(location);
		},

		_mainChain: function(promise) {
			promise
			.fail(this._withoutGetLocation.bind(this), this._render.bind(this, null))
			.then(this._getWeather.bind(this))
			.then(this._parseData.bind(this))
			.then(this._render.bind(this))
			.then(this._addMainEventListeners.bind(this))
			.fail(this._errorData.bind(this))
		},

		_getLocation: function(promise) {
			if (!this.settings.city) {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(pos =>	promise.resolve(pos.coords), e => promise.reject(e));
				} else {
					promise.reject(new Error('No support Geolocation'));
				}
				return promise;
			} else {
				return promise.resolve( {city: this.settings.city} );
			}
		},

		_withoutGetLocation: function() {
			var element = $(this.element);
			var promise = $.Deferred();
			var autocompleteSettings = {
				url: "http://gd.geobytes.com/AutoCompleteCity", 
				minChars: 3,
				autocompleteOnSelect: this._onSelect.bind(this, promise)
			}
			element.find('.weather__input').autocomplete(autocompleteSettings);
			return promise.promise();
		},

		_parseURL(data) {
			var newData = $.extend({}, this.settings.urlParams, data);
			return this.settings.url + '?' + $.map(newData, (val, key) => key + '=' + val).join('&');
		},

		_getWeather: function(data) {
			var request = '';
			if (!data) 
				request = this._parseURL({q: 'Kharkiv'}); else
			if ('city' in data)	
				request = this._parseURL({q: data.city}); else
			if ('latitude' in data && 'longitude' in data) 
				request = this._parseURL({lat: data.latitude, lon: data.longitude}); else
			request = this._parseURL({q: 'Kharkiv'});
			return $.get(request)
		},

		_parseData: function(data) {
			const KELVIN = 273.15;
			var sub = this.settings.tempUnit === 'K' ? KELVIN : 0;
			if ('city' in data) {
				var city = data.city;
				var main = data.list[0].main;
				var weather = data.list[0].weather[0];
				var obj = {
					name: city.name,
					country: city.country,
					main: weather.main,
					description: weather.description,
					icon: weather.icon,
					tempCur: (main.temp + sub).toFixed(1),
					tempMin: (main.temp_min + sub).toFixed(0),
					tempMax: (main.temp_max + sub).toFixed(0),
					humidity: main.humidity,
					wind: data.list[0].wind
				};
				return obj;
			} else 
			return $.Deferred().reject('City not found');
		},

		_errorData: function(data) {
			console.log('Error:', data);
			var dataFromInput = this._withoutGetLocation.call(this);
			this._mainChain(dataFromInput);
		},

		_addMainEventListeners: function() {
			var element = $(this.element);
			element.find('.weather__name-city').click(() => {
				this.settings.fixLocation = false;
				this._saveStorage({});
				var promise = $.Deferred().reject();
				this._mainChain(promise);
			});
			element.find('.weather__checkbox').click(() => {
				this.settings.fixLocation = !this.settings.fixLocation; 
				this.settings.fixLocation ? this._saveStorage(this.settings) : this._saveStorage({});
				this._renderCheckBox(this.element)});
		},

		_onSelect: function(promise, el) {
			this.settings.city = el;
			promise.resolve({city: el});
		},

		_saveStorage: function(settings) {
			localStorage.setItem(this._name, JSON.stringify(settings));
		},

		_loadStorage: function() {
			return JSON.parse(localStorage.getItem(pluginName + $(this.element).index()));
		},

		_renderCheckBox: function() {
			$(this.element).find('.weather__checkbox').attr('src', `img/dialog_checkbox${this.settings.fixLocation ? '_selected' : ''}.png`);
		},

		_render: function(obj) {
			var element = $(this.element);
			if (obj) {
				var template = `<div class="weather__widget">
				<img class="weather__checkbox" title="Fix this city" src="img/dialog_checkbox${this.settings.fixLocation ? '_selected' : ''}.png">
				<span class="weather__name-city" title="Click to select another city">${obj.name}, ${obj.country}</span><br>
				<div class="weather__wrapper">
				<img class="weather__img" title="${obj.description}" src="img/${this._icons[obj.icon]}.png"><br>
				<div class="weather__text__wrapper">
				<span class="weather__main-temp">${obj.tempCur}&deg;${this.settings.tempUnit}</span><br>
				${this.settings.displayDescription ? `<span class="weather__description">${obj.description}</span><br>` : ''}
				${this.settings.displayMinMaxTemp ? `<span class="weather__info">min: ${obj.tempMin}&deg;${this.settings.tempUnit}</span>
				<span class="weather__info">max: ${obj.tempMax}&deg;${this.settings.tempUnit}</span><br>` : ''}
				${this.settings.displayWind ? `<span class="weather__info">Wind: ${obj.wind.speed}m/s</span><br>` : ''}
				${this.settings.displayHumidity ? `<span class="weather__info">Humidity: ${obj.humidity}%</span><br>` : ''}
				</div></div>
				</div>`;
				element.html($(template));
				element.find('.weather__widget')
				.css(`background`, `url("img/${obj.icon}.jpg")`)
				.css('background-size', '100%');
			}
			else {
				var template = `<div class="weather__sub">
				<label class="weather__input__label">Input city:</label>
				<input class="weather__input" type="text" autofocus>
				</div>`;	
				element.html($(template));
				element.find('.weather__input').focus();
			}
		}
	});

})( jQuery, window, document );
