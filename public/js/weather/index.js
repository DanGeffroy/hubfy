$(document).ready(function($) {
	
	$('.weather1').weather({
		city: null,
		autocompleteMinLength: 3
	});

	$('.weather2').weather({
		city: 'Kharkiv, UA',
		tempUnit: 'C',
		displayDescription: true,
		displayMinMaxTemp: true,
		displayWind: true,
		displayHumidity: true
	});

});