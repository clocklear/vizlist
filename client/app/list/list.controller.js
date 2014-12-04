'use strict';

angular.module('vizlistApp')
  .controller('ListCtrl', function ($scope, $stateParams, ListsSvc, Modal) {
    $scope.list = {};

    ListsSvc.get($stateParams.id, function (list) {
      $scope.list = list;
      console.log(list);
    });

    $scope.getContents = function (subject, status) {
      var taskItems = [];

      if ($scope.list.taskItems) {
        for (var i in $scope.list.taskItems) {
          var taskItem = $scope.list.taskItems[i];
          if (taskItem.subject === subject.subjectName && taskItem.status === status.statusName) {
            taskItems.push(taskItem);
          }
        }
      }

      return taskItems;
    };

    $scope.openModal = function () {
      Modal.confirm.delete();
    };
  });
