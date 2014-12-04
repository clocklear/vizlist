'use strict';

angular.module('vizlistApp')
  .service('ListsSvc', function ($http) {

    function all (callback) {
      $http.get('/api/lists')
        .success(function (lists) {
          callback(lists);
        });
    }

    function get (id, callback) {
      $http.get('/api/lists/' + id)
        .success(function (list) {
          callback(list);
        });
    }

    function create (list, callback) {
      $http.post('/api/lists', list)
        .success(function (res) {
          callback(res);
        });
    }

    function update (listId, list, callback) {
      $http.put('/api/lists/' + listId, list)
        .success(function (res) {
          callback(res);
        });
    }

    function remove (listId, callback) {
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
