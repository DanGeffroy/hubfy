(function($){
	jQuery.fn.autocomplete = function(options){
		var defaults = {
			url: "http://gd.geobytes.com/AutoCompleteCity", 
			dataType: 'jsonp', 
			minChars: 3,
			request: 'q',
			type: 'GET',
			delay: 500
		}
		options = $.extend(defaults, options);

		var autocomplete = function() {
			
			const KEYS = {
				UP: 38,
				DOWN: 40,
				ENTER: 13,
				ESC: 27
			}

			var state = {
				selectedIndex: 0,
				data: null,
				minChars: options.minChars < 3 ? 3 : options.minChars,
				ajaxSettings: $.extend({}, $.ajaxSettings, {
					url: options.url,
					type: options.type,
					dataType: options.dataType
				})
			}
			
			var _this = $(this);
			var container = _this.after('<div class="autocomplete-suggestions"></div>');
			var suggestions = container.parent().find('.autocomplete-suggestions');
			var cache = {};
			var timer;

			_this.on('keydown', function(e) {
				if (!state.data) return;
				var length = state.data.length - 1;
				switch (e.keyCode) {
					case KEYS.UP: return pressUpKey(state, length);
					case KEYS.DOWN: return pressDownKey(state, length);
				}
			});

			_this.on('keyup', function(e) {
				switch (e.keyCode) {
					case KEYS.UP: return false;
					case KEYS.DOWN: return false;
					case KEYS.ENTER: return pressEnterKey(e);
					case KEYS.ESC: return pressEscKey(e);
				}

				if (_this.val().length < state.minChars) {
					clearSuggestions();
					return;
				}
				mainChain();
			});

			function mainChain() {
				clearInterval(timer);
				timer = setTimeout(function() {
					autocompleteGetCityList()
					.then(autocompleteParseData)
					.then(autocompleteAddCache)
					.then(autocompleteRender)
					.then(autocompleteAddEventListeners)
					.fail(autocompleteError);
				}, options.delay);
			}

			function autocompleteGetCityList() {
				state.selectedIndex = 0;
				if (cache[_this.val()]) {
					return $.Deferred().resolve(cache[_this.val()])
				} else {
					state.ajaxSettings = $.extend(state.ajaxSettings, {
						data: {[options.request]: _this.val()}
					});
					return $.ajax(state.ajaxSettings)
				}
			}

			function autocompleteParseData(data) {
				if (typeof options.autocompleteTransformData === 'function') {
					state.data = options.autocompleteTransformData(data);
				} else {
					var regexp = RegExp(/(\w*)\,\s*\w*\,\s*(\w*)/g);
					state.data = data.map(el => el ? el.replace(regexp, '$1, $2') : '').filter(el => el ? true: false); 
				}
				return state;
			}

			function autocompleteAddCache(data) {
				cache[_this.val()] = data.data;
				return data;
			}

			function autocompleteRender(state, selected) {
				if (state && state.data) {
					var html = '';
					$.each(state.data, function (i, value) {
						html += `<div class="autocomplete-suggestion${state.selectedIndex === i 
							? ' autocomplete-selected' 
							: ''}" data-index="${i}">${value}</div>`;
					});
					suggestions
					.css('display', html ? 'block' : 'none')
					.empty()
					.append(html)
				} else {
					suggestions
					.children().removeClass('autocomplete-selected').end()
					.find(`[data-index="${selected}"]`).addClass('autocomplete-selected');
				}
			}

			function autocompleteAddEventListeners() {
				suggestions
				.on('mousemove', '.autocomplete-suggestion', function(e) {
					state.selectedIndex = $(e.target).data('index');
					autocompleteRender(null, state.selectedIndex);
				})
				.on('click', '.autocomplete-suggestion', function(e) {
					_this.val($(e.target).text());
					if (typeof options.autocompleteOnSelect === 'function') 
						options.autocompleteOnSelect($(e.target).text());
				});
			}

			function autocompleteError(jqXHR, textStatus, errorThrown) {
				console.log('error', textStatus, errorThrown);
			}

			function clearSuggestions() {
				state.selectedIndex = 0;
				state.data = null;
				suggestions.css('display', 'none');
			}

			function pressEnterKey() {
				var selectedText = _this.parent().find('.autocomplete-selected').text() || _this.val().trim() || '';
				_this.val(selectedText);
				if (selectedText && typeof options.autocompleteOnSelect === 'function') 
					options.autocompleteOnSelect(selectedText);
				return false;
			}

			function pressEscKey() {
				_this.val('');
				clearSuggestions();					
				return false;
			}

			function pressUpKey(state, length) {
				state.selectedIndex > 0 ? state.selectedIndex-- : state.selectedIndex = length;
				autocompleteRender(null, state.selectedIndex);
				return false;	
			}

			function pressDownKey(state, length) {
				state.selectedIndex < length ? state.selectedIndex++ : state.selectedIndex = 0;
				autocompleteRender(null, state.selectedIndex);
				return false;	
			}
		}

		return this.each(autocomplete); 
	};
})(jQuery);