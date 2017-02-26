module.exports = {
	// Relative path or url to the MD file.
	source: null,

	// Target element id or reference
	// If left out, we will call back with result
	target: null,

	// Load the markdown synchronously
	// Useful if you want to avoid content jumping effect while it is being loaded
	synchronous: false,

	// Data attributes to use to auto-load markdown. Value should be the "source" option.
	data_attr: 'data-md-load',
	data_attr_sync: 'data-md-load-sync'
};