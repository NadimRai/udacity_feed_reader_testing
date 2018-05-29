/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* tests that allFeeds variable has been defined and not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* test that allFeeds object has a url defined not empty */
        it('URL is defined and not empty', function(){
            for(var i = 0; i<allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* test that allFeeds object has a name defined not empty*/
        it('name is defined and not empty', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* new test suite named "The menu" */
    describe('The menu', function(){
        /* test the menu element ishidden by default. */
        it('menu element is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test menu is displayed when clicked and hide when clicked again. */
        it('menu changes visibility when the menu icon is clicked', function(){
            $('.menu-icon-link').trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* new test suite named "Initial Entries" */
    describe("Initial Entries", function(){
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* test at least a single .entry element within the .feed container. */
        it('at least single entry is within the feed', function(){
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* new test suite named "New Feed Selection" */
    describe("New Feed Selection", function(){
        var initialFeed,
            newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $(".feed").html();
      
              loadFeed(2, function() {
                done();
              });
            });
        });

        /* test that ensures when a new feed is loaded by the loadFeed function 
            that the content actually changes. */
        it("new feed is loaded and content is changed", function(done) {
            var newFeed = $(".feed").html();
            expect(initialFeed).not.toBe(newFeed);
            done();
        });
    });
}());
