import "../css/Common.css";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";


const MapTest = () => {
    const google = window.google;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDxJ60iJES2xkvAYCY1NuJyLQs5RqBONSo",
    });

    const markers = [
        { lat: -33.8688, lng: 151.2093 }
    ];

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    return (
        <div >
            {!isLoaded ? (
            <h1>Loading...</h1>
            ) : (
                <GoogleMap mapContainerClassName="map-container" 
                                onLoad={onLoad}  
                                zoom={15}
                                center={{ lat: -33.8688, lng: 151.2093 }}>
                {markers.map(({ lat, lng }) => (
                  <Marker position={{ lat, lng }} />
                ))}
              </GoogleMap>
            )}
        </div>
    );
};


export default MapTest;