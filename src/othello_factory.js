var othello = require("./othello.js");

function create() {
	return new othello();
}

module.exports.create = create;