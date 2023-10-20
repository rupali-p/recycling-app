import * as React from "react";
import "../css/Common.css";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";


const MapTest = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDxJ60iJES2xkvAYCY1NuJyLQs5RqBONSo",
    });
    const center = useMemo(() => ({ lat: -33.8688, lng: 151.2093 }), []);

    

    return (
        <div className="App">
            {!isLoaded ? (
            <h1>Loading...</h1>
            ) : (
            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
            />
            )}
        </div>
    );
};


export default MapTest;