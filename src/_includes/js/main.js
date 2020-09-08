var currentIndex = -1;

function changeSlide(index) {
  currentIndex = index;
  var inner = document.getElementById("banner-inner");
  inner.style.marginLeft = `-${currentIndex * 100}%`;
  setActiveDot(currentIndex);
}

function clearClass(elements, name) {
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove(name);
  }
}

function autoPlay() {
  navRight();
  // setTimeout(autoPlay, 10000);
}

function toggleMenu() {
  var mainNav = document.getElementById("nav-menu");
  mainNav.classList.toggle("active");
}
function setBannerWith() {
  var inner = document.getElementById("banner-inner");
  var slides = document.getElementsByClassName("slide-item");
  inner.style.width = `${slides.length * 100}%`;
  for (let index = 0; index < slides.length; index++) {
    const slide = slides[index];
    slide.style.flexBasis = `${100 / slides.length}%`;
  }
}

function navLeft() {
  var length = document.getElementsByClassName("slide-item").length;
  var inner = document.getElementById("banner-inner");
  if (currentIndex == 0) {
    currentIndex = length - 1;
  } else {
    currentIndex -= 1;
  }
  inner.style.marginLeft = `-${currentIndex * 100}%`;
  setActiveDot(currentIndex);
}

function navRight() {
  var length = document.getElementsByClassName("slide-item").length;
  var inner = document.getElementById("banner-inner");
  currentIndex = (currentIndex + 1) % length;
  inner.style.marginLeft = `-${currentIndex * 100}%`;
  setActiveDot(currentIndex);
}

function setActiveDot(index) {
  var dots = document.getElementsByClassName("dot");
  clearClass(dots, "active");
  dots[index].classList.add("active");
}

function toggleSocialMenu() {
  var menu = document.getElementById("social-menu");
  menu.classList.toggle("active");
}

window.onload = function () {
  setBannerWith();
  autoPlay();
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
