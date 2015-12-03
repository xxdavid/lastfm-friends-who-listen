var $ = require('jquery');

const API_KEY = '3fe031d61d7cddb809ce4e5d748cfe8f';
const API_URL = 'http://ws.audioscrobbler.com/2.0/';

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
            friends.push({
                username: friend.name,
                url: friend.url
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
        console.log(user, data);
        callback(data.artist.stats.userplaycount);
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
        callback(data.track.userplaycount);
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
        callback(data.album.userplaycount);
    });
}
