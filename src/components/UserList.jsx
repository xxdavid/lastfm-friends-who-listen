var React = require('react');

import User from './User.jsx';

export default class UserList extends React.Component {
    render() {
        var userNodes = this.props.data.map(function (user) {
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