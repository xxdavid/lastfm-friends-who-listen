import cache from 'lscache';
import lockr from 'lockr';

export function getFriends() {
    return cache.get('friends')
}

export function setFriends(value) {
    cache.set('friends', value, getFriendsExpiry());
}

export function getFriendsExpiry() {
    var defaultValue = 60 * 24 * 7; //1 week
    return lockr.get('friendsExpiry', defaultValue);
}

export function setFriendsExpiry(value) {
    flushCache();

    lockr.set('friendsExpiry', parseInt(value));
}

export function shouldCacheFriends() {
    return (getFriendsExpiry() != 0);
}


export function getScrobbles(key) {
    return cache.get('scrobbles-' + key);
}

export function setScrobbles(key, value) {
    cache.set('scrobbles-' + key, value, getScrobblesExpiry());
}

export function getScrobblesExpiry() {
    var defaultValue = 60 * 24; //1 day
    return lockr.get('scrobblesExpiry', defaultValue);
}

export function setScrobblesExpiry(value) {
    flushCache();

    lockr.set('scrobblesExpiry', parseInt(value));
}

export function shouldCacheScrobbles() {
    return (getScrobblesExpiry() != 0);
}


export function flushCache() {
    cache.flush();
}


export function getDisplayProgressBar() {
    var defaultValue = true;
    return lockr.get('displayProgressBar', defaultValue);
}

export function setDisplayProgressBar(boolean) {
    lockr.set('displayProgressBar', boolean);
}


export function getAlternativeTitle() {
    var defaultValue = false;
    return lockr.get('alternativeTitle', defaultValue);
}

export function setAlternativeTitle(boolean) {
    lockr.set('alternativeTitle', boolean);
}


export function getCollapseNumber() {
    var defaultValue = 0;
    return lockr.get('collapseNumber', defaultValue);
}

export function setCollapseNumber(value) {
    lockr.set('collapseNumber', value);
}

export function shouldCollapse() {
    return (getCollapseNumber() != 0);
}


export function getWaitUntilFetched() {
    var defaultValue = false;
    return lockr.get('waitUntilFetched', defaultValue);
}

export function setWaitUntilFetched(boolean) {
    lockr.set('waitUntilFetched', boolean);
}

export function getLimitConcurrentRequests() {
    var defaultValue = true;
    return lockr.get('limitConcurrentRequests', defaultValue);
}

export function setLimitConcurrentRequests(boolean) {
    lockr.set('limitConcurrentRequests', boolean);
}
