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

    cards.forEach(card => card.classList.remove("is-active"));

    const cardsPerView = getCardsPerView();

    if (cardsPerView === 3) {
      const activeIndex = position + 1;
      if (cards[activeIndex]) {
        cards[activeIndex].classList.add("is-active");
      }
    }

    else if (cardsPerView === 2) {
      if (cards[position]) {
        cards[position].classList.add("is-active");
      }
    }

    else {
      if (cards[position]) {
        cards[position].classList.add("is-active");
      }
    }

    updateDots();
  }

  let startX = 0;
  let isDragging = false;

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
  });

  window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const diff = e.pageX - startX;

    if (diff > 60) {
      prevSlide();
    } else if (diff < -60) {
      nextSlide();
    }
  });

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    if (diff > 60) {
      prevSlide();
    } else if (diff < -60) {
      nextSlide();
    }
  });

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

const scrollElements = document.querySelectorAll(
  ".scroll-animate, .scroll-animate-left, .scroll-animate-right"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

scrollElements.forEach(el => observer.observe(el));


// ==========================
// GUÍAS DINÁMICAS
// ==========================

const guides = [
  {
    title: "Guía para elegir la tela ideal",
    desc: "Aprende a seleccionar la tela perfecta según tipo de prenda y temporada.",
    icon: "fa-book-open ic-1",
    file: "../assets/guias/guia-telas.pdf"
  },
  {
    title: "Manual de tendencias 2026",
    desc: "Colores, texturas y patrones que dominarán el mercado textil.",
    icon: "fa-chart-line ic-2",
    file: "../assets/guias/tendencias-2026.pdf"
  },
  {
    title: "Checklist para producción textil",
    desc: "Optimiza tus procesos y evita errores comunes en confección.",
    icon: "fa-clipboard-check ic-3",
    file: "../assets/guias/checklist-produccion.pdf"
  }
];

const guidesGrid = document.getElementById("guides-grid");

if (guidesGrid) {
  guides.forEach(guide => {
    guidesGrid.innerHTML += `
          <div class="guide-card scroll-reveal">
              <div class="guide-icon">
                  <i class="fa-solid ${guide.icon}"></i>
              </div>
              <h3>${guide.title}</h3>
              <p>${guide.desc}</p>
              <a href="${guide.file}" class="guide-btn" download>
                  Descargar
                  <i class="fa-solid fa-arrow-down"></i>
              </a>
          </div>
      `;
  });
}

/* Animación scroll */
const revealElements = document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));