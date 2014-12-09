'use strict';

angular.module('vizlistApp')
  .service('ListsSvc', function ($http) {

    function all (callback) {
      callback = callback || angular.noop;
      $http.get('/api/lists')
        .success(function (lists) {
          callback(lists);
        });
    }

    function get (id, callback) {
      callback = callback || angular.noop;
      $http.get('/api/lists/' + id)
        .success(function (list) {
          callback(list);
        });
    }

    function create (list, callback) {
      callback = callback || angular.noop;
      $http.post('/api/lists', list)
        .success(function (res) {
          callback(res);
        });
    }

    function update (listId, list, callback) {
      callback = callback || angular.noop;
      $http.put('/api/lists/' + listId, list)
        .success(function (res) {
          callback(res);
        });
    }

    function remove (listId, callback) {
      callback = callback || angular.noop;
      $http.delete('/api/lists/' + listId)
        .success(function (res) {
          callback(res);
        });
    }

    // Public API here
    return {
      all: all,
      get: get,
      create: create,
      update: update,
      remove: remove
    };
  });
