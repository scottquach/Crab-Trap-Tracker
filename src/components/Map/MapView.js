import ReactMapGL, { Marker } from 'react-map-gl';
import { useEffect, useMemo, useState } from 'react';
import { loadTraps } from '../../services/db-service';
import { getCurrentLocation } from '../../services/location-service';
import { Place } from '@material-ui/icons';
import MapActions from './MapActions';

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
    return (
        <div className="w-screen h-96 flex-1 bg-gray-100">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={accessToken}
                width="100%"
                height="100%"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <MarkerList traps={traps}></MarkerList>
            </ReactMapGL>
        </div>
    );
};

function MarkerList({ traps }) {
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
                            <Place></Place>
                        </div>
                    </Marker>
                );
            });
    }, [traps]);

    return (
        <div>
            {markers}
            <MapActions show={showActions} setShow={setShowActions} trap={focusedTrap}></MapActions>
        </div>
    );
}

export default MapView;
