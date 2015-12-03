var React = require('react');

import UserList from './UserList.jsx';
import * as parser from './../parser';
import * as lastfm from './../lastfm';
import determineType from './../determineType';

export default class Widget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        // because of this https://github.com/facebook/react/issues/122
        this.data = [];
    }

    componentDidMount() {
        var username = parser.getUsername();

        lastfm.fetchFriends(username, (friends) => {
            for (let friend of friends) {
                var type = determineType();
                var artist = parser.getArtist(type);
                switch (type) {
                    case 'artist':
                        lastfm.fetchArtist(artist, friend.username, (playCount) => {
                            this.handlePlayCountReceived(friend, playCount);
                        });
                        break;
                    case 'song':
                        var song = parser.getSong();
                        lastfm.fetchSong(artist, song, friend.username, (playCount) => {
                            this.handlePlayCountReceived(friend, playCount);
                        });
                        break;
                    case 'album':
                        var album = parser.getAlbum();
                        lastfm.fetchAlbum(artist, album, friend.username, (playCount) => {
                            this.handlePlayCountReceived(friend, playCount);
                        });
                        break;
                }
            }
        });
    }

    handlePlayCountReceived(user, playCount) {
        if (playCount) {
            this.data.push({
                    name: user.username,
                    image: user.image,
                    url: user.url,
                    count: playCount
                });
            this.setState({
                data: this.data
            });
        }
    }

    render() {
        var title = parser.getTitle();

        return (
            <div className="widget kerve" >
                <h2 className="widget_title">Friends who listen to <i>{title}</i></h2>

                <UserList data={this.state.data} />
            </div>
        );
    }
}
