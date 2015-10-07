// UMD credit: https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['bluebird'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('bluebird'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.bluebird);
    }
}(this, function(bluebird) {

    /**
     * Sets Bluebird promises to the be global promises
     * @param  {object} opts configuration options, specifiable by user
     * @option {function} onuncaught function to execute on an uncaught rejection
     * @return {undefined}
     */
    var bluebirdify = function(opts) {
        this.Promise = bluebird;

        if (opts.onuncaught) {
            bluebirdify.onuncaught = opts.onuncaught;
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
        Promise.onPossiblyUnhandledRejection(function(error) {
            handler = handler || bluebirdify.onuncaught;
            if (handler) {
                return handler(error);
            }
            console.error('uncaught promise detected');
            console.dir(error);
            throw error;
        });
    }

    return bluebirdify;
}));