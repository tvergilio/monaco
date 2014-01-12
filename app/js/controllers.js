'use strict';

/* Controllers */

//angular.module('myApp.controllers', []).
//  controller('MyCtrl1', [function() {
//
//  }])
//  .controller('MyCtrl2', [function() {
//
//  }]);

var companyCatApp = angular.module('companyCatApp', []);

companyCatApp.controller('CompanyListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('http://ancient-beach-1323.herokuapp.com/webservice/companies').success(function(data) {
            $scope.companies = data;
        });

        $scope.orderProp = 'name';
    }]);