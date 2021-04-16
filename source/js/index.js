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

  const restoreHeader = () => {
    headerContainer.classList.remove('header__container--js');
    headerBox.classList.remove('hidden-entity');
    toggle.classList.remove('header__toggle--burger');
    [
      toggle,
      burgerDescription,
      burgerSvg
    ].forEach(item => item.classList.add('hidden-entity'));
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

  const onToggleClick = () => {
    headerBox.classList.contains('header__box--opened')
      ? closeMenu()
      : openMenu();
    return undefined;
  };

  const setEventListeners = () => {
    toggle.addEventListener('click', onToggleClick);
    toggle.setAttribute('is-listened', 'true');
    return undefined;
  };

  const eraseEventListeners = () => {
    toggle.removeEventListener('click', onToggleClick);
    toggle.removeAttribute('is-listened');
    return undefined;
  };

  return {
    toggle,
    openMenu,
    closeMenu,
    modifyHeader,
    restoreHeader,
    setEventListeners,
    eraseEventListeners
  };
};

// WINDOW

const onWindowResize = (function () {
  const {
    toggle,
    closeMenu,
    modifyHeader,
    restoreHeader,
    setEventListeners,
    eraseEventListeners
  } = toggleMenu();
  let isModified = false;

  return function () {
    const screenWidth = document.documentElement.clientWidth;

    if (!isModified) {
      if (screenWidth < DESKTOP_WIDTH) {
        modifyHeader();

        if (!toggle.getAttribute('is-listened')) {
          setEventListeners();
        }

        isModified = true;
      }
    }

    if (isModified) {
      if (screenWidth === DESKTOP_WIDTH
        || screenWidth > DESKTOP_WIDTH) {
        [
          closeMenu,
          restoreHeader
        ].forEach(item => item());

        if (toggle.getAttribute('is-listened')) {
          eraseEventListeners();
        }

        isModified = false;
      }
    }
    return undefined;
  }
})();

window.addEventListener('resize', onWindowResize);
