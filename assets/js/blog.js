document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('header');
  if (header) header.classList.add('show');


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

  const track = document.querySelector(".community-carousel-track");
  const cards = document.querySelectorAll(".community-review-card");
  const btnNext = document.querySelector(".community-arrow-right");
  const btnPrev = document.querySelector(".community-arrow-left");
  const dotsContainer = document.querySelector(".community-dots");
  
  let position = 0;
  
  function getCardsPerView() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 992) return 2;
      return 3;
  }
  
  function getMaxPosition() {
      return cards.length - getCardsPerView();
  }
  
  /* Crear dots */
  function createDots() {
      dotsContainer.innerHTML = "";
      for (let i = 0; i <= getMaxPosition(); i++) {
          const dot = document.createElement("div");
          dot.classList.add("community-dot");
          if (i === 0) dot.classList.add("active");
  
          dot.addEventListener("click", () => {
              position = i;
              updateCarousel();
          });
  
          dotsContainer.appendChild(dot);
      }
  }
  
  function updateDots() {
      const dots = document.querySelectorAll(".community-dot");
      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[position]) dots[position].classList.add("active");
  }
  
  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 25;
    track.style.transform = `translateX(-${position * cardWidth}px)`;

    // Quitar clase activa a todas
    cards.forEach(card => card.classList.remove("is-active"));

    const cardsPerView = getCardsPerView();

    // Si se ven 3 → activar la del medio
    if (cardsPerView === 3) {
        const activeIndex = position + 1;
        if (cards[activeIndex]) {
            cards[activeIndex].classList.add("is-active");
        }
    }

    // Si se ven 2 → activar la primera visible
    else if (cardsPerView === 2) {
        if (cards[position]) {
            cards[position].classList.add("is-active");
        }
    }

    // Si se ve 1 → activar la visible
    else {
        if (cards[position]) {
            cards[position].classList.add("is-active");
        }
    }

    updateDots();
}
  
  function nextSlide() {
      if (position < getMaxPosition()) {
          position++;
      } else {
          position = 0;
      }
      updateCarousel();
  }
  
  function prevSlide() {
      if (position > 0) {
          position--;
      } else {
          position = getMaxPosition();
      }
      updateCarousel();
  }
  
  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);
  
  setInterval(nextSlide, 5000);
  
  window.addEventListener("resize", () => {
      position = 0;
      createDots();
      updateCarousel();
  });
  
  createDots();
  updateCarousel();


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

