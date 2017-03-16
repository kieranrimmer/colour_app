'use strict';

/**
 * @ngdoc function
 * @name colourappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the colourappApp
 */
angular.module('colourappApp')
  .controller('AboutCtrl', function ($scope, $http, $q) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.response = {};
    $scope.error = {};

    function callGoogle() {
            $http.get('http://www.google.com', {}).then(
                function success(response) {
                    $scope.response = response;
                },
                function failure(error) {
                    $scope.error = error;
                }
            )
        };

    $scope.getGoogleCheck = function() {
            $http.get('http://www.google.com', {}).then(
                function success(response) {
                    $scope.response = response;
                },
                function failure(error) {
                    $scope.error = error;
                }
            )
    }
  });
