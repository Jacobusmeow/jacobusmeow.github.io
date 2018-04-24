let myMap = L.map("mapdiv");
//L.map spricht die leaflet bibliothek an und sagt wo im html die karte hin soll. mapdiv ist der link zu der stelle wo die karte hin soll
//DOClink: http://leafletjs.com/reference-1.3.0.html#map-l-map
let myLayers = {

    osm : L.tileLayer ( // DOCLink: http://leafletjs.com/reference-1.3.0.html#tilelayer-l-tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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


myMap.addLayer(myLayers.osm);//DOCLink: http://leafletjs.com/reference-1.3.0.html#layergroup-addlayer
//fügt die verschieden Layer hinzu 


let myMapControl = L.control.layers({ //DOCLink: http://leafletjs.com/reference-1.3.0.html#control-layers-l-control-layers
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    "bmapgrau" : myLayers.bmapgrau,
    "bmaphidpi" : myLayers.bmaphidpi,
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, // schrift kann in allen anderen Layern angezeigt werden
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

