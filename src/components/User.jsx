import React from 'react';
import * as path from './../path';
import * as parser from './../parser';

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
            },
            link: {
                color: 'inherit'
            }
        };

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            styles.countBar.slug.minWidth = '-moz-' + styles.countBar.slug.minWidth;
        }

        var userUrl = path.getLanguagePrefix() + '/user/' + encodeURIComponent(this.props.user.name);

        var libraryUrl = path.getLanguagePrefix() + '/user/' +
            encodeURIComponent(this.props.user.name) +'/library' + path.getBasePath();

        return (
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td rowSpan="2">
                            <a href={userUrl}>
                                <img src={this.props.user.image} style={styles.image} />
                            </a>
                        </td>
                        <td style={styles.name}>
                            <a href={userUrl} style={styles.link}>
                                {this.props.user.name}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.countBar.cell}>
                            <a href={libraryUrl} style={styles.countBar.slug}>
                                <span style={styles.countBar.value}>
                                    {this.props.user.count}
                                </span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}