export function getTitle() {
    var titleEl = document.querySelector('h1.header-title');
    if (titleEl) {
        var title = titleEl.innerText ;

        // remove song duration
        title = title.replace(/ \(\d{1,2}:\d{1,2}\)$/, '');

        return title;
    }
    return null;
}

function getCrumb() {
    var crumbEl = document.querySelector('a.header-crumb');
    return (crumbEl ? crumbEl.innerText : null);
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
    var element = document.querySelector('a.auth-link');
    return element.innerText.trim();
}