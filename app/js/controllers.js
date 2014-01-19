'use strict';

/* Controllers */

var companyCatControllers = angular.module('companyCatControllers', []);

//Gets the list of all companies
companyCatControllers.controller('CompanyListController', ['$scope', 'DataFactory', '$route', 'CompanyFactory',
    function ($scope, DataFactory, $route, CompanyFactory) {
        function init(){
            $scope.companies = DataFactory;
        }
        init();

        $scope.deleteCompany = function (companyID) {
            CompanyFactory.delete(companyID);

        };

    }]);

//Gets a specific company
companyCatControllers.controller('CompanyController', ['$scope', '$routeParams', '$location', 'CompanyFactory',
    function ($scope, $routeParams, $location, CompanyFactory) {

        var theId;

        function init() {
            theId = $routeParams.companyID;
            $scope.theCompany = CompanyFactory.get(theId);
        }

        init();

        $scope.addCompany = function (company) {
                CompanyFactory.save(theId, company);
                //window.history.back();
        }


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

