'use strict';

/**
 * @ngdoc function
 * @name colourappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the colourappApp
 */
angular.module('colourappApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
