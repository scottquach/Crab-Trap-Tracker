import { TrapState } from './TrapModel';

const { default: db } = require('services/db-service');

export async function log(val) {
    console.log(val);
    await db.table('logs').add(val);
}

function trapCreationLog({ trapId }) {
    return {
        timestamp: new Date().toISOString(),
        trap: trapId,
        state: TrapState.STANDBY,
    };
}

export function deployTrapLog({ trapId, location = null }) {
    return {
        timestamp: new Date().toISOString(),
        trap: trapId,
        state: TrapState.DEPLOYED,
        location: location,
    };
}
