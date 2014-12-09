'use strict';

angular.module('vizlistApp')
  .controller('ListCtrl', function ($scope, $stateParams, ListsSvc, Modal, Socket) {

    Socket.connect('http://localhost:9000');
    Socket.on('list.broadcast', function (list) {
      $scope.list = list;
    });
    Socket.emit('vizlist.init', {
      listId: $stateParams.id
    });

    $scope.list = {};
    $scope.templateListItem = {
      listItemDesc: 'New Item',
      class: 'btn-primary'
    };

    $scope.availableStyles = [
      'btn-primary',
      'btn-success',
      'btn-info',
      'btn-warning',
      'btn-danger'
    ];

    $scope.reloadList = function () {
      ListsSvc.get($stateParams.id, function (list) {
        $scope.list = list;
      });
    };
    $scope.reloadList();

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

    $scope.createListItem = function (subject, status) {
      $scope.list.taskItems = $scope.list.taskItems || [];
      var newItem = angular.copy($scope.templateListItem);
      newItem.status = status.statusName;
      newItem.subject = subject.subjectName;
      $scope.list.taskItems.push(newItem);

      // Trigger update
      $scope.saveChanges();
    };

    $scope.saveChanges = function () {
      ListsSvc.update($scope.list.listId, $scope.list);
    };

    $scope.deleteItem = Modal.confirm.delete(function (listItem) {
      if (!$scope.list.taskItems || !$scope.list.taskItems.length) {
        return;
      }
      var index = $scope.list.taskItems.indexOf(listItem);
      if (index >= 0) {
        $scope.list.taskItems.splice(index, 1);
        $scope.saveChanges();
      }
    });

    $scope.onDropComplete = function (data, event, target) {
      data.status = target.status.statusName;
      data.subject = target.subject.subjectName;
      $scope.saveChanges();
    };
  });
