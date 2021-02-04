export function getTitle() {
    var titleEl = document.querySelector('h1.header-title')
        || document.querySelector('h1.header-new-title');
    if (titleEl) {
        var title = titleEl.textContent;

        title = title.trim();

        // remove song duration
        title = title.replace(/ \(\d{1,2}:\d{1,2}\)$/, '');

        title = title.trim();

        return title;
    }
    return null;
}

function getCrumb() {
    var crumbEl = document.querySelector('a.header-crumb')
        || document.querySelector('a.header-new-crumb');
    return (crumbEl ? crumbEl.textContent.trim() : null);
}

export function getArtist(type) {
    if (type === 'artist') {
        return getTitle();
    } else {
        return getCrumb();
    }
}

export function getAlbum() {
    return getTitle();
}

export function getSong() {
    return getTitle();
}

export function getUsername() {
    var element = document.querySelector('img.auth-avatar-desktop');
    return element.alt.trim();
}