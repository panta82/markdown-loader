var URI = require('urijs');

var DEFAULT_MD_FILE = 'README.md';

function getCurrentLocation() {
	return window.location.href;
}

function toURI(uri) {
	if (!(uri instanceof URI)) {
		uri = new URI(uri);
	}
	return uri;
}

function toAbsoluteUri(uri, baseUrl) {
	uri = toURI(uri);

	if (!uri.is("absolute")) {
		uri = uri.absoluteTo(new URI(baseUrl));
	}

	return uri;
}

function normalizeSourceUri(source) {
	uri = toAbsoluteUri(source || './', getCurrentLocation());
	uri = normalizeToGithubRawUri(uri);
	return uri;
}

function normalizeToGithubRawUri(uri) {
	uri = toURI(uri);

	if (uri.normalizeHostname().hostname() !== 'github.com') {
		return uri;
	}

	var segments = uri.segment();

	if (segments.length === 2) {
		// https://github.com/user/repo -> https://raw.githubusercontent.com/user/repo/blob/master/README.md
		segments = segments.concat(['blob', 'master', DEFAULT_MD_FILE]);
	}
	else if (segments.length === 4 && segments[2] === 'tree') {
		// https://github.com/user/repo/tree/branch -> https://raw.githubusercontent.com/user/repo/blob/branch/README.md
		segments[2] = 'blob';
		segments.push(DEFAULT_MD_FILE);
	}

	if (segments[2] !== 'blob') {
		return uri;
	}

	// https://github.com/user/repo/blob/branch/a/b/c/file.md -> https://raw.githubusercontent.com/user/repo/branch/a/b/c/file.md
	segments.splice(2, 1);
	return uri
		.hostname('raw.githubusercontent.com')
		.segment(segments);
}

module.exports = {
	toAbsoluteUri: toAbsoluteUri,
	normalizeToGithubRawUri: normalizeToGithubRawUri,
	normalizeSourceUri: normalizeSourceUri
};