'use strict';

angular.module('vizlistApp')
  .directive('listItem', function () {
    return {
      templateUrl: 'app/listItem/listItem.html',
      restrict: 'EA',
      scope: {
        item: '=',
        styles: '=',
        onChange: '=',
        onDelete: '='
      },
      link: function (scope, element, attrs) {
      },
      controller: function($scope) {
        var iHandle;
        $scope.$watch('item.listItemDesc', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            clearTimeout(iHandle);
            iHandle = setTimeout(function () {
              $scope.onChange();
            }, 1000);
          }
        });
      }
    };
  });