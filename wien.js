let myMap = L.map("mapdiv");
//L.map spricht die leaflet bibliothek an und sagt wo im html die karte hin soll. mapdiv ist der link zu der stelle wo die karte hin soll
//DOClink: http://leafletjs.com/reference-1.3.0.html#map-l-map
const wienGroup = L.featureGroup();
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


let myMapControl = L.control.layers({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "bmapgrau" : myLayers.bmapgrau,
    "bmaphidpi" : myLayers.bmaphidpi,
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, // schrift kann in allen anderen Layern angezeigt werden
    "Stadtspaziergang": wienGroup,
},{
    collapsed : false, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
    //ich bin mir nicht sicher, ob ich die aufgabe richtig verstanden habe, aber jetzt ist das layer control direkt ausgeklappt..
})
myMap.addControl(myMapControl); //DOCLink: http://leafletjs.com/reference-1.3.0.html#map-addcontrol

// wechsel zwischen den verschiedenen Karten funktioniert




myMap.setView([48.226653, 16.378609], 11); //DOCLink: http://leafletjs.com/reference-1.3.0.html#map-setview


let myScale = L.control.scale({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-l-control-scale
  
    imperial : false, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
    metric : true, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-metric
    maxWidth : 200, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
    position : "bottomleft", //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-position
    updateWhenIdle : true, //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-scale-updatewhenidle
}).addTo(myMap);

//im folgenden wird stationen.js angesprochen und einzelene Informatioen (zb. Temperatur im popup angezeigt)
//console.log ("Stationen: ", stationen); //zum überprüfen, ob die daten wirklich geladen werden.
let geojson = L.geoJSON(spaziergang).addTo(wienGroup);
geojson.bindPopup(function(layer) {
    console.log("Layer for popup:", layer.feature.properties.name);
    const props = layer.feature.properties;
    const popupText = `<h1>${props.NAME}</h1>
    <p>Beschreibung: ${props.BEMERKUNG}</p><p>Adresse:${props.ADRESSE}<p>Weiter Informationen: ${props.WEITERE_INF}`;
    const popupText2 = ""
    return popupText;
   
}); 
myMap.fitBounds(wienGroup.getBounds());



//damit nicht überall der gleiche auf geht 

