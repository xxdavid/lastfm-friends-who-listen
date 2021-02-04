export function removeSubpageFromPath(path) {
    return path.replace(/\/\+.+$/, '');
}

const languageRegex = /^\/(de|es|fr|it|ja|pl|pt|ru|sv|tr|zh)/;

export function removeLanguageFromPath(path) {
    return path.replace(languageRegex, '');
}

export function getLanguagePrefix() {
    var matches = location.pathname.match(languageRegex);
    return (matches ? matches[1] : '');
}

export function getBasePath() {
    var path = location.pathname;
    path = removeLanguageFromPath(path);
    path = removeSubpageFromPath(path);
    return path;
}