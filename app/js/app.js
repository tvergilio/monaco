'use strict';


// Declare app level module which depends on filters, and services
var companyCatApp = angular.module('companyCatApp', [
    'ngRoute',
    'companyCatControllers',
    'companyCatFilters',
    'companyCatServices'
]);

companyCatApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/company-list.html',
                controller: 'CompanyListController'}).
            when('/companies/:companyID', {
                templateUrl: 'partials/company-detail.html',
                controller: 'CompanyController'}).
            when('/directors/:directorID', {
                templateUrl: 'partials/director.html',
                controller: 'DirectorController'}).
            otherwise({
                redirectTo: '/'
            });
    }]);
