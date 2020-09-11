function initSlides() {
	var mySwiper = new Swiper(".swiper-container", {
		// Optional parameters
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
		},
	});
}

function toggleGallery(i) {
	console.log(i);
}

function toggleMenu() {
	var mainNav = document.getElementById("nav-menu");
	mainNav.classList.toggle("active");
	el = document.createElement("div");
	el.className = "";
}

function toggleSocialMenu() {
	var menu = document.getElementById("social-menu");
	menu.classList.toggle("active");
}

window.onload = function () {
	initSlides();
};

window.onresize = function () {
	var menu = document.getElementById("social-menu");
	menu.classList.remove("active");

	var mainNav = document.getElementById("nav-menu");
	mainNav.classList.remove("active");
};

window.onclick = function (e) {
	var trigger = document.getElementById("social-menu-trigger");
	var menu = document.getElementById("social-menu");
	if (trigger != e.target && !trigger.contains(e.target)) {
		menu.classList.remove("active");
	}
};

if (window.netlifyIdentity) {
	window.netlifyIdentity.on("init", (user) => {
		if (!user) {
			window.netlifyIdentity.on("login", () => {
				document.location.href = "/admin/";
			});
		}
	});
}