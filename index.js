// UMD credit: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['bluebird', 'errio'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('bluebird'), require('errio'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.bluebird, root.errio);
    }
}(this, function(bluebird, errio) {
    /**
     * pretty print an object.  because our error is serialized for printability,
     * often our obj will look like { message: 'str', trace: '0: aaa\n,1: bbbb\n'}
     * printing the serialized object does not yield a human readable trace.  therefore
     * we will iterate over all of the properties of the plain-old-js-object
     * (guaranteed to be plain), and print things out one-by-one
     * @param {object} opts
     * @param {object} opts.object target object to print props of
     * @param {number} opts.depth int value of depth of print
     * @return {undefined}
     */
    var printNested = function(opts) {
        var obj = opts.object;
        var depth = opts.depth || 0;
        var indent = '';
        var val;
        while (depth && depth > 0) {
            indent += '  ';
            --depth;
        }
        for (var key in obj) {
            val = obj[key];
            if (typeof val === 'object') {
                console.log(indent + key + ':');
                printNested({ object: val, depth: depth + 1 });
            } else {
                console.log(indent + key + ':', val);
            }
        }
    };

    /**
     * Sets Bluebird promises to the be global promises
     * @param  {object} opts configuration options, specifiable by user
     * @option {function} onuncaught function to execute on an uncaught rejection
     * @return {undefined}
     */
    var bluebirdify = function(opts) {
        opts = opts || {};
        this.Promise = bluebird;
        this.Promise.longStackTraces();

        if (opts.onuncaught) {
            bluebirdify.onuncaught = opts.onuncaught;
            bluebirdify.chirp();
        } else if (opts.chirp) {
            if (typeof opts.chirp === 'function') {
                bluebirdify.onuncaught = opts.chirp;
            }
            bluebirdify.chirp();
        }
    }.bind(this);

    /**
     * Sets the global uncaught promise handler.
     * @param  {function=} handler uncaught handler precendence: userHander,
     *                                 opts.oncaught from constructor, or
     *                                 basic console.logging.  Each passed the Error instance
     * @return {undefined}
     */
    bluebirdify.chirp = bluebirdify.handleUncaught = function(handler) {
        Promise.onPossiblyUnhandledRejection(function(err) {
            handler = handler || bluebirdify.onuncaught;
            if (handler) {
                return handler(err);
            }
            debugger;
            console.error('>> uncaught promise detected <<');
            // @note: https://github.com/petkaantonov/bluebird/issues/806
            var errComponents = JSON.parse(errio.stringify(err, { stack: true }));
            printNested({
                object: errComponents,
                depth: 0,
            });
            throw err;
        });
    }

    return bluebirdify;
}));
