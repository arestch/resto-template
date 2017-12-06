$(document).ready(function() {

	let clicks = true;

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
  	$(".featured-dishes__switch-item--active").removeClass("featured-dishes__switch-item--active");
  	$(this).addClass("featured-dishes__switch-item--active");
  });
});