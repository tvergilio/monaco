'use strict';

/* Controllers */

var companyCatControllers = angular.module('companyCatControllers', []);

//Gets the list of all companies
companyCatControllers.controller('CompanyListController', ['$scope', 'DataFactory', '$route', '$location','CompanyFactory',
    function ($scope, DataFactory, $route, $location, CompanyFactory) {
        function init(){
            $scope.companies = DataFactory;
        }
        init();

        $scope.deleteCompany = function (companyID) {
            CompanyFactory.delete(companyID).success(function (data, status, headers, config){
                $scope.companies = DataFactory;
                $scope.companies.content.splice(companyID, 1);
                window.location.reload();
            })

        };

    }]);

//Gets a specific company
companyCatControllers.controller('CompanyController', ['$scope', '$routeParams', '$location', 'CompanyFactory', 'DataFactory',
    function ($scope, $routeParams, $location, CompanyFactory, DataFactory) {

        var theId;

        function init() {
            theId = $routeParams.companyID;
            $scope.theCompany = CompanyFactory.get(theId);
        }

        init();

        $scope.addCompany = function (company) {
                CompanyFactory.save(theId, company).success(function (data, status, headers, config){
                    $scope.companies = DataFactory;
                    $scope.companies.content.push(data);
                    $location.path('/');
                })
        };

    }]);

//Gets a specific director
companyCatControllers.controller('DirectorController', ['$scope', '$routeParams', 'DirectorFactory',
    function ($scope, $routeParams, DirectorFactory) {
        var theId = $routeParams.directorID;
        $scope.theDirector = DirectorFactory.get(
            {
                id: theId
            }
        );

    }]);

