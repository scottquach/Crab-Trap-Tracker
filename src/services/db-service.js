import { get, set } from 'idb-keyval';
import * as PouchDB from 'pouchdb';
import Dexie from 'dexie';

const db = new Dexie('main');

db.version(1).stores({
    traps: '++id, name, created',
    logs: '++id, timestamp, type'
});
db.open();





export default db;


// const trapsDb = new PouchDB('traps');
// const trapsDb = new PouchDB('logs');
// const trapsDb = new PouchDB('logs');

// function saveNewTrap(trap) {
//     const trap = {
//         _id: new Date().now().milliseconds,
//         title: 'Test Trap',
//         description: 'My description here',
//         created: new Date().toUTCString(),
//     };

//     trapsDb.put(trap);
// }

export async function saveTraps(traps) {
    console.log('saving traps');
    console.log(traps);
    await set('traps', traps);
}
export async function loadTraps() {
    const traps = await get('traps');
    return traps;
}
