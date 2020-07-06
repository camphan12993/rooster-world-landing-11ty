var currentIndex = -1;

function changeSlide(index) {
  currentIndex = index;
  var slides = document.getElementsByClassName('slide');
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

if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', (user) => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}
