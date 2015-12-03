var React = require('react');

import User from './User.jsx';

export default class UserList extends React.Component {
    render() {
        var data = this.props.data;
        data.sort(function (a, b) {
            return (a.count < b.count) ? 1 : -1;
        });
        var userNodes = data.map(function (user) {
            return (
                <User key={user.key} name={user.name} count={user.count} />
            );
        });

        return (
            <div>
                {userNodes}
            </div>
        );
    }
}