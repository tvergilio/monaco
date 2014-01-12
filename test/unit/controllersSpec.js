describe('companyCat controllers', function() {

    describe('companyListCtrl', function(){
        var scope, ctrl;

        beforeEach(module('companycatApp'));
        beforeEach(inject(function($controller) {
            scope = {};
            ctrl = $controller('companyListCtrl', {$scope:scope});
        }));

        it('should create "companies" model with 3 companies', function() {
            expect(scope.companies.length).toBe(3);
        });


        it('should set the default value of orderProp model', function() {
            expect(scope.orderProp).toBe('name');
        });
    });
});