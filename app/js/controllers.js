'use strict';

/* Controllers */

var companyCatControllers = angular.module('companyCatControllers', []);

//Gets the list of all companies
companyCatControllers.controller('CompanyListController', ['$scope', 'DataFactory',
function ($scope, DataFactory) {
    $scope.companies = DataFactory;
}]);

//Gets a specific company
companyCatControllers.controller('CompanyController', ['$scope', '$routeParams', 'CompanyFactory',
function SecondCtrl($scope, $routeParams, CompanyFactory){
    var theId = $routeParams.companyID;
    $scope.theCompany = CompanyFactory.get(
        {
            id: theId
        }
    );
}]);

//Gets a specific director
companyCatControllers.controller('DirectorController', ['$scope', '$routeParams', 'DirectorFactory',
    function SecondCtrl($scope, $routeParams, DirectorFactory){
        var theId = $routeParams.directorID;
        $scope.theDirector = DirectorFactory.get(
            {
                id: theId
            }
        );

    }]);

