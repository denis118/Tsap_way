'use strict';

const DESKTOP_WIDTH = 1024;

// Menu

const toggleMenu = () => {
  const headerContainer = document.querySelector('.header__container');
  const headerBox = document.querySelector('.header__box');
  const toggle = document.querySelector('.header__toggle');
  const burgerDescription = document.querySelector('#description-for-burger');
  const navCrossDescription = document.querySelector('#description-for-cross-in-nav');
  const burgerSvg = document.querySelector('#burger-svg');
  const navCrossSvg = document.querySelector('#cross-in-nav-svg');

  const header = { isModified: false };

  const modifyHeader = () => {
    headerContainer.classList.add('header__container--js');
    headerBox.classList.add('hidden-entity');
    toggle.classList.add('header__toggle--burger');
    [
      toggle,
      burgerDescription,
      burgerSvg
    ].forEach(item => item.classList.remove('hidden-entity'));
    return undefined;
  };

  const openMenu = () => {
    headerBox.classList.remove('hidden-entity');
    headerBox.classList.add('header__box--opened');
    toggle.classList.remove('header__toggle--burger');
    toggle.classList.add('header__toggle--nav-cross');
    [
      burgerDescription,
      burgerSvg
    ].forEach(item => item.classList.add('hidden-entity'));

    [
      navCrossDescription,
      navCrossSvg
    ].forEach(item => item.classList.remove('hidden-entity'));
    return undefined;
  };

  const closeMenu = () => {
    headerBox.classList.add('hidden-entity');
    headerBox.classList.remove('header__box--opened');
    toggle.classList.add('header__toggle--burger');
    toggle.classList.remove('header__toggle--nav-cross');
    [
      burgerDescription,
      burgerSvg
    ].forEach(item => item.classList.remove('hidden-entity'));

    [
      navCrossDescription,
      navCrossSvg
    ].forEach(item => item.classList.add('hidden-entity'));
    return undefined;
  };

  const eraseEventListeners = () => {
    toggle.addEventListener('click', () => {
      headerBox.classList.contains('hidden-entity')
        ? openMenu()
        : closeMenu();
      return undefined;
    });
    return undefined;
  };

  return [
    header,
    modifyHeader,
    openMenu,
    closeMenu,
    eraseEventListeners
  ];
};

// WINDOW

const onWindowResize = () => {
  const [header] = toggleMenu();

  if (!header.isModified) {
    if (document.documentElement.clientWidth < DESKTOP_WIDTH) {
      const [
        modifyHeader,
        eraseEventListeners
      ] = toggleMenu();

      // [
      //   modifyHeader,
      //   eraseEventListeners
      // ].forEach(item => item());

      // modifyHeader();
      eraseEventListeners();

      header.isModified = true;
      console.log('pre-desktop');
    }
  }

  if (header.isModified) {
    if (document.documentElement.clientWidth === DESKTOP_WIDTH
      || document.documentElement.clientWidth > DESKTOP_WIDTH) {
      const [closeMenu] = toggleMenu();
      closeMenu();

      header.isModified = false;
      console.log('desktop');
    }
  }

  return undefined;
};

// const onWindowResize = () => {
//   let isModified = false;

//   return function () {
//     const screenWidth = document.documentElement.clientWidth;
//       if (!isModified) {
//         if (screenWidth < DESKTOP_WIDTH) {
//           toggleMenu();
//           isModified = true;
//           console.log('in');
//         }
//       }

//       if (isModified) {
//         if (screenWidth > DESKTOP_WIDTH || screenWidth === DESKTOP_WIDTH) {
//           toggleMenu();
//           isModified = true;
//           console.log('in');
//         }
//       }
//     return undefined;
//   };
// };



// window.addEventListener('resize', () => {
//   const screenWidth = document.documentElement.clientWidth;
//   return screenWidth < DESKTOP_WIDTH ? toggleMenu() : undefined;
// });

window.addEventListener('resize', onWindowResize);
console.log('ok');
