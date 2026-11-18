import { Map as LeafletMap, TileLayer, Marker } from 'leaflet';
import { Geolocalitzador } from "./services/Geolocalitzador.js";

const el = document.getElementById('mapa');
console.log('contêiner:', el);   // veja o que aparece no console

const map = new LeafletMap(el).setView([41.3874, 2.1686], 13);

new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Obternir la ubicació actual
const geolocalitzador = new Geolocalitzador();
const posicio = await geolocalitzador.obtenirPosicio();
console.log(posicio.latitud, posicio.longitud);

//Crear un marcador per la direcció atual
new Marker([posicio.latitud, posicio.longitud]).addTo(map)
    .bindPopup('Estàs aqui')
    .openPopup();