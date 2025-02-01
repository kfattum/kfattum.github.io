function deblur() {
  window.setTimeout(function () {
  var element = document.querySelector('.preloader');
    if (element) {
    element.classList.remove('blur');
    }
  }, 500);
}