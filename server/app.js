/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var app = express();
var server = require('http').createServer(app);
var Primus = require('primus');
var primus = new Primus(server, {transformer: 'sockjs'});
var PrimusEmitter = require('primus-emitter');
var eventDispatcher = require('./components/event-dispatcher');
var socketManager = require('./components/socket-manager');
var debug = require('debug')('vizlist.core');

primus.use('emitter', PrimusEmitter);

// Setup express server
require('./config/express')(app);
require('./routes')(app);

// Start express server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

function noop () {}

// Set up primus events
primus.on('connection', function connection (spark) {
  // Require vizlist.init
  spark.on('vizlist.init', function (data) {
    // Require data.listId
    if (!data.listId) return debug('Warning: Invalid socket handshake');
    socketManager.register(data.listId, spark);

    // Set up event dispatcher for this socket
    // spark.on('data', function (data) {
    //   var callback = data.data[data.data.length - 1];
    //   callback = (typeof callback === 'function') ? callback : noop;
    //   if (!data || !data.data || data.length < 2) {
    //     throw new Error('Invalid data from client');
    //   }
    //   var event = data.data[0];
    //   var payload = data.data[1];
    //   eventDispatcher.dispatch(spark.src, event, payload, function (err, response) {
    //     if (err) {
    //       return callback(err);
    //     }
    //     debug('Responding to client');
    //     spark.send(
    //       event + '.response',
    //       response
    //     );
    //   });
    // });
  });
});

primus.on('disconnection', function disconnection (spark) {
  socketManager.unregister(spark);
});

// Bind primus to express
primus.server.listen(app.get('port'), function () {

});

// Expose app
exports = module.exports = app;
