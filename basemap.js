let myMap = L.map("mapdiv");
//L.map spricht die leaflet bibliothek an und sagt wo im html die karte hin soll.
let myLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
//L.tile ist auch eine Funktion die Leaflet darstellt. Grundkarte
myMap.addLayer(myLayer);
//Karte und Layer werden zusammen gefügt
myMap.setView([47.267,11.383], 11);
//wohin auf der karte soll geschaut werden. 11 ist der zoomfaktor