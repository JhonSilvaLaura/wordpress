document.addEventListener("DOMContentLoaded", function() {
    // Efecto de desvanecimiento al cargar la página
    const elements = document.querySelectorAll('.main-content, .hero h1, .cta-button');

    elements.forEach((element) => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        elements.forEach((element) => {
            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        });
    }, 100);

    // Efecto al hacer scroll
    window.addEventListener("scroll", function() {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) {
            nav.style.height = "50px";
            nav.style.padding = "0 30px";
        } else {
            nav.style.height = "70px";
            nav.style.padding = "0 50px";
        }
    });

    // ScrollSpy para activar secciones del menú
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function activateNavLink() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach(link => link.classList.remove("active"));
        if (index >= 0) {
            navLinks[index].classList.add("active");
        }
    }

    window.addEventListener("scroll", activateNavLink);
    activateNavLink(); // Llamada inicial para activar la sección correcta al cargar la página

    // Carga diferida de imágenes
    const lazyImages = document.querySelectorAll("img.lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });

    // Animaciones de entrada para secciones
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerFadeIn = new IntersectionObserver((entries, observerFadeIn) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerFadeIn.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    fadeInElements.forEach(element => {
        observerFadeIn.observe(element);
    });

    // Mostrar un botón "Volver Arriba" cuando se desplaza hacia abajo
    const backToTopButton = document.createElement("button");
    backToTopButton.className = "back-to-top";
    backToTopButton.innerHTML = "<i class='bx bx-chevron-up'></i>";
    document.body.appendChild(backToTopButton);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Modal para mostrar más información
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const openModalButtons = document.querySelectorAll(".cta-button");
    const closeModalButton = document.getElementById("close-modal");

    openModalButtons.forEach(button => {
        button.addEventListener("click", function() {
            modal.style.display = "block";
            modalContent.innerHTML = "<p>Aquí puedes añadir más contenido sobre tu proyecto, equipo o cualquier otra información relevante.</p>";
        });
    });

    closeModalButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});


// right tooth