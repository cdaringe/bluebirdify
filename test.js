'use strict';
var test = require('tape');
var bluebirdify = require('./index.js');
var Bluebird = require('bluebird');

var uncaughtCaught = false;

test('bluebirdify module', function(t) {
    t.notEqual(Bluebird, Promise, 'default promise !== Bluebird promise');
    bluebirdify({
        onuncaught: function(error) {
            uncaughtCaught = true;
        }
    });
    t.equal(Bluebird, Promise, 'default === Bluebird promise post bluebirdify');
    t.end();
});

test('bluebirdify onuncaught', function(t) {
    t.plan(1);
    bluebirdify.chirp();
    Promise.reject();
    setTimeout(function() {
        delete bluebirdify.onuncaught; // teardown
        t.ok(uncaughtCaught, 'uncaught promise rejection caught by base hander');
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
