function selectMenuItem(pageLinkId = '#indexpagelink') {
  try {
    const menuItem = document.querySelector(pageLinkId);
    if (menuItem.getAttribute('href') === window.location.pathname) {
      const menuItemClosest = menuItem.closest('.header__menu-item');
      menuItemClosest.classList.add('header__menu-item_selected');
    }
  } catch (error) {
    throw new Error('header__menu-item_selected, Не могу найти элемент меню');
  }
  return window.location.pathname;
}

module.exports = selectMenuItem;
