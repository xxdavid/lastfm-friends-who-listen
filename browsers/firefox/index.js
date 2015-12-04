var pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: 'http://www.last.fm/*',
    contentScriptFile: './content.js',
    contentScriptWhen: 'ready'
});