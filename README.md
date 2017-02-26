# Markdown loader

Here's what this script does:
- Load markdown files from a publically available link (eg. `README.md` on github.com)
- Fix up relative URLs for images and links
- Compile into html
- Optionally display straight in DOM

I use this to "synchronize" markdown and html files in my git repositories without too much fuss.

## Manual usage

```html
<div id="readme"></div>

<script src="markdown-loader.js"></script>
<script>
	markdownLoader.load({
		source: '...',
		target: 'readme'
	});
</script>
```