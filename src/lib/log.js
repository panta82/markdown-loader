function error(err) {
	if (!console || !console.error) {
		return;
	}

	console.error(err);
}

function log() {
	if (!console || !console.log) {
		return;
	}

	console.log.apply(console, arguments);
}

function callbackOrError(callback, err) {
	if (callback) {
		return callback(err);
	}

	error(err);
}

module.exports = {
	error: error,
	log: log,
	callbackOrError: callbackOrError
};