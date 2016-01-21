var React = require('react');

import User from './User.jsx';
import * as storage from './../storage';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    handleLinkClick(expand) {
        this.setState((state) => {
            state.expanded = expand;
            return state;
        });
    }

    render() {
        var data = this.props.data;
        data.sort(function (a, b) {
            return (a.count < b.count) ? 1 : -1;
        });
        var maxCount = Math.max.apply(Math, data.map(function(user){
            return user.count;
        }));
        var usersToShow = storage.shouldCollapse() ? data.slice(0, storage.getCollapseNumber()) : data;
        usersToShow = usersToShow.map(function (user) {
            return (
                <User key={user.name} user={user} maxCount={maxCount} />
            );
        });


        if (storage.shouldCollapse()) {
            var collapsedUsers;
            if (this.state.expanded) {
                collapsedUsers = data.slice(storage.getCollapseNumber()).map(function (user) {
                    return (
                        <User key={user.name} user={user} maxCount={maxCount}/>
                    );
                });
            }

            if (storage.getCollapseNumber() < data.length) {
                var styles = {
                    link: {
                        color: 'black',
                        marginLeft: 7,
                        fontSize: '1.2em'
                    },
                    icon: {
                        marginRight: 5,
                        height: '0.9em'
                    }
                };

                if (this.state.expanded) {
                    var collapseLink = (
                        <a onClick={this.handleLinkClick.bind(this, false)} style={styles.link} >
                            <img src="https://cdn.jsdelivr.net/open-iconic/1.1.0/svg/chevron-top.svg" style={styles.icon} />
                            Collapse
                        </a>
                    );
                } else {
                    var expandLink = (
                        <a onClick={this.handleLinkClick.bind(this, true)} style={styles.link} >
                            <img src="https://cdn.jsdelivr.net/open-iconic/1.1.0/svg/chevron-bottom.svg" style={styles.icon} />
                            Expand
                        </a>
                    );
                }
            }
        }

        return (
            <div>
                {usersToShow}

                {expandLink}

                {collapsedUsers}

                {collapseLink}
            </div>
        );
    }
}