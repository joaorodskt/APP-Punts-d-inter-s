export class Geolocalitzador{
    obtenirPosicio(){
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (posicio) => resolve({
                    latitud: posicio.coords.latitude,
                    longitud: posicio.coords.longitude
                }),
                () => reject(new Error("No s'ha pogut obtenir la ubicació"))
            );
        });
    }
}