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

function handlePosition(e){
		if(!e.success || e.error) {
			alert(JSON.stringify(e));
			return;
		}
		searchFromLatLong(e.coords.latitude, e.coords.longitude);
}

function initialize() {
	Ti.Geolocation.purpose = "We want to put apartments near you on the map";
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_NEAREST_TEN_METERS;
	Ti.Geolocation.getCurrentPosition(handlePosition);
}

function JSONtoSQLite(inputJson){
	var db = Ti.Database.open("localCache");
	db.execute("DROP TABLE IF EXISTS results");
	db.execute("CREATE TABLE IF NOT EXISTS results(ID INTEGER PRIMARY KEY, name TEXT, lat NUMERIC, long NUMERIC)");
	for(var index=0;index<inputJson.length;index++){
		db.execute('INSERT INTO results (ID,name,lat,long) VALUES (?,?,?,?)', inputJson[index].site_id, inputJson[index].name, inputJson[index].latitude, inputJson[index].longitude);
	}
	db.close();
	inputJson = null;
}

function SQLiteToMap(){
	var db = Ti.Database.open("localCache");
	var results = db.execute('select ID,name,lat,long from results');
	var map = $.map;
	while (results.isValidRow())
	{
		var resultToMap = Ti.Map.createAnnotation();
		var resultID = results.fieldByName('ID');
		var resultName = results.fieldByName('name');
		var resultLat = results.fieldByName('lat');
		var resultLon = results.fieldByName('long');
		Ti.API.info(resultID + ' ' + resultName + ' ' + resultLat + ', ' + resultLon);
		resultToMap.setLatitude(resultLat);
		resultToMap.setLongitude(resultLon);
		resultToMap.setTitle(resultName);
		map.addAnnotation(resultToMap);
		results.next();
	}
	results.close();
	db.close();
}

function publishResponses(georesponses){
	JSONtoSQLite(JSON.parse(georesponses));
	SQLiteToMap();
}

initialize();
$.index.open();