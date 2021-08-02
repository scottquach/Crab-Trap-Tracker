import MapView from 'components/Map/MapView';
import CreateTrapForm from 'components/Traps/CreateTrapForm';
import Traps from 'components/Traps/Traps';
import TrapsView from 'components/TrapsView';
import { Redirect, Route, Switch } from 'react-router';
import { HOME, MAP, TRAPS } from './CONSTANTS';

export const RouterConfig = () => {
    return (
        <Switch>
            <Route path={MAP} component={MapView}></Route>
            <Route path={TRAPS} component={TrapsView}></Route>
            <Route path={HOME} component={CreateTrapForm}></Route>
            <Route path={`${TRAPS}/create`} component={CreateTrapForm}></Route>
            <Route>
				<Redirect to={HOME}></Redirect>
			</Route>

			<Route path="*">
				// 404 not found component
			</Route>
        </Switch>
    );
};

export default RouterConfig;
