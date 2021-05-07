import { Box, Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import './TrapList.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

import CreateTrapForm from './CreateTrapForm';
import PageHeader from './PageHeader';
import AddIcon from '@material-ui/icons/Add';
import { Link, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { getCurrentLocation } from '../services/location-service';
import { loadTraps, saveTraps } from '../services/db-service';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { DeleteTwoTone, LocationOnTwoTone, Place } from '@material-ui/icons';

const TrapList = () => {
    const [traps, setTraps] = useState([]);
    const [focusedTrap, setFocusedTrap] = useState(null);
    const loading = useRef(false);

    useEffect(() => {
        loadTraps().then((traps) => {
            console.log(traps);
            setTraps(traps);
            setTimeout(() => {
                loading.current = true;
            });
        });
    }, []);

    useEffect(() => {
        if (loading.current) {
            // console.log('effect called');
            console.log(traps);
            saveTraps(traps);
        }
    }, [traps]);

    const updateTrapLocation = (id, position) => {
        const index = traps.findIndex((trap) => trap.id === id);
        // console.log(index);
        traps[index].location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
        setTraps(traps.slice());
    };

    const { path, url } = useRouteMatch();
    const history = useHistory();

    return (
        <div className="l-trap-list page-view">
            <PageHeader title="Your Traps"></PageHeader>
            <Switch>
                <Route path={`${url}/create`}>
                    <CreateTrapForm traps={traps} setTraps={setTraps}></CreateTrapForm>
                </Route>
                <Route path={path} exact>
                    <div className="l-traps">
                        {traps.length > 0 ? (
                            traps.map((trap) => (
                                <div key={trap.id} onClick={() => setFocusedTrap(trap)}>
                                    <Trap id={trap.id} name={trap.name} updateTrapLocation={updateTrapLocation}></Trap>
                                </div>
                            ))
                        ) : (
                            <NoPodsMessage></NoPodsMessage>
                        )}
                    </div>
                    <TrapConfig trap={focusedTrap} setTrap={setFocusedTrap}></TrapConfig>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => history.push(`${url}/create`)}>
                        Add Pod
                    </Button>
                </Route>
            </Switch>
        </div>
    );
};

function TrapConfig({ trap, setTrap }) {
    function onDismiss() {
        setTrap(null);
    }
    return (
        <BottomSheet open={!!trap} onDismiss={onDismiss} header={<h3>{trap ? trap.name : ''}</h3>}>
            <div>
                <div className="flex m-4">
                    <LocationOnTwoTone className="mr-2"></LocationOnTwoTone>
                    <div className="font-medium">Mark on Map</div>
                </div>
                <div className="flex m-4">
                    <DeleteTwoTone className="mr-2"></DeleteTwoTone>
                    <div className="font-medium">Delete</div>
                </div>
            </div>
        </BottomSheet>
    );
}

function Trap({ id, name, updateTrapLocation }) {
    const markLocation = async () => {
        console.log('marking');
        const position = await getCurrentLocation();
        // console.log(position);
        updateTrapLocation(id, position);
    };

    return (
        <Box boxShadow={0} border={1} borderColor="secondary.dark" className="trap">
            <div className="trap__description">
                <h3 className="trap__name">{name}</h3>
                <div className="trap__status">Active</div>
                <button onClick={markLocation}>Mark</button>
            </div>
            <img
                className="trap__image"
                src="https://images-na.ssl-images-amazon.com/images/I/91fb%2BDwa-iL._AC_SL1500_.jpg"
            ></img>
        </Box>
    );
}

function NoPodsMessage() {
    return <div className="m-4 font-bold text-xl">No traps to show</div>;
}

export default TrapList;
