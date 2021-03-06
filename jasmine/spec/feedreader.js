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
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */

    it('have a URL defined and the URL is not empty', function() {
      for(feed of allFeeds) {
        expect(feed.url).toBeDefined(); // URL is defined
        expect(feed.url.length).not.toBe(0); // The objects' url property is not empty
      }
    });

    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */

    it('have a name defined and the name is not empty', function() {
      for(feed of allFeeds) {
        expect(feed.name).toBeDefined(); // A name is defined
        expect(feed.name.length).not.toBe(0); // The objects' name property is not empty
      }
    });

  });


  /* TODO: Write a new test suite named "The menu" */

  describe('The menu', function () {

    const body = document.querySelector('body');

    /* TODO: Write a test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */

    it('is hidden by default', function() {
      expect(body.classList.contains('menu-hidden')).toBe(true); // If the body element contains the class "menu-hidden", the "slide-menu" class will have a negative translate value, which makes it appear off screen
    });

    /* TODO: Write a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */

    it('changes visibility when the menu icon is clicked', function() {
      const menuIcon = document.querySelector('.menu-icon-link');
      menuIcon.click(); // simulate mouse click on the menu icon
      expect(body.classList.contains('menu-hidden')).toBe(false); // Check whether the "menu-hidden" class was removed from the body element
      menuIcon.click(); // simulate second click
      expect(body.classList.contains('menu-hidden')).toBe(true); // Check whether the "menu-hidden" class was added again
    });

  });

  /* TODO: Write a new test suite named "Initial Entries" */

  describe('Initial Entries', function() {

    /* TODO: Write a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */

    beforeEach(function(done) {
      loadFeed(0, function() {
        done(); // The spec below will not start until the "done" function is called
      });
    });

    it('contain at least a single .entry element within the .feed container', function() {
      const entries = document.querySelectorAll('.feed .entry'); // Store all .entry elements that are inside the .feed container in a variable
      expect(entries.length).toBeGreaterThan(0); // If entries.length is greater than 0, there's at least a single .entry element within the .feed container
    });
  });


  /* TODO: Write a new test suite named "New Feed Selection" */

  describe('New Feed Selection', function() {

    /* TODO: Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */

    let previousFeed;
    let newFeed;

    beforeEach(function(done) {
      loadFeed(0, function() { // Load a feed
        previousFeed = document.querySelector('.feed').innerHTML; // Store previous HTML of the .feed container in a variable
        loadFeed(1, function() { // Load a new feed
          newFeed = document.querySelector('.feed').innerHTML; // Store new HTML of the .feed container in a variable
          done();
        });
      });
    });

    it('should change the content', function() {
      expect(previousFeed).not.toEqual(newFeed); // Compare HTML: If they don't equal, the content has changed
    });
  });
}());
