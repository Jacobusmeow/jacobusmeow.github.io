let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();
const bikeStation = L.featureGroup();
let myLayers = {
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
            }
    ),
    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )
};
myMap.addLayer(myLayers.geolandbasemap);
let myScale = L.control.scale({
    position : "bottomleft", 
    metric : true, 
    imperial : false, 
    maxWidth : 200
});
let myMapControl = L.control.layers({
    "Basemap" : myLayers.geolandbasemap,
    "Orthofoto" : myLayers.bmaporthofoto30cm,
    },{
        "Beschriftung" : myLayers.bmapoverlay,
        "Citybike Stationen" : bikeStation,
    });
myMap.addControl(myMapControl);
myMap.setView([48.226653, 16.378609], 11);

const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json";
async function addGeojson(url){
    console.log("url wird geladen", url);
    const response= await fetch(url);  
    console.log("Response: ", response);
    const bikedata = await response.json(); 
    console.log("GEOJson: ", bikedata);
    const geojson = L.geoJSON(bikedata,{
        /*style: function(feature){
            return {color: "#ff0000"};
        },*/
        pointToLayer: function(geoJsonPoint, latlng) { 
            return L.marker(latlng,{
                icon: L.icon({
                    iconUrl: "icons/bike.png"
                })
            });
        }
    }
    );
    bikeStation.addLayer(geojson);
}






addGeojson(url);