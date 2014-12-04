'use strict';

angular.module('vizlistApp')
  .controller('CreatelistCtrl', function ($scope, ListsSvc, $state) {
    $scope.message = 'Hello';
    $scope.listTemplate = {
      listTitle: '',
      subjectTitle: '',
      subjects: [],
      statuses: []
    };

    $scope.addStatus = function () {
      $scope.listTemplate.statuses.push({
        statusName: ''
      });
    };

    $scope.removeStatus = function (status) {
      var index = $scope.listTemplate.statuses.indexOf(status);
      if (index >= 0) {
        $scope.listTemplate.statuses.splice(index, 1);
      }
    };

    $scope.addSubject = function () {
      $scope.listTemplate.subjects.push({
        subjectName: ''
      });
    };

    $scope.removeSubject = function (subject) {
      var index = $scope.listTemplate.subjects.indexOf(subject);
      if (index >= 0) {
        $scope.listTemplate.subjects.splice(index, 1);
      }
    };

    $scope.createList = function () {
      ListsSvc.create($scope.listTemplate, function (res) {
        if (res.listId) {
          $state.transitionTo('list', {id: res.listId});
        }
      });
    };
  });
