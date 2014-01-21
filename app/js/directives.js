'use strict';

/* Directives */

var companyCatDirectives = angular.module('companyCatDirectives', []);

companyCatDirectives.directive('fileupload', function() {
        return {
            restrict: 'A',
            scope: {
                done: '&',
                progress: '&'
            },
            link: function(scope, element, attrs) {
                var today = new Date();
                var optionsObj = {
                    dataType: 'json'
                };
                if (scope.done) {
                    optionsObj.done = function() {
                        scope.$apply(function() {
                            scope.done({e: e, data: data});
                        });
                    };
                }
                if (scope.progress) {
                    optionsObj.progress = function(e, data) {
                        scope.$apply(function() {
                            scope.progress({e: e, data: data});
                        });
                    }
                }
                element.fileupload(optionsObj);
            }
        };
    });