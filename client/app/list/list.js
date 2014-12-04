'use strict';

angular.module('vizlistApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/list/:id',
        templateUrl: 'app/list/list.html',
        controller: 'ListCtrl'
      });
  });