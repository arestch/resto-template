$(document).ready(function() {
  let ease = 0.8,
      clicks = true,
      slides = $(".featured-dishes__all-dishes").children().length,
      slideWidth = $(".featured-dishes__wrapper").outerWidth(),
      max = -((slides - 1) * slideWidth),
      min = 0,
      activeSwitchItem = "featured-dishes__switch-item--active";



//parallax effect
  $(window).bind("scroll",function(e){
    parallaxScroll();
    });


//change hamburger button state on click and showing menu

  $(".hamburger").on("click", function() {
    if($(this).hasClass("is-active")) {
      $(".main-header__list").hide(250);
      $(".is-active").removeClass("is-active");
      return false;
    }
    $(this).addClass("is-active");
    $(".main-header__list").show(250);
  });

// show/hide additional items on button click

  $(".info-menu__button").on("click", function() {
    if (clicks) {
      $(".info-menu__dish:nth-child(n+9)").slideDown("slow");
      $(this).html("<span class=\"info-menu__button-text\">hide back &nbsp;|&nbsp;</span><i class=\"fa fa-chevron-up\"></i>");
    } else {
      $(".info-menu__dish:nth-child(n+9)").slideUp("slow");
      $(this).html("<span class=\"info-menu__button-text\">load more &nbsp;|&nbsp;</span><i class=\"fa fa-chevron-down\"></i>");
    }
    clicks = !clicks;
  });

//change slider position and active-item on switcher click

  $(".featured-dishes__switch-item").on("click", function() {
    let listItem = $(this).index();
    $("." + activeSwitchItem).removeClass(activeSwitchItem);
    $(this).addClass(activeSwitchItem);
    $(".featured-dishes__all-dishes").stop()
                                    .animate({
                                      left: "-" + 150*listItem + "%"});
  });

  
//move sliders on resize
  $(window).on("resize", () => {
    let listItem =  $(".featured-dishes__switch-item--active").index();
    slides = $(".featured-dishes__all-dishes").children().length;
    slideWidth = $(".featured-dishes__wrapper").outerWidth();
    max = -((slides - 1) * slideWidth);
    $(".featured-dishes__all-dishes").stop()
                                    .animate({
                                      left: "-" + 150*listItem + "%"});
  });


//making images slide with mouse

  $(".featured-dishes__all-dishes").draggable({
    "scroll":false,
    axis: "x",
    drag: function (event, ui) {
      if (ui.position.left > min) {
        ui.position.left = min;
      }
      if (ui.position.left < max) {
        ui.position.left = max;
      }
    },
   stop: function( event, ui ) {
    $(this).animate({"left": (ui.position.left).roundTo(slideWidth)});
    setTimeout(function() {
      let leftPos =  parseInt($(".featured-dishes__all-dishes").css("left"), 10);
        if (leftPos === 0) {
          changeSwitcher(1);
        }
        if(leftPos < 0) {
          changeSwitcher(2);
        }
        if (leftPos < (slideWidth * -1)){
          changeSwitcher(3);
        }
        if (leftPos < (slideWidth * -2)){
          changeSwitcher(4);
        }
      }, 500);
    }
});

  function changeSwitcher(number = 1) {
    $("." + activeSwitchItem).removeClass(activeSwitchItem);
    $(".featured-dishes__switch-item:nth-child("+ number + ")").addClass(activeSwitchItem);
  }
});

  function parallaxScroll(){
    let scrolled = $(window).scrollTop();
    let height = $(".intro-section").height();
    $(".intro-section").css("top", (-0 - (scrolled * 0.25)) + "px");
}

Number.prototype.roundTo = function(nTo) {
    return Math.round(this * (1 / nTo) ) * nTo;
}