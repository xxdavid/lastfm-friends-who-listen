import React from 'react';
import * as storage from './../storage';

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
                    {text: '5 hours', value: 60 * 5},
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

        var collapse = {
            options: this.mapOptions([
                {text: "All (don't collapse)", value: 0},
                {text: "5", value: 5},
                {text: "10", value: 10},
                {text: "15", value: 15},
                {text: "20", value: 20},
                {text: "30", value: 30},
                {text: "50", value: 50}
            ]),
            selected: storage.getCollapseNumber()
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
                            General
                        </legend>
                        <div className="form-group">
                            <div className="form-group-controls">
                                <div className="checkbox">
                                    <label>Display progress bar while loading
                                        <input type="checkbox" defaultChecked={storage.getDisplayProgressBar()}
                                               onClick={(event) => {storage.setDisplayProgressBar(event.target.checked)}} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group-controls">
                            <div className="checkbox">
                                <label>Use the alternative title version (“K of your friends listen to XY”)
                                    <input type="checkbox" defaultChecked={storage.getAlternativeTitle()}
                                           onClick={(event) => {storage.setAlternativeTitle(event.target.checked)}} />
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group-controls">
                                <div className="checkbox">
                                    <label>Show your plays
                                        <input type="checkbox" defaultChecked={storage.getShowYourPlays()}
                                               onClick={(event) => {storage.setShowYourPlays(event.target.checked)}} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">
                                Number of friends to show (and collapse others)
                            </label>
                            <div className="form-group-controls">
                                <select defaultValue={collapse.selected}
                                        onChange={(event) => {storage.setCollapseNumber(event.target.value)}} >
                                    {collapse.options}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            Performance
                        </legend>
                        <div className="form-group">
                            <div className="form-group-controls">
                                <div className="checkbox">
                                    <label>Wait for rendering until all is fetched
                                        <input type="checkbox" defaultChecked={storage.getWaitUntilFetched()}
                                               onClick={(event) => {storage.setWaitUntilFetched(event.target.checked)}} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group-controls">
                                <div className="checkbox">
                                    <label>Limit concurrent requests to 3
                                        <input type="checkbox" defaultChecked={storage.getLimitConcurrentRequests()}
                                               onClick={(event) => {storage.setLimitConcurrentRequests(event.target.checked)}} />
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