'use strict';

describe('Controller: CreatelistCtrl', function () {

  // load the controller's module
  beforeEach(module('vizlistApp'));

  var CreatelistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatelistCtrl = $controller('CreatelistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
