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
    React.createElement(
        'h1',
        null,
        data.title.toUpperCase()
    ),
    React.createElement(
        'p',
        null,
        data.subtitle
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
    )
);

function getLocation(location) {
    if (location) {
        return React.createElement(
            'p',
            null,
            'Location: ',
            location
        );
    }
}

var user = {
    Name: 'Robert de Lacy',
    Age: 17,
    Location: 'Chichester'
};
var template2 = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        ' ',
        user.Name ? user.Name : undefined,
        ' '
    ),
    React.createElement(
        'p',
        null,
        ' Age: ',
        user.Age && user.Age > 17 ? user.Age : undefined
    ),
    getLocation(user.Location)
);

var appRoot = document.getElementById('app');

ReactDOM.render(template2, appRoot);
