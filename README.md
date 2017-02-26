# Markdown loader

Here's what this script does:
- Load markdown file from a publically available link (eg. `README.md` on github.com)
- Fix up relative URLs for images and links
- Compile it into html
- Optionally display straight in DOM

There is also special handling for github link. You can just paste the URL to your repo, markdown loader will auto-resolve proper `githubusercontent.com` content link.

I intend to use this to "synchronize" markdown and html files in my git repositories without too much fuss.

## Get it

#### Github releases
[https://github.com/panta82/markdown-loader/releases/](https://github.com/panta82/markdown-loader/releases/)

#### RawGit CDN:
| Version | Development | Production |  
|---------|-------------|------------|
| 1.0 | [markdown-loader.js](https://cdn.rawgit.com/panta82/markdown-loader/releases/download/1.0.0/markdown-loader.js)| [markdown-loader.min.js](https://cdn.rawgit.com/panta82/markdown-loader/releases/download/1.0.0/markdown-loader.min.js)|

## Automatic loading

Any element with `data-md-load` attribute will be filled with markdown from the specified URL.
You must include the `markdown-loader.js` *after* the target DOM element.

```html
<div data-md-load="https://github.com/panta82/markdown-loader"></div>

<!-- more stuff -->

<script src="https://cdn.rawgit.com/panta82/markdown-loader/releases/download/1.0.0/markdown-loader.min.js"></script>
```

If you want to avoid annoying jumping of HTML when markdown is loaded, you can use
the synchronous version. In this case, the script should be *right after
the target element*.

```html
<div data-md-load-sync="https://github.com/panta82/markdown-loader"></div>
<script src="markdown-loader.js"></script>

<!-- more stuff -->
```

Note that you will get an annoying console warning about deprecated synchronous AJAX support
(at least in Chrome), so pick your poison.

## Manual usage

You can see full options in [opts.js](src/opts.js);

```html
<div id="readme"></div>

<script src="markdown-loader.js"></script>
<script>
	loadMarkdown({
		// From where to load the markdown. Need to support CORS
		source: 'https://github.com/panta82/markdown-loader', // we will auto-resolve to README.md here
		
		// If true, we will use synchronous AJAX request
		synchronous: true,

		// Element id or reference where to place the loaded content
		target: 'readme'
	}, function (err, el) {
		if (err) {
			// Handle error
		} else {
			console.log(el); // The target <div> element
		}
	});

	// You can also use it as a pure function, without DOM. String will auto-convert into "source"
	loadMarkdown('https://github.com/panta82/markdown-loader/blob/master/README.md', function (err, html) {
		// HTML string
		console.log(html);
	});
</script>
```

## Development

```bash
npm install -g gulp
```

...then...

```bash
git clone https://github.com/panta82/markdown-loader.git
cd markdown-loader
npm install
gulp watch
```

Distribution files will be created inside the `dist` folder.


Run test with:
```
npm run test
```

## Licence

[MIT](LICENSE)