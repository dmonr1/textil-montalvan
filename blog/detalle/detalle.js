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


    const posts = [
        {
            id: 1,
            category: "Tendencias",
            title: "Colores en tendencia para esta temporada",
            date: "15 Marzo 2026",
            read: "5 min lectura",
            image: "../../assets/imgs/catalogo/tela-1.jpeg",
            content: `
                <div class="article-header">

                        <span class="article-meta">
                            TENDENCIAS · 15 Marzo 2026 · 5 min lectura
                        </span>

                        <h2 class="article-title">
                            La evolución del color en la industria textil
                        </h2>

                </div>

                <p>
                El mercado textil peruano atraviesa una transformación impulsada por nuevas corrientes estéticas,
                sostenibilidad y tecnología. Los colores ya no se eligen únicamente por tendencia, sino por el
                mensaje emocional que transmiten y su coherencia con la identidad de marca.
                </p>

                <p>
                Este año, las paletas cromáticas reflejan una búsqueda de equilibrio entre lo natural y lo
                vibrante. Las marcas están apostando por tonos que conecten con el consumidor moderno,
                que valora autenticidad y expresión individual.
                </p>

                <h2>Colores protagonistas de la temporada</h2>

                <p>
                Entre los tonos más relevantes encontramos los <strong>azules profundos</strong>, asociados
                con confianza y estabilidad; los <strong>verdes orgánicos</strong>, vinculados a sostenibilidad;
                y los <strong>tonos tierra</strong>, que evocan conexión con lo artesanal.
                </p>

                <div class="post-colors">
                            <h4>Colores disponibles</h4>
                        
                            <div class="color-options">
                                <button class="color-circle active" data-name="Rojo Carmesí" style="background:#b11226;"></button>
                                <button class="color-circle" data-name="Verde Oliva" style="background:#6b8e23;"></button>
                                <button class="color-circle" data-name="Azul Marino" style="background:#1e3a5f;"></button>
                                <button class="color-circle" data-name="Beige Arena" style="background:#d8c3a5;"></button>
                                <button class="color-circle" data-name="Negro Profundo" style="background:#111;"></button>
                            </div>
                        
                            <p class="color-name">Rojo Carmesí</p>
                        </div>

                <ul>
                    <li>Azul marino sofisticado</li>
                    <li>Verde oliva natural</li>
                    <li>Terracota moderno</li>
                    <li>Beige arena minimalista</li>
                </ul>

                <h2>Impacto en las colecciones</h2>

                <p>
                Las nuevas colecciones textiles incorporan estas tonalidades en tejidos estructurados,
                fluidos y de alta rotación. La clave está en la versatilidad: colores que funcionen tanto
                en moda casual como en propuestas más formales.
                </p>

                <p>
                Además, la combinación de estas paletas con fibras sostenibles potencia la percepción
                de responsabilidad ambiental, un valor cada vez más determinante en la decisión de compra.
                </p>

                <h2>Conclusión</h2>

                <p>
                La tendencia cromática de esta temporada no es solo estética, sino estratégica.
                Elegir el color correcto puede definir el éxito de una colección y posicionar una marca
                dentro de un mercado altamente competitivo.
                </p>
            `
        },
        {
            id: 2,
            category: "Consejos",
            title: "Cómo elegir la tela ideal para tu colección",
            date: "20 Marzo 2026",
            read: "4 min lectura",
            image: "../../assets/imgs/catalogo/tela-2.jpg",
            content: `

                <div class="article-header">

                        <span class="article-meta">
                            CONSEJOS · 20 Marzo 2026 · 4 min lectura
                        </span>

                        <h2 class="article-title">
                            La importancia de elegir la tela correcta
                        </h2>

                </div>

                <p>
                Seleccionar la tela ideal es uno de los pasos más determinantes en el desarrollo de una colección.
                No se trata únicamente de estética, sino de funcionalidad, durabilidad y coherencia con la identidad
                de la marca.
                </p>

                <p>
                Una elección incorrecta puede afectar la caída de la prenda, su comodidad e incluso la percepción
                de calidad por parte del cliente final.
                </p>

                <h2>Factores técnicos a considerar</h2>

                <p>
                Antes de tomar una decisión, es fundamental analizar aspectos técnicos que influyen directamente
                en el rendimiento del tejido:
                </p>

                <ul>
                    <li><strong>Gramaje:</strong> determina el peso y estructura de la tela.</li>
                    <li><strong>Composición:</strong> algodón, poliéster, lino o mezclas.</li>
                    <li><strong>Elasticidad:</strong> clave en prendas ajustadas o deportivas.</li>
                    <li><strong>Resistencia:</strong> importante para prendas de uso frecuente.</li>
                </ul>

                <h2>Coherencia con la colección</h2>

                <p>
                La tela debe alinearse con el concepto creativo. Una colección minimalista puede requerir tejidos
                estructurados y tonos neutros, mientras que una línea juvenil puede apostar por texturas más
                ligeras y dinámicas.
                </p>

                <p>
                Elegir estratégicamente la materia prima no solo mejora el producto final, sino que fortalece
                la identidad de marca.
                </p>
            `
        },
        {
            id: 3,
            category: "Industria",
            title: "Innovación en textiles sostenibles",
            date: "25 Marzo 2026",
            read: "6 min lectura",
            image: "../../assets/imgs/catalogo/tela-3.jpg",
            content: `

                <div class="article-header">

                        <span class="article-meta">
                            INDUSTRIA · 25 Marzo 2026 · 6 min lectura
                        </span>

                        <h2 class="article-title">
                            Transformación sostenible en el sector textil
                        </h2>

                </div>

                <p>
                La industria textil peruana se encuentra en un proceso de modernización impulsado por la
                sostenibilidad y la innovación tecnológica. Las nuevas generaciones de consumidores
                exigen transparencia y responsabilidad ambiental.
                </p>

                <p>
                Las empresas están implementando procesos más eficientes para reducir el consumo de agua,
                energía y emisiones contaminantes.
                </p>

                <h2>Materiales eco-friendly</h2>

                <p>
                Entre las principales innovaciones destacan:
                </p>

                <ul>
                    <li>Fibras recicladas provenientes de botellas PET</li>
                    <li>Algodón orgánico certificado</li>
                    <li>Tintes biodegradables</li>
                    <li>Procesos de producción con menor impacto ambiental</li>
                </ul>

                <h2>Ventaja competitiva</h2>

                <p>
                Apostar por sostenibilidad no solo responde a una tendencia, sino que se convierte en una
                ventaja competitiva. Las marcas que integran responsabilidad ambiental en su ADN logran
                mayor fidelización y reconocimiento internacional.
                </p>
            `
        },
        {
            id: 4,
            category: "Marcas",
            title: "Marcas textiles que lideran el mercado peruano",
            date: "28 Marzo 2026",
            read: "5 min lectura",
            image: "../../assets/imgs/catalogo/tela-4.jpg",
            content: `

                <div class="article-header">

                        <span class="article-meta">
                            MARCAS · 28 Marzo 2026 · 5 min lectura
                        </span>

                        <h2 class="article-title">
                            Liderazgo textil en el Perú
                        </h2>

                </div>

                <p>
                El Perú cuenta con una sólida tradición textil reconocida a nivel internacional.
                Empresas nacionales han sabido combinar herencia cultural con tecnología de punta,
                posicionándose como referentes en calidad y diseño.
                </p>

                <p>
                La excelencia en fibras como el algodón pima y la alpaca ha permitido destacar
                en mercados altamente competitivos.
                </p>

                <h2>Claves del éxito</h2>

                <ul>
                    <li>Innovación constante en procesos productivos</li>
                    <li>Control de calidad riguroso</li>
                    <li>Enfoque en exportación</li>
                    <li>Adaptabilidad a tendencias globales</li>
                </ul>

                <h2>Proyección internacional</h2>

                <p>
                Gracias a la inversión en tecnología y diseño, muchas marcas peruanas están ampliando
                su presencia en Europa y Norteamérica, consolidando la reputación del país como
                productor textil de alto nivel.
                </p>
            `
        },
        {
            id: 5,
            category: "Marcas",
            title: "Referentes internacionales en moda textil",
            date: "30 Marzo 2026",
            read: "7 min lectura",
            image: "../../assets/imgs/catalogo/tela-5.jpg",
            content: `
                <div class="article-header">

                        <span class="article-meta">
                            MARCAS · 30 Marzo 2026 · 7 min lectura
                        </span>

                        <h2 class="article-title">
                            Referentes globales en innovación textil
                        </h2>

                </div>
                <p>
                A nivel internacional, grandes corporaciones textiles están redefiniendo los estándares
                de producción, incorporando inteligencia artificial, automatización y materiales
                inteligentes en sus procesos.
                </p>

                <p>
                Estas compañías no solo producen telas, sino que desarrollan soluciones tecnológicas
                aplicadas a la moda, el deporte y la industria.
                </p>

                <h2>Tendencias globales</h2>

                <ul>
                    <li>Textiles inteligentes con regulación térmica</li>
                    <li>Producción bajo demanda mediante impresión 3D</li>
                    <li>Digitalización completa de la cadena de suministro</li>
                    <li>Economía circular en la fabricación</li>
                </ul>

                <h2>Impacto en el mercado peruano</h2>

                <p>
                Estas innovaciones influyen directamente en Latinoamérica, impulsando a fabricantes
                locales a modernizarse y competir en un entorno global cada vez más exigente.
                </p>
            `
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get("id"));

    const post = posts.find(p => p.id === postId);

    if (post) {

        document.getElementById("post-category").textContent = post.category;
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-date").textContent = post.date;
        document.getElementById("post-read").textContent = post.read;
        document.getElementById("post-content").innerHTML = post.content;

        document.getElementById("post-hero").style.backgroundImage =
            `url(${post.image})`;

        const currentUrl = window.location.href;

        document.getElementById("share-fb").href =
            `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

        document.getElementById("share-wa").href =
            `https://wa.me/?text=${currentUrl}`;

        document.getElementById("share-ln").href =
            `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;

        // ======================
        // RELACIONADOS
        // ======================

        const relatedContainer = document.getElementById("related-posts");
        relatedContainer.innerHTML = ""; // limpia antes de insertar

        const related = posts
            .filter(p => p.id !== post.id)
            .slice(0, 4);

        related.forEach(item => {
            relatedContainer.innerHTML += `
        <a href="../detalle/?id=${item.id}" class="related-card">
            <img src="${item.image}" alt="${item.title}">
            <span class="related-category">${item.category}</span>
            <h4>${item.title}</h4>
        </a>
    `;
        });
    }

    setTimeout(() => {
        document.querySelector(".post-content-section").classList.add("active");
        document.querySelector(".related-section").classList.add("active");
    }, 150);

    const colorCircles = document.querySelectorAll(".color-circle");
    const colorName = document.querySelector(".color-name");

    colorCircles.forEach(circle => {
        circle.addEventListener("click", () => {

            colorCircles.forEach(c => c.classList.remove("active"));
            circle.classList.add("active");

            colorName.textContent = circle.dataset.name;
        });
    });

    const slider = document.querySelector(".related-slider");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    
    function getScrollAmount() {
        const card = document.querySelector(".related-card");
        const gap = 25; // mismo gap que en CSS
        return card.offsetWidth + gap;
    }
    
    nextBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });
    
    prevBtn.addEventListener("click", () => {
        slider.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });

    // =======================
// DRAG RELATED SLIDER
// =======================

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("dragging");
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("dragging");
});

slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.2; 
    slider.scrollLeft = scrollLeft - walk;
});

// TOUCH MOBILE

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.2;
    slider.scrollLeft = scrollLeft - walk;
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

