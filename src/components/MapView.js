import './MapView.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useState } from 'react';

const MapView = (props) => {
    const accessToken = 'pk.eyJ1Ijoic2NvdHRxdWFjaCIsImEiOiJja2ZuanAwenExcTU2MzRtamd0cmRxMmlvIn0.szNArQYZqPJkLP5-rkdcpQ';
    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    return (
        <div className="page-view">
            <div className="test">
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={accessToken}
                    width="100%"
                    height="100%"
                    onViewportChange={(viewport) => setViewport(viewport)}
                >
                    <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
                        <button>hi</button>
                    </Marker>
                </ReactMapGL>
            </div>
            <button>Mark location</button>
        </div>
    );
};

export default MapView;
