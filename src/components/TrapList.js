import { Box, Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import './TrapList.css';

import CreateTrapForm from './CreateTrapForm';
import PageHeader from './PageHeader';
import AddIcon from '@material-ui/icons/Add';
import { Link, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { getCurrentLocation } from '../services/location-service';
import { loadTraps, saveTraps } from '../services/db-service';

const TrapList = () => {
    // const traps = useStoreState((state) => state.traps);
    console.log('rendered');
    const [traps, setTraps] = useState([]);
    const loading = useRef(false);

    useEffect(() => {
        console.log('List rendered');
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
            console.log('effect called');
            console.log(traps);
            saveTraps(traps);
        }
    }, [traps]);

    const updateTrapLocation = (id, position) => {
        // console.log('here', id, position);
        // console.log(position);

        const index = traps.findIndex((trap) => trap.id === id);
        // console.log(index);
        traps[index].location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
        setTraps(traps.slice());
        // console.log(traps);
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
                                <Pod key={trap.id} id={trap.id} name={trap.name} updateTrapLocation={updateTrapLocation}></Pod>
                            ))
                        ) : (
                            <NoPodsMessage></NoPodsMessage>
                        )}
                    </div>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => history.push(`${url}/create`)}>
                        Add Pod
                    </Button>
                </Route>
            </Switch>
        </div>
    );
};

function Pod({ id, name, updateTrapLocation }) {
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
