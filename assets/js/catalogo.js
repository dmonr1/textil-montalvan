document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("load", () => {
    const hero = document.querySelector(".tm-hero");
    hero.classList.add("loaded");
  });

  const header = document.querySelector('header');

  const logo = document.getElementById("site-logo");

  const logoBlanco = "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/logo-header-removebg-preview.png";
  const logoNegro = "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/logo-header-negro.png";


  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
      if (logo) logo.src = logoNegro;
    } else {
      header.classList.remove("scrolled");
      if (logo) logo.src = logoBlanco;
    }
  });

  if (header) header.classList.add('show');

  // ============================
  // HERO AUTO SLIDER
  // ============================

  const heroA = document.getElementById("heroImageA");
  const heroB = document.getElementById("heroImageB");

  const heroImages = [
    "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/pexels-blonde-1845052_1920.jpg",
    "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/modelo-fondo-2.jpg",
    "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/modelo-fondo-3.jpg"
  ];

  let heroIndex = 0;
  let isHeroAActive = true;

  setInterval(() => {

    heroIndex = (heroIndex + 1) % heroImages.length;

    const activeImage = isHeroAActive ? heroA : heroB;
    const nextImage = isHeroAActive ? heroB : heroA;

    const img = new Image();
    img.src = heroImages[heroIndex];

    img.onload = () => {
      nextImage.src = heroImages[heroIndex];
      nextImage.classList.add("active");
      activeImage.classList.remove("active");
      isHeroAActive = !isHeroAActive;
    };

  }, 5000);

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

  const items = document.querySelectorAll(".tm-fabric-list li");
  const thumb = document.getElementById("tmThumb");
  const desc = document.getElementById("tmThumbDesc");
  const imageContainer = document.querySelector(".tm-image-container");

  const imageA = document.getElementById("tmImageA");
  const imageB = document.getElementById("tmImageB");

  let isImageAActive = true;

  let currentImage = imageA.src;
  let currentHoverImage = imageA.src;

  // Si hay lista, inicializar hover con el primero
  if (items.length > 0) {
    currentHoverImage = items[0].dataset.hover || items[0].dataset.img;
  }

  // =========================
  // CAMBIO DESDE LISTA
  // =========================

  if (items.length > 0) {
    items[0].classList.add("active");
  }

  items.forEach(item => {

    item.addEventListener("mouseenter", () => {

      // Quitar active anterior
      items.forEach(i => i.classList.remove("active"));

      // Activar el actual
      item.classList.add("active");

      currentImage = item.dataset.img;
      currentHoverImage = item.dataset.hover || item.dataset.img;

      changeImage(currentImage);

      thumb.src = item.dataset.thumb;
      desc.textContent = item.dataset.desc;

    });

  });

  // =========================
  // HOVER EN IMAGEN DERECHA
  // =========================
  imageContainer.addEventListener("mouseenter", () => {
    changeImage(currentHoverImage);
  });

  imageContainer.addEventListener("mouseleave", () => {
    changeImage(currentImage);
  });

  // =========================
  // FUNCIÓN CROSSFADE REAL
  // =========================
  function changeImage(newSrc) {

    const activeImage = isImageAActive ? imageA : imageB;
    const nextImage = isImageAActive ? imageB : imageA;

    if (activeImage.src.includes(newSrc)) return;

    // Precargar antes de mostrar
    const img = new Image();
    img.src = newSrc;

    img.onload = () => {
      nextImage.src = newSrc;

      nextImage.classList.add("active");
      activeImage.classList.remove("active");

      isImageAActive = !isImageAActive;
    };

  }

  const categories = document.querySelectorAll(".catalog-categories button");
  const categoriesWrapper = document.querySelector(".catalog-categories");

  function moveIndicator(button) {
    const rect = button.getBoundingClientRect();
    const parentRect = categoriesWrapper.getBoundingClientRect();

    categoriesWrapper.style.setProperty(
      "--indicator-left",
      rect.left - parentRect.left + "px"
    );
    categoriesWrapper.style.setProperty(
      "--indicator-width",
      rect.width + "px"
    );

    const indicator = categoriesWrapper.querySelector("::after");
  }

  function updateIndicator(button) {
    const rect = button.getBoundingClientRect();
    const parentRect = categoriesWrapper.getBoundingClientRect();

    categoriesWrapper.style.setProperty("--left", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--width", rect.width + "px");

    categoriesWrapper.style.setProperty("padding-bottom", "15px");
    categoriesWrapper.style.position = "relative";

    categoriesWrapper.style.setProperty("--indicator-left", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--indicator-width", rect.width + "px");

    categoriesWrapper.style.setProperty("--x", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--w", rect.width + "px");

    categoriesWrapper.style.setProperty("--indicatorX", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--indicatorW", rect.width + "px");

    categoriesWrapper.style.setProperty("--indicator-left", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--indicator-width", rect.width + "px");

    categoriesWrapper.style.setProperty("position", "relative");
    categoriesWrapper.style.setProperty("padding-bottom", "15px");

    categoriesWrapper.style.setProperty("--indicator-left", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--indicator-width", rect.width + "px");

    categoriesWrapper.style.setProperty("position", "relative");

    categoriesWrapper.style.setProperty("left", "2px");

    categoriesWrapper.style.setProperty("width", "100%");

    categoriesWrapper.style.setProperty("overflow", "visible");

    categoriesWrapper.style.setProperty("z-index", "1");

    categoriesWrapper.style.setProperty("transition", "all 0.3s ease");

    categoriesWrapper.style.setProperty("position", "relative");

    categoriesWrapper.style.setProperty("padding-bottom", "0px");

    categoriesWrapper.style.setProperty("border-bottom", "1px solid #eee");

    categoriesWrapper.style.setProperty("--indicator-left", rect.left - parentRect.left + "px");
    categoriesWrapper.style.setProperty("--indicator-width", rect.width + "px");

    categoriesWrapper.style.setProperty("background-position", "0 100%");

    categoriesWrapper.style.setProperty("background-repeat", "no-repeat");

    categoriesWrapper.style.setProperty(
      "background-image",
      `linear-gradient(#111,#111)`
    );

    categoriesWrapper.style.setProperty(
      "background-size",
      rect.width + "px 3px"
    );

    categoriesWrapper.style.setProperty(
      "background-position",
      rect.left - parentRect.left + "px 100%"
    );
  }

  categories.forEach(button => {
    button.addEventListener("click", () => {
      categories.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      updateIndicator(button);
    });
  });

  /* Inicializar */
  window.addEventListener("load", () => {
    const active = document.querySelector(".catalog-categories button.active");
    if (active) updateIndicator(active);
  });

  const products = [
    // TELAS DE PUNTO
    {
      name: "Jersey Algodón 30/1",
      category: "punto",
      composition: "100% Algodón · 180gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/Jersey-301.jpg"
    },
    {
      name: "Rib Reactivo",
      category: "punto",
      composition: "Algodón + Spandex · 220gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/rib-reactivo.png"
    },

    // ALTA ROTACIÓN
    {
      name: "Franela Nacional",
      category: "alta",
      composition: "Algodón 100% · 200gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/franela-nacional.png"
    },
    {
      name: "Piqué Clásico",
      category: "alta",
      composition: "Poliéster / Algodón",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/tela-pique.png"
    },

    // FLUIDAS
    {
      name: "Gasa Sublimada",
      category: "fluidas",
      composition: "Poliéster · 120gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/gasa-sublimada.jpg"
    },
    {
      name: "Chalis Estampado",
      category: "fluidas",
      composition: "Rayón · 140gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/tela-chalis.png"
    },

    // ESTRUCTURADAS
    {
      name: "Denim Clásico 12oz",
      category: "estructuradas",
      composition: "Algodón 100%",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/tela-jeans.png"
    },
    {
      name: "Drill Industrial",
      category: "estructuradas",
      composition: "Algodón / Poliéster",
      image: "https://github.com/dmonr1/textil-montalvan/blob/main/assets/imgs/catalogo/tela-dril-licrado.png?raw=true"
    },

    // ABRIGO
    {
      name: "Paño Italiano",
      category: "abrigo",
      composition: "Lana Mezcla · 400gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/pa%C3%B1o-italiano.jpg"
    },
    {
      name: "Polar Antipilling",
      category: "abrigo",
      composition: "Poliéster · 280gr",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/Polar-antipilling.png"
    },

    // MODA
    {
      name: "Seda Satinada",
      category: "moda",
      composition: "Seda / Poliéster",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/tela-satinada.png"
    },
    {
      name: "Tul Bordado",
      category: "moda",
      composition: "Poliéster",
      image: "https://raw.githubusercontent.com/dmonr1/textil-montalvan/refs/heads/main/assets/imgs/catalogo/tul-bordado.jpg"
    }
  ];

  const grid = document.getElementById("catalog-grid");
  const buttons = document.querySelectorAll(".catalog-categories button");

  function renderProducts(filter) {
    grid.innerHTML = "";

    const filtered = filter === "all"
      ? products
      : products.filter(p => p.category === filter);

    filtered.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("catalog-card");

      card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="catalog-info">
              <h3>${product.name}</h3>
              <span>${product.composition}</span>
          </div>
      `;

      grid.appendChild(card);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
  
      renderProducts(btn.dataset.filter);
  
      initScrollAnimation(); // ← SIN setTimeout
    });
  });

  renderProducts("all");
  initScrollAnimation();
  
  function initScrollAnimation() {

    const cards = document.querySelectorAll('.catalog-card');
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
  
          const card = entry.target;
          const index = [...cards].indexOf(card);
  
          setTimeout(() => {
            card.classList.add('show');
          }, index * 120);
  
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.15 });
  
    cards.forEach(card => {
      observer.observe(card);
    });
  }
});