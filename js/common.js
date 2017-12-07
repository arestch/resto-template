$(document).ready(function() {

	let clicks = true;
	let slides = $('.featured-dishes__all-dishes').children().length;
  let slideWidth = $('.featured-dishes__wrapper').outerWidth();
  let roundedSlideWidth = slideWidth.toFixed(2);
  let min = 0;
  let max = -((slides-1) * slideWidth);
  Number.prototype.roundTo = function(nTo) {
    nTo = nTo || 2;
    return Math.round(this * (1 / nTo) ) * nTo;
}


	$(".hamburger").on("click", function() {
		if($(this).hasClass("is-active")) {
			$(".main-header__list").hide(250);
			$(".is-active").removeClass("is-active");
			return false;
			}
		$(this).addClass("is-active");
		$(".main-header__list").show(250);
	});

	$(".info-menu__button").on("click", function() {
		if (clicks) {
		$(".info-menu__dish:nth-child(n+9)").slideDown("slow");
   	$(this).html('<span class="info-menu__button-text">hide back &nbsp;|&nbsp;</span><i class="fa fa-chevron-up"></i>');
		} else {
			$(".info-menu__dish:nth-child(n+9)").slideUp("slow");
			$(this).html('<span class="info-menu__button-text">load more &nbsp;|&nbsp;</span><i class="fa fa-chevron-down"></i>');
		}
	  clicks = !clicks;
  });

  $(".featured-dishes__switch-item").on("click", function() {
  	let listItem = $(this).index();
  	$(".featured-dishes__switch-item--active").removeClass("featured-dishes__switch-item--active");
  	$(this).addClass("featured-dishes__switch-item--active");
  	console.log(listItem);
  	$(".featured-dishes__all-dishes").stop()
  																	 .animate({
  																	 	left: '-' + 150*listItem + '%'});
  });

  $('.featured-dishes__all-dishes').draggable({
  	"scroll":false,
  	axis: 'x',
  	drag: function (event, ui) {
        if (ui.position.left > min) ui.position.left = min;
        if (ui.position.left < max) ui.position.left = max;
        },
        stop: function( event, ui ) {
            $(this).animate({'left': (ui.position.left).roundTo(slideWidth)});
            setTimeout(function() {
            	let leftPos =  parseInt($('.featured-dishes__all-dishes').css("left"));
            	if (leftPos == 0) {
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

 function changeSwitcher(number) {
   	  $(".featured-dishes__switch-item--active").removeClass("featured-dishes__switch-item--active");
      $(".featured-dishes__switch-item:nth-child("+ number + ")").addClass("featured-dishes__switch-item--active");
   }
});