import domReady from "@wordpress/dom-ready";

function slideShow( elem ) {
	
	if ( ! Swiper ) {
		console.warn( "Swiper is not registered" );
		return;
	}
	
	const el = elem?.querySelector('.swiper');
	
	if ( ! el ) {
		console.warn( "Swiper elem not found" );
		return;
	}
	
	let config = el.getAttribute('data-config');
	
	if ( config ) {
		config = JSON.parse( config );
	}
	
	let navigation = false;
	if ( config.navigation ) {
		navigation = {
			nextEl: el.querySelector('.swiper-button-next'),
			prevEl: el.querySelector('.swiper-button-prev'),
		}
	}
	
	
	let pagination = false;
	if ( config.pagination && el.querySelector('.swiper-pagination') ) {
		pagination = {
			el: el.querySelector('.swiper-pagination'),
			clickable: true
		}
	}
	
	let autoplay = false;
	
	if ( config.autoplay ) {
		autoplay = {
			delay: config.autoplayDelay || 3000,
			pauseOnMouseEnter: !! config.pauseOnMouseEnter
		}
	}
	
	let effect = {};
	
	if ( config.effect === 'fade' ) {
		effect = {
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		}
	}
	
	if ( config.effect === 'flip') {
		effect = {
			effect: 'flip',
			flipEffect: {
				slideShadows: false,
			},
		}
	}
	
	const options = {
		slidesPerView: 1,
		autoHeight: true,
		navigation,
		pagination,
		autoplay,
		loop: !! config.loop,
		speed: typeof config.speed === "number" ? config.speed : 400,
		...effect,
	}
	
	// slider
	const swiper = new Swiper(el, options);
	
}

function init() {
	
	// init slider
	document.querySelectorAll(".content-sliders-slider.content-sliders-is-fe").forEach( slideShow );
	
}



domReady( init );
