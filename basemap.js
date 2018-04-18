let myMap = L.map("mapdiv");
//L.map spricht die leaflet bibliothek an und sagt wo im html die karte hin soll. mapdiv ist der link zu der stelle wo die karte hin soll
let myLayers = {

    osm : L.tileLayer (
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ),
    geolandbasemap : L.tileLayer (
        "https://maps.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmapoverlay : L.tileLayer (
        "https://maps1.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmapgrau : L.tileLayer (
        "https://maps1.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png"
    ),
    bmaphidpi : L.tileLayer (
        "https://maps1.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg"
    ),
    bmaporthofoto30cm : L.tileLayer (
        "https://maps1.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg"
    )
};


myMap.addLayer(myLayers.bmapoverlay);
//Karte und Layer werden zusammen gefügt
myMap.setView([47.267,11.383], 11);
//definiert den Ausschnitt. 11 ist der zoomfaktor

//neue karte definiert 
//z,y,x ist noch in den geschwungenen Klammern, weil noch drauf zugegriffen werden muss. 




// objekt, da geschwungene Klammern!
