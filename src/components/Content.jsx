var React = require('react');

import UserList from './UserList.jsx';
import Nanobar from 'nanobar';
import * as parser from './../parser';
import * as lastfm from './../lastfm';
import * as storage from './../storage'
import determineType from './../determineType';
import { each, eachLimit } from 'async'

export default class Content extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.friendsRemaining = Infinity;
        this.numberOfFriends = 0;
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        if (storage.getDisplayProgressBar()) {
            this.progressBar = new Nanobar({
                target: document.getElementById('friends-who-listen-content'),
                bg: '#999999'
            });
        }

        var username = parser.getUsername();

        lastfm.fetchFriends(username, (friends) => {
            this.friendsRemaining = friends.length;
            this.numberOfFriends = friends.length;
            if (storage.getLimitConcurrentRequests()) {
                eachLimit(friends, 3, this.fetchPlayCountForFriend.bind(this));
            } else {
                each(friends, this.fetchPlayCountForFriend.bind(this));
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchPlayCountForFriend(friend, callback) {
        if (!this._isMounted) {
            console.log('unmounted');
            return callback('unmounted');
        }
        console.log(friend.username);
        var type = determineType();
        var artist = parser.getArtist(type);
        switch (type) {
            case 'artist':
                lastfm.fetchArtist(artist, friend.username, (playCount) => {
                    this.handlePlayCountReceived(friend, playCount);
                    callback();
                });
                break;
            case 'song':
                var song = parser.getSong();
                lastfm.fetchSong(artist, song, friend.username, (playCount) => {
                    this.handlePlayCountReceived(friend, playCount);
                    callback();
                });
                break;
            case 'album':
                var album = parser.getAlbum();
                lastfm.fetchAlbum(artist, album, friend.username, (playCount) => {
                    this.handlePlayCountReceived(friend, playCount);
                    callback();
                });
                break;
        }
    }

    handlePlayCountReceived(user, playCount) {
        if (playCount) {
            this.setState((state) => {
                state.data = state.data.concat([
                    {
                        name: user.username,
                        image: user.image,
                        count: playCount
                    }
                ]);
                return state;
            });
        }

        this.friendsRemaining--;
        if (this.friendsRemaining === 0) {
            this.setState({
                done: true
            });
        }

        if (storage.getDisplayProgressBar()) {
            this.progressBar.go((this.numberOfFriends - this.friendsRemaining) / this.numberOfFriends * 100);
        }
    }

    render() {
        var title = parser.getTitle();

        // put non-breaking space between first two words
        // because title starting at the end of one line
        // and ending at the second line looks strange
        title = title.replace(' ', '\xa0');

        var childComponent;
        if (!storage.getWaitUntilFetched() || this.state.done) {
            if (this.state.done && !this.state.data.length) {
                childComponent = <div>None of your friends listen to this.</div>
            } else {
                childComponent = <UserList data={this.state.data} fetched={this.state.done}/>;
            }
        } else {
            childComponent = <div><i>Loading, please wait...</i></div>;
        }

        var styles = {
            heading: {
                marginRight: 20
            }
        };

        var heading;
        if (storage.getAlternativeTitle()) {
            heading = <h2 className="widget_title" style={styles.heading}>{this.state.data.length} of your friends listen to <i>{title}</i></h2>
        } else {
            heading = <h2 className="widget_title" style={styles.heading}>Friends who listen to <i>{title}</i></h2>
        }

        return (
            <div id="friends-who-listen-content">
                {heading}
                <span /> { /* Absolutely don't have any idea why but React doesn't
                              render the heading without this tag when on page
                              with artist none of your friends listen to. */ }

                {childComponent}
            </div>
        );
    }
}