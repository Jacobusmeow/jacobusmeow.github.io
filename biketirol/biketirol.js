/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen

let meineKarte = L.map("map");
let markerGruppe = L.featureGroup();
let kartenLayer={
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { //warum geht nur das erste Zoomlevel?
            attribution : "Datenquelle: <a href='https://www.openstreetmap.org'>osm.org"
    }),
    geolandbasemap : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
    }), //ortho, winter und sommer werden nicht korrekt geladen! 
    ortho : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{y}/{x}.jpeg80", {
            //subdomains : ["a", "b", "c"],
            attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
    }),
    winter : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/{z}/{y}/{x}.jpeg80", {
            //subdomains : ["a", "b", "c"],
            attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
    }),
    sommer : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/{z}/{y}/{x}.jpeg80", {
            //subdomains : ["a", "b", "c"],
            attribution : "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
    }),    

}

meineKarte.addLayer(kartenLayer.osm);




//meineKarte.setView([47.449448, 12.392538], 11);

let maßstab = L.control.scale({
    imperial : false, 
    metric : true, 
    position : "bottomleft",
    maxWidth: 200
}).addTo(meineKarte); 
//strecke: 
let geojson = L.geoJSON(data11).addTo(markerGruppe);
geojson.bindPopup(function(layer){
    console.log("Layer for Popup:", layer.feature.geometry);
    const props = layer.feature.geometry;
    const popupText =`<p>${props.coordinates}</p>`;
    return popupText; 
});
//Controlfenster: 
let meineKarteControl = L.control.layers({
    "Openstreetmap" : kartenLayer.osm, 
    "Geoland Basemap" : kartenLayer.geolandbasemap,
    "Orthofoto" : kartenLayer.ortho,
    "Ortho_Winter" : kartenLayer.winter,
    "Ortho_Sommer" : kartenLayer.sommer
},{
    //overlays
    "Etappe 11 - Koordinaten" : markerGruppe,
    //"Start" : L.marker(start),//markerGruppe,
    //"Ziel" :  L.marker(ziel)//markerGruppe,
})
//marker + popups 
const start = [47.668714, 12.404299];
const ziel = [47.44637, 12.390424];
L.marker(start);//.addTo(markerGruppe);
L.marker(ziel);//.addTo(markerGruppe);
let startMarker = L.marker(start,
    {
    icon : L.icon({
        iconUrl : "images/start.png"
    })}).addTo(markerGruppe);
    startMarker.bindPopup("<h3>Start in Kössen im Kaiserwinkel</h3><p><a href='https://de.wikipedia.org/wiki/Kössen'>Informationen</a></p>");
let zielMarker = L.marker(ziel,
    {
    icon : L.icon({
        iconUrl : "images/finish.png"
})}).addTo(markerGruppe);
    zielMarker.bindPopup("<h3>Ziel in Kitzbühel</h3><p><a href='https://de.wikipedia.org/wiki/Kitzbühel'>Informationen</a></p><img src='images/kitzbuehel.jpg' alt='Bild von Kitzbuehel'/>");

   

//zur Karte hinzufügen: 

meineKarte.addControl(meineKarteControl);

//Zoom auf alle Marker und Popups
meineKarte.fitBounds(markerGruppe.getBounds());

