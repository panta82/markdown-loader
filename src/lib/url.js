var URI = require('urijs');

function getCurrentLocation() {
	return window.location.href;
}

function toAbsoluteUri(uri, baseUrl) {
	if (!(uri instanceof URI)) {
		uri = new URI(uri);
	}

	if (!uri.is("absolute")) {
		uri = uri.absoluteTo(baseUrl);
	}

	return uri;
}

function normalizeSourceUri(source) {
	uri = toAbsoluteUri(source, getCurrentLocation());
	uri = normalizeGitHubBlobUri(uri);
	return uri;
}

/**
 * Convert
 * https://github.com/user/repo/blob/branch/a/b/c/file.md
 * to:
 * https://raw.githubusercontent.com/user/repo/branch/a/b/c/file.md
 */
function normalizeGitHubBlobUri(uri) {
	if (uri.normalizeHostname().hostname() !== 'github.com') {
		return uri;
	}

	var pathParts = uri.pathname().slice(1).split('/');
	if (pathParts[2] !== 'blob') {
		return uri;
	}

	parhParts.splice(2, 1);
	return uri
		.hostname('raw.githubusercontent.com')
		.pathname(pathParts.join('/'));
}

module.exports = {
	toAbsoluteUri: toAbsoluteUri,
	normalizeSourceUri: normalizeSourceUri
};