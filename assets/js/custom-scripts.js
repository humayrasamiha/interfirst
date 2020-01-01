(function ($) {
  "use strict";

  $.fn.andSelf = function () {
    return this.addBack.apply(this, arguments);
  }


  /* Loader Code Start */
  $(window).on("load", function () {
    $(".section-loader").fadeOut("slow");

    var $container = $('.portfolioContainer');
    $container.isotope({
      filter: '*',
      animationOptions: {
        queue: true
      }
    });

    $('.portfolio-nav li').click(function () {
      $('.portfolio-nav .active').removeClass('active');
      $(this).addClass('active');

      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          queue: true
        }
      });
      return false;
    });
  });
  /* Loader Code End */

  /*
  |====================
  | Mobile NAv trigger
  |=====================
  */

  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  /* counter */
  $('.counter').counterUp({
    delay: 12,
    time: 1200
  });




  /*
  |=================
  | Onepage Nav
  |================
  */

  $('#zb-header').onePageNav({
    currentClass: 'active',
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
  });


  /***********************************************************/
  /* COUNT DOWN                                              */
  /***********************************************************/

  $('.name').countdown({
    end_time: "2019/05/21 14:27:28 +0600",
    wrapper: function (unit) {
      var wrpr = $('<div></div>').
      addClass(unit.toLowerCase() + '_wrapper').
      addClass('col-sm-3').
      addClass('col-xs-3').
      addClass('col-md-3').
      addClass('custom');
      var background = $('<div></div>').
      addClass('background').
      addClass('time').
      appendTo(wrpr);

      $('<span class="counter style_all"></span>').appendTo(background);
      $('<span class="title">' + unit + '</span>').appendTo(background);
      return wrpr;
    }
  });

  /*
  |=================
  | fancybox
  |================
  */

  $('#play-pause-button').on("click", function () {
    var mediaVideo = $("#bgdvid").get(0);
    var mediap = $("#bgdvid");
    var playbtn = $("#play-pause-button");
    if (mediaVideo.paused) {
      mediaVideo.play();
      mediap.parent().addClass("gobottom");
    } else {
      mediaVideo.pause();
      mediap.parent().removeClass("gobottom");
    }

  });




  $(".uv-accordinaton-list").on("click", function () {
    $(this).closest("ul").find(".uv-accordition-detail").each(function () {
      if ($(this).css("display") == 'block') {
        $(this).slideUp(200);
        $(this).closest("li").find("h2").removeClass("hilighted");
        $(this).closest("li").find("h2").removeClass("color");
        $(this).closest("li").find(".uv-right-arrow").text("+");
        $(this).closest("li").removeClass("shadow-1");
        return false;
      }
    });
    $(this).next().slideToggle(200);
    $(this).find(">:first-child");
    if ($(this).find(">:first-child").text() == "+") {
      $(this).find(">:first-child").text("-");
      $(this).find("h2").addClass("hilighted");
      $(this).find("h2").addClass("color");
      $(this).parent().addClass("shadow-1");
    } else {
      $(this).find(">:first-child").text("+");
      $(this).find("h2").removeClass("hilighted");
      $(this).parent().removeClass("shadow-1");
    }
  });


  /*
  |=====================
  | package tab
  |=====================
  */

  $('#zbTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  });


  /*
  |===============
  | WOW ANIMATION
  |==================
  */
  var wow = new WOW({
    mobile: false // trigger animations on mobile devices (default is true)
  });
  wow.init();


  /*
  | ==========================
  | NAV FIXED ON SCROLL
  | ==========================
  */
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $(".nav-scroll").addClass("nav-strict");
    } else {
      $(".nav-scroll").removeClass("nav-strict");
    }
  });


  /*
  |=================
  | Client review
  |================
  */
  $('#mh-client-review').owlCarousel({
    loop: false,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    smartSpeed: 450,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    margin: 10,
    stopOnHover: true,
    animateIn: 'slideInRight',
    animateOut: 'slideOutLeft',
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1170: {
        items: 3,
      }
    }
  });



  // // Smooth Scroll
  //     $(function() {
  //       $('a[href*=#]:not([href=#])').click(function() {
  //         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  //           var target = $(this.hash);
  //           target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  //           if (target.length) {
  //             $('html,body').animate({
  //               scrollTop: target.offset().top
  //             }, 600);
  //             return false;
  //           }
  //         }
  //       });
  //     });



  /*
  |=================
  | CONTACT FORM
  |=================
  */

  $("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      formError();
      submitMSG(false, "Did you fill in the form properly?");
    } else {
      // everything looks good!
      event.preventDefault();
      submitForm();
    }
  });

  function submitForm() {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    $.ajax({
      type: "POST",
      url: "process.php",
      data: "name=" + name + "&email=" + email + "&message=" + message,
      success: function (text) {
        if (text == "success") {
          formSuccess();
        } else {
          formError();
          submitMSG(false, text);
        }
      }
    });
  }

  function formSuccess() {
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Sent!")
  }

  function formError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass();
    });
  }

  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center fadeInUp animated text-success";
    } else {
      var msgClasses = "h3 text-center shake animated text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }

  document.getElementById("custom-range").oninput = function () {

    this.style.background = 'linear-gradient(to right, #31F6C1 0%, #31F6C1 ' + (this.value / 10) +
      '%, #fff ' +
      (this.value / 10) + '%, white 100%)'

  };

  function rangeSlider(value) {
    document.getElementById('rangeValue').innerHTML = value;
  }
}(jQuery));