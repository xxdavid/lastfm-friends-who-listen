var cache = require('lscache');

export function getFriends() {
    return cache.get('friends')
}

export function setFriends(value) {
    cache.set('friends', value, getFriendsExpiry());
}

export function getFriendsExpiry() {
    var value;
    if ((value = localStorage.getItem('friendsExpiry')) != null) {
        return parseInt(value);
    }

    var defaultValue = 60 * 24 * 7; //1 week
    setFriendsExpiry(defaultValue);
    return defaultValue;
}

export function setFriendsExpiry(value) {
    flushCache();

    localStorage.setItem('friendsExpiry', value);

    if (value === '0') {
        localStorage.setItem('shouldCacheFriends', '');
    } else {
        localStorage.setItem('shouldCacheFriends', 'yop');
    }
}

export function shouldCacheFriends() {
    return localStorage.getItem('shouldCacheFriends');
}



export function getScrobbles(key) {
    return cache.get('scrobbles-' + key);
}

export function setScrobbles(key, value) {
    cache.set('scrobbles-' + key, value, getScrobblesExpiry());
}

export function getScrobblesExpiry() {
    var value;
    if ((value = localStorage.getItem('scrobblesExpiry')) != null) {
        return parseInt(value);
    }

    var defaultValue = 60 * 24; //1 day
    setScrobblesExpiry(defaultValue);
    return defaultValue;
}

export function setScrobblesExpiry(value) {
    flushCache();

    if (value === '0') {
        localStorage.setItem('shouldCacheScrobbles', '');
    } else {
        localStorage.setItem('shouldCacheScrobbles', 'yop');
    }

    localStorage.setItem('scrobblesExpiry', value);
}

export function shouldCacheScrobbles() {
    return localStorage.getItem('shouldCacheScrobbles');
}


export function flushCache() {
    cache.flush();
}