import { action, createStore } from 'easy-peasy';
import { saveTraps } from './services/db-service';

const store = createStore({
    traps: [
        {
            name: 'Pod #1',
            id: 1,
        },
        {
            name: 'Pod #2',
            id: 2,
        },
    ],
    setTraps: action((state, payload) => {
        state.traps = payload;
    }),
    addTrap: action((state, payload) => {
        state.traps.push(payload);
    })
});

export default store;
