var baseUrl = "http://services.forrent.com/";

function searchFromLatLong(inputLat, inputLong){
	var url = baseUrl + "ipad.php?latitude=" + inputLat + "&longitude=" + inputLong + "&radius=15&beds=99&maxPrice=9999&numberOfResults=20";
		
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			publishResponses(this.responseText);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 5000  // in milliseconds
	});
	client.open("GET", url);
	client.send();
}

function doClick(e) {
	searchFromLatLong(36.8861,-76.2668);
}

function publishResponses(georesponses){
	var jsonGR = JSON.parse(georesponses);
	Ti.API.info(jsonGR);
}

$.index.open();
