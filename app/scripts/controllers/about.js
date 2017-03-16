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
            asyncService.getGoogleCheckRecursive()
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

        function getGoogleCheckRecursive() {
            var deferred = $q.defer();
            $http.get('http://www.google.com', {}).then(
                function success(response) {
                    deferred.resolve(response);
                    return deferred.promise;
                },
                function failure(error) {
                    console.log('counter = ' + counter + ', error = ' + JSON.stringify(error,null,2));
                    if(counter < 2) {
                        counter++;
                        return getGoogleCheck();
                    }
                    else {
                        console.log('counter = ' + counter + ', rejecting error = ' + JSON.stringify(error,null,2));
                        deferred.reject(error);
                        return deferred.promise;
                    }
                }
            );
            return deferred.promise;
        }

        function getGoogleCheck(bodyToPopulate) {
            var deferred = $q.defer();
            $http.get('http://www.google.com', {}).then(
                function success(response) {
                    bodyToPopulate = response;
                    deferred.resolve(response);
                },
                function failure(error) {
                    bodyToPopulate = error;
                    console.log('counter = ' + counter + ', error = ' + JSON.stringify(error,null,2));
                    if(counter < 2) {
                        counter++;
                        return getGoogleCheck();
                    }
                    else {
                        console.log('counter = ' + counter + ', rejecting error = ' + JSON.stringify(error,null,2));
                        deferred.reject(error);
                    }
                }
            );
            return deferred.promise;
        }


        return {
            getGoogleCheckRecursive: getGoogleCheckRecursive,
            getGoogleCheck: getGoogleCheck
        };
    });