'use strict';

/**
 * @ngdoc function
 * @name colourappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the colourappApp
 */

var colours = '';


angular.module('colourappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.colours = colourMap;

    $scope.selectedColour = { name: 'white*', hex: '#FFFFFF', RGB: [ 255,255,255 ]};

    $scope.changeColour = function(colour) {
    	$scope.selectedColour = colour;
    };

    $scope.scrollToColour = function(colour) {
    	console.log('scrollToColour clicked with colour = ' + JSON.stringify(colour, null, 2));
    	$scope.selectedColour = colour;
    	jQuery('html, body').animate({
        	scrollTop: $("#" + colour.hex.slice(1)).offset().top
    	}, 2000);
    }



  });
