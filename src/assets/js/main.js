function initSlides() {
	var mySwiper = new Swiper('.swiper-container', {
		effect: 'coverflow',
		fadeEffect: {
			crossFade: true,
		},
		coverflowEffect: {
			rotate: 30,
			slideShadows: false,
		},
		// Optional parameters
		loop: true,
		autoplay: {
			delay: 15000,
			disableOnInteraction: false,
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
		},
	});
}

var mySwiperGallery = new Swiper('.swiper-gallery', {
	effect: 'fade',
	fadeEffect: {
		crossFade: true,
	},
	coverflowEffect: {
		rotate: 30,
		slideShadows: false,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	},
	on: {
		slideChange: function () {
			const video = document.querySelector(
				'.swiper-gallery .swiper-slide video'
			);
			if (video) {
				video.pause();
			}
		},
	},
});

function playVideo(src) {
	const videoContainer = document.getElementById('video-player');
	videoContainer.classList.remove('hidden');
	videoContainer.classList.add('flex');
	const video = videoContainer.querySelector('video');
	video.src = src;
	video.play();
}

function closeVideo() {
	const videoContainer = document.getElementById('video-player');
	videoContainer.classList.add('hidden');
	videoContainer.classList.remove('flex');
	const video = videoContainer.querySelector('video');
	video.pause();
	video.src = '';
}

function closeGallery() {
	document.getElementById('gallery').classList.toggle('hidden');
	mySwiperGallery.removeAllSlides();
}

function toggleGallery(item) {
	var imgs = item.galleryImages;
	var videoUrl = item.videoUrl;
	document.getElementById('gallery').classList.toggle('hidden');
	for (let index = 0; index < imgs.length; index++) {
		var slide = `<div class="swiper-slide" style="background-color: rgba(0,0,0,0);background-image: url('${imgs[index]}'); background-size:contain"></div>`;
		mySwiperGallery.appendSlide(slide);
	}
	if (videoUrl && videoUrl != '') {
		var slide = `<div class="swiper-slide" style="background-color: rgba(0,0,0,0)"><video class="w-4/5 m-auto" controls><source src="${videoUrl}" type='video/mp4'></video></div>`;
		mySwiperGallery.appendSlide(slide);
	}

	mySwiperGallery.update();
}

function toggleMenu() {
	var mainNav = document.getElementById('nav-menu');
	mainNav.classList.toggle('active');
	el = document.createElement('div');
	el.className = '';
}

function toggleSocialMenu() {
	var menu = document.getElementById('social-menu');
	menu.classList.toggle('active');
}

window.onload = function () {
	setTimeout(() => {
		document.getElementById('loading').classList.add('fade-out');
	}, 2000);

	initSlides();
};

window.onresize = function () {
	var menu = document.getElementById('social-menu');
	menu.classList.remove('active');

	var mainNav = document.getElementById('nav-menu');
	mainNav.classList.remove('active');
};

window.onclick = function (e) {
	var trigger = document.getElementById('social-menu-trigger');
	var menu = document.getElementById('social-menu');
	if (trigger != e.target && !trigger.contains(e.target)) {
		menu.classList.remove('active');
	}
};

if (window.netlifyIdentity) {
	window.netlifyIdentity.on('init', (user) => {
		if (!user) {
			window.netlifyIdentity.on('login', () => {
				document.location.href = '/admin/';
			});
		}
	});
}
