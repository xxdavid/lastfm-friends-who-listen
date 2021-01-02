# Friends Who Listen
You probably noticed the new [Last.fm](http://last.fm) design.
One thing I really miss, the *Friends who listen to XY* widget.

So I wrote a browser extension for that.

![Screenshot](images/screenshot.png)

It uses the official Last.fm API so it's quite fast (it depends on how many friends you have). But to save requests, caching is enabled by default. You can disable it or choose when the cache should expiry in settings (the cog icon).

By *friends* I mean people you follow. I just like the word *friends* more.

## Installation

### Chrome
You can download the latest version from the [Chrome Web Store](https://goo.gl/w3DxOr).

### Firefox
You can download the latest version from the [Mozilla Add-ons](https://goo.gl/oBTSWs).

## Hacking
The extension is built with Webpack using Gulp.

```shell
yarn # or npm install
yarn global add gulp-cli # npm i -g gulp-cli
gulp
```

It worked fine back in the 2015 but now I had to use *Node of version 9* to install Gulp without any issues.
Running `gulp` will create folder `build/chrome` (before Firefox began to support WebExtensions API, it also used to generate a bit different version for Firefox). You can load this extension in Chrome at `chrome://extensions/` by turning Developer Mode on, clicking Load unpacked and selecting the `build/chrome` directory. Similarly in Firefox you can load the extension at `about:debugging` by clicking Load Temporary Add-on and selecting generated `manifest.json` also in the `build/chrome` directory.

Pull requests are welcome!

## Packaging the extension
This is mostly for me because I will surely forget how to do it the next I'll want to update the extension.
Chrome is easy, you just zip the `build/chrome` folder and upload it to the Developer dashboard and that's it. For Firefox, you have to install their CLI tool (`yarn global add web-ext`) and then run `web-ext build` in the `build/chrome` directory. This will generate a zip file inside a newly created folder `web-ext-artifacts`. Then you upload the zip at [Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/). They also require you to upload the source code, so you zip the whole source code and upload that too. Don't forget to append notes about how to build the extension and you're done.