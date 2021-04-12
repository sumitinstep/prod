(function ($) {
	var cmpHeader = function () {
		$(document).ready(function () {
			$(".cmp-header").each(function () {

				$('.promotion-close').click(function () {
					$(this).parent().fadeOut();
				});

				$(".main-nav-items li, .mega-menu").hover(
					function () {
						$id = $(this).attr('data-menu');
						$('#' + $id).addClass('active');

					},
					function () {
						$id = $(this).attr('data-menu');
						$('#' + $id).removeClass('active');

					}
				);
				$('.search-icon').on('click' , function(e){
					$('.quickLinks').removeClass('active');
					$(".global-search-input").removeAttr('value');
					$('#all').addClass('active');
					$('.quicklinksSection').show();
					$('.search-result').html("");
				});

				$('#global-search').keyup(delay(function (e) {
					if (e.keyCode === 13) {
						e.preventDefault();
						e.stopPropagation();
					}
					var keyword = $('#global-search').val();
					globalSearchFunction(keyword, "all");
				}, 500));

				$('#mobile-global-search').keyup(delay(function (e) {
					if (e.keyCode === 13) {
						e.preventDefault();
						e.stopPropagation();
					}
					var keyword = $('#mobile-global-search').val();
					globalSearchFunction(keyword, "all");
				}, 500));

				$(".quickLinks").on('click', function (e) {
					$('.quickLinks').removeClass('active');
					$('#'+this.id).addClass('active');
					var stringSearched = null;
					if ($('#mobile-global-search').val()) {
						stringSearched = $('#mobile-global-search').val();
					} else if ($('#global-search').val()) {
						stringSearched = $('#global-search').val();
					} else {
						stringSearched = null;
					}
					globalSearchFunction(stringSearched, this.id);
				});


				globalSearchFunction = function (keyword, quickLinkSelected) {
					var queryString = keyword ? "&s=" + keyword : '';
					var selectedQuick = quickLinkSelected ? '&o=' + quickLinkSelected : null;
					queryString += selectedQuick ? selectedQuick : null;
					console.log(queryString);
					ajaxUrl = '/?rest_route=/global-search/v1/getitems' + queryString;
					$('#header-mega-menu-search .search-result-loading').show();
					$('#search-result').html('');
					$.ajax(ajaxUrl, {
						success: function (data) {
							if (data.toString() === "No results") { 
								$('#header-mega-menu-search .search-result-loading').hide();
								$('.search-result').html('<div class="noresult">'+data+'</div>');
								$('.quicklinksSection').show();
							} else {
								$('#header-mega-menu-search .search-result-loading').hide();
								$('.search-result').html(data);
								$('.quicklinksSection').hide();
							}
						},
						error: function () {
							//$('#notification-bar').text('An error occurred');
						}
					});
				}



				$('#mobile-menu-search-button, .mobile-menu-search').click(function (e) {

					e.preventDefault();

					var hasClass = $('.meraki-mobile-nav').hasClass('active');
					if (hasClass) {
						//jQuery('#mobile-search-popup').removeClass('search-showup');
						jQuery('#mobile-search-popup').attr('style', '');
						jQuery('.cmp-header.sticky-top').removeClass('menu-open');
						jQuery('.meraki-mobile-nav').removeClass('active search-active');


					}
					else {
						//jQuery('#mobile-search-popup').addClass('search-showup');	
						jQuery('.cmp-header.sticky-top').addClass('menu-open');
						jQuery('.meraki-mobile-nav').addClass('active search-active');
					}

				});




				$('.form-inline .close-search, .mobile-search-popup__close').click(function (e) {

					e.preventDefault();
					//jQuery('#mobile-search-popup').removeClass('search-showup');
					jQuery('#header-mega-menu-search').removeClass('active');
					jQuery('#cmp-header-overlay').hide();
					jQuery('.meraki-mobile-nav').removeClass('active search-active');
					jQuery('.cmp-header.sticky-top').removeClass('menu-open');


				});


				$(window).scroll(function () {
					var header = $(".cmp-header");
					var scroll = $(window).scrollTop();
					var scrollTest = 60;
					if (header.hasClass("compact")) {
						scrollTest = 0;
					}
					if (scroll <= scrollTest) {
						header.removeClass("compact");
					} else {
						header.addClass("compact");
					}
				});

				$('.search-icon').click(function (event) {
					event.preventDefault();
				});

				/*
				$('.meraki-mobile-nav .section__header').click(function () {
					$(this).next('.mega-menu').append("<a href='#' id='icon-child' class='hash-link close-icon'></a>");

					$('#icon-child').click(function () {
						event.preventDefault();
						$('.meraki-mobile-nav').removeClass('active');
						$(this).closest('.section').removeClass('active');
						$(this).remove();
						$('#cmp-header-ovelary').hide();
					});
				});

				$('.hash-link').click(function (event) {
					event.preventDefault();
				});

				$('.mega-menu__header').click(function () {
					$(this).parent().children('#icon-child').remove();
				});
				*/

				// function setCompactHeader() {
				// 	var header = $(".cmp-header");
				// 	if($(window).scrollTop() == scroll) return;

				// 	scroll = $(window).scrollTop();
				// 	if(scroll == 0) {
				//     	header.removeClass("compact");
				//     } else {
				//     	header.addClass("compact");
				// 	}
				// };

				// setInterval(setCompactHeader, 100)

				$(".toggle-mobile-nav").click(function (e) {
					var nav = $(".meraki-mobile-nav")
					var isActive = nav.hasClass("active")

					if (isActive) {
						nav.removeClass("active")
						$(".cmp-header").removeClass("menu-open");
						if ($(".cmp-header").hasClass("transparent-header")) {
							$(".cmp-header .btn-demo").addClass("btn-secondary-white").removeClass("btn-primary-green");
						}
					} else {
						nav.addClass("active")
						$(".cmp-header").addClass("menu-open");
						if ($(".cmp-header").hasClass("transparent-header")) {
							$(".cmp-header .btn-demo").removeClass("btn-secondary-white").addClass("btn-primary-green");
						}
					}
				});

				$(".mega-menu__header").click(function (e) {
					$(".section").removeClass("active")
					$(".section").removeClass("hidden")
					$(".cmp-header").removeClass("menu-open");
					if ($(".cmp-header").hasClass("transparent-header")) {
						$(".cmp-header .btn-demo").addClass("btn-secondary-white").removeClass("btn-primary-green");
					}
				});


				$(".close-mega-menu,#cmp-header-overlay").click(function (e) {
					e.preventDefault();
					$(".section").removeClass("active")
					$(".section").removeClass("hidden")
					$("#cmp-header-overlay").css("display", "none")

					$(".section__header").removeClass("active");
					$(".mega-menu").removeClass("active");
					$(".cmp-header").removeClass("menu-open");
					if ($(".cmp-header").hasClass("transparent-header")) {
						$(".cmp-header .btn-demo").addClass("btn-secondary-white").removeClass("btn-primary-green");
					}
				});

				$(document).keyup(function (e) {
					if (e.keyCode != 27) return true;
					$(".section").removeClass("active")
					$(".section").removeClass("hidden")
					$("#cmp-header-overlay").css("display", "none")

					$(".section__header").removeClass("active");
					$(".mega-menu").removeClass("active");
					$(".cmp-header").removeClass("menu-open");
					if ($(".cmp-header").hasClass("transparent-header")) {
						$(".cmp-header .btn-demo").addClass("btn-secondary-white").removeClass("btn-primary-green");
					}
				});


				$(".section__header").click(function (e) {
					var section = $(this).parent()
					var isActive = section.hasClass("active")

					var menu = $(this).attr("data-section-header");

					$(".section").removeClass("active")
					$(".section").removeClass("hidden")

					$(".mega-menu").removeClass("active");

					if (!isActive) {
						//$(".section").addClass("hidden")
						section.removeClass("hidden")
						section.addClass("active")
						$("#cmp-header-overlay").css("display", "block");

						$("#header-mega-menu-" + menu).addClass("active");
						$(".cmp-header").addClass("menu-open");
						if ($(".cmp-header").hasClass("transparent-header")) {
							$(".cmp-header .btn-demo").removeClass("btn-secondary-white").addClass("btn-primary-green");
						}
					} else {
						$("#cmp-header-overlay").css("display", "none");
						$(".cmp-header").removeClass("menu-open");
						if ($(".cmp-header").hasClass("transparent-header")) {
							$(".cmp-header .btn-demo").addClass("btn-secondary-white").removeClass("btn-primary-green");
						}
					}

				});

				$(window).scroll(function (event) {

					var header = $(".cmp-header");
					var btnDemo = $(".btn.demo");

					if (header.hasClass("scroll-header")) {

						var scroll = $(window).scrollTop();

						var height = header.innerHeight();

						if (scroll < 200) {
							header.addClass("transparent-header");
							if (!header.hasClass("menu-open")) {
								btnDemo.removeClass("btn-primary-green");
								btnDemo.addClass("btn-secondary-white");
							}
						} else {
							header.removeClass("transparent-header")
							header.removeClass("position-fixed");
							if (!header.hasClass("menu-open")) {
								btnDemo.addClass("btn-primary-green");
								btnDemo.removeClass("btn-secondary-white");
							}
						}

					}

				});
			});
		});
	}();
})(jQuery);