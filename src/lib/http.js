function get(url, synchronous, callback) {
	if (typeof(XMLHttpRequest) === undefined) {
		throw new Error('This utility requires a web browser with AJAX enabled');
	}

	var request = new XMLHttpRequest();
	request.open('GET', url, !synchronous);
	if (!synchronous) {
		request.addEventListener('load', onResponse);
		request.addEventListener('error', onResponse);
		request.addEventListener('abort', onResponse);
	}
	request.send(null);

	if (synchronous) {
		return onResponse(request);
	}

	return request;

	function onResponse() {
		if (request.status === 200) {
			return callback(null, request.responseText)
		}

		var message = 'Failed to load "' + url + '": ' + request.statusText + ' (' + request.status + ')';
		var error = new Error(message);
		error.status = request.status;
		return callback(error);
	}
}

module.exports = {
	get: get
};
