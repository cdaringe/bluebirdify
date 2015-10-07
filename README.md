[ ![Codeship Status for cdaringe/bluebirdify](https://codeship.com/projects/e7383b50-4eba-0133-21f0-0a25db2949d0/status?branch=master)](https://codeship.com/projects/107025)

# bluebirdify

Sets Bluebird Promises as the global promises for your app.

Supports CommonJS (node), AMD, and browser-global via UMD!

## usage
Basic case:
```js
require('bluebirdify')(); // done! now, Promise === Bluebird
```

To handle uncaught exceptions:
```js
require('bluebirdify')({
    onuncaught: function(err) { ... }
});

// or,
bluebirdify = require('bluebirdify');
bluebirdify();
bluebirdify.chirp(function(err) { ... }); // or
bluebirdify.handleUncaught(function(err) { ... });
```
