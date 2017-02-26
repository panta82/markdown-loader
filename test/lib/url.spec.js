var expect = require('chai').expect;

var url = require('../../src/lib/url');

describe('url', function () {
	describe(url.toAbsoluteUri.name, function () {
		it('should convert path to absolute url', function () {
			expect(String(url.toAbsoluteUri('/a/b/c', 'http://test.com/'))).to.equal('http://test.com/a/b/c');
			expect(String(url.toAbsoluteUri('../test2/abc.html', '//test.com/test.html'))).to.equal('//test.com/test2/abc.html');
		});

		it('should leave absolute path as it is', function () {
			expect(String(url.toAbsoluteUri('http://example.com/a/b/c', 'http://test.com/'))).to.equal('http://example.com/a/b/c');
			expect(String(url.toAbsoluteUri('http://example.com', '../../'))).to.equal('http://example.com/');
		});
	});

	describe(url.normalizeToGithubRawUri.name, function () {
		it('should convert github blob link to raw link', function () {
			expect(
				String(url.normalizeToGithubRawUri('https://github.com/user/repo/blob/branch/README.md'))
			).to.equal('https://raw.githubusercontent.com/user/repo/branch/README.md');
			
			expect(
				String(url.normalizeToGithubRawUri('https://github.com/user/repo/blob/branch/a/b/c/file'))
			).to.equal('https://raw.githubusercontent.com/user/repo/branch/a/b/c/file');
		});

		it('should convert github repository link to raw link for its README.md', function () {
			expect(
				String(url.normalizeToGithubRawUri('https://github.com/user/repo'))
			).to.equal('https://raw.githubusercontent.com/user/repo/master/README.md');
			
			expect(
				String(url.normalizeToGithubRawUri('https://github.com/user/repo/blob/branch/a/b/c/file'))
			).to.equal('https://raw.githubusercontent.com/user/repo/branch/a/b/c/file');
		});

		it('should convert github tree link to raw link for its README.md', function () {
			expect(
				String(url.normalizeToGithubRawUri('https://github.com/user/repo/tree/branch'))
			).to.equal('https://raw.githubusercontent.com/user/repo/branch/README.md');
		});

		it('should not convert other github links', function () {
			expect(
				String(url.normalizeToGithubRawUri('https://github.com/user/repo/issues'))
			).to.equal('https://github.com/user/repo/issues');

			expect(
				String(url.normalizeToGithubRawUri('https://github.com'))
			).to.equal('https://github.com/');
		});

		it('should not convert other random links', function () {
			expect(
				String(url.normalizeToGithubRawUri('https://raw.githubusercontent.com/user/repo/blob/branch/README.md'))
			).to.equal('https://raw.githubusercontent.com/user/repo/blob/branch/README.md');

			expect(
				String(url.normalizeToGithubRawUri('google.com'))
			).to.equal('google.com');
		});
	});
});