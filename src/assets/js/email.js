/*
Author       : Dreamstechnologies
Template Name: Social Web Dev - Bootstrap Admin Template
*/

(function () {
    "use strict";
	
	// View all Show hide One
	if($('.more-menu').length > 0) {
		$(".more-menu").hide();
		$(".viewall-button").on("click", function() {
			$(this).text($(this).text() === "Less" ? "Show More" : "Less");
			$(".more-menu").slideToggle(900);
		});	  	
	}

	if($('.more-menu-2').length > 0) {
		$(".more-menu-2").hide();
		$(".viewall-button-2").on("click", function() {
			$(this).text($(this).text() === "Less" ? "Show More" : "Less");
			$(".more-menu-2").slideToggle(900);
		});	  	
	}
	
	if($('.more-menu-3').length > 0) {
		$(".more-menu-3").hide();
		$(".viewall-button-3").on("click", function() {
			$(this).text($(this).text() === "Less" ? "Show More" : "Less");
			$(".more-menu-3").slideToggle(900);
		});	  	
	}

	// Compose Mail Popup
	$("#compose_mail").on('click', function () {
		$('body').append('<div class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 overlay-email z-[9997]"></div>');
		$('#compose-view').addClass('show');
	});
	
	$("#compose-close").on('click', function () {
		$('.overlay-email').remove();
		$('#compose-view').removeClass('show');
	});

})();