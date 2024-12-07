let map, polyline, watchId, liveMarker;
let coordinates = [];
let totalDistance = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el mapa
    map = L.map('map').setView([0, 0], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    polyline = L.polyline([], { color: 'blue' }).addTo(map);

    // Configurar botones
    document.getElementById('startBtn').addEventListener('click', startTracking);
    document.getElementById('stopBtn').addEventListener('click', stopTracking);
    document.getElementById('saveBtn').addEventListener('click', saveRoute);
    document.getElementById('exportBtn').addEventListener('click', exportMap);

    // Obtener posición inicial
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 15); // Centrar mapa
        liveMarker = L.circleMarker([latitude, longitude], {
            radius: 8,
            color: 'blue',
            fillColor: '#007BFF',
            fillOpacity: 0.8
        }).addTo(map);
    }, showError, {
        enableHighAccuracy: true
    });
});

function startTracking() {
    if (!navigator.geolocation) {
        alert("La geolocalización no es soportada por tu navegador.");
        return;
    }

    document.getElementById('stopBtn').disabled = false;
    document.getElementById('saveBtn').disabled = false;
    document.getElementById('exportBtn').disabled = false;
    document.getElementById('startBtn').disabled = true;

    // Iniciar seguimiento
    watchId = navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords;

        // Actualizar marcador azul
        if (liveMarker) {
            liveMarker.setLatLng([latitude, longitude]);
        } else {
            liveMarker = L.circleMarker([latitude, longitude], {
                radius: 8,
                color: 'blue',
                fillColor: '#007BFF',
                fillOpacity: 0.8
            }).addTo(map);
        }

        // Actualizar posición y trazar línea
        updatePosition(position);
    }, showError, {
        enableHighAccuracy: true,
        maximumAge: 0
    });
}

function stopTracking() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        alert("Seguimiento detenido.");
    }

    document.getElementById('stopBtn').disabled = true;
    document.getElementById('startBtn').disabled = false;
}

function updatePosition(position) {
    const { latitude, longitude } = position.coords;

    // Calcular distancia y actualizar marcador
    if (coordinates.length > 0) {
        const lastCoord = coordinates[coordinates.length - 1];
        const distance = calculateDistance(lastCoord, [latitude, longitude]);
        totalDistance += distance;
        document.getElementById('distance').textContent = totalDistance.toFixed(2);
    }

    // Añadir coordenadas y trazar línea
    coordinates.push([latitude, longitude]);
    polyline.setLatLngs(coordinates);

    // Centrar mapa automáticamente
    map.setView([latitude, longitude], 15);
}

function calculateDistance(coord1, coord2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = degToRad(coord2[0] - coord1[0]);
    const dLon = degToRad(coord2[1] - coord1[1]);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(coord1[0])) * Math.cos(degToRad(coord2[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function showError(error) {
    console.error("Error al obtener ubicación:", error);
    alert("No se pudo obtener la ubicación. Por favor, activa el GPS y recarga la página.");
}

function saveRoute() {
    const routeData = {
        coordinates,
        totalDistance
    };

    const blob = new Blob([JSON.stringify(routeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ruta.json';
    a.click();
    URL.revokeObjectURL(url);
}

function exportMap() {
    const mapElement = document.getElementById('map');
    domtoimage.toBlob(mapElement)
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mapa.png';
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error al exportar el mapa:', error);
        });
}
const options = {
    enableHighAccuracy: true,  // Usa GPS en lugar de redes Wi-Fi
    timeout: 10000,            // Tiempo máximo de espera (10 segundos)
    maximumAge: 0              // Obliga a no usar ubicaciones antiguas
};

navigator.geolocation.watchPosition(
    updatePosition,  // Función para manejar actualizaciones
    showError,       // Función para manejar errores
    options
);
