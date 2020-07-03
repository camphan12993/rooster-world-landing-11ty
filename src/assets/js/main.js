var currentIndex = -1;

function changeSlide(index) {
  currentIndex = index;
  var slides = document.getElementsByClassName('slide');
  clearClass(slides, 'active');
  slides[index].classList.add('active');

  var dots = document.getElementsByClassName('dot');
  clearClass(dots, 'bg-gray-800');
  dots[index].classList.add('bg-gray-800');
}

function clearClass(elements, name) {
  for (let index = 0; index < elements.length; index++) {
    elements[index].classList.remove(name);
  }
}

function autoPlay() {
  var length = document.getElementsByClassName('slide').length;
  currentIndex = (currentIndex + 1) % length;
  changeSlide(currentIndex);
  setTimeout(autoPlay, 5000);
}

function toggleNav() {
  var mainNav = document.getElementById('nav-menu');
  mainNav.classList.toggle('hidden');
}
window.onload = function () {
  autoPlay();
};
