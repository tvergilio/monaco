'use strict';

/* Directives */

var companyCatDirectives = angular.module('companyCatDirectives', []);

companyCatDirectives.directive('fileupload', [function() {
        return {
            restrict: 'A',
            scope: {
                done: '&',
                progress: '&'
            },
            link: function(scope, element, attrs, ctrl) {
                var optionsObj = {
                    dataType: 'json'
                };
                if (scope.done) {
                    optionsObj.success = function() {
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
    }]);

companyCatDirectives.directive('uploadToggle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element(element).hide();
        }
    };
});