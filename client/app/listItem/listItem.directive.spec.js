'use strict';

describe('Directive: listItem', function () {

  // load the directive's module and view
  beforeEach(module('vizlistApp'));
  beforeEach(module('app/listItem/listItem.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<list-item></list-item>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the listItem directive');
  }));
});