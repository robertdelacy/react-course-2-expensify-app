'use strict';

console.log('App.js is running!');

var data = {
    title: 'This is the title',
    subtitle: 'This is the subtitle',
    items: ['The First', 'The Second']
};

var template = React.createElement(
    'div',
    null,
    data.title && React.createElement(
        'h1',
        null,
        data.title.toUpperCase()
    ),
    data.subtitle && React.createElement(
        'h2',
        null,
        data.subtitle
    ),
    React.createElement(
        'p',
        null,
        data.items.length > 0 ? 'Here are your options:' : 'No options'
    ),
    React.createElement(
        'ol',
        null,
        React.createElement(
            'li',
            null,
            ' ',
            data.items[0]
        ),
        React.createElement(
            'li',
            null,
            ' ',
            data.items[1],
            ' '
        )
    ),
    React.createElement(
        'form',
        null,
        React.createElement('input', { type: 'text', name: 'option' })
    )
);

var appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);
