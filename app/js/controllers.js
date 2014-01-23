'use strict';

/* Controllers */

var companyCatControllers = angular.module('companyCatControllers', []);

//Puts a list of all companies in the scope, deletes a company
companyCatControllers.controller('CompanyListController', ['$scope', '$route', '$location', 'CompanyFactory',
    function ($scope, $route, $location, CompanyFactory) {
        function init() {
            $scope.data = {};
            $scope.data.companies = CompanyFactory.query();
        }

        init();

        $scope.deleteCompany = function (company) {
            var companyID = company.id;
            CompanyFactory.delete(companyID).success(function (data, status, headers, config) {
                var index = $scope.data.companies.content.indexOf(company);
                $scope.data.companies.content.splice(index, 1);

            })
        };
        $scope.$watch('companies', function (newValue, oldValue) {
            if (newValue != undefined) {
                $scope.data.companies = newValue;
            }
        }, true);

        $scope.$on('companyChanged', function (event, newValue, oldValue) {
            $scope.data.companies = CompanyFactory.query();
        });

    }]);

//Puts a specific company in the scope, posts a new company, updates an existing company
companyCatControllers.controller('CompanyController', ['$scope', '$routeParams', '$location', 'CompanyFactory', 'DirectorFactory',
    function ($scope, $routeParams, $location, CompanyFactory, DirectorFactory) {
        var theId;
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
                    //TODO: need to implement proper validation and default to existing value if none is entered
                    company['name'] = $scope.theCompany.content.name;
                    company['id'] = $scope.theCompany.content.id;
                    $scope.$emit('companyChanged', company, $scope.theCompany);
                    $location.path('/');

                } else {
                    //new
                    $scope.data.companies.content.push(data);
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
                $scope.$emit('companyChanged', newValue, oldValue);
            }
        }, true);
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
companyCatControllers.controller('DirectorController', ['$scope', '$routeParams', '$location', '$fileUpload', 'DirectorFactory',
    function ($scope, $routeParams, $location, $fileUpload, DirectorFactory) {
        var theId = $routeParams.directorID;
        $scope.uploadedFiles = {file: null};
        $scope.$watch('files', function (newValue, oldValue) {
            if (newValue != undefined) {
                $scope.uploadedFiles.file = "File " + newValue.substr(newValue.lastIndexOf("\\") + 1) + " submitted.";
            }
        });

        $scope.theDirector = DirectorFactory.get(theId);
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = 'http://ancient-beach-1323.herokuapp.com/webservice/directors/' + theId + '/document';
            $fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data, status, headers, config) {
                window.location.reload();
            })
        };
    }]);



