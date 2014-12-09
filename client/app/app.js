'use strict';

angular.module('vizlistApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'monospaced.elastic',
  'ngDraggable'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
});

// Anything below is non angular.  And likely sucks.  But is necessary.
$(document).ready(function () {
  $('textarea').autosize();
});
