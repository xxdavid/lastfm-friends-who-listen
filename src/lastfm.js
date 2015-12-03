var $ = require('jquery');

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

        callback(friends);
    });
}

export function fetchArtist(artist, user, callback) {
    $.ajax({
        data: {
            method: 'artist.getInfo',
            artist: artist,
            username: user
        }
    }).success(function (data) {
        callback(parseInt(data.artist.stats.userplaycount));
    });
}

export function fetchSong(artist, song, user, callback) {
    $.ajax({
        data: {
            method: 'track.getInfo',
            artist: artist,
            track: song,
            username: user
        }
    }).success(function (data) {
        callback(parseInt(data.track.userplaycount));
    });
}

export function fetchAlbum(artist, album, user, callback) {
    $.ajax({
        data: {
            method: 'album.getInfo',
            artist: artist,
            album: album,
            username: user
        }
    }).success(function (data) {
        callback(parseInt(data.album.userplaycount));
    });
}
