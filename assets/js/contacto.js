document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('header');
  if (header) header.classList.add('show');

  const splitContent = document.querySelector(".split-content");
  const splitForm = document.querySelector(".split-form");

  setTimeout(() => {
    if (splitContent) splitContent.classList.add("show");
    if (splitForm) splitForm.classList.add("show");
  }, 500); 

  const animatedElements = document.querySelectorAll(
    '.card-wrapper, .map-info-card, .map-card'
  );

  if (animatedElements.length > 0) {

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.2 });

    animatedElements.forEach((el, index) => {

      el.style.transitionDelay = `${index * 0.15}s`; 
      observer.observe(el);

    });
  }

  const menu = document.querySelector(".menu");
  const menuItems = document.querySelectorAll(".menu > li > a");
  const menuLine = document.querySelector(".menu-line");

  menuItems.forEach(link => {
      link.addEventListener("mouseenter", () => {

          const linkRect = link.getBoundingClientRect();
          const menuRect = menu.getBoundingClientRect();

          menuLine.style.width = linkRect.width + "px";
          menuLine.style.left = (linkRect.left - menuRect.left) + "px";
      });
  });

  menu.addEventListener("mouseleave", () => {
      menuLine.style.width = "0";
  });

  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  toggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
  });

  const closeBtn = document.querySelector('.sidebar-close');

  closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
  });

  const submenuTriggers = document.querySelectorAll('.has-submenu');
  const submenus = document.querySelectorAll('.sidebar-submenu');
  const sidebarMain = document.querySelector('.sidebar-main');
  const backButtons = document.querySelectorAll('.back-btn');

  submenuTriggers.forEach(item => {
      item.addEventListener('click', () => {
          const targetId = item.dataset.target;
          const submenu = document.getElementById(targetId);

          sidebarMain.classList.add('hide');
          submenu.classList.add('active');
      });
  });

  backButtons.forEach(btn => {
      btn.addEventListener('click', () => {
          submenus.forEach(menu => menu.classList.remove('active'));
          sidebarMain.classList.remove('hide');
      });
  });

  const searchIcon = document.querySelector('.header-icons .fa-magnifying-glass');
  const searchBar = document.querySelector('.search-bar');
  const overlaySearch = document.querySelector('.overlay-search');
  const closeSearch = document.querySelector('.close-search');

  function openSearch() {
      searchBar.classList.add('active');
      overlaySearch.classList.add('active');
      document.body.classList.add('no-scroll');
  }

  function closeSearchBar() {
      searchBar.classList.remove('active');
      overlaySearch.classList.remove('active');
      document.body.classList.remove('no-scroll');
  }

  searchIcon.addEventListener('click', openSearch);
  closeSearch.addEventListener('click', closeSearchBar);
  overlaySearch.addEventListener('click', closeSearchBar);

  document.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
          closeSearchBar();
      }
  });

});

window.addEventListener("load", () => {
  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});