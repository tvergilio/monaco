'use strict';

/* Services */

var companyCatServices = angular.module('companyCatServices', ['ngResource']);

//Factory using $http
companyCatServices.factory('DataFactory', ['$http',

    function ($http) {
        var companies = {content: null};
        $http.get('http://ancient-beach-1323.herokuapp.com/webservice/companies').success(function (data) {
            companies.content = data;
        });
        return companies;
    }]);

//Factory using $resource
companyCatServices.factory("CompanyFactory", function ($resource) {

    return $resource(
        "http://ancient-beach-1323.herokuapp.com/webservice/companies/:id",
        ['id', '@id' ],
        [
            "update", {method: "PUT"},
            "get", {'method': 'GET', 'params': {'id': "@id"}, isArray: true}

        ]
    );
});
