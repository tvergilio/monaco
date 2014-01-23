'use strict';


// Declare app level module which depends on filters, and services
var companyCatApp = angular.module('companyCatApp', [
    'ngRoute',
    'companyCatDirectives',
    'companyCatControllers',
    'companyCatFilters',
    'companyCatServices'
]);

companyCatApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/company-list.html'
//                ,controller: 'CompanyListController'
            }).
            when('/companies/:companyID', {
                templateUrl: 'partials/company-detail.html'
//                ,controller: 'CompanyController'
            }).
            when('/directors/:directorID', {
                templateUrl: 'partials/director.html'
                //, controller: 'DirectorController'
            }).
            when('/edit/:companyID', {
                templateUrl: 'partials/company-update-form.html'
//                ,controller: 'CompanyController'
            }).
            when('/companyForm', {
                templateUrl: 'partials/companyForm.html',
                controller: 'CompanyController'}).
            otherwise({
                redirectTo: '/'
            });
    }]);

function playSound(element, soundfile) {
    element.mp3 = new Audio(soundfile);
    element.mp3.play();
}
