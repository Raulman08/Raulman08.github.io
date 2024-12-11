let map, polyline, watchId, liveMarker;
let coordinates = [];
let totalDistance = 0;
let savedRoutes = JSON.parse(localStorage.getItem('savedRoutes')) || {};

document.addEventListener("DOMContentLoaded", () => {
    map = L.map('map').setView([0, 0], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    polyline = L.polyline([], { color: 'blue' }).addTo(map);

    document.getElementById('startBtn').addEventListener('click', startTracking);
    document.getElementById('stopBtn').addEventListener('click', stopTracking);
    document.getElementById('saveBtn').addEventListener('click', saveRoute);
    document.getElementById('exportBtn').addEventListener('click', exportMap);
    document.getElementById('toggleRoutesBtn').addEventListener('click', toggleRoutesSection);

    // Cargar rutas guardadas al iniciar
    renderSavedRoutes();

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 15);
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

function toggleRoutesSection() {
    const savedRoutesDiv = document.getElementById('savedRoutes');
    const toggleButton = document.getElementById('toggleRoutesBtn');

    if (savedRoutesDiv.style.display === 'none') {
        savedRoutesDiv.style.display = 'block';
        toggleButton.textContent = "Ocultar Rutas Guardadas";
    } else {
        savedRoutesDiv.style.display = 'none';
        toggleButton.textContent = "Mostrar Rutas Guardadas";
    }
}

function startTracking() {
    document.getElementById('stopBtn').disabled = false;
    document.getElementById('saveBtn').disabled = false;
    document.getElementById('exportBtn').disabled = false;
    document.getElementById('startBtn').disabled = true;

    watchId = navigator.geolocation.watchPosition(position => {
        const { latitude, longitude } = position.coords;

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

    if (coordinates.length > 0) {
        const lastCoord = coordinates[coordinates.length - 1];
        const distance = calculateDistance(lastCoord, [latitude, longitude]);
        totalDistance += distance;
        document.getElementById('distance').textContent = totalDistance.toFixed(2);
    }

    coordinates.push([latitude, longitude]);
    polyline.setLatLngs(coordinates);

    map.setView([latitude, longitude], map.getZoom(), { animate: true });
}

function saveRoute() {
    const routeName = prompt("Nombre de la ruta:");
    if (!routeName) {
        alert("Nombre de ruta inválido.");
        return;
    }

    savedRoutes[routeName] = {
        coordinates: [...coordinates],
        totalDistance
    };

    localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));
    alert(`Ruta "${routeName}" guardada.`);
    renderSavedRoutes();
}

function renderSavedRoutes() {
    const routesList = document.getElementById('routesList');
    routesList.innerHTML = "";

    for (const routeName in savedRoutes) {
        const li = document.createElement('li');
        li.textContent = routeName;
        li.addEventListener('click', () => loadRoute(routeName));
        routesList.appendChild(li);
    }
}

function loadRoute(routeName) {
    const route = savedRoutes[routeName];
    if (!route) {
        alert("Ruta no encontrada.");
        return;
    }

    polyline.setLatLngs(route.coordinates);
    map.fitBounds(polyline.getBounds());

    alert(`Ruta "${routeName}" cargada. Distancia total: ${route.totalDistance.toFixed(2)} km`);
}

function calculateDistance(coord1, coord2) {
    const R = 6371;
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
