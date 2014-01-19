'use strict';

/* Services */

var companyCatServices = angular.module('companyCatServices', ['ngResource']);

//Factory using $http
companyCatServices.factory('DataFactory', ['$http',
    function ($http) {
        var CSRF_TOKEN = '';

        function configureCSRF() {
            $http.get('http://localhost:3000/webservice/csrf_token').success(function (data, textStatus, jqXHR) {
                CSRF_TOKEN = data.csrf;
            });
        }

        var companies = {content: null};
        $http.get('http://localhost:3000/webservice/companies').success(function (data) {
            companies.content = data;
        });
        return companies;
    }]);

//Factory using $resource
companyCatServices.factory("CompanyFactory", ['$http',
    function ($http) {
        var baseUrl = 'http://localhost:3000/webservice/companies';
        var CSRF_TOKEN = '';

        function configureCSRF() {
            $http.get('http://localhost:3000/webservice/csrf_token').success(function (data, textStatus, jqXHR) {
                CSRF_TOKEN = data.csrf;
            });
        }

        configureCSRF();
        return {
            get: function (companyID) {
                if (companyID === undefined) {
                    return;
                }
                var company = {content: null};
                $http({method: 'get', url: baseUrl + '/' + companyID, cache: false})
                    .success(function (data) {
                        company.content = data;
                    }).error(function (data, status, headers, config) {
                        // Handle the error
                    });
                return company;
            },
            save: function (id, company) {
                configureCSRF();
                if (id === undefined) {
                    //POST
                    var url = baseUrl;
                    var postData = JSON.stringify(company) + '&authenticity_token=' + CSRF_TOKEN;
                    return $http({
                        url: baseUrl,
                        method: "POST",
                        data: postData,
                        headers: {
                            'HTTP_X_CSRF_TOKEN': CSRF_TOKEN
                        }
                    });

                } else {
                    //PUT
                    configureCSRF();
                    var putData = JSON.stringify(company) + '&authenticity_token=' + CSRF_TOKEN;
                    var url = baseUrl + '/' + id;
                    return $http.put(url, putData);
                }

            },
            query: function () {
                return $http.get(baseUrl);
            },
            delete: function (companyID) {
                configureCSRF();
                return $http.delete(baseUrl + '/' + companyID);
            }
        };
    }]);

//Another factory using $resource
companyCatServices.factory("DirectorFactory", function ($resource) {

    return $resource(
        "http://ancient-beach-1323.herokuapp.com/webservice/directors/:id",
        ['id', '@id' ],
        [
            "update", {method: "PUT"},
            "get", {'method': 'GET', 'params': {'id': "@id"}, isArray: true}

        ]
    );
});
