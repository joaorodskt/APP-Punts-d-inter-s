import { Map as LeafletMap, TileLayer, Marker } from 'leaflet';
import { Geolocalitzador } from "./services/Geolocalitzador.js";

const el = document.querySelector('#mapa');
const dropZone = document.querySelector("#dropzone");

const map = new LeafletMap(el).setView([41.3874, 2.1686], 13);

new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
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

dropZone.addEventListener('dragover', function(event){
    dropZone.classList.add("dropzoneOver");
    event.preventDefault();
});

dropZone.addEventListener('dragleave', function(event){
    dropZone.classList.remove("dropzoneOver");
    event.preventDefault();
});

dropZone.addEventListener('drop', function(){
    dropZone.classList.remove("dropzoneOver");
    event.preventDefault();
    const fitxer = event.dataTransfer.files;
    loadFiles(fitxer);
});

const loadFiles = function(fitxers){
    if(fitxers && fitxers.length > 0){
        let fitxer = fitxers[0];
        
        const extensio = fitxer.name.split(".")[1];
        if(extensio != "csv"){
            alert("El fitxer no és csv");
        }
        else{
            const reader = new FileReader();
    
            reader.onload = (event) => {
                const text = event.target.result;
                const linies = text.trim().split("\n");
    
                for(let i=1; i<linies.length; i++){
                    const dades = linies[i].split(";");
                    console.log(dades);
                }
            };
            reader.onerror = (error) => {
    
            };
            reader.readAsText(fitxer, "UTF-8");
        }
    }
}