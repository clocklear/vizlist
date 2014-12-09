'use strict';

angular.module('vizlistApp')
  .directive('stylePicker', function () {
    return {
      templateUrl: 'app/stylePicker/stylePicker.html',
      restrict: 'EA',
      scope: {
        item: '=',
        styles: '=',
        onChange: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: function ($scope) {
        var iHandle;
        $scope.$watch('item.class', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            clearTimeout(iHandle);
            iHandle = setTimeout(function () {
              $scope.onChange();
            }, 250);
          }
        });
      }
    };
  });