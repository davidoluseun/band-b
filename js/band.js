(function() {
  "use strict";

  // jQuery document ready fn
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
      // Prevent default link behaviour
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

     // Form validation
    $(".contact-form input, .contact-form textarea").jqBootstrapValidation({
      // Valid inputs success callback fn
      submitSuccess: function ($form, event) {
        // Prevent default submit behaviour
        event.preventDefault();
  
        // Get values from form
        var $name = $(".contact-form #v-name").val();
        var $email = $(".contact-form #v-email").val();
        var $comment = $(".contact-form #v-comment").val();
  
        // For success/failure feedback
        var $firstName = $name;
  
        // Check for white space in name for success/fail feedback
        if ($firstName.indexOf(" ") >= 0) {
          $firstName = $name.split(" ").slice(0, -1).join(" ");
        }
  
        // Disable submit button until AJAX call is completed to prevent duplicate messages
        var $submitBtn = $(".btn-dark");
        $submitBtn.prop("disabled", true).val("Sending...");
  
        $.ajax({
          url: "./php/contact.php",
          type: "POST",
          data: {
            name: $name,
            email: $email,
            comment: $comment

          },
          cache: false,
          success: successFn,
          error: errorFn,
          complete: completeFn
        });
  
        function successFn() {
          // Success feedback
          $("#feedback").html("<div class='alert alert-success'></div>");
          $("#feedback > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
          $("#feedback > .alert-success").append($("<strong>").text("Hi " + $firstName + ", Your message has been sent."))
            .append('</strong>');
        }
  
        function errorFn() {
          // Fail feedback
          $("#feedback").html("<div class='alert alert-danger'></div>");
          $("#feedback > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
          $("#feedback > .alert-danger").append($("<strong>").text("Sorry " + $firstName + ", it seems that my mail server is not responding. Please try again later!"))
            .append('</strong>'); 
        }
  
        function completeFn() {
          // Clear all fields
          $(".contact-form").trigger("reset");

          // Re-enable submit button when AJAX call is completed
          setTimeout(function() {
              $submitBtn.prop("disabled", false).val("Submit Comment");
          }, 1500);

          // Remove feedback, if focus, click events occur on the page after AJAX call is completed
          $("html * ").focus(function() {
              $("#feedback").html("");
          });

          $("html *").click(function() {
              $("#feedback").html("");
          });
        }
  
      }

    });

    // Tooltip activation
    $('[data-toggle="tooltip"]').tooltip();

  });
})();
