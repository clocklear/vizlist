'use strict';

angular.module('vizlistApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('createlist', {
        url: '/createlist',
        templateUrl: 'app/createlist/createlist.html',
        controller: 'CreatelistCtrl'
      });
  });
