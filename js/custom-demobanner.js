  /* !!! Zastarale, #page-wrapper uz se nepouziva !!! */
  
  
  $(document).ready(function() {
    demoBannerToggle();
  });

  $(window).on('resize', function() {
    demoBannerToggle();
  });

  // vypocet realne vysky stranky, jelikoz
  // #page-wrapper je kvuli parallaxu nastaven na 100vh
  // -> soucet vysek vnitrnich elementu #page-wrapper
  function calcPageHeight() {
    var totalHeight = 0;
    $("#page-wrapper > *").each(function() {
      totalHeight += $(this).outerHeight();
    });
    return totalHeight;
  }

  // schovavani demo banneru ("Toto je vzorovy web")
  // na konci stranky, aby neprekryval paticku
  function demoBannerToggle() {
    var $pageWrapper = $("#page-wrapper");
    var wrapperHeight = $($pageWrapper).outerHeight();
    var $demoBanner = $("#demoBanner");
    var bannerHeight = $($demoBanner).outerHeight();
    var pageHeight = calcPageHeight();

    $($pageWrapper).scroll(function() {
      var pageOffset = $($pageWrapper).scrollTop();
      
      if ( (pageOffset + wrapperHeight + bannerHeight) > (pageHeight) ) {
        $($demoBanner).removeClass("active");
      } else {
        $($demoBanner).addClass("active");
      }
    });
  }

