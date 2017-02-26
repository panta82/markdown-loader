var markdownLoader = require('./markdown_loader');

if (!window.markdownLoader) {
	window.markdownLoader = markdownLoader;
}

markdownLoader.autoLoad();