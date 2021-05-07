import { Box, Button } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import './TrapList.css';

import AddIcon from '@material-ui/icons/Add';
import { DeleteTwoTone, DoneAllTwoTone, ExploreOff, ExploreOffTwoTone, LocationOnTwoTone, Place } from '@material-ui/icons';
import CreateTrapForm from './CreateTrapForm';
import PageHeader from '../PageHeader';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import { getCurrentLocation } from '../../services/location-service';
import { loadTraps, saveTraps } from '../../services/db-service';
import useTrapsModifier from '../../hooks/useTrapsModifier';
import { PageHeaderContext } from '../../contexts/PageHeaderContext';

const Traps = () => {
    const [traps, setTraps] = useState([]);
    const [header, setHeader] = useState('Your Traps');
    const loaded = useRef(false);
    const { path, url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        loadTraps().then((traps) => {
            // console.log(traps);
            console.log('Loading traps from db');
            setTraps(traps);
            setTimeout(() => {
                loaded.current = true;
            });
        });
    }, []);

    useEffect(() => {
        if (loaded.current) {
            // console.log(traps);
            saveTraps(traps);
        }
    }, [traps]);

    function handleNavigateCreate() {
        history.push(`${url}/create`);
    }

    return (
        <div className="l-trap-list page-view">
            <PageHeaderContext.Provider value={{ header, setHeader }}>
                <PageHeader></PageHeader>
                <Switch>
                    <Route path={`${url}/create`}>
                        <CreateTrapForm traps={traps} setTraps={setTraps}></CreateTrapForm>
                    </Route>
                    <Route path={path} exact>
                        <TrapList traps={traps} setTraps={setTraps}></TrapList>
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleNavigateCreate}>
                            Add Pod
                        </Button>
                    </Route>
                </Switch>
            </PageHeaderContext.Provider>
        </div>
    );
};

function TrapList({ traps, setTraps }) {
    const [focusedTrap, setFocusedTrap] = useState(null);
    const [showTrapConfig, setShowTrapConfig] = useState(false);

    function handleTrapClick(trap) {
        setFocusedTrap(trap);
        setShowTrapConfig(true);
    }

    return (
        <div className="flex flex-col w-full">
            {traps.length > 0 ? (
                traps.map((trap) => (
                    <div key={trap.id} onClick={() => handleTrapClick(trap)}>
                        <Trap id={trap.id} name={trap.name} state={trap.state}></Trap>
                    </div>
                ))
            ) : (
                <NoPodsMessage></NoPodsMessage>
            )}
            <TrapConfig
                trap={focusedTrap}
                show={showTrapConfig}
                setShow={setShowTrapConfig}
                traps={traps}
                setTraps={setTraps}
            ></TrapConfig>
        </div>
    );
}

function TrapConfig({ trap, traps, setTraps, show, setShow }) {
    const { markOnMap, unmarkFromMap, deleteTrap } = useTrapsModifier(traps, setTraps);
    function onDismiss() {
        setShow(false);
    }

    function handleMarkOnMap() {
        markOnMap(trap.id);
        onDismiss();
    }

    function handleUnmarkFromMap() {
        unmarkFromMap(trap.id);
        onDismiss();
    }

    function handleDelete() {
        deleteTrap(trap.id);
        onDismiss();
    }

    return (
        <BottomSheet open={show} onDismiss={onDismiss} header={<h3>{trap ? trap.name : ''}</h3>}>
            <div>
                {trap?.state === 'active' && (
                    <div className="flex m-4" onClick={handleUnmarkFromMap}>
                        <ExploreOffTwoTone className="mr-2"></ExploreOffTwoTone>
                        <div className="font-medium">Unmark from Map</div>
                    </div>
                )}
                {trap?.state !== 'active' && (
                    <div className="flex m-4" onClick={handleMarkOnMap}>
                        <LocationOnTwoTone className="mr-2"></LocationOnTwoTone>
                        <div className="font-medium">Mark on Map</div>
                    </div>
                )}
                <div className="flex m-4" onClick={handleDelete}>
                    <DeleteTwoTone className="mr-2"></DeleteTwoTone>
                    <div className="font-medium">Delete</div>
                </div>
            </div>
        </BottomSheet>
    );
}

function Trap({ id, name, state }) {
    return (
        <Box boxShadow={0} border={1} borderColor="secondary.dark" className="trap">
            <div className="flex flex-col items-start">
                <h3 className="font-medium text-xl text-left mb-4">{name}</h3>
                {state !== 'active' && <TrapInactiveTag></TrapInactiveTag>}
                {state === 'active' && <TrapActiveTag></TrapActiveTag>}
            </div>
        </Box>
    );
}

function TrapInactiveTag() {
    return (
        <div className="flex items-center py-1 px-2 rounded text-sm bg-yellow-500 text-white">
            <ExploreOff className="text-base mr-1"></ExploreOff>
            <span>Not Active</span>
        </div>
    );
}

function TrapActiveTag() {
    return (
        <div className="flex items-center w-auto py-1 px-2 rounded text-sm bg-green-500 text-white">
            <Place className="text-base mr-1"></Place>
            <span>Currently Active</span>
        </div>
    );
}

function NoPodsMessage() {
    return <div className="m-4 font-bold text-xl">No traps to show</div>;
}

export default Traps;
