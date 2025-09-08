(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if ($('.loader-wrap').length) {
			$('.loader-wrap').delay(300).fadeOut(300);
		}
	}

	if ($('.preloader-close').length) {
		$('.preloader-close').on('click', function () {
			$('.loader-wrap').delay(300).fadeOut(300);
		})
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			
			var HeaderHight = $('.main-header').height();
			if (windowpos >= HeaderHight) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
			
		}
	}
	
	headerStyle();
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});

		//$('.main-menu .navigation > li .mega-menu-bar > .column > ul').addClass('first-ul');
		//$('.main-header .main-menu .navigation > li > ul').addClass('last-ul');

		$('.xs-sidebar-group .close-button').on('click', function(e) {
			$('.xs-sidebar-group.info-group').removeClass('isActive');
		});

		$('.about-widget').on('click', function(e) {
			$('.about-sidebar').addClass('active');
		});

		$('.about-sidebar .close-button').on('click', function(e) {
			$('.about-sidebar').removeClass('active');
		});
		
		$('.about-sidebar .gradient-layer').on('click', function(e) {
			$('.about-sidebar').removeClass('active');
		});
		
	}

	
	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		//$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Hide / Show Submenu
		$('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
			e.preventDefault();
			var target = $(this).parent('li').children('ul');
			
			if ($(target).is(':visible')){
				$(this).parent('li').removeClass('open');
				$(target).slideUp(500);
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
				return false;
			}else{
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//3rd Level Nav
		$('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function(e) {
			e.preventDefault();
			var targetInner = $(this).parent('li').children('ul');
			
			if ($(targetInner).is(':visible')){
				$(this).parent('li').removeClass('open');
				$(targetInner).slideUp(500);
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				return false;
			}else{
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');

		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
		});

		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
				$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
        	}
	    });
		
	}


	
	document.addEventListener('DOMContentLoaded', function() {
		const megaMenus = document.querySelectorAll('.mega-menu');
		
		megaMenus.forEach(megaMenu => {
		  const isSubsidiariesMenu = megaMenu.querySelector('.full-width') !== null;
		  
		  if (!isSubsidiariesMenu) {
			const menuItems = megaMenu.querySelectorAll('.menu-item');
			const menuContents = megaMenu.querySelectorAll('.menu-content');
	  
			// Set initial active states
			const defaultMenuItem = megaMenu.querySelector('.menu-item');
			const defaultSection = defaultMenuItem?.getAttribute('data-section');
			
			if (defaultMenuItem && defaultSection) {
			  defaultMenuItem.classList.add('active');
			  const defaultContent = megaMenu.querySelector(`#${defaultSection}`);
			  if (defaultContent) {
				defaultContent.classList.add('active');
			  }
			}
	  
			// Handle both hover and click events
			menuItems.forEach(item => {
			  // Hover handler
			  item.addEventListener('mouseenter', function() {
				const currentMenuItems = this.closest('.mega-menu').querySelectorAll('.menu-item');
				const currentMenuContents = this.closest('.mega-menu').querySelectorAll('.menu-content');
				
				currentMenuItems.forEach(i => i.classList.remove('active'));
				currentMenuContents.forEach(c => c.classList.remove('active'));
	  
				this.classList.add('active');
				const sectionId = this.getAttribute('data-section');
				const targetContent = this.closest('.mega-menu').querySelector(`#${sectionId}`);
				if (targetContent) {
				  targetContent.classList.add('active');
				}
			  });
	  
			  // Reset on mouse leave
			  item.closest('.has-dropdown').addEventListener('mouseleave', function() {
				const items = this.querySelectorAll('.menu-item');
				items.forEach(i => i.classList.remove('active'));
				const firstItem = items[0];
				if (firstItem) {
				  firstItem.classList.add('active');
				}
			  });
			});
		  }
		});
	  
		// Handle mega menu visibility
		const menuTriggers = document.querySelectorAll('.has-dropdown');
		
		menuTriggers.forEach(trigger => {
		  trigger.addEventListener('mouseenter', function() {
			const currentMegaMenu = this.querySelector('.mega-menu');
			
			if (currentMegaMenu) {
			  const isSubsidiariesMenu = currentMegaMenu.querySelector('.full-width') !== null;
			  
			  if (!isSubsidiariesMenu) {
				const items = currentMegaMenu.querySelectorAll('.menu-item');
				const contents = currentMegaMenu.querySelectorAll('.menu-content');
				
				items.forEach(i => i.classList.remove('active'));
				contents.forEach(c => c.classList.remove('active'));
				
				const firstItem = items[0];
				if (firstItem) {
				  firstItem.classList.add('active');
				  const sectionId = firstItem.getAttribute('data-section');
				  const firstContent = currentMegaMenu.querySelector(`#${sectionId}`);
				  if (firstContent) {
					firstContent.classList.add('active');
				  }
				}
			  } else {
				const subsidiariesContent = currentMegaMenu.querySelector('.menu-content');
				if (subsidiariesContent) {
				  subsidiariesContent.classList.add('active');
				}
			  }
			}
		  });
		});
	  });






	 document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu button to header
    const headerContainer = document.querySelector('.header-container');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;
    headerContainer.appendChild(mobileMenuBtn);

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    document.body.appendChild(mobileMenu);

    // Generate mobile menu content
    const navList = document.querySelector('.nav-list');
    const mobileNavList = document.createElement('ul');
    mobileNavList.className = 'mobile-nav-list';

    // Clone navigation items for mobile
    navList.querySelectorAll('.nav-item').forEach(item => {
        const mobileItem = document.createElement('li');
        mobileItem.className = 'mobile-nav-item';
        
        const link = item.querySelector('.nav-link');
        const hasDropdown = item.classList.contains('has-dropdown');
        
        // Check if it's the "What we do" section
        if (link.textContent.trim() === 'What we do') {
            // Create a direct link to the footer section with click handler
            mobileItem.innerHTML = `<a href="#footer" class="mobile-nav-link">What we do</a>`;
            // Add click handler to close mobile menu when clicking "What we do"
            const whatWeDoLink = mobileItem.querySelector('.mobile-nav-link');
            whatWeDoLink.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        // Handle "Who we are" section
        else if (link.textContent.trim() === 'Who we are') {
            const dropdownContent = item.querySelector('.mega-menu');
            mobileItem.innerHTML = `
                <a href="#" class="mobile-nav-link">
                    Who we are
                    <svg class="chevron" width="12" height="8" viewBox="0 0 12 8">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" fill="none" stroke-width="1.5"/>
                    </svg>
                </a>
                <div class="mobile-dropdown">
                    <div class="mobile-menu-grid">
                        <a href="about.html">About Us</a>
                        <a href="vision-mission.html">Vision & Mission</a>
                    </div>
                </div>
            `;

            // Add click event for dropdown toggle
            const mobileLink = mobileItem.querySelector('.mobile-nav-link');
            const mobileDropdown = mobileItem.querySelector('.mobile-dropdown');
            
            mobileLink.addEventListener('click', (e) => {
                e.preventDefault();
                mobileDropdown.classList.toggle('active');
                mobileLink.querySelector('.chevron').style.transform = 
                    mobileDropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            });
        }
        // Handle other dropdown menus
        else if (hasDropdown) {
            const dropdownContent = item.querySelector('.mega-menu');
            const menuGrid = dropdownContent.querySelector('.menu-grid') || 
                           dropdownContent.querySelector('.subsidiaries-grid');
            
            if (menuGrid) {
                mobileItem.innerHTML = `
                    <a href="#" class="mobile-nav-link">
                        ${link.textContent.trim()}
                        <svg class="chevron" width="12" height="8" viewBox="0 0 12 8">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" fill="none" stroke-width="1.5"/>
                        </svg>
                    </a>
                    <div class="mobile-dropdown">
                        <div class="mobile-menu-grid">
                            ${menuGrid.innerHTML}
                        </div>
                    </div>
                `;

                // Add click event for dropdown toggle
                const mobileLink = mobileItem.querySelector('.mobile-nav-link');
                const mobileDropdown = mobileItem.querySelector('.mobile-dropdown');
                
                mobileLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    mobileDropdown.classList.toggle('active');
                    mobileLink.querySelector('.chevron').style.transform = 
                        mobileDropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                });
            }
        } 
        // Handle regular links
        else {
            mobileItem.innerHTML = `<a href="${link.getAttribute('href')}" class="mobile-nav-link">${link.textContent}</a>`;
        }
        
        mobileNavList.appendChild(mobileItem);
    });




    // Add contact button to mobile menu
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        const mobileContactItem = document.createElement('li');
        mobileContactItem.className = 'mobile-nav-item';
        mobileContactItem.innerHTML = `<a href="${contactBtn.getAttribute('href')}" class="mobile-nav-link">${contactBtn.textContent}</a>`;
        mobileNavList.appendChild(mobileContactItem);
    }

    mobileMenu.appendChild(mobileNavList);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fix "Who we are" menu loading
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            document.querySelectorAll('.menu-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(section).classList.add('active');
            document.querySelectorAll('.menu-item').forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});




	const serviceImgItem = document.querySelectorAll(".news-block_two-inner");
	function followImageCursor(event, serviceImgItem) {
		const contentBox = serviceImgItem.getBoundingClientRect();
		const dx = event.clientX - contentBox.x;
		const dy = event.clientY - contentBox.y;
		serviceImgItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
	}
	serviceImgItem.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
		  setInterval(followImageCursor(event, item), 1000);
		});
	});



	//Add One Page nav
	if($('.scroll-nav').length) {
		$('.scroll-nav ul').onePageNav();
	}
	
	
	//Custom Scroll Linsk / Sidebar
	if($('.scroll-nav li a').length){
		$(".scroll-nav li a").on('click', function(e) {
			e.preventDefault();
		   $('body').removeClass('mobile-menu-visible');
		});
	}
	
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}



	//Header Search
	if($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function() {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function() {
			$('body').removeClass('search-active');
		});
	}



	//Custom Seclect Box
	if($('.custom-select-box').length){
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}


	
	// Add Current Class Auto
	function dynamicCurrentMenuClass(selector) {
		let FileName = window.location.href.split("/").reverse()[0];

		selector.find("li").each(function () {
			let anchor = $(this).find("a");
			if ($(anchor).attr("href") == FileName) {
				$(this).addClass("current");
			}
		});
		// if any li has .current elmnt add class
		selector.children("li").each(function () {
			if ($(this).find(".current").length) {
				$(this).addClass("current");
			}
		});
		// if no file name return
		if ("" == FileName) {
			selector.find("li").eq(0).addClass("current");
		}
	}

	if ($('.main-header .main-menu .navigation').length) {
		dynamicCurrentMenuClass($('.main-header .main-menu .navigation'));
	}
	
	
	
	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	



	//Progress Bar
	if($('.progress-line').length){
		$('.progress-line').appear(function(){
			var el = $(this);
			var percent = el.data('width');
			$(el).css('width',percent+'%');
		},{accY: 0});
	}



	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}


	
	
	if($('.paroller').length){
		$('.paroller').paroller({
			  factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'horizontal' // vertical, horizontal  
		});
	}
	
	

	//Price Range Slider
	if($('.price-range-slider').length){
		$( ".price-range-slider" ).slider({
			range: true,
			min: 0,
			max: 10000,
			values: [ 1000, 8000 ],
			slide: function( event, ui ) {
			$( "input.price-amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		});
		
		$( "input.price-amount" ).val( $( ".price-range-slider" ).slider( "values", 0 ) + " - $" + $( ".price-range-slider" ).slider( "values", 1 ) );	
	}



	if ($(".animation_mode").length) {
		$('.animation_mode').marquee({
			speed: 50,
			gap: 20,
			delayBeforeStart: 0,
			direction: 'left',
			duplicated: true,
			pauseOnHover: true,
			startVisible:true,
		});
	}

	if ($(".animation_mode_two").length) {
		$('.animation_mode_two').marquee({
			speed: 50,
			gap: 20,
			delayBeforeStart: 0,
			direction: 'right',
			duplicated: true,
			pauseOnHover: true,
			startVisible:true,
		});
	}
	

	if ($(".animation_mode_three").length) {
		$('.animation_mode_three').marquee({
			speed: 50,
			gap: 0,
			delayBeforeStart: 0,
			direction: 'left',
			duplicated: true,
			pauseOnHover: true,
			startVisible:true,
		});
	}


	//  Animation Fade Left End
	/////////////////////////////////////////////////////
	// CURSOR
	var cursor = $(".cursor"),
	follower = $(".cursor-follower");

	var posX = 0,
		posY = 0;

	var mouseX = 0,
		mouseY = 0;

	TweenMax.to({}, 0.016, {
	repeat: -1,
	onRepeat: function() {
		posX += (mouseX - posX) / 9;
		posY += (mouseY - posY) / 9;

		TweenMax.set(follower, {
			css: {
			left: posX - 12,
			top: posY - 12
			}
		});

		TweenMax.set(cursor, {
			css: {
			left: mouseX,
			top: mouseY
			}
		});
	}
	});

	$(document).on("mousemove", function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});
	//circle
	$(".theme-btn, a").on("mouseenter", function() {
		cursor.addClass("active");
		follower.addClass("active");
	});
	$(".theme-btn, a").on("mouseleave", function() {
		cursor.removeClass("active");
		follower.removeClass("active");
	});   
	// CURSOR End


	
	// Main Slider
	var heroSlider = new Swiper('.main-slider', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 3000,
			disableOnInteraction: false,
			// pauseOnMouseEnter: true
		},
		navigation: {
			nextEl: '.main-slider-next',
			prevEl: '.main-slider-prev',
			clickable: true,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		speed: 700,
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	// Pause/Play Toggle for Hero Slider (support multiple toggles, one per slide)
	(function(){
		var heroContainer = document.querySelector('.main-slider');
		if (!heroContainer || !heroSlider) return;

		var getAllToggles = function(){
			return Array.prototype.slice.call(document.querySelectorAll('.main-slider-toggle'));
		};

		var isPaused = !!(heroSlider.autoplay && heroSlider.autoplay.running === false);

		var updateToggleIcons = function(){
			var toggles = getAllToggles();
			toggles.forEach(function(btn){
				var icon = btn.querySelector('i');
				if (!icon) return;
				if (isPaused) {
					icon.classList.remove('fa-pause');
					icon.classList.add('fa-play');
					btn.setAttribute('aria-label', 'Play slider');
					btn.setAttribute('title', 'Play slider');
				} else {
					icon.classList.remove('fa-play');
					icon.classList.add('fa-pause');
					btn.setAttribute('aria-label', 'Pause slider');
					btn.setAttribute('title', 'Pause slider');
				}
			});
		};

		var togglePlayback = function(){
			if (!heroSlider.autoplay) return;
			if (isPaused) {
				heroSlider.autoplay.start && heroSlider.autoplay.start();
				isPaused = false;
			} else {
				heroSlider.autoplay.stop && heroSlider.autoplay.stop();
				isPaused = true;
			}
			updateToggleIcons();
		};

		// Initial sync
		updateToggleIcons();

		// Event delegation to catch clicks/keypresses from any slide (including clones)
		heroContainer.addEventListener('click', function(e){
			var btn = e.target.closest('.main-slider-toggle');
			if (!btn) return;
			e.preventDefault();
			togglePlayback();
		});

		heroContainer.addEventListener('keydown', function(e){
			var btn = e.target.closest('.main-slider-toggle');
			if (!btn) return;
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				togglePlayback();
			}
		});
	})();

	



	// Single One Slider
	var slider = new Swiper('.single-item_carousel', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.single-item_carousel-next',
			prevEl: '.single-item_carousel-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".single-item_carousel-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});




	// Three Items Slider
	var slider = new Swiper('.three-item_carousel', {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false
		},
		// Navigation arrows
		navigation: {
			nextEl: '.three-item_carousel-next',
			prevEl: '.three-item_carousel-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".three-item_carousel-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'600': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	// Fallback pause/resume on hover for older Swiper builds
	var blogCarouselEl = document.querySelector('.three-item_carousel');
	if (blogCarouselEl && slider && slider.autoplay) {
		blogCarouselEl.addEventListener('mouseenter', function(){
			if (slider.autoplay && slider.autoplay.stop) slider.autoplay.stop();
		});
		blogCarouselEl.addEventListener('mouseleave', function(){
			if (slider.autoplay && slider.autoplay.start) slider.autoplay.start();
		});
	}




	// Team Carousel
	var slider = new Swiper('.team-carousel', {
		slidesPerView: 2,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.team_carousel-next',
			prevEl: '.team_carousel-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".team_carousel-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'1200': {
				slidesPerView: 2,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'600': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});



	// Clients Slider
	var slider = new Swiper('.clients_slider', {
		slidesPerView: 5,
		spaceBetween: 12,
		loop: true,
		loopAdditionalSlides: 10,
		watchOverflow: true,
		autoplay: {
			enabled: true,
			delay: 0,
			pauseOnMouseEnter: true,
			disableOnInteraction: false
		},
		speed: 3000,
		freeMode: true,
		freeModeMomentum: false,
		// Navigation arrows
		navigation: {
			nextEl: '.clients_slider-button-next',
			prevEl: '.clients_slider-button-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".clients_slider-pagination",
			clickable: true,
		},
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});




	// Members Carousel
	var slider = new Swiper('.members-carousel', {
		slidesPerView: 6,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		// Navigation arrows
		navigation: {
			nextEl: '.members_carousel-next',
			prevEl: '.members_carousel-prev',
			clickable: true,
		},
		//Pagination
		pagination: {
			el: ".members_carousel-pagination",
			clickable: true,
		},
		speed: 500,
		breakpoints: {
			'1600': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 5,
			},
			'600': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});



	// Odometer
	if ($(".odometer").length) {
		$('.odometer').appear();
		$('.odometer').appear(function(){
			var odo = $(".odometer");
			odo.each(function() {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.odometerOptions = {
				format: 'd',
			};
		});
	}



	//Jquery Spinner / Quantity Spinner
	if($('.qty-spinner').length){
		$("input.qty-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}



	// Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {

			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');

			if ($(this).next('.acc-content').is(':visible')){
				//return false;
				$(this).removeClass('active');
				$(this).next('.acc-content').slideUp(300);
				$(outerBox).children('.accordion').removeClass('active-block');
			}else{
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				$(this).next('.acc-content').slideDown(300);
				$(this).parent('.accordion').addClass('active-block');
			}
		});
	}


	// Accordion Box Two
	if($('.accordion-box_two').length){
		$(".accordion-box_two").on('click', '.acc-btn', function() {

			var outerBox = $(this).parents('.accordion-box_two');
			var target = $(this).parents('.accordion');

			if ($(this).next('.acc-content').is(':visible')){
				//return false;
				$(this).removeClass('active');
				$(this).next('.acc-content').slideUp(300);
				$(outerBox).children('.accordion').removeClass('active-block');
			}else{
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				$(this).next('.acc-content').slideDown(300);
				$(this).parent('.accordion').addClass('active-block');
			}
		});
	}



	// Accordion Box Three
	if($('.accordion-box_three').length){
		$(".accordion-box_three").on('click', '.acc-btn', function() {

			var outerBox = $(this).parents('.accordion-box_three');
			var target = $(this).parents('.accordion');

			if ($(this).next('.acc-content').is(':visible')){
				//return false;
				$(this).removeClass('active');
				$(this).next('.acc-content').slideUp(300);
				$(outerBox).children('.accordion').removeClass('active-block');
			}else{
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				$(this).next('.acc-content').slideDown(300);
				$(this).parent('.accordion').addClass('active-block');
			}
		});
	}
	


	///////////////////////////////////////////////////// 
    // Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-anim");

    splitTitleLines.forEach(splitTextLine => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: false,
          markers: false,
          toggleActions: 'play none none none'
        }
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" })
      tl.from(itemSplitted.lines, { duration: 1, delay: 0.3, opacity: 0, rotationX: -80, force3D: true, transformOrigin: "top center -50", stagger: 0.1 });
    });
    /////////////////////////////////////////////////////


	// LightBox Image
	if($('.lightbox-image').length) {
		$('.lightbox-image').magnificPopup({
		  type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	}
	


	// LightBox Video
	if($('.lightbox-video').length) {
		$('.lightbox-video').magnificPopup({
	      // disableOn: 700,
	      type: 'iframe',
	      mainClass: 'mfp-fade',
	      removalDelay: 160,
	      preloader: false,
	      iframe:{
	        patterns:{
	          youtube:{
	          index: 'youtube.com',
	          id: 'v=',
	          src: 'https://www.youtube.com/embed/%id%'
	        },
	      },
	      srcAction:'iframe_src',
	    },
	      fixedContentPos: false
	    });
	}



	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}

	document.addEventListener('DOMContentLoaded', function() {
		const menuItems = document.querySelectorAll('.mega-menu-item');
		
		menuItems.forEach(item => {
			item.addEventListener('mouseenter', function() {
				// Remove active class from all items
				menuItems.forEach(i => i.classList.remove('active'));
				// Add active class to current item
				this.classList.add('active');
				
				// Hide all submenu content
				document.querySelectorAll('.submenu-content').forEach(content => {
					content.classList.remove('active');
				});
				
				// Show current submenu content
				const targetId = this.getAttribute('data-target');
				document.getElementById(targetId).classList.add('active');
			});
		});
	});
	
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}
	


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);