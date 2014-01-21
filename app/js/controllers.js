'use strict';

/* Controllers */

var companyCatControllers = angular.module('companyCatControllers', []);

//Puts a list of all companies in the scope, deletes a company
companyCatControllers.controller('CompanyListController', ['$scope', 'DataFactory', '$route', '$location', 'CompanyFactory',
    function ($scope, DataFactory, $route, $location, CompanyFactory) {
        function init() {
            $scope.companies = DataFactory;
        }

        init();

        $scope.deleteCompany = function (company) {
            var companyID = company.id;
            CompanyFactory.delete(companyID).success(function (data, status, headers, config) {
                var index = $scope.companies.content.indexOf(company);
                $scope.companies.content.splice(index, 1);

            })
        };
        $scope.$watch('companies', function (newValue, oldValue) {
            if (newValue != undefined) {
                $scope.companies = newValue;
            }
        });

    }]);

//Puts a specific company in the scope, posts a new company, updates an existing company
companyCatControllers.controller('CompanyController', ['$scope', '$routeParams', '$location', 'CompanyFactory', 'DataFactory', 'DirectorFactory',
    function ($scope, $routeParams, $location, CompanyFactory, DataFactory, DirectorFactory) {
        var theId;
        $scope.companies = DataFactory;
        $scope.hideForm = true;
        function init() {
            theId = $routeParams.companyID;
            $scope.theCompany = CompanyFactory.get(theId);
        }

        init();

        $scope.addCompany = function (company) {
            CompanyFactory.save(theId, company).success(function (data, status, headers, config) {

                if (theId > 1) {
                    //update
                    var theCompany = CompanyFactory.get(theId);
                    var index = $scope.companies.content.indexOf(company);
                    $scope.companies.content.splice(index, 1);
                    //TODO: need to implement proper validation and default to existing value if none is entered
                    company['name'] = $scope.theCompany.content.name;
                    company['id'] = $scope.theCompany.content.id;
                    $scope.companies.content.push(company);
                    $location.path('/');

                } else {
                    //new
                    $scope.companies.content.push(data);
                    $location.path('/');
                }
            })
        };
        $scope.deleteDirector = function (director) {
            var directorID = director.id;
            DirectorFactory.delete(directorID).success(function (data, status, headers, config) {
                var index = $scope.theCompany.content.directors.indexOf(director);
                $scope.theCompany.content.directors.splice(index, 1);
            });

        };
        $scope.$watch('theCompany', function (newValue, oldValue) {
            if (newValue != undefined) {
                $scope.theCompany = newValue;
                var index = $scope.companies.content.indexOf(newValue);
                $scope.companies.content.splice(index, 1);
                $scope.companies.content.push(newValue)
            }
        });
        $scope.showForm = function () {
            $scope.hideForm = false;
        }

        $scope.addDirector = function (director) {
            director.company_id = theId;
            DirectorFactory.save(director).success(function (data, status, headers, config) {
                $scope.theCompany.content.directors.push(data);
                $scope.newDirector.forename = '';
                $scope.newDirector.surname = '';
                $scope.hideForm = true;
            });
        };
    }]);

//Gets a specific director, uploads a file
companyCatControllers.controller('DirectorController', ['$scope', '$routeParams', '$location', 'DirectorFactory',
    function ($scope, $routeParams, $location, DirectorFactory) {
        $scope.uploaded = false;
        var theId = $routeParams.directorID;
        $scope.uploadedFiles = {file: null};
        $scope.$watch('files', function (newValue, oldValue) {
            if (newValue != undefined) {
                $scope.uploadedFiles.file = "File " + newValue.substr(newValue.lastIndexOf("\\") + 1) + " has been uploaded.";
                $scope.uploaded = true;
            }
        });

        $scope.theDirector = DirectorFactory.get(theId);


    }]);


