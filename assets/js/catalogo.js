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
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1974"
    },

    // ALTA ROTACIÓN
    {
      name: "Franela Nacional",
      category: "alta",
      composition: "Algodón 100% · 200gr",
      image: "https://images.unsplash.com/photo-  1617957718615-6b4f80f1a0f1?q=80&w=1974"
    },
    {
      name: "Piqué Clásico",
      category: "alta",
      composition: "Poliéster / Algodón",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974"
    },

    // FLUIDAS
    {
      name: "Gasa Sublimada",
      category: "fluidas",
      composition: "Poliéster · 120gr",
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1974"
    },
    {
      name: "Chalis Estampado",
      category: "fluidas",
      composition: "Rayón · 140gr",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1974"
    },

    // ESTRUCTURADAS
    {
      name: "Denim Clásico 12oz",
      category: "estructuradas",
      composition: "Algodón 100%",
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1974"
    },
    {
      name: "Drill Industrial",
      category: "estructuradas",
      composition: "Algodón / Poliéster",
      image: "https://images.unsplash.com/photo-1520974735194-5f53a4b8c89b?q=80&w=1974"
    },

    // ABRIGO
    {
      name: "Paño Italiano",
      category: "abrigo",
      composition: "Lana Mezcla · 400gr",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1974"
    },
    {
      name: "Polar Antipilling",
      category: "abrigo",
      composition: "Poliéster · 280gr",
      image: "https://images.unsplash.com/photo-1603251579431-8041406d9d11?q=80&w=1974"
    },

    // MODA
    {
      name: "Seda Satinada",
      category: "moda",
      composition: "Seda / Poliéster",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1974"
    },
    {
      name: "Tul Bordado",
      category: "moda",
      composition: "Poliéster",
      image: "https://images.unsplash.com/photo-1602526217038-7e95e6fcd508?q=80&w=1974"
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