(()=>{"use strict";var e={490:e=>{e.exports=window.wp.domReady}},r={};function t(o){var n=r[o];if(void 0!==n)return n.exports;var i=r[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var o in r)t.o(r,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e=t(490);function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function n(e){if(Swiper){var t=null==e?void 0:e.querySelector(".swiper");if(t){var n=t.getAttribute("data-config");n&&(n=JSON.parse(n));var i=!1;n.navigation&&(i={nextEl:t.querySelector(".swiper-button-next"),prevEl:t.querySelector(".swiper-button-prev")});var a=!1;n.pagination&&t.querySelector(".swiper-pagination")&&(a={el:t.querySelector(".swiper-pagination"),clickable:!0});var p=!1;n.autoplay&&(p={delay:n.autoplayDelay||3e3,pauseOnMouseEnter:!!n.pauseOnMouseEnter});var c={};"fade"===n.effect&&(c={effect:"fade",fadeEffect:{crossFade:!0}}),"flip"===n.effect&&(c={effect:"flip",flipEffect:{slideShadows:!1}});var l=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){var o,i,a,p;o=e,i=t,a=n[t],p=function(e,t){if("object"!=r(e)||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var n=o.call(e,"string");if("object"!=r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(i),(i="symbol"==r(p)?p:p+"")in o?Object.defineProperty(o,i,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[i]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}({slidesPerView:1,autoHeight:!0,navigation:i,pagination:a,autoplay:p,loop:!!n.loop,speed:"number"==typeof n.speed?n.speed:400},c);new Swiper(t,l)}else console.warn("Swiper elem not found")}else console.warn("Swiper is not registered")}t.n(e)()((function(){document.querySelectorAll(".content-sliders-slider.content-sliders-is-fe").forEach(n)}))})()})();
//# sourceMappingURL=script.js.map