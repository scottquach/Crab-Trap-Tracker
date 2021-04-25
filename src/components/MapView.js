import ReactMapGL, { Marker } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { Fab } from '@material-ui/core';
import { loadTraps } from '../services/db-service';

const MapView = (props) => {
    const accessToken = 'pk.eyJ1Ijoic2NvdHRxdWFjaCIsImEiOiJja2ZuanAwenExcTU2MzRtamd0cmRxMmlvIn0.szNArQYZqPJkLP5-rkdcpQ';
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    const [traps, setTraps] = useState([]);
    useEffect(() => {
        console.log('List rendered');
        loadTraps().then((traps) => {
            console.log(traps);
            setTraps(traps);
        });
    }, []);

    const locationList = [
        {
            latitude: 37.78,
            longitude: -122.41,
        },
    ];

    return (
        <div className="w-screen h-96 flex-1 bg-gray-100">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={accessToken}
                width="100%"
                height="100%"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                {/* <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
                    <button>hi</button>
                </Marker> */}
            </ReactMapGL>
        </div>
    );
};

export default MapView;
