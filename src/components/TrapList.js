import { Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './TrapList.css';

import CreateTrapForm from './CreateTrapForm';
import PageHeader from './PageHeader';
import AddIcon from '@material-ui/icons/Add';
import { Link, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';

const TrapList = () => {
    // const traps = useStoreState((state) => state.traps);
    console.log('rendered');
    const [traps, setTraps] = useState([]);

    useEffect(() => {
        console.log('effect called');
        console.log(traps);
    }, [traps]);

    const { path, url } = useRouteMatch();
    const history = useHistory();
    // console.log(path, url);

    return (
        <div className="l-trap-list page-view">
            <PageHeader title="Your Pods"></PageHeader>
            <Switch>
                <Route path={`${url}/create`}>
                    <CreateTrapForm traps={traps} setTraps={setTraps}></CreateTrapForm>
                </Route>
                <Route path={path} exact>
                    <div className="l-traps">
                        {traps.length > 0 ? (
                            traps.map((trap) => <Pod key={trap.id} name={trap.name}></Pod>)
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

function Pod(props) {
    return (
        <Box boxShadow={0} border={1} borderColor="secondary.dark" className="trap">
            <div className="trap__description">
                <h3 className="trap__name">{props.name}</h3>
                <div className="trap__status">Active</div>
            </div>
            <img
                className="trap__image"
                src="https://images-na.ssl-images-amazon.com/images/I/91fb%2BDwa-iL._AC_SL1500_.jpg"
            ></img>
        </Box>
    );
}

function NoPodsMessage() {
    return <div>No Pods to show</div>;
}

export default TrapList;
