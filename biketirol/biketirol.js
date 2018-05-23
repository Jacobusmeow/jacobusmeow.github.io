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
let koordGruppe = L.featureGroup();
let steigungOverlay = L.featureGroup() //.addTo(meineKarte);
let kartenLayer = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Datenquelle: <a href='https://www.openstreetmap.org'>osm.org"
        }),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3"],
            attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at"
        }),
    /*bmapoverlay : L.tileLayer (
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps", "maps1", "maps2", "maps3", "maps4"], 
            attribution : "Datenquelle: <a href='https://www.basemap.at'>basemap.at" 
        }),*/
    ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {

            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
        }),
    winter: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {

            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
        }),
    sommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {

            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
        }),
    nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "Datenquelle <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>data.gv.at"
        }),

}

meineKarte.addLayer(kartenLayer.osm);
//meineKarte.setView([47.449448, 12.392538], 11);
let maßstab = L.control.scale({
    imperial: false,
    metric: true,
    position: "bottomleft",
    maxWidth: 200
}).addTo(meineKarte);
//Controlfenster: 
let meineKarteControl = L.control.layers({
    "Openstreetmap": kartenLayer.osm,
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Orthofoto": kartenLayer.ortho,
    "Winter": kartenLayer.winter,
    "Sommer": kartenLayer.sommer,

}, {
    //overlays
    //"Beschriftung" : kartenLayer.bmapoverlay,
    "Nomenklatur": kartenLayer.nomenklatur,
    "Start & Ziel Marker": markerGruppe,
    "Etappe 11 - GPX-Track": koordGruppe,
    "Steigungslinie": steigungOverlay,
    //"Höhenprofil" : elevation,

    //Ziel" :  markerGruppe,
});
//fullscreen: 
meineKarte.addControl(new L.Control.Fullscreen(map));

//marker + popups 
const start = [47.668714, 12.404299];
const ziel = [47.44637, 12.390424];
L.marker(start);
L.marker(ziel);
let startMarker = L.marker(start, {
    icon: L.icon({
        iconUrl: "images/start.png",
        iconAnchor: [16, 37]
    })
}).addTo(markerGruppe);
startMarker.bindPopup("<h3>Start in Kössen im Kaiserwinkel</h3><p><a href='https://de.wikipedia.org/wiki/Kössen'>Informationen</a></p>");
let zielMarker = L.marker(ziel, {
    icon: L.icon({
        iconUrl: "images/finish.png",
        iconAnchor: [16, 37]

    })
}).addTo(markerGruppe);
zielMarker.bindPopup("<h3>Ziel in Kitzbühel</h3><p><a href='https://de.wikipedia.org/wiki/Kitzbühel'>Informationen</a></p>");
//Strecke aus gpx:

let gpxTrack = new L.GPX("data/etappe11.gpx", {
    async: true,
}).addTo(koordGruppe);
gpxTrack.on("loaded", function(evt) {
    let dis = evt.target.get_distance().toFixed(0);
    let elevMin = evt.target.get_elevation_min().toFixed(0);
    let elevMax = evt.target.get_elevation_max().toFixed(0);
    let up = evt.target.get_elevation_gain().toFixed(0);
    let down = evt.target.get_elevation_loss().toFixed(0);

    document.getElementById("dis").innerHTML = dis;
    document.getElementById("elevMin").innerHTML = elevMin;
    document.getElementById("elevMax").innerHTML = elevMax;
    document.getElementById("up").innerHTML = up;
    document.getElementById("down").innerHTML = down;
    meineKarte.fitBounds(evt.target.getBounds());
})
gpxTrack.on("addline", function(evt) { //nimmt bezug auf let gpxTrack
    elevation.addData(evt.line)
    //Ziel: Alle Segmente der Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for (let i = 1; i < gpxLinie.length; i++) {
        let p1 = gpxLinie[i - 1];
        let p2 = gpxLinie[i];
        //Entfernung zwischen den Punkten berechnen.
        let distance = meineKarte.distance(
            [p1.lat, p1.lng], [p2.lat, p1.lng],
        );

        let delta = p2.meta.ele - p1.meta.ele;
        //steigung in prozent
        //conditional operator: Bedingung erfüllt? Ausdruck 1, wenn nicht Ausdruck 2 
        let prozent = (distance > 0) ? (delta / distance * 100.0).toFixed(1) : 0;
        let farbe =
            prozent > 10 ?
            "#cb181d" :

            prozent > 6 ?
            "#fb6a4a" :

            prozent > 2 ?
            "#fcae91" :

            prozent > 0 ?
            "#fee5d9" :

            prozent > -2 ?
            "#edf8e9" :

            prozent > -6 ?
            "#bae4b3" :

            prozent > -10 ?
            "#74c476" :
            "#238b45";
        let segment = L.polyline(
            [
                [p1.lat, p1.lng],
                [p2.lat, p2.lng],
            ], {
                color: farbe

            }).addTo(steigungOverlay);
    }
});
//elevation-control:
let elevation = L.control.elevation({
    position: "bottomright",
    theme: "steelblue-theme",
    collapsed: true,

}).addTo(meineKarte);



/*strecke: brauche ich nicht mehr, da die gpx-datei direkt geladen wird. 
let geojson = L.geoJSON(data11).addTo(koordGruppe);
geojson.bindPopup(function(layer){
    console.log("Layer for Popup:", layer.feature.geometry);
    const props = layer.feature.geometry;
    const popupText =`<p>${props.coordinates}</p>`;
    return popupText; 
});




*/
//zur Karte hinzufügen: 
meineKarte.addControl(meineKarteControl);
//Zoom auf alle Marker und Popups
meineKarte.fitBounds(markerGruppe.getBounds());