var $ = require('jquery');
var cache = require('lscache');

const API_KEY = '3fe031d61d7cddb809ce4e5d748cfe8f';
const API_URL = 'http://ws.audioscrobbler.com/2.0/';

const PLACEHOLDER_AVATAR = 'http://img2-ak.lst.fm/i/u/avatar170s/818148bf682d429dc215c1705eb27b98.png';

// 7 days
const CACHE_FRIENDS_EXPIRY = 60 * 24 * 7;

// 1 day
const CACHE_PLAY_COUNT_EXPIRY = 60 * 24;

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
        if (cache.get('friends')) {
            callback(cache.get('friends'));
        } else {
            $.ajax({
                data: {
                    method: 'user.getFriends',
                    user: user
                }
            }).success(function (data) {
                var friends = [];
                for (let friend of data.friends.user) {
                    var image = friend.image[1]['#text'];
                    image = image ? image : PLACEHOLDER_AVATAR;
                    friends.push({
                        username: friend.name,
                        url: friend.url,
                        image: image
                    });
                }

                cache.set('friends', friends, CACHE_FRIENDS_EXPIRY);
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
    var key = location.pathname.replace('/music/', '').replace(/\/\+\w+$/, '') + '.' + user;
    if (cache.get(key) !== null) {
        callback(cache.get(key))
    } else {
        $.ajax({
            data: data
        }).success(function (responseData) {
            var count = parseInt(parseCount(responseData));
            count = (isNaN(count)) ? 0 : count;
            cache.set(key, count, CACHE_PLAY_COUNT_EXPIRY);
            callback(count);
        });
    }
}
