;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	function scrollBtn() {
		var $btn = $('a.scroll-top');
		var topScroll = $win.scrollTop();

		if ( topScroll > 400 ) {
			$btn.addClass('visible');
		} else {
			$btn.removeClass('visible');
		}
	}

	function map() {
		var mapStyles = [
		    {
		        "featureType": "all",
		        "stylers": [
		            {
		                "saturation": 0
		            },
		            {
		                "hue": "#d44a01"
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "stylers": [
		            {
		                "saturation": -70
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            },
		            {
		                "saturation": -60
		            }
		        ]
		    }
		];

		var mapOptions = {
			center: { lat: 40.6971494, lng: -74.2598655},
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
    		styles: mapStyles
		};

		var image = {
			url: 'css/marker.png',
			size: new google.maps.Size(88, 128),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(44, 64)
		};

		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var marker = new google.maps.Marker({
			position: { lat: 40.6971494, lng: -74.2598655},
			map: map,
			icon: image
		});

		google.maps.event.addDomListener(window, 'resize', function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});
	}

	$doc.ready(function() {	

		//Map accordion
		$('.map-holder a.btn').on('click', function(e) {
			e.preventDefault();

			var scrollBottom = $win.scrollTop() + $doc.height();

			$('.map-holder').toggleClass('active');

			$('html, body').animate({
				scrollTop: scrollBottom
			}, 400);
		});

		//Hero slider
		$('.hero-section .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 8000,
			animationSpeed: 1000,
			useCSS: false,
			controlNav: true,
			directionNav: true			
		});

		//Testimonial slider
		$('.testimonial-slider').flexslider({
			animation: "slide",
			slideshowSpeed: 8000,
			animationSpeed: 1000,
			useCSS: false,
			controlNav: false,
			directionNav: true,
			prevText: '',
			nextText: ''
		});

		// Fullscreener hero-section
		$('.hero-section .flexslider .slide img.bg-img').fullscreener();		

		//Scroll top button
		$doc.on('click', 'a.scroll-top', function(event) {
			event.preventDefault();

			$('html, body').animate({
				scrollTop: 0
			}, 600);
		});

		//Team tabs
		$('.team-section .person').hide().eq(0).fadeIn();

		$('.team-section .team-nav ul li a').on('click', function(e) {
			e.preventDefault();

			var $this = $(this);
			var tabLink = $this.attr('href');

			$this.closest('li').addClass('current').siblings().removeClass('current');

			$this.closest('.team-section').find(tabLink).stop(true, true).fadeIn().siblings().hide();
		});

		// magnific popup
		// $('.subscribe-sectiong a.btn').magnificPopup({type:'ajax'});

		$('.product a').magnificPopup({
			removalDelay: 300,
			type: 'image',
			callbacks: {
				beforeOpen: function() {
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated ' + this.st.el.attr('data-effect'));
				}
			}
		});

		$('a.menu-btn').on('click', function(e){
			e.preventDefault();
			var $this = $(this);

			if ( $this.hasClass('active') ) {
				$this.removeClass('active');
				$('.nav').removeClass('active');
			} else {
				$this.addClass('active');
				$('.nav').addClass('active');
			}
		});

	});

	$win.on('load', function() {
		scrollBtn();
		
		if ( $win.width() > 1170 ) {
			var s = skrollr.init();	
		} else {
			var s = skrollr.init().destroy();
		}

		if ( $('#map').length ) {
			map();
		}

	}).on('scroll', function() {
		scrollBtn();		
	});
})(jQuery, window, document);
