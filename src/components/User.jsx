var React = require('react');

export default class User extends React.Component {
    render() {
        return (
            <div>{this.props.name} – {this.props.count}</div>
        );
    }
}