var currentIndex = -1;

function changeSlide(index) {
  currentIndex = index;
  var slides = document.getElementsByClassName('mySlides');
  clearClass(slides, 'active');
  slides[index].classList.add('active');

  var dots = document.getElementsByClassName('dot');
  clearClass(dots, 'active');
  dots[index].classList.add('active');
}

function clearClass(elements, name) {
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove(name);
  }
}

function autoPlay() {
  var length = document.getElementsByClassName('mySlides').length;
  currentIndex = (currentIndex + 1) % length;
  changeSlide(currentIndex);
  setTimeout(autoPlay, 5000);
}

function toggleNav() {
  var mainNav = document.getElementById('navbarResponsive');
  mainNav.classList.toggle('show');
}
window.onload = function () {
  autoPlay();
};

window.addEventListener('resize', function (e) {
  if (window.innerWidth >= 768) {
    var mainNav = document.getElementById('navbarResponsive');
    mainNav.classList.remove('show');
  }
});
