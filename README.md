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
