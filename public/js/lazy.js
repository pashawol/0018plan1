// Lazy loading img & background images using intersection observer
// Reference: https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
// Using example: <img class="lazy" src="thumb.gif" data-src="real-img.jpg" data-srcset="real-img@1x.jpg 1x, real-img@2x.jpg 2x">
// Background image class usign example: <div class="lazy-background"> with added class ".visible" for styling
// Background image style attribute lazy loading example: <div data-bg="image.jpg">

// delete window.IntersectionObserver; // Fallback Testing

document.addEventListener('DOMContentLoaded', function() {

	var lazyImages = [].slice.call(document.querySelectorAll("picture.lazy img, picture.lazy source, img.lazy"));
	var lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'));
	var lazyBackgroundsData = [].slice.call(document.querySelectorAll('[data-bg]'));

	if ('IntersectionObserver' in window) {

		let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;

					if (lazyImage.tagName == 'IMG' ) { 
						lazyImage.src = lazyImage.dataset.src;
					}
					if (lazyImage.tagName == 'SOURCE' ) {
						
						lazyImage.srcset = lazyImage.dataset.srcset;
					}
					// lazyImage.src = lazyImage.dataset.src;
					// lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.parentNode.classList.remove('lazy');
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		}, {
			rootMargin: "256px 0px 256px 0px"
		});
		lazyImages.forEach(function(lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});

	let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				lazyBackgroundObserver.unobserve(entry.target);
			}
		});
	}, {
		rootMargin: "256px 0px 256px 0px"
	});
	lazyBackgrounds.forEach(function(lazyBackground) {
		lazyBackgroundObserver.observe(lazyBackground);
	});

	let lazyBackgroundDataObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				let lazyBackgroundData = entry.target;
				lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
				lazyBackgroundDataObserver.unobserve(lazyBackgroundData);
			}
		});
	}, {
		rootMargin: "256px 0px 256px 0px"
	});
	lazyBackgroundsData.forEach(function(lazyBackgroundData) {
		lazyBackgroundDataObserver.observe(lazyBackgroundData);
	});

	} else {

		// Fallback

		lazyImages.forEach(function(lazyImage) {
			// lazyImage.src = lazyImage.dataset.src;
			// lazyImage.srcset = lazyImage.dataset.srcset;
			
			lazyImage.src = lazyImage.dataset.src;
			// if (lazyImage.tagName == 'IMG' ) { 
			// }
			// if (lazyImage.tagName == 'SOURCE' ) {
				
			// 	lazyImage.srcset = lazyImage.dataset.srcset;
			// }
		});
		lazyBackgrounds.forEach(function(lazyBackground) {
			lazyBackground.classList.add('visible');
		});
		lazyBackgroundsData.forEach(function(lazyBackgroundData) {
			lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
		});

	}

});



// function LazyFunction(){


// document.addEventListener("DOMContentLoaded", function () {
// 	var lazyImages = [].slice.call(document.querySelectorAll("picture.lazy img, picture.lazy source, img.lazy"));
// 	var active = false;

// 	const lazyLoad = function () {
// 		if (active === false) {
// 			active = true;

// 			setTimeout(function () {
// 				lazyImages.forEach(function (lazyImage) {
// 					var imgWrapper = lazyImage.parentNode.clientHeight + 500;
// 					if (((lazyImage.getBoundingClientRect().top - imgWrapper) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + imgWrapper) >= 0) && getComputedStyle(lazyImage).display !== "none") {
// 						if (lazyImage.tagName == 'IMG' ) { 
// 							lazyImage.src = lazyImage.dataset.src;
// 						}
// 						if (lazyImage.tagName == 'SOURCE' ) {
							
// 							lazyImage.srcset = lazyImage.dataset.srcset;
// 						}
// 						// lazyImage.src = lazyImage.dataset.src;
// 						// lazyImage.srcset = lazyImage.dataset.srcset;
// 						lazyImage.classList.remove("lazy");

// 						lazyImages = lazyImages.filter(function (image) {
// 							return image !== lazyImage;
// 						});

// 						if (lazyImages.length === 0) {
// 							document.removeEventListener("scroll", lazyLoad);
// 							window.removeEventListener("resize", lazyLoad);
// 							window.removeEventListener("orientationchange", lazyLoad);
// 							window.addEventListener("DOMContentLoaded", lazyLoad);
// 						}
// 					}
// 				});

// 				active = false;
// 			}, 200);
// 		}
// 	};

// 	document.addEventListener("scroll", lazyLoad);
// 	window.addEventListener("resize", lazyLoad);
// 	window.addEventListener("orientationchange", lazyLoad);
// 	window.addEventListener("DOMContentLoaded", lazyLoad);
// });


// // лэзи 
// document.addEventListener("DOMContentLoaded", function () {
// 	var lazyImages = [].slice.call(document.querySelectorAll(".lazy-bg"));
// 	var active = false;

// 	const lazyLoad = function () {
// 		if (active === false) {
// 			active = true;

// 			setTimeout(function () {
// 				lazyImages.forEach(function (lazyImage) {
// 					var imgWrapper = lazyImage.parentNode.clientHeight + 500;
// 					if (((lazyImage.getBoundingClientRect().top - imgWrapper) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + imgWrapper) >= 0) && getComputedStyle(lazyImage).display !== "none") {
// 						lazyImage.parentElement.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')';
// 						lazyImage.src = lazyImage.dataset.src;
// 						// lazyImage.srcset = lazyImage.dataset.srcset;
// 						lazyImage.classList.remove("lazy");

// 						lazyImages = lazyImages.filter(function (image) {
// 							return image !== lazyImage;
// 						});

// 						if (lazyImages.length === 0) {
// 							document.removeEventListener("scroll", lazyLoad);
// 							window.removeEventListener("resize", lazyLoad);
// 							window.removeEventListener("orientationchange", lazyLoad);
// 							window.addEventListener("DOMContentLoaded", lazyLoad);
// 						}
// 					}
// 				});

// 				active = false;
// 			}, 200);
// 		}
// 	};

// 	document.addEventListener("scroll", lazyLoad);
// 	window.addEventListener("resize", lazyLoad);
// 	window.addEventListener("orientationchange", lazyLoad);
// 	window.addEventListener("DOMContentLoaded", lazyLoad);
// });

// }

// LazyFunction();