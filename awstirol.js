let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();

/*
vielleicht kann ich die Marker über diese funktion als Overlay hinzufügen??

var layer = L.Marker(latlng).addTo(map);
layer.addTo(map);
layer.remove();

oder diese hier: 
http://leafletjs.com/reference-1.3.0.html#evented

*/
let myLayers = {


    /*osm : L.tileLayer ( 
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       // subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], Osm wird nicht angezeigt, warum?
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>osm.org"
    } 
    ),*/
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1",/*" "maps2", "maps3",*/ "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", /*" "maps2", "maps3",*/ "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),/*
    bmapgrau : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),
    bmaphidpi : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    ),*/
    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", /*" "maps2", "maps3",*/ "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )/*
    aws : L.tileLayer(
        "https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/{z},{y},{z}.png", {
            subdomains : [], 
            attribution : "Datenquelle: '....'>..."
        }
    )


    */
};


myMap.addLayer(myLayers.geolandbasemap);


let myMapControl = L.control.layers({ 
    //"Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    /*"bmapgrau" : myLayers.bmapgrau,
    "bmaphidpi" : myLayers.bmaphidpi,*/
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, 
    "Wetterstationen" : markerGroup
})
myMap.addControl(myMapControl); 
myMap.addLayer(markerGroup);
myMap.setView([47.267,11.383], 11); 

let myScale = L.control.scale({ 
  
    imperial : false, 
    metric : true, 
    maxWidth : 200, 
    position : "bottomleft", 
    updateWhenIdle : true, 

}).addTo(myMap);

/* 
const wetterstationen = {
    gehrenspitze = [47.387131, 11.133717],
    hafelekar = [47.312079, 11.383623],
}
*/



const gehrenspitze = [47.387131, 11.133717];
const hafelekar = [47.312079, 11.383623];
const schlickeralm = [47.154432, 11.303207];
const markeroptionen = {
    title : "Wetterstation",
    opacity : 0.8,
};

L.marker(gehrenspitze, markeroptionen).addTo(markerGroup);
L.marker(hafelekar, markeroptionen).addTo(markerGroup);
L.marker(schlickeralm, markeroptionen).addTo(markerGroup);
let wetterstationHafele = L.marker(hafelekar).addTo(markerGroup);
let wetterstationGehrenspitze=L.marker(gehrenspitze).addTo(markerGroup);
let wetterstationSchlickeralm=L.marker(schlickeralm).addTo(markerGroup);
wetterstationGehrenspitze.bindPopup("<p>Wetterinformationen</p><img style='width:400px' scr='js/leaflet/images/puitegg.png' alt='Bild mit Wetterinformationen'/>");
wetterstationHafele.bindPopup("<p>Wetterinformationen</p><img style='width:400px' src='....' alt='Bild mit Wetterinformationen'/>");
wetterstationSchlickeralm.bindPopup("<p><h3>Wetterstation Schlicker Alm (1645m) und Sennjoch(2230)</h3><ul><li>Aktuelle Temp. (°C): 5,0</li><li><a href='https://lawine.tirol.gv.at/data/grafiken/540/standard/dreitage/schlickeralm.png'/> </li> </ul></p><img style='width:400px'/>");