import { deployTrapLog, log } from 'models/LogModel';
import { TrapState } from 'models/TrapModel';
import db from './db-service';
import { getCurrentLocation } from './location-service';

export async function markTrap(trapId) {
    const { latitude, longitude, accuracy } = await getCurrentLocation();
    console.log(latitude, longitude);

    await db.table('traps').update(trapId, {
        id: trapId,
        state: TrapState.DEPLOYED,
        deployed: new Date().toISOString(),
        location: {
            latitude,
            longitude,
            accuracy,
        },
    });
}

export async function unMarkTrap(trapId) {
    // Verify that trap is even marked
    await db.table('traps').update(trapId, {
        id: trapId,
        state: TrapState.STANDBY,
        deployed: null,
        location: null,
    });
}
