/* global Primus */
'use strict';

angular.module('vizlistApp')

.provider('Socket', function () {
    var socket;
    var options;

    this.$get = function ($timeout) {

      var asyncAngularify = function (callback) {
        return function () {
          var args = arguments;
          $timeout(function () {
            callback.apply(socket, args);
          }, 0);
        };
      };

      /**
       * Connect the primus socket
       */
      var connect = function (host) {
        socket = socket || Primus.connect(host, options);

        socket.on('open', function () {

        });

        socket.on('end', function () {
          // console.log('sparky has met his end');
        });

        socket.on('reconnect', function () {
          // console.log('sparky is trying to reconnect. here boy!');
          // appState.status.agent = appState.status.reconnect;
        });

        socket.on('error', function (err) {
          // console.log('socket error');
          // console.log(err);
        });

        socket.on('reconnecting', function () {
          // console.log('oh noes, sparky has run away!');
          // appState.status.reconnect = appState.status.agent;
        });
      };

      var on = function (topic, callback) {
        socket.on(topic, asyncAngularify(callback));
      };

      var off = function () {
        var args = arguments;
        return socket.removeListener.apply(socket, args);
      };

      var emit = function (topic, data, ack) {
        data = data || {};

        if (ack) {
          socket.send(topic, data, asyncAngularify(ack));
        } else {
          socket.send(topic, data);
        }
      };

      var write = function (message) {
        socket.write(message);
      };

      return {
        on: on,
        off: off,
        emit: emit,
        asyncAngularify: asyncAngularify,
        write: write,
        connect: connect
      };
    };

    this.setSocket = function (value) {
      socket = value;
      return this;
    };

    this.setOptions = function (value) {
      options = value;
      return this;
    };

  }
);
