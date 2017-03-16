'use strict';

/**
 * @ngdoc function
 * @name colourappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the colourappApp
 */
angular.module('colourappApp')
  .controller('AboutCtrl', function ($scope, $http, $q, asyncService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.response = {body: null};
    $scope.error = {};



    $scope.getGoogleCheck = function() {
            asyncService.getGoogleCheck($scope.response)
                .then(
                function success(response) {
                    console.log('success triggered');
                    $scope.response = response;
                },
                function failure(error) {
                    console.log('failure triggered');
                    $scope.error = error;
                }
            )
    }
  });

angular.module('colourappApp')
    .factory('asyncService', function ($http, $q, $log) {
        var counter = 0;

        function getGoogleCheck(bodyToPopulate) {
            console.log('bodyToPopulate = ' + JSON.stringify(bodyToPopulate,null,2));
            var deferred = $q.defer();
            $http.get('http://www.google.com', {}).then(
                function success(response) {
                    bodyToPopulate.body = response;
                    deferred.resolve(response);
                },
                function failure(error) {
                    bodyToPopulate.body = error;
                    $http.get('http://www.abc.net.au', {}).then(function success(scsMsg) {
                            bodyToPopulate.body = scsMsg;
                            deferred.resolve(response);
                        },
                        function failure(errorMsg) {
                            bodyToPopulate.body = errorMsg;
                            console.log('counter = ' + counter + ', error = ' + JSON.stringify(errorMsg, null, 2));
                            if (counter < 2) {
                                counter++;
                                return getGoogleCheck(bodyToPopulate);
                            }
                            else {
                                console.log('counter = ' + counter + ', rejecting error = ' + JSON.stringify(errorMsg, null, 2));
                                deferred.reject(errorMsg);
                            }
                        });
                }
            );
            return deferred.promise;
        }


        return {
            getGoogleCheck: getGoogleCheck
        };
    });