import { useEffect, useMemo, useState } from 'react';
import { loadTraps } from '../../services/db-service';
import { getCurrentLocation } from '../../services/location-service';
import { MyLocation, Place } from '@material-ui/icons';
import MapActions from './MapActions';
import { Fab } from '@material-ui/core';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// https://github.com/mapbox/mapbox-gl-js/issues/10173
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapView = (props) => {
    const accessToken = 'pk.eyJ1Ijoic2NvdHRxdWFjaCIsImEiOiJja2ZuanAwenExcTU2MzRtamd0cmRxMmlvIn0.szNArQYZqPJkLP5-rkdcpQ';
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
    });
    const [traps, setTraps] = useState([]);

    useEffect(() => {
        console.log('List rendered');
        loadTraps().then((traps) => {
            console.log(traps);
            setTraps(traps);
        });
        getCurrentLocation().then((position) => {
            setViewport({
                ...viewport,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    const setViewpointLocation = (latitude, longitude) => {
        setViewport({
            latitude: latitude,
            longitude: longitude,
            zoom: 12,
        });
    };

    const handleCurrentLocation = () => {
        getCurrentLocation().then((position) => {
            console.log(position);
            setViewpointLocation(position.coords.latitude, position.coords.longitude);
        });
    };

    return (
        <div className="relative w-screen h-96 flex flex-col flex-1 bg-gray-100">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={accessToken}
                width="100%"
                height="100%"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                {/* <Popup latitude={37.78} longitude={-122.41} closeButton={true} closeOnClick={false} anchor="top">
                    <div>You are here</div>
                </Popup> */}
                {/* <CurrentLocation></CurrentLocation> */}
                <MarkerList traps={traps} setTraps={setTraps} setViewpointLocation={setViewpointLocation}></MarkerList>
            </ReactMapGL>
            <Fab size="medium" className="absolute bottom-8 right-4 bg-black" onClick={handleCurrentLocation}>
                <MyLocation className="text-blue-400"></MyLocation>
            </Fab>
        </div>
    );
};

function CurrentLocation() {
    const [location, setLocation] = useState(null);

    getCurrentLocation().then((position) => {
        setLocation(position.coords);
    });

    if (!location) return null;

    return (
        <Marker latitude={location.latitude} longitude={location.longitude}>
            <div>
                <MyLocation className="text-blue-500 text-base"></MyLocation>
            </div>
        </Marker>
    );
}

function MarkerList({ traps, setTraps, setViewpointLocation }) {
    const [focusedTrap, setFocusedTrap] = useState(null);
    const [showActions, setShowActions] = useState(false);

    function handleMarkerClick(trap) {
        console.log('marker clicked');
        setFocusedTrap(trap);
        setShowActions(true);
        setViewpointLocation(trap.location.latitude, trap.location.longitude);
    }

    const markers = traps
        .filter((trap) => trap.state === 'active')
        .map((trap) => {
            // console.log(trap);
            return (
                <Marker
                    key={trap.id}
                    latitude={trap?.location?.latitude}
                    longitude={trap?.location?.longitude}
                    offsetLeft={-10}
                    offsetTop={-10}
                >
                    {/* <div>{trap.name}</div> */}
                    <div className="bg-white" onClick={() => handleMarkerClick(trap)}>
                        <Place className={'' + (trap?.id === focusedTrap?.id ? 'text-green-500' : 'text-blue-500')}></Place>
                    </div>
                </Marker>
            );
        });

    return (
        <div>
            {markers}
            <MapActions
                show={showActions}
                setShow={setShowActions}
                trap={focusedTrap}
                traps={traps}
                setTraps={setTraps}
            ></MapActions>
        </div>
    );
}

export default MapView;
