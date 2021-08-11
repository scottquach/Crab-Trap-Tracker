const { default: db } = require('services/db-service');
db.traps.mapToClass(Trap);

export const TrapState = {
    DEPLOYED: 'deployed',
    STANDBY: 'standby',
};

function Trap(name, description, state, created = new Date().toUTCString()) {
    this.name = name;
    this.description = description;
    this.created = created;
    this.state = state;
}

Trap.prototype.save = function () {
    console.log('saving trap...');
    this.updated = new Date().toUTCString();
    return db.table('traps').put(this);
};

Trap.prototype.activate = function () {
    this.state = 'active';
};

function trapFactory({ id, name, description, state }) {



	const deployTrap = () => {}

    return {
        id,
        name,
        description,
        state,
    };
}

// Trap.prototype.markDeployed = function() {

// }

// function trapFactory(name = 'Default', description = 'Default trap', state = State.STANDBY) {

// }

export default Trap;
