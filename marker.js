let myMap = L.map("mapdiv");
let markerGroup = L.featureGroup();//mehrere marker in einr gruppe zusammenfügen

//L.map spricht die leaflet bibliothek an und sagt wo im html die karte hin soll. mapdiv ist der link zu der stelle wo die karte hin soll
//DOClink: http://leafletjs.com/reference-1.3.0.html#map-l-map
let myLayers = {

    osm : L.tileLayer ( // DOCLink: http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
       // subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], Osm wird nicht angezeigt, warum?
        attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>osm.org"
        } 
    ),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // die subdomains, die beim ansprechen für {s} genutzt werden
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" //korrekte datenquelle hinzugefügt
        }
    ),
    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], //DOCLink: http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
        }
    ),
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
    ),
    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }
    )
};


myMap.addLayer(myLayers.osm);//DOCLink: http://leafletjs.com/reference-1.3.0.html#map-addlayer
//fügt die verschieden Layer hinzu 
myMap.addLayer(markerGroup);

let myMapControl = L.control.layers({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "bmapgrau" : myLayers.bmapgrau,
    "bmaphidpi" : myLayers.bmaphidpi,
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, // schrift kann in allen anderen Layern angezeigt werden
    "Marker" : markerGroup, //die marker können in der layer control an und ausgeschaltet werden. 
},{
    collapsed : false, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
    //ich bin mir nicht sicher, ob ich die aufgabe richtig verstanden habe, aber jetzt ist das layer control direkt ausgeklappt..
})
myMap.addControl(myMapControl); //DOCLink: http://leafletjs.com/reference-1.3.0.html#map-addcontrol

// wechsel zwischen den verschiedenen Karten funktioniert



//Karte und Layer werden zusammen gefügt
myMap.setView([47.267,11.383], 11); //DOCLink: http://leafletjs.com/reference-1.3.0.html#map-setview

/*definiert den Ausschnitt. 11 ist der zoomfaktor
neue karte definiert 
z,y,x ist noch in den geschwungenen Klammern, weil noch drauf zugegriffen werden muss. 
objekt, da geschwungene Klammern!
*/
let myScale = L.control.scale({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
  
    imperial : false, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    metric : true, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    maxWidth : 200, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    position : "bottomleft", //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-position
    updateWhenIdle : true, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-updatewhenidle
}).addTo(myMap);

const uni = [47.264, 11.385];
// konstante variable hinzugefügt, um die koordinaten nicht ständig eingeben zu müssen, Konstante für die Optionen der unterschiedlichen Marker angegeben
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
const patscherkofl = [47.218589, 11.466667];
const igls = [47.232782, 11.408325];
const markerOptions = {
    title : "Universität Innsbruck", 
    opacity : 0.8, 
    draggable : true,
};

L.marker(uni, markerOptions).addTo(markerGroup);
//marker mit der Position der Hauptuni Innsbruck hinzugefügt

L.marker(usi, markerOptions).addTo(markerGroup);

L.marker(technik, markerOptions).addTo(markerGroup);

L.marker(patscherkofl).addTo(markerGroup);
L.marker(igls).addTo(markerGroup);

myMap.fitBounds(markerGroup.getBounds()); //wie sind die marker verteilt? der anzeigte ausschnitt wird so gewählt, dass alle zu sehen sind. 

let patscherkoflMarker = L.marker(patscherkofl).addTo(markerGroup);
patscherkoflMarker.bindPopup("<p>Igls vom Patscherkofl</p><img style='width:200px' src='js/leaflet/images/iglsvonpatsch.jpg' alt='Patscherkofl Aussicht auf Igls' />");

//die zwei marker mit einer roten linie verbinden 

let lift = [
    patscherkofl,
    igls
];
let polyline = L.polyline(lift, {color: 'red'}).addTo(myMap);
let uniPolyline = L.polyline([usi, technik, uni]).addTo(myMap);
let uniPatschPoly = L.polyline([uni, patscherkofl]).addTo(myMap);

    
