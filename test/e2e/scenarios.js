describe('CompanyCat App', function() {

    describe('Company list view', function() {

        beforeEach(function() {
            browser().navigateTo('../../app/index.html');
        });


        it('should filter the company list as user types into the search box', function() {
            expect(repeater('.companies li').count()).toBe(3);

            input('query').enter('nexus');
            expect(repeater('.companies li').count()).toBe(1);

            input('query').enter('motorola');
            expect(repeater('.companies li').count()).toBe(2);
        });
    });
});