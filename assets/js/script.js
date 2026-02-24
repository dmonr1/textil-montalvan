

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  let current = 0;
  let interval = setInterval(nextSlide, 4000);

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(parseInt(dot.dataset.index));
      interval = setInterval(nextSlide, 3000);
    });
  });

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


  const beneficiosSection = document.querySelector('.beneficios');
  const beneficios = document.querySelectorAll('.beneficio');
  const tituloBeneficios = beneficiosSection.querySelector('h2');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // se activa cuando 30% de la sección aparece
  };

  const beneficiosObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // animar título
        tituloBeneficios.classList.add('show');

        // animar beneficios
        beneficios.forEach((b, index) => {
          setTimeout(() => {
            b.classList.add('show');
          }, index * 200); // retraso entre cada beneficio
        });

        // animar contadores
        const counters = beneficiosSection.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const stepTime = 2000 / target;
          const increment = () => {
            count++;
            counter.textContent = count;
            if (count < target) {
              setTimeout(increment, stepTime);
            }
          };
          increment();
        });

        observer.unobserve(beneficiosSection);
      }
    });
  }, observerOptions);

  beneficiosObserver.observe(beneficiosSection);

  const header = document.querySelector('header');
  header.classList.add('show');


  const cards = document.querySelectorAll('.card-linea');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        // Animación en cascada según el orden
        const index = Array.from(cards).indexOf(card);
        setTimeout(() => {
          card.classList.add('show');
        }, index * 150);
        observer.unobserve(card); // deja de observar después de mostrar
      }
    });
  }, {
    threshold: 0.2 // cuando el 20% de la card sea visible
  });

  cards.forEach(card => observer.observe(card));



  const visitaSection = document.querySelector('.visita-local');
  const contenidoVisita = visitaSection.querySelector('.contenido-visita');

  const visitaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contenidoVisita.classList.add('show');
        observer.unobserve(visitaSection);
      }
    });
  }, { threshold: 0.3 });

  visitaObserver.observe(visitaSection);

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

  /* COLORES */
  const colores = document.querySelectorAll('.color');

  colores.forEach(color => {
    color.addEventListener('click', () => {
      colores.forEach(c => c.classList.remove('activo'));
      color.classList.add('activo');
    });
  });


  const descWrapper = document.querySelector('.descripcion-wrapper');
  const descToggle = document.querySelector('.descripcion-toggle');

  if (descWrapper && descToggle) {
    descToggle.addEventListener('click', () => {
      descWrapper.classList.toggle('active');
    });
  }


  document.querySelectorAll('.gramaje-item').forEach(item => {
    item.addEventListener('click', function () {

        document.querySelectorAll('.gramaje-item')
            .forEach(el => el.classList.remove('active'));

        this.classList.add('active');

    });
});

});