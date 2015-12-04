var React = require('react');
var ReactDOM = require('react-dom');

import Widget from './components/Widget.jsx';

import observeDomChanges from './observeDomChanges';

function renderWidget() {
    if (!location.pathname.startsWith('/music')) {
        return;
    }

    var sidebarEl = document.querySelector('.col-sidebar');
    if (sidebarEl) {
        var widgetRootEl = document.createElement('div');
        sidebarEl.insertBefore(widgetRootEl, sidebarEl.firstChild);

        ReactDOM.render(<Widget />, widgetRootEl);
    }
}

renderWidget();

observeDomChanges(renderWidget);
