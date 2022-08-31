"use strict"

const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};

if (isMobile.any()) {
   document.body.classList.add('_touch');

   let menuLinks = document.querySelectorAll('.header-menu__link_models-mob');
   if (menuLinks.length > 0) {
      for (let index = 0; index < menuLinks.length; index++) {
         const menuLinkModels = menuLinks[index];
         menuLinkModels.addEventListener("click", function (e) {
            menuLinkModels.parentElement.classList.toggle('_active');

         });
      }
   }

} else {
   document.body.classList.add('_pc');
}

// BURGER ACTIVE
const menuBurger = document.querySelector('.header-menu__menu-burger');
const menuList = document.querySelector('.header-menu__list');

if (menuBurger) {
   menuBurger.addEventListener("click", function (e) {
      document.body.classList.toggle('lock');
      menuBurger.classList.toggle('active');
      menuList.classList.toggle('active');
   });
}

// SCROLL
const menuLinks = document.querySelectorAll('.header-menu__link[data-goto], .header-menu__sub-link[data-goto]');

if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top;

         if (menuBurger.classList.contains('active')) {
            document.body.classList.remove('lock');
            menuBurger.classList.remove('active');
            menuList.classList.remove('active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

if (menuBurger.classList.contains('active')) {
   document.body.classList.remove('lock');
   menuBurger.classList.remove('active');
   menuList.classList.remove('active');
}

// ANIMATION

const animationItems = document.querySelectorAll('._animation');

if (animationItems.length > 0) {
   window.addEventListener('scroll', animationOnScroll);
   function animationOnScroll() {
      for (let index = 0; index < animationItems.length; index++) {
         const animationItem = animationItems[index];
         const animationItemHeight = animationItem.offsetHeight;
         const animationItemOffset = offset(animationItem).top;
         const animationStart = 6;

         let animationItemPoint = window.innerHeight - animationItemHeight / animationStart;

         if (animationItemHeight > window.innerHeight) {
            animationItemPoint = window.innerHeight - window.innerHeight / animationStart;
         }

         if ((pageYOffset > animationItemOffset - animationItemPoint) && pageYOffset < (animationItemOffset + animationItemHeight)) {
            animationItem.classList.add('_loaded');
         } else {
            if (!animationItem.classList.contains('_no-animation-again')) {
               animationItem.classList.remove('_loaded');
            }
         }
      }
   }

   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   animationOnScroll();
}