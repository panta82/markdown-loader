function getInBrowser(url, callback) {
	var request = new XMLHttpRequest();
	var async = !!callback;
	request.open('GET', url, !!callback);
	if (callback) {
		oReq.addEventListener('load', onResponse);
		oReq.addEventListener('error', onResponse);
		oReq.addEventListener('abort', onResponse);
	}
	request.send(null);

	if (!callback) {
		return onResponse(request);
	}

	return request;

	function onResponse(req) {
		console.log(req);

		if (request.status === 200) {
			if (callback) {
				return callback(null, req.responseText)
			} else {
				return req.responseText;
			}
		}

		return request;
	}
}

function getInNode(url, callback) {
	throw new Error('This utility requires a web browser with AJAX enabled');
}

function get(url, callback) {
	if (typeof(XMLHttpRequest) === undefined) {
		return getInNode(url, callback);
	}

	return getInBrowser(url, callback);
}

module.exports = {
	get: get
};
