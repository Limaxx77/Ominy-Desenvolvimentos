/* ==========================================
   OMINY DESENVOLVIMENTOS
   Main JavaScript
========================================== */


document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ANO AUTOMÁTICO
    ====================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ======================================
       MENU MOBILE
    ====================================== */

    const menuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            document.body.classList.toggle("menu-open");

        });


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

    }


    /* ======================================
       HEADER AO ROLAR
    ====================================== */

    const header =
        document.getElementById("header");


    function updateHeader() {

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(4, 7, 11, 0.94)";

            header.style.boxShadow =
                "0 10px 40px rgba(0,0,0,.25)";

        } else {

            header.style.background =
                "rgba(4, 7, 11, 0.76)";

            header.style.boxShadow =
                "none";

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();


    /* ======================================
       ANIMAÇÃO AO APARECER NA TELA
    ====================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ======================================
       NAVBAR - SEÇÃO ATIVA
    ====================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link, .liquid-nav .liquid-nav-item"
        );


    function updateNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");


            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateNavigation
    );


    /* Resposta imediata ao tocar (não espera o scroll confirmar) */

    document
        .querySelectorAll(".liquid-nav-item")
        .forEach(item => {

            item.addEventListener("click", () => {

                document
                    .querySelectorAll(".liquid-nav-item")
                    .forEach(el =>
                        el.classList.remove("active")
                    );

                item.classList.add("active");

            });

        });


    /* ======================================
       EFEITO PARALLAX NA LOGO DO HERO
    ====================================== */

    const backgroundLogo =
        document.querySelector(
            ".hero-logo-background"
        );


    window.addEventListener("scroll", () => {

        if (!backgroundLogo) return;


        const scroll =
            window.scrollY;


        if (scroll < 1000) {

            backgroundLogo.style.transform =
                `translateX(-25%)
                 translateY(${scroll * 0.09}px)
                 rotate(-5deg)`;

        }

    });


    /* ======================================
       MOVIMENTO SUAVE DO DASHBOARD
    ====================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.matchMedia(
            "(min-width: 1000px)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    heroVisual
                        .getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 2;


                const rotateX =
                    ((centerY - y) /
                        centerY) * 2;


                const dashboard =
                    heroVisual.querySelector(
                        ".dashboard"
                    );


                if (dashboard) {

                    dashboard.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY - 4}deg)
                        `;

                }

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                const dashboard =
                    heroVisual.querySelector(
                        ".dashboard"
                    );


                if (dashboard) {

                    dashboard.style.transform =
                        `
                        perspective(1200px)
                        rotateY(-4deg)
                        rotateX(1deg)
                        `;

                }

            }
        );

    }


    /* ======================================
       VIDEO MOTION
    ====================================== */

    const ominyVideo =
        document.getElementById("ominyVideo");


    if (ominyVideo) {

        const videoObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        /*
                        Não iniciamos automaticamente
                        com som para respeitar
                        políticas dos navegadores.
                        */

                        if (!entry.isIntersecting) {

                            ominyVideo.pause();

                        }

                    });

                },

                {
                    threshold: 0.25
                }

            );


        videoObserver.observe(ominyVideo);

    }


    /* ======================================
       SMOOTH SCROLL
    ====================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetID =
                    link.getAttribute("href");


                if (
                    targetID === "#" ||
                    !targetID
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) return;


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const position =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });


    /* ======================================
       CARDS - EFEITO DE LUZ
    ====================================== */

    const cards =
        document.querySelectorAll(
            ".service-card, .project-card, .testimonial-card:not(.testimonial-rating)"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.background =
                    `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(121,61,255,.13),
                        transparent 150px
                    ),
                    linear-gradient(
                        145deg,
                        #0e141d,
                        #090e14
                    )
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    });


    /* ======================================
       CLIENTES EM DESTAQUE - TILT NA IMAGEM
    ====================================== */

    const clientMedias =
        document.querySelectorAll(".client-feature-media");


    clientMedias.forEach(media => {

        media.addEventListener("mousemove", event => {

            const rect = media.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY =
                ((x - rect.width / 2) / (rect.width / 2)) * 6;

            const rotateX =
                ((rect.height / 2 - y) / (rect.height / 2)) * 6;

            media.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

        });


        media.addEventListener("mouseleave", () => {

            media.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

        });

    });


    /* ======================================
       TECH: ANIMAÇÕES LIGADAS AO SCROLL
    ====================================== */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* Direção de entrada dos blocos */

    document
        .querySelectorAll(
            ".section-intro.reveal, .hero-content.reveal, .projects-header.reveal"
        )
        .forEach(el => el.classList.add("reveal-left"));

    document
        .querySelectorAll(".hero-visual.reveal")
        .forEach(el => el.classList.add("reveal-right"));


    /* Entrada escalonada dos cards */

    document
        .querySelectorAll(
            ".services-grid, .steps, .projects-grid, .testimonial-cards"
        )
        .forEach(group => {

            group.querySelectorAll(".reveal").forEach((el, i) => {

                el.style.transitionDelay = `${(i % 4) * 110}ms`;

                const clear = e => {

                    if (
                        e.target === el &&
                        e.propertyName === "opacity"
                    ) {

                        el.style.transitionDelay = "";

                        el.removeEventListener(
                            "transitionend",
                            clear
                        );

                    }

                };

                el.addEventListener("transitionend", clear);

            });

        });


    const progressBar =
        document.getElementById("scrollProgress");

    const parallaxItems =
        document.querySelectorAll("[data-parallax]");

    const stepsBox =
        document.querySelector(".steps");

    const stepItems =
        document.querySelectorAll(".step");

    const phoneMockup =
        document.getElementById("phoneMockup");

    const cinematicImage =
        document.getElementById("cinematicImage");


    function scrollEffects() {

        const vh = window.innerHeight;

        const y = window.scrollY;

        const max =
            document.documentElement.scrollHeight - vh;


        /* Barra de progresso da página */

        if (progressBar) {

            progressBar.style.setProperty(
                "--scroll",
                max > 0 ? y / max : 0
            );

        }

        if (reduceMotion) return;


        /* Parallax das imagens de fundo */

        parallaxItems.forEach(el => {

            const r =
                el.parentElement.getBoundingClientRect();

            if (r.bottom < 0 || r.top > vh) return;

            const offset =
                (r.top + r.height / 2 - vh / 2) *
                -parseFloat(el.dataset.parallax);

            el.style.transform =
                `translate3d(0, ${offset}px, 0)`;

        });


        /* Linha do processo se desenhando */

        if (stepsBox) {

            const r =
                stepsBox.getBoundingClientRect();

            const p =
                Math.min(
                    1,
                    Math.max(
                        0,
                        (vh * 0.85 - r.top) / (vh * 0.5)
                    )
                );

            stepsBox.style.setProperty("--p", p);

            stepItems.forEach((step, i) => {

                step.classList.toggle(
                    "done",
                    p > 0.01 &&
                    p >= i / (stepItems.length - 1) - 0.02
                );

            });

        }


        /* Celular girando suavemente ao passar pela tela */

        if (phoneMockup) {

            const r =
                phoneMockup.getBoundingClientRect();

            const t =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        (r.top + r.height / 2 - vh / 2) / vh
                    )
                );

            phoneMockup.style
                .setProperty("--ry", (-14 * t).toFixed(2));

            phoneMockup.style
                .setProperty("--rx", (8 * t).toFixed(2));

        }



        /* Cena final: zoom que se afasta até a imagem ficar inteira */

        if (cinematicImage) {

            const r =
                cinematicImage.parentElement.getBoundingClientRect();

            const p =
                Math.min(
                    1,
                    Math.max(
                        0,
                        (vh - r.top) / (vh + r.height)
                    )
                );

            const scale =
                1.08 - 0.08 * Math.min(1, p * 2);

            cinematicImage.style.transform =
                `scale(${scale.toFixed(4)})`;

        }

    }


    let scrollTicking = false;

    function onScroll() {

        if (scrollTicking) return;

        scrollTicking = true;

        requestAnimationFrame(() => {

            scrollEffects();

            scrollTicking = false;

        });

    }


    window.addEventListener(
        "scroll",
        onScroll,
        { passive: true }
    );

    window.addEventListener("resize", onScroll);

    scrollEffects();


});
