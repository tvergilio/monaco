'use strict';

/* Services */

var companyCatServices = angular.module('companyCatServices', ['ngResource']);
var baseUrl = 'http://ancient-beach-1323.herokuapp.com/webservice/';
    //'http://localhost:3000/webservice';

companyCatServices.factory('DataFactory', ['$http',
    function ($http) {
        var companies = {content: null};
        $http.get(baseUrl + '/companies').success(function (data) {
            companies.content = data;
        });
        return companies;
    }]);


companyCatServices.factory("CompanyFactory", ['$http', '$location',
    function ($http, $location) {
        var CSRF_TOKEN = '';

        function configureCSRF() {
            $http.get(baseUrl + '/csrf_token').success(function (data, textStatus, jqXHR) {
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
                $http({method: 'get', url: baseUrl + '/companies/' + companyID, cache: false})
                    .success(function (data, status, headers, config) {
                        company.content = data;

                    }).error(function (data, status, headers, config) {
                        // Handle the error
                    });
                return company;
            },
            save: function (id, company) {

                if (id === undefined) {
                    //POST
                    var postData = JSON.stringify(company) + '&authenticity_token=' + CSRF_TOKEN;
                    return $http({
                        url: baseUrl + '/companies',
                        method: "POST",
                        data: postData,
                        headers: {
                            'HTTP_X_CSRF_TOKEN': CSRF_TOKEN
                        }
                    }).success(function (data, status, headers, config) {
                        })
                        .error(function (data, status, headers, config) {
                        });

                } else {
                    //PUT
                    var putData = JSON.stringify(company) + '&authenticity_token=' + CSRF_TOKEN;
                    var url = baseUrl + '/companies/' + id;
                    return $http.put(url, putData)
                        .success(function (data, status, headers, config) {
                        })
                        .error(function (data, status, headers, config) {
                        });
                }

            },
            query: function () {
                return $http.get(baseUrl + '/companies');
            },
            delete: function (companyID) {
                configureCSRF();
                return $http.delete(baseUrl + '/companies/' + companyID)
                    .success(function (data, status, headers, config) {
                    })
                    .error(function (data, status, headers, config) {
                    });
            }
        };
    }]);


companyCatServices.factory('DirectorFactory', ['$http',
    function ($http) {
        return {
            get: function (directorID) {
                if (directorID === undefined) {
                    return;
                }
                var director = {content: null};
                $http({method: 'get', url: baseUrl + '/directors/' + directorID, cache: false})
                    .success(function (data, status, headers, config) {
                        director.content = data;

                    }).error(function (data, status, headers, config) {
                        // Handle the error
                    });
                return director;
            },
            delete: function (directorID) {
                return $http.delete(baseUrl + '/directors/' + directorID)
                    .success(function (data, status, headers, config) {
                    })
                    .error(function (data, status, headers, config) {
                    });
            },
            save: function (director) {
                //POST
                return $http({
                    url: baseUrl + '/directors',
                    method: "POST",
                    data: director
                }).success(function (data, status, headers, config) {
                    })
                    .error(function (data, status, headers, config) {
                    });
            }
        }
    }]);

