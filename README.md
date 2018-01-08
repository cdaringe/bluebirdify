[ ![Codeship Status for cdaringe/bluebirdify](https://codeship.com/projects/e7383b50-4eba-0133-21f0-0a25db2949d0/status?branch=master)](https://codeship.com/projects/107025)

# bluebirdify

[![Greenkeeper badge](https://badges.greenkeeper.io/cdaringe/bluebirdify.svg)](https://greenkeeper.io/)

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
    onuncaught: function(err) { ... }  // or `chirp: true or function`
});

// or,
bluebirdify = require('bluebirdify');
bluebirdify();
bluebirdify.chirp(function(err) { ... }); // or
bluebirdify.handleUncaught(function(err) { ... });
```

You can even `chirp()`/`handleUncaught()` [same method] with no handler passed in to get the basic console logging onUnhandled rejection.  The error is re-thrown after error content is logged.
