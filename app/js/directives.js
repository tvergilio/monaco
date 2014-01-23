'use strict';

/* Directives */

var companyCatDirectives = angular.module('companyCatDirectives', []);

companyCatDirectives.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
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