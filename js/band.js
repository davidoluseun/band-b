(function() {
  "use strict";

  $(function() {
  // Use smooth scrolling when clicking on navigation

  var topoffset = 54; //variable for menu height

  $('.navbar-nav a:not(#search-link, .dropdown-toggle, .dropdown-item)').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  // Hide and show navigation form
  var $searchLink = $("#search-link"); // variable for search link
  $searchLink.click(toggleNavForm);

  function toggleNavForm(e) {
    e.preventDefault();

    // Toggle search link aria-expanded attribute value
    if ($searchLink.attr("aria-expanded") == "false") {
      $searchLink.attr("aria-expanded", "true");
    } else {
      $searchLink.attr("aria-expanded", "false");
    }

    // Toggle site search form
    $("#nav-search").toggleClass("d-none");

    // Toggle site search icon
    var $searchIcon = $("#search-icon"); // variable for search icon
    $searchIcon.toggleClass("fa-search");
    $searchIcon.toggleClass("fa-times");
  }

  // Tooltip activation
  $('[data-toggle="tooltip"]').tooltip();

});
})();
