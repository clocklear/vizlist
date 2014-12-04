'use strict';

angular.module('vizlistApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      title: 'New List',
      link: '/createlist'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function (route) {
      return route === $location.path();
    };
  });
