import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget.jsx';
import observeDomChanges from './observeDomChanges';
import * as language from './language';

function renderWidget() {

    if (!language.getPathWithoutLanguage().startsWith('/music')) {
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
