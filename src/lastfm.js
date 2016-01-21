import { default as $ } from 'jquery';
import { getPathWithoutLanguage } from './language';
import * as cache from './storage';

const API_KEY = '3fe031d61d7cddb809ce4e5d748cfe8f';
const API_URL = 'http://ws.audioscrobbler.com/2.0/';

const PLACEHOLDER_AVATAR = 'http://img2-ak.lst.fm/i/u/avatar170s/818148bf682d429dc215c1705eb27b98.png';

$.ajaxSetup({
    method: 'GET',
    url: API_URL,
    data: {
        'api_key': API_KEY,
        'format': 'json',
        'dataType': 'json'
    }
});

export function fetchFriends(user, callback) {
    var value;
    if (value = cache.getFriends()) {
        callback(value);
    } else {
        $.ajax({
            data: {
                method: 'user.getFriends',
                user: user,
                limit: '500'
            }
        }).success(function (data) {
            var friends = [];
            for (let friend of data.friends.user) {
                var image = friend.image[1]['#text'];
                image = image ? image : PLACEHOLDER_AVATAR;
                friends.push({
                    username: friend.name,
                    image: image
                });
            }

            if (cache.shouldCacheFriends())
                cache.setFriends(friends);
            callback(friends);
        });
    }
}

export function fetchArtist(artist, user, callback) {
    var data = {
        method: 'artist.getInfo',
        artist: artist,
        username: user
    };

    fetchPlayCount(data, user, callback, function (responseData) {
        return responseData.artist.stats.userplaycount;
    });
}

export function fetchSong(artist, song, user, callback) {
    var data = {
        method: 'track.getInfo',
        artist: artist,
        track: song,
        username: user
    };

    fetchPlayCount(data, user, callback, function (responseData) {
        return responseData.track.userplaycount;
    });
}

export function fetchAlbum(artist, album, user, callback) {
    var data = {
        method: 'album.getInfo',
            artist: artist,
            album: album,
            username: user
    };

    fetchPlayCount(data, user, callback, function (responseData) {
        return responseData.album.userplaycount;
    });
}

function fetchPlayCount(data, user, callback, parseCount) {
    var key = getPathWithoutLanguage().replace('/music/', '').replace(/\/\+\w+$/, '') + '.' + user;
    var value;
    if ((value =cache.getScrobbles(key)) !== null) {
        callback(value)
    } else {
        $.ajax({
            data: data
        }).success(function (responseData) {
            var count = parseInt(parseCount(responseData));
            count = (isNaN(count)) ? 0 : count;
            if (cache.shouldCacheScrobbles())
                cache.setScrobbles(key, count);
            callback(count);
        });
    }
}
