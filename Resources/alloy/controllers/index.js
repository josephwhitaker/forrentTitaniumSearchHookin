function Controller() {
    function searchFromLatLong(inputLat, inputLong) {
        var url = baseUrl + "ipad.php?latitude=" + inputLat + "&longitude=" + inputLong + "&radius=15&beds=99&maxPrice=9999&numberOfResults=20";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                publishResponses(this.responseText);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function handlePosition(e) {
        if (!e.success || e.error) {
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
    function JSONtoSQLite(inputJson) {
        var db = Ti.Database.open("localCache");
        db.execute("DROP TABLE IF EXISTS results");
        db.execute("CREATE TABLE IF NOT EXISTS results(ID INTEGER PRIMARY KEY, name TEXT, lat NUMERIC, long NUMERIC)");
        for (var index = 0; inputJson.length > index; index++) db.execute("INSERT INTO results (ID,name,lat,long) VALUES (?,?,?,?)", inputJson[index].site_id, inputJson[index].name, inputJson[index].latitude, inputJson[index].longitude);
        db.close();
        inputJson = null;
    }
    function SQLiteToMap() {
        var db = Ti.Database.open("localCache");
        var results = db.execute("select ID,name,lat,long from results");
        var map = $.map;
        while (results.isValidRow()) {
            var resultToMap = Ti.Map.createAnnotation();
            var resultID = results.fieldByName("ID");
            var resultName = results.fieldByName("name");
            var resultLat = results.fieldByName("lat");
            var resultLon = results.fieldByName("long");
            Ti.API.info(resultID + " " + resultName + " " + resultLat + ", " + resultLon);
            resultToMap.setLatitude(resultLat);
            resultToMap.setLongitude(resultLon);
            resultToMap.setTitle(resultName);
            map.addAnnotation(resultToMap);
            results.next();
        }
        results.close();
        db.close();
    }
    function publishResponses(georesponses) {
        JSONtoSQLite(JSON.parse(georesponses));
        SQLiteToMap();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    var __alloyId1 = [];
    $.__views.map = Ti.Map.createView({
        annotations: __alloyId1,
        ns: Ti.Map,
        id: "map"
    });
    $.__views.index.add($.__views.map);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var baseUrl = "http://services.forrent.com/";
    initialize();
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;