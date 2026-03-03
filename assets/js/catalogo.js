document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector('header');
  if (header) header.classList.add('show');

  const cards = document.querySelectorAll('.card-mv');

  if (cards.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition = "0.6s ease";
      observer.observe(card);
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
    });
  });

  renderProducts("all");

});