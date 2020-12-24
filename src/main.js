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
        var rectangle = widgetRootEl.getBoundingClientRect();
        var children = widgetRootEl.parentElement.children;
        var maxDistance = 0;
        for (let i = 0; i < children.length; i++){
            if (children[i] != widgetRootEl){
                let otherRectangle = children[i].getBoundingClientRect();
                let num = rectangle.bottom - otherRectangle.top;
                if (otherRectangle.height > 0 && num > maxDistance){
                    maxDistance = num;
                }
            }
        }
        for (let i = 0; i < children.length; i++){
            if (children[i] != widgetRootEl){
                let otherRectangle = children[i].getBoundingClientRect();
                children[i].style.marginTop = otherRectangle.top.toString() + "px";
                let newOtherRectangle = children[i].getBoundingClientRect();
                let previousMarginDistance = newOtherRectangle.top - otherRectangle.top;
                let num = otherRectangle.top - previousMarginDistance + maxDistance;
                children[i].style.marginTop = num.toString() + "px";
            }
        }
    }
}

renderWidget();

observeDomChanges(renderWidget);
