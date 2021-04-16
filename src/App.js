import React, { useState } from 'react';
import './App.css';
import TrapList from './components/TrapList';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Explore, Favorite } from '@material-ui/icons';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import MapView from './components/MapView';

function App() {
    const [tab, setTab] = useState(0);
    const history = useHistory();
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#d16666',
            },
            secondary: {
                main: '#e7d7c1',
            },
        },
    });

    function updateTab(newTab) {
        if (newTab === 0) history.push('/');
        if (newTab === 1) history.push('/map');
        setTab(newTab);
    }

    return (
        <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <div className="App">
                    <Switch>
                        <Route path="/map">
                            <MapView></MapView>
                        </Route>
                        <Route path="/traps">
                            <TrapList></TrapList>
                        </Route>
                        <Route>
                            <Redirect to="/traps"></Redirect>
                        </Route>
                    </Switch>
                    <BottomNavigation value={tab} onChange={(event, newTab) => updateTab(newTab)} showLabels>
                        <BottomNavigationAction label="Pods" icon={<Favorite />} />
                        <BottomNavigationAction label="Map" icon={<Explore />} />
                    </BottomNavigation>
                </div>
            </StylesProvider>
        </ThemeProvider>
    );
}

export default App;
