var React = require('react');

export default class User extends React.Component {
    render() {
        var styles = {
            table: {
                marginBottom: '5px'
            },
            image: {
                borderRadius: '50%',
                height: '64px',
                width: '64px'
            },
            name: {
                verticalAlign: 'bottom',
                paddingLeft: '10px'
            },
            countBar: {
                cell: {
                    width: '250px',
                    verticalAlign: 'top',
                    paddingLeft: '10px'
                },
                slug: {
                    width: (this.props.user.count / this.props.maxCount * 100) + '%',
                    color: 'white',
                    height: 'auto',
                    minWidth: 'min-content',
                    display: 'block',
                    background: '#b6c0bf'
                },
                value: {
                    fontWeight: 'bold',
                    marginLeft: '7px',
                    marginRight: '7px'
                }
            }
        };

        return (
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <img src={this.props.user.image} style={styles.image}/>
                        </td>
                        <td style={styles.name}>
                            {this.props.user.name}
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.countBar.cell}>
                            <span>
                                <span style={styles.countBar.slug}>
                                    <span style={styles.countBar.value}>
                                        {this.props.user.count}
                                    </span>
                                </span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}