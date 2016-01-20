var React = require('react');

import Content from './Content.jsx'
import Settings from './Settings.jsx'

export default class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: false
        };
    }

    componentDidMount() {
    }

    handleSettingsIconClicked() {
        this.setState((state) => {
            state.settings = !state.settings;
            return state;
        });
    }

    render() {
        var styles = {
            settingsIcon: {
                width: 20,
                position: 'absolute',
                top: 0,
                right: 10,
                marginTop: 18,
                cursor: 'pointer'
            }
        };

        if (this.state.settings)
            var childComponent = <Settings />;
        else
            var childComponent = <Content />;

        return (
            <div className="widget kerve" >
                <img src="https://cdn.jsdelivr.net/open-iconic/1.1.0/svg/cog.svg" style={styles.settingsIcon} onClick={this.handleSettingsIconClicked.bind(this)} />
                {childComponent}
            </div>
        );
    }
}
