// Add target="_blank" when user opens external link
(function() {
  var a = document.querySelectorAll('a');
  for (var i = 0; i < a.length; i++) {
    if (a[i].host !== location.host) {
      a[i].setAttribute('target', '_blank');
    }
  }
}());

var layout_selector = document.querySelectorAll('.layout-selector-btn');
var btn_xs = document.querySelector('.layout-btn-xs');
var btn_s = document.querySelector('.layout-btn-s');
var btn_m = document.querySelector('.layout-btn-m');
var btn_l = document.querySelector('.layout-btn-l');
var btn_xl = document.querySelector('.layout-btn-xl');
var btn_single = document.querySelector('.layout-btn-single');

var layout_img = document.querySelectorAll('.layout-img');
var img_xs = document.querySelector('.layout-img-xs');
var img_s = document.querySelector('.layout-img-s');
var img_m = document.querySelector('.layout-img-m');
var img_l = document.querySelector('.layout-img-l');
var img_xl = document.querySelector('.layout-img-xl');
var img_single = document.querySelector('.layout-img-single');

function removeActive(target) {
    for (i = 0; i < target.length; i++) {
        target[i].classList.remove('is-active');
    }
}

btn_xs.addEventListener("click", function() {
    removeActive(layout_img);
    removeActive(layout_selector);
    img_xs.classList.toggle('is-active');
    btn_xs.classList.toggle('is-active');
});

btn_s.addEventListener("click", function() {
    removeActive(layout_img);
    removeActive(layout_selector);
    img_s.classList.toggle('is-active');
    btn_s.classList.toggle('is-active');
});

btn_m.addEventListener("click", function() {
    removeActive(layout_img);
    removeActive(layout_selector);
    img_m.classList.toggle('is-active');
    btn_m.classList.toggle('is-active');
});

btn_l.addEventListener("click", function() {
    removeActive(layout_img);
    removeActive(layout_selector);
    img_l.classList.toggle('is-active');
    btn_l.classList.toggle('is-active');
});

btn_xl.addEventListener("click", function() {
    removeActive(layout_img);
    removeActive(layout_selector);
    img_xl.classList.toggle('is-active');
    btn_xl.classList.toggle('is-active');
});

btn_single.addEventListener("click", function() {
    removeActive(layout_img);
    removeActive(layout_selector);
    img_single.classList.toggle('is-active');
    btn_single.classList.toggle('is-active');
});
