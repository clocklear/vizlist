'use strict';

angular.module('vizlistApp')
  .controller('MainCtrl', function ($scope, ListsSvc) {
    $scope.lists = [];

    ListsSvc.all(function (lists) {
      $scope.lists = lists;
    });

  });
