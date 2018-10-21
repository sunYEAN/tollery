const utils = (function () {
    const hasClass = function (target, className) {
      return target.classList.contains(className);
    },
    addClass = function (target, className) {
      if (hasClass(target,className)) {
        return;
      } else {
        target.classList.add(className);
      }
    },
    removeClass = function (target, className) {
      if (hasClass(target, className)) {
        target.classList.remove(className);
      }
    },
      querySelector = function (str) {
        if (typeof str === 'string') {
          return document.querySelector(str);
        }
      };
    
  return {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    querySelector: querySelector
  }
})();
class Swiper {
  constructor (el, options) {
    const defaultOptions = {
      preloadImages: false,
      initialSlide: 0, // 首次进入显示第几个slide
      direction: 'horizontal',
      interval: 3000,
      canTouch: true,
      images: [],
      loop: false,
    };

    const $el = typeof el === 'string' ? utils.querySelector(el) : el;
    const $wrapper = $el.children[0];
    const $slides = $wrapper.children;
    this.opions = Object.assign({}, defaultOptions, options);

    this.$swiper = {
      $el: $el,
      $wrapper: $wrapper
    }
  }
  $init () {}
  createSwiper () {

  }
}