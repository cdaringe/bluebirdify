'use strict';
var test = require('tape');
var bluebirdify = require('./index.js');
var Bluebird = require('bluebird');

var uncaughtCaught = false;

test('bluebirdify module', function(t) {
    t.plan(3);

    t.notEqual(Bluebird, Promise, 'default promise !== Bluebird promise');
    bluebirdify({
        onuncaught: function(error) {
            uncaughtCaught = true;
        }
    });
    t.equal(Bluebird, Promise, 'default === Bluebird promise post bluebirdify');

    Promise.reject();
    setTimeout(function() {
        delete bluebirdify.onuncaught; // teardown
        t.ok(uncaughtCaught, 'uncaught promise rejection caught by base hander'); // see prior test
        t.end();
    }, 10);
});

test('bluebirdify explicit handler', function(t) {
    t.plan(1);
    bluebirdify.chirp(function() {
        t.ok(true, 'explicit handler executed');
        t.end();
    });
    Promise.reject();
});

test('bluebirdify onuncaught, no handler', function(t) {
    t.plan(1);
    bluebirdify.chirp();
    setTimeout(function() {
        delete bluebirdify.onuncaught; // teardown
        t.ok(uncaughtCaught, 'uncaught promise rejection caught by base hander'); // see prior test
        t.end();
    }, 10);
});

// test('bluebirdify onuncaught, no handler - manual confirm output (@TODO, capture stdout)', function(t) {
//     var err = new Error('testError - bluebirdify onuncaught');
//     err.subProp = { subSubProp: [1, 2 , 3]};
//     Promise.reject(err);
// });
