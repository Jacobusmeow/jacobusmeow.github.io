let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();
const sights = L.featureGroup();
let myLayers = {
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
            }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ), 
    bmaporthofoto30cm : L.tileLayer(
            "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                subdomains : ["maps", "maps1", "maps4"], 
                attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )
};

myMap.addLayer(myLayers.geolandbasemap);

let myScale = L.scale ({
    position : "bottomleft",
    metric : true, 
    imperial : false,
    maxWidth : 200
}
);
let myMapControl = L.control-layers({
    "Basemap" : myLayers.geolandbasemap,
    "Orthofoto" : myLayers.geolandbasemap,
},{
    "Beschriftung" : myLayers.bmapoverlay,
    "Citybike Leihstationen" : sights,
});
myMap.addControl(myMapControl);
myMap.setView([48.226653, 16.378609], 11);

let geojson = L.GeoJSON(sightdata).addTo(sights);
geojson.bindPopup (function(layer){
    console.log ("Layer for PopUp:", layer.feature.properties.name);
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>
    <p>Beschreibung: ${props.BEMERKUNG}</p><p>Adresse:${props.ADRESSE}<p>Weiter Informationen: ${props.WEITERE_INF}`;
    const popupText2 = ""
    return popupText;
});
