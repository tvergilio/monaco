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
            when('/edit/:companyID', {
                templateUrl: 'partials/company-update-form.html',
                controller: 'CompanyController'}).
            when('/edit/:companyID', {
                templateUrl: 'partials/company-update-form.html',
                controller: 'CompanyController'}).
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
function backToRoot ($scope, $location, forceReload) {
    var url = "http://localhost:8000/app/index.html?#/";
    $scope = $scope || angular.element(document).scope();
    if (forceReload || $scope.$$phase) {
        window.location = url;
    }
    else {
        //this this if you want to change the URL and add it to the history stack
        $location.path(url);
        $scope.$apply();
    }
};