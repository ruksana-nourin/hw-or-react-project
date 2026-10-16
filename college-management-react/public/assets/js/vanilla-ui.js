/* Vanilla JS replacement for Alpine.js interactions. Keeps existing HTML and Tailwind classes. */
(function () {
  'use strict';

  var state = {
    dark: false,
    isSideMenuOpen: false,
    isPagesMenuOpen: false,
    isNotificationsMenuOpen: false,
    isProfileMenuOpen: false,
    isModalOpen: false
  };

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem('dark');
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {}
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function setTheme(dark) {
    state.dark = !!dark;
    document.documentElement.classList.toggle('theme-dark', state.dark);
    try { localStorage.setItem('dark', JSON.stringify(state.dark)); } catch (e) {}
    syncConditionalElements();
  }

  function conditionIsTrue(expression) {
    expression = (expression || '').trim();
    if (expression === 'dark') return state.dark;
    if (expression === '!dark') return !state.dark;
    if (expression === 'isSideMenuOpen') return state.isSideMenuOpen;
    if (expression === 'isPagesMenuOpen') return state.isPagesMenuOpen;
    if (expression === 'isNotificationsMenuOpen') return state.isNotificationsMenuOpen;
    if (expression === 'isProfileMenuOpen') return state.isProfileMenuOpen;
    if (expression === 'isModalOpen') return state.isModalOpen;
    return false;
  }

  function syncConditionalElements() {
    document.querySelectorAll('[data-if]').forEach(function (el) {
      var show = conditionIsTrue(el.getAttribute('data-if'));
      el.classList.toggle('hidden', !show);
    });
    document.querySelectorAll('[data-show]').forEach(function (el) {
      var show = conditionIsTrue(el.getAttribute('data-show'));
      el.classList.toggle('hidden', !show);
    });
    document.querySelectorAll('[data-action="toggleTheme"]').forEach(function (el) {
      el.setAttribute('aria-label', state.dark ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function closeMenus() {
    state.isPagesMenuOpen = false;
    state.isNotificationsMenuOpen = false;
    state.isProfileMenuOpen = false;
    syncConditionalElements();
  }

  function openModal() {
    state.isModalOpen = true;
    syncConditionalElements();
    var modal = document.querySelector('#modal');
    if (modal) {
      var focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }
  }

  function closeModal() {
    state.isModalOpen = false;
    syncConditionalElements();
  }

  var actions = {
    toggleTheme: function () { setTheme(!state.dark); },
    toggleSideMenu: function () {
      state.isSideMenuOpen = !state.isSideMenuOpen;
      syncConditionalElements();
    },
    closeSideMenu: function () {
      state.isSideMenuOpen = false;
      syncConditionalElements();
    },
    togglePagesMenu: function () {
      state.isPagesMenuOpen = !state.isPagesMenuOpen;
      syncConditionalElements();
    },
    closePagesMenu: function () {
      state.isPagesMenuOpen = false;
      syncConditionalElements();
    },
    toggleNotificationsMenu: function () {
      state.isNotificationsMenuOpen = !state.isNotificationsMenuOpen;
      state.isProfileMenuOpen = false;
      syncConditionalElements();
    },
    closeNotificationsMenu: function () {
      state.isNotificationsMenuOpen = false;
      syncConditionalElements();
    },
    toggleProfileMenu: function () {
      state.isProfileMenuOpen = !state.isProfileMenuOpen;
      state.isNotificationsMenuOpen = false;
      syncConditionalElements();
    },
    closeProfileMenu: function () {
      state.isProfileMenuOpen = false;
      syncConditionalElements();
    },
    openModal: openModal,
    closeModal: closeModal
  };

  function init() {
    setTheme(getSavedTheme());
    syncConditionalElements();

    document.addEventListener('click', function (event) {
      var actionElement = event.target.closest('[data-action]');
      if (actionElement) {
        var actionName = actionElement.getAttribute('data-action');
        if (actions[actionName]) {
          event.preventDefault();
          actions[actionName]();
        }
      }

      // Close popovers when a click happens outside their trigger/menu.
      var inNotifications = event.target.closest('[data-if="isNotificationsMenuOpen"]') ||
        event.target.closest('[data-action="toggleNotificationsMenu"]');
      var inProfile = event.target.closest('[data-if="isProfileMenuOpen"]') ||
        event.target.closest('[data-action="toggleProfileMenu"]');
      var inPages = event.target.closest('[data-if="isPagesMenuOpen"]') ||
        event.target.closest('[data-action="togglePagesMenu"]');

      if (!inNotifications) state.isNotificationsMenuOpen = false;
      if (!inProfile) state.isProfileMenuOpen = false;
      if (!inPages) state.isPagesMenuOpen = false;

      if (event.target.matches('[data-show="isSideMenuOpen"]')) state.isSideMenuOpen = false;
      if (event.target.matches('[data-show="isModalOpen"]')) closeModal();
      syncConditionalElements();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenus();
        state.isSideMenuOpen = false;
        closeModal();
      }
    });

    // Make the mobile overlay and modal backdrop close their surfaces on click.
    document.querySelectorAll('[data-escape-action]').forEach(function (el) {
      el.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && actions[el.getAttribute('data-escape-action')]) {
          actions[el.getAttribute('data-escape-action')]();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
