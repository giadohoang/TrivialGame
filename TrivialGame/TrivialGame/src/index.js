import React from 'react';
import { render } from 'react-dom';
import QuestionContainer from './QuestionContainer'


const APPS = {
    QuestionContainer,
};

function renderAppInElement(el) {
    var App = APPS[el.id];
    if (!App) return;

    // get props from elements data attribute, like the post_id
    const props = Object.assign({}, el.dataset);

    ReactDOM.render(<App {...props} />, el);
}

document
    .querySelectorAll('.__react-root')
    .forEach(renderAppInElement)