import { get, set } from 'idb-keyval';

export async function saveTraps(traps) {
    console.log(traps);
    await set('traps', traps);
}
export async function loadTraps() {
    const traps = await get('traps');
    return traps;
}
