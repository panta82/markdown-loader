var markdownLoader = require('./markdown_loader');

markdownLoader.autoLoad();

if (!window.loadMarkdown) {
	window.loadMarkdown = markdownLoader.load;
}