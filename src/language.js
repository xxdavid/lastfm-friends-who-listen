export function getPathWithoutLanguage() {
    return location.pathname.replace(/^\/(de|es|fr|it|ja|pl|pt|ru|sv|tr|zh)/, '');
}

export function getLanguagePrefix() {
    var matches = location.pathname.match(/^(\/(de|es|fr|it|ja|pl|pt|ru|sv|tr|zh))/);
    return (matches ? matches[1] : '');
}