let myMap = L.map("mapdiv");
//L.map spricht die leaflet bibliothek an und sagt wo im html die karte hin soll. mapdiv ist der link zu der stelle wo die karte hin soll
let myLayers = {

    osm : L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // die subdomains, die beim ansprechen für {s} genutzt werden
            attribution : "Datenquelle: <a href='www,basemap.at'>basemap.at" //korrekte datenquelle hinzugefügt
        }
    ),
    bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // die subdomains, die beim ansprechen für {s} genutzt werden
            attribution : "Datenquelle: <a href='www,basemap.at'>basemap.at" //korrekte datenquelle hinzugefügt
        }
    ),
    bmapgrau : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // die subdomains, die beim ansprechen für {s} genutzt werden
            attribution : "Datenquelle: <a href='www,basemap.at'>basemap.at" //korrekte datenquelle hinzugefügt
        }
    ),
    bmaphidpi : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // die subdomains, die beim ansprechen für {s} genutzt werden
            attribution : "Datenquelle: <a href='www,basemap.at'>basemap.at" //korrekte datenquelle hinzugefügt
        }
    ),
    bmaporthofoto30cm : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], // die subdomains, die beim ansprechen für {s} genutzt werden
            attribution : "Datenquelle: <a href='www,basemap.at'>basemap.at" //korrekte datenquelle hinzugefügt
        }
    )
};


myMap.addLayer(myLayers.osm);



let myMapControl = L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "Geolandbasemap" : myLayers.geolandbasemap,
    
    "bmapgrau" : myLayers.bmapgrau,
    "bmaphidpi" : myLayers.bmaphidpi,
    "Orthofoto 30cm" : myLayers.bmaporthofoto30cm,
},{
    "bmapoverlay" : myLayers.bmapoverlay, // schrift kann in allen anderen Layern angezeigt werden
})
myMap.addControl(myMapControl);
// wechsel zwischen den verschiedenen Karten funktioniert



//Karte und Layer werden zusammen gefügt
myMap.setView([47.267,11.383], 11);
//definiert den Ausschnitt. 11 ist der zoomfaktor

//neue karte definiert 
//z,y,x ist noch in den geschwungenen Klammern, weil noch drauf zugegriffen werden muss. 




// objekt, da geschwungene Klammern!
