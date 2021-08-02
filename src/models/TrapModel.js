const { default: db } = require("services/db-service");
db.traps.mapToClass(Trap);

function Trap(name, description, created = new Date().toUTCString()) {
	this.name = name;
	this.description = description;
	this.created = created;
}

Trap.prototype.save = function() {
	console.log('saving trap...');
	this.updated = new Date().toUTCString();
	return db.table('traps').put(this);
}

Trap.prototype.activate = function() {
	this.state = 'active';
}

export default Trap;