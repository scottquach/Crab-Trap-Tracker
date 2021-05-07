import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useEffect, useMemo, useState } from 'react';
import { loadTraps } from '../../services/db-service';
import { getCurrentLocation } from '../../services/location-service';
import { MyLocation, Place } from '@material-ui/icons';
import MapActions from './MapActions';
import { Fab } from '@material-ui/core';

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

    const handleCurrentLocation = () => {
        getCurrentLocation().then((position) => {
            console.log(position)
            setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12,
            });
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
                <MarkerList traps={traps} setTraps={setTraps}></MarkerList>
            </ReactMapGL>
            <Fab size="medium" className="absolute bottom-8 right-4 bg-black" onClick={handleCurrentLocation}>
                <MyLocation className="text-blue-400"></MyLocation>
            </Fab>
        </div>
    );
};

function MarkerList({ traps, setTraps }) {
    const [focusedTrap, setFocusedTrap] = useState(null);
    const [showActions, setShowActions] = useState(false);

    function handleMarkerClick(trap) {
        console.log('marker clicked');
        setFocusedTrap(trap);
        setShowActions(true);
    }

    const markers = useMemo(() => {
        return traps
            .filter((trap) => trap.state === 'active')
            .map((trap) => {
                console.log(trap);
                return (
                    <Marker key={trap.id} latitude={trap?.location?.latitude} longitude={trap?.location?.longitude}>
                        {/* <div>{trap.name}</div> */}
                        <div onClick={() => handleMarkerClick(trap)}>
                            <Place className="text-blue-500"></Place>
                        </div>
                    </Marker>
                );
            });
    }, [traps]);

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
