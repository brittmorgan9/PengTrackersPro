import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  
import logo from './marker-white-bg.png';
import shadow from './marker-shadow.png';
import { getNames } from './getNames'; // Import the updated getNames function

// Map component definition
const Map = ({ selectedAnimal }) => {
    // State variables
    const [animalData, setAnimalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch animal data based on selected animal
    useEffect(() => {
        const fetchAnimalData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!selectedAnimal) {
                    setAnimalData([]);
                    setError("No animal selected.");
                    setLoading(false);
                    return;
                }

                // Get the taxonKey for the selected animal
                const taxonKey = await getNames(selectedAnimal);
                console.log(`Selected Animal: ${selectedAnimal}, Taxon Key: ${taxonKey}`);
                if (!taxonKey) {
                    setAnimalData([]);
                    setError(`No data available for ${selectedAnimal}.`);
                    setLoading(false);
                    return;
                }

                // Fetch occurrence data for the taxonKey
                const response = await fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${taxonKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch occurrence data.');
                }

                const data = await response.json();
                const points = data.results
                    .filter(item => item.decimalLatitude && item.decimalLongitude)
                    .map(item => ({
                        lat: item.decimalLatitude,
                        lng: item.decimalLongitude,
                        info: item.eventDate,
                        name: item.vernacularName,
                    }));

                console.log("Animal data points:", points); // Debug line
                setAnimalData(points);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimalData();
    }, [selectedAnimal]);

    // Custom marker icon
    const customIcon = new L.Icon({
        iconUrl: logo,
        shadowUrl: shadow,
        iconSize: [64, 64],
        shadowSize: [64, 64],
        iconAnchor: [0, 22],
        shadowAnchor: [0, 0],
        popupAnchor: [32, -8],
    });

    // Updates map view to fit bounds of the displayed markers
    const UpdateMapView = () => {
        const map = useMap();
        useEffect(() => {
            if (animalData.length > 0) {
                const bounds = L.latLngBounds(animalData.map(point => [point.lat, point.lng]));
                map.fitBounds(bounds, { padding: [20, 20] });
            } else {
                map.setView([0, 0], 2);
            }
        }, [animalData, map]);

        return null;
    };

    return (
        <>
            {loading && <div>Loading map data...</div>}
            {error && <div>Error fetching data: {error}</div>}
            <MapContainer
                center={[39.636097, -79.954531]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                minZoom={1}
                maxZoom={15}
                maxBounds={L.latLngBounds([-90, -Infinity], [90, Infinity])}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {animalData.map((point, index) => (
                    <Marker key={index} position={[point.lat, point.lng]} icon={customIcon}>
                        <Popup>
                            Observed on: {point.info}
                        </Popup>
                    </Marker>
                ))}
                <UpdateMapView />
            </MapContainer>
        </>
    );
};

export default Map;
