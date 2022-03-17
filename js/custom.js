// TEMP (cookies)
// if($.cookie("css")) {
// 	$("#theme-link").attr("href", $.cookie("css"));
// }

$(document).ready(function() {

  // TEMP - theme toggler
  $(".theme-toggler").click(function() {
    console.log(this);
		$("#theme-link").attr("href", $(this).attr('rel'));
		$.cookie("css", $(this).attr('rel'), {expires: 365, path: '/'});
		return false;
	});


/* Cookies consent
  ====================================================================== */

  var $cookies = $("#cookies");

  if($.cookie("privacy")) {
    $cookies.hide();
  } else {
    $cookies.fadeIn();
  }

  $("#close-cookies").click(function() {
    $(this).parent("#cookies").fadeOut();
    // TEMP
    var cookiesConsent = true;
    $.cookie("privacy", cookiesConsent, {expires: 7, path: '/'});
    return false;
  });

  /* -------------- */

  $("#switchWindowButton").click(function() {
    $(this).hide();
    $("#mainWindow").hide();
    $("#settingsWindow").show();
    $("#allowChoiceButton").show();

    /* Ten jeden button je novy, jen kvuli jinemu textu - kdyztak si to predelej jak chces */
    $("#allowCookiesButton").hide();
    $("#allowAllButton").show();
    $("#closeWindowButton").show();
  });

  /* Nastaveni jednotlivych cookies */
  $(".button-more", "#settingsWindow").click(function() {
    $(this).parents(".cookies-info").find(".cookies-details").slideToggle("fast");
    $(this).find(".button-more-icon").toggleClass("active");
  });

  /* Button dole vlevo pro upravu nastaveni cookies */
  $(".cookies-settings-btn__open", "#cookiesButton").click(function() {
    $("#cookiesButton").css("transform", "translateX(calc(-100% - 1rem))");
    $("#cookiesModal").show();
  });

  $(".cookies-settings-btn__dismiss", "#cookiesButton").click(function() {
    $("#cookiesButton").css("transform", "translateX(calc(-100% - 1rem))");
  });


/* Toggle navigation menu (on mobile)
  ====================================================================== */

  $("#nav-toggle").click(function() {
    $(this).toggleClass("expanded");
    $("#nav-menu").toggleClass("expanded");
    $("#contactus").toggleClass("overlay");
  });


/* Toggle search box (on mobile)
  ====================================================================== */

  function toggleSearchBar() {
    var $searchBar = $("#search-bar");
    $searchBar.toggleClass("expanded");
  }

  $("#search-toggle").click(toggleSearchBar);
  $("#search-close").click(toggleSearchBar);


/* Minicart
  ====================================================================== */

  var $minicart = $("#minicart");
  var $minicartToggle = $("#minicart-toggle");

  // Toggling minicart
  $minicartToggle.click(function() {
    $minicart.toggleClass("expanded");
  });

  // Minicart - remove item
  $(".minicart__item-cancel", $minicart).click(function() {
    var $item = $(this).parents(".minicart__item");
    $($item).slideUp("fast");
    // Removing last item
    var siblings = $($item).siblings(".minicart__item:visible").length;
    if (siblings == 0) {
      $(".minicart__checkout", $minicart).slideUp("fast");
      $(".minicart__empty", $minicart).slideDown("fast");
    }
  });

  // Close minicart
  $(".minicart__button-close", $minicart).click(function() {
    $minicart.removeClass("expanded");
  });

  // Close minicart on click outside
  $(document).click(function(e) {
    if ($(e.target).closest(".navbar__cart").length === 0) {
      $minicart.removeClass("expanded");
    }
  });

  // Close minicart on Esc
  $minicart.keyup(function(e) {
    if (e.keyCode == 27) { // ESC
      $(this).removeClass("expanded");
      $minicartToggle.focus();
    }
  });
  $minicartToggle.keyup(function(e) {
    if (e.keyCode == 27) { // ESC
      $minicart.removeClass("expanded");
      $minicartToggle.focus();
    }
  });


/* Account menu
  ====================================================================== */

  var $account = $("#account");
  var $accountToggle = $("#account-toggle");

  // Show account menu
  $accountToggle.click(function() {
    $account.toggleClass("expanded");
  });

  // Close account menu on click outside
  $(document).click(function(e) {
    if ($(e.target).closest(".navbar__account").length === 0) {
      $account.removeClass("expanded");
    }
  });

  // Close account menu on Esc
  $account.keyup(function(e) {
    if (e.keyCode == 27) { // ESC
      $(this).removeClass("expanded");
      $accountToggle.focus();
    }
  });
  $accountToggle.keyup(function(e) {
    if (e.keyCode == 27) { // ESC
      $account.removeClass("expanded");
      $accountToggle.focus();
    }
  });


/* Account settings
  ====================================================================== */

  $(".account-form__title-link").click(function(e) {
    (e).preventDefault();
    $(this).closest(".account-form__fieldset").find(".account-form__items-wrapper").slideToggle();
    $(this).toggleClass("active");
  });


/* Cart
  ====================================================================== */

  var $cart = $("#cart");

  // Animate removing items
  $(".cart-table__item-cancel", $cart).click(function() {
    var $item = $(this).parents("tr");

    $item.children("td")
      .animate({ "padding-top": 0, "padding-bottom": 0 })
      .wrapInner("<div />")
      .children().slideUp(function() { $(this).parents("tr").remove(); });

    // Removing last item
    var siblings = $($item).siblings(".cart-table__tr--product:visible").length;
    if (siblings == 0) {

      // Hide all other stuff
      $cart.find("tr:not(.cart-table__tr-empty)").children("*")
        .animate({ "padding": 0 })
        .wrapInner("<div />")
        .children().slideUp(function() { $(this).parents("tr").remove(); });

      // Show empty cart message
      $cart.find(".cart-table__tr-empty").show().find(".cart-table__empty").slideDown();
    }
  });

  // Promo code
  $(".cart-table__promo-button", $cart).click(function() {
    $(this).hide();
    $(this).siblings(".promo-code").show();
  });





// UPDATE

  // Eshop menu (Categories) // TO DO
  // $(".eshop-menu__link--button").click(function() {
  //   var submenu = $(this).attr("data-bs-target");
  //   $(submenu).toggleClass("expanded");
  // });
  // $(".eshop-menu__link").click(function() {
  //   var submenu = $(this).attr("data-bs-target");
  //   $(submenu).toggleClass("expanded");
  // });


  $(".eshop-menu__header").click(function() {
    $(this).toggleClass("active");
    $(this).siblings(".eshop-menu__list").toggleClass("expanded");
  });


// END OF UPDATE





  // Quantity counter (eshop item)
  $(".qty-form__button--decrease").click(function() {
    var $qty = $(this).closest(".qty-form").find(".qty-form__input");
    var value = parseInt($qty.val());
    if (!isNaN(value) && value > 1) {
      $qty.val(value - 1);
    }
  });
  $(".qty-form__button--increase").click(function() {
    var $qty = $(this).closest(".qty-form").find(".qty-form__input");
    var value = parseInt($qty.val());
    if (!isNaN(value)) {
      $qty.val(value + 1);
    }
  });

  // Cart address form reveal
  $("#cart-btn-address").click(function() {
    $(".cart-form--mojeid").slideDown("fast");
    $(".cart-form--invoice").slideDown("fast");
    $(this).hide();
  });


/* Fullscreen motive (height calculation), Parallax effect animation
  ====================================================================== */

  function motiveHeight() {
    var headerHeight = $("#header").height();
    $("#motive.fullscreen").css("height", "calc(100vh - " + headerHeight + "px)");
    $("#motive").css("margin-top", headerHeight + "px");
  }

  function fadeInMotive() {
    $(".motive__background", "#motive").css("opacity", "1"); // fade in motivu po fixnuti pozice (margin-top)
    $(".motive__motto", "#motive").css("opacity", "1"); // fade in motta po fixnuti pozice (margin-top)
  }

  motiveHeight();
  fadeInMotive();
  $(window).resize(motiveHeight);

  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    $(".motive__background", "#motive.parallax").css('transform', 'translate3d(0px, ' + (scrollTop / 1.5) + 'px, 0px)');
    $(".motive__motto", "#motive.parallax").css('transform', 'translate3d(0px, ' + (scrollTop / 2) + 'px, 0px)');
  });


/* Comment section
  ====================================================================== */

  var $addComment = $("#add-comment");
  var $commentCitation = $("#comment-citation");

  // Expandable reply box
  $(".add-comment__input--text").focus(function() {
    $addComment.addClass("expanded");
  });

  $(".add-comment__button--close").click(function() {
    $addComment.removeClass("expanded");
    $commentCitation.slideUp();
  }); 
  
  // Reply to comment
  $(".comment__reply", "#comments").click(function() {
    var $addresseeName = $(this).parents(".comment").find(".comment__name");
    var $addresseeText = $(this).parents(".comment").find(".comment__body");
    var $commentInput = $addComment.find(".add-comment__input--text");

    // Clear previous citation
    $commentCitation.empty();
    // Append current citation
    $commentCitation.append($addresseeName.clone()).append($addresseeText.clone()).slideDown();
    // Change focus to input field
    $commentInput.focus();
  });

  // Hide/Show sub-comments
  $(".comment__hide", "#comments").click(function() {
    var labelHide = $(this).attr("data-hide");
    var labelShow = $(this).attr("data-show");
    var subComments = $(this).parents(".comment-wrapper").find(".comment-sublist");

    subComments.slideToggle();

    if ($.trim($(this).text()) === labelShow) {
        $(this).text(labelHide);
    } else {
        $(this).text(labelShow);        
    }
  });


/* Photoswipe
  ====================================================================== */

// 'use strict';

/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default, console */

(function($) {

  // Init empty gallery array
  var container = [];

  // Loop over gallery items and push it to the array
  $('.gallery').find('.gallery__item').each(function() {
    var $link = $(this).find('.gallery__item-link'),
      item = {
        src: $link.attr('href'),
        w: $link.data('width'),
        h: $link.data('height'),
        title: $link.data('caption')
      };
    container.push(item);
  });

  // Define click event on gallery item
  $('.gallery__item-link').click(function(event) {

    // Prevent location change
    event.preventDefault();

    // Define object and gallery options
    var $pswp = $('.pswp')[0],
      options = {
        index: $(this).parent('.gallery__item').index(),
        bgOpacity: 0.85,
        showHideOpacity: true
      };

    // Initialize PhotoSwipe
    var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();
  });

}(jQuery));


/* Backward compatibility w Bootstrap 3 (Tiny block)
  ====================================================================== */

  // Tabs
  // var $sectionTabsContent = $(".section-tabs .tab-content");
  // var $sectionTabsNav = $(".section-tabs .nav");
  // $sectionTabsNav.find("a").click(function(e) {
  //   e.preventDefault();
  //   $sectionTabsNav.find(".item").removeClass("active");
  //   $(this).parent(".item").addClass("active");
  //   var targetTab = $(this).attr("href");
  //   $sectionTabsContent.find(".tab-pane").removeClass("active");
  //   $sectionTabsContent.find(targetTab).addClass("active");
  // });

  // Carousel
  // var $carousel = $(".carousel");
  // var $carouselIndicators = $(".carousel-indicators");

  // $carousel.find(".carousel-control").click(function(e) {
  //   e.preventDefault();
    
  //   var $carouselItemActive = $carousel.find(".carousel-inner .item.active");

  //   $carouselItemActiveIndex = $carouselItemActive.index();
  //   $carouselIndicators.find(".active").removeClass("active");
  //   $carouselIndicators.find("li:eq(" + $carouselItemActiveIndex + ")").addClass("active");
  //   console.log($carouselItemActiveIndex);

  //   if($(this).hasClass("right")) {
  //     if ($carouselItemActive.next("div").length > 0) {
  //       $carouselItemActive.removeClass("active").next().addClass("active");
  //     } else {
  //       $carouselItemActive.removeClass("active");
  //       $carousel.find(".carousel-inner .item:first-child").addClass("active");
  //     }
  //   } else if ($(this).hasClass("left")) {
  //     if ($carouselItemActive.prev("div").length > 0) {
  //       $carouselItemActive.removeClass("active").prev().addClass("active");
  //     } else {
  //       $carouselItemActive.removeClass("active");
  //       $carousel.find(".carousel-inner .item:last-child").addClass("active");
  //     }
  //   }
  // });

}); // End of $(document).ready