var React = require('react');
var storage = require('./../storage');

export default class Settings extends React.Component {
    mapOptions(options) {
        return options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>
        });
    }

    render() {
        var cache = {
            friends: {
                options: this.mapOptions([
                    {text: "Don't cache", value: 0},
                    {text: '1 hour', value: 60},
                    {text: '5 hour', value: 60 * 5},
                    {text: '1 day', value: 60 * 24},
                    {text: '3 days', value: 60 * 24 * 3},
                    {text: '1 week', value: 60 * 24 * 7},
                    {text: '3 weeks', value: 60 * 24 * 7 * 3}
                ]),
                selected: storage.getFriendsExpiry()
            },
            scrobbles: {
                options: this.mapOptions([
                    {text: "Don't cache", value: 0},
                    {text: '5 minutes', value: 5},
                    {text: '30 minutes', value: 30},
                    {text: '1 hour', value: 60},
                    {text: '12 hours', value: 60 * 12},
                    {text: '1 day', value: 60 * 24},
                    {text: '3 days', value: 60 * 24 * 3},
                    {text: '1 week', value: 60 * 24 * 7}
                ]),
                selected: storage.getScrobblesExpiry()
            }
        };


        return (
            <div>
                <h2 className="widget_title">Settings</h2>

                <div className="content-form">
                    <fieldset>
                        <legend>
                            Cache
                        </legend>
                        <div className="form-group">
                            <label className="control-label">
                                Cache friends for
                            </label>
                            <div className="form-group-controls">
                                <select defaultValue={cache.friends.selected}
                                        onChange={(event) => {storage.setFriendsExpiry(event.target.value)}}>
                                    {cache.friends.options}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label">
                                Cache scrobbles for
                            </label>
                            <div className="form-group-controls">
                                <select defaultValue={cache.scrobbles.selected}
                                        onChange={(event) => {storage.setScrobblesExpiry(event.target.value)}} >
                                    {cache.scrobbles.options}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <button className="btn-secondary" onClick={storage.flushCache}>Flush cache</button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            Loading
                        </legend>
                        <div className="form-group">
                            <div className="form-group-controls">
                                <div className="checkbox">
                                    <label>Display progress bar
                                        <input type="checkbox" defaultChecked={storage.getDisplayProgressBar()}
                                               onClick={(event) => {storage.setDisplayProgressBar(event.target.checked)}} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>

            </div>
        );
    }
}