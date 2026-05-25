document.addEventListener("DOMContentLoaded", () => {
  // ─── LUCIDE ICONS ────────────────────────────────────────────────────────
  if (window.lucide) window.lucide.createIcons();

  // ─── FOOTER YEAR ────────────────────────────────────────────────────────
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── HEADER SCROLL ───────────────────────────────────────────────────────
  const header = document.getElementById("site-header");
  const handleHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  // ─── MENU MOBILE ─────────────────────────────────────────────────────────
  const menuToggle = document.getElementById("menuToggle");
  const navMobile  = document.getElementById("navMobile");
  const menuIcon   = document.getElementById("menuIcon");

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMobile.classList.toggle("active");
      navMobile.hidden = !isOpen;
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      if (menuIcon) {
        menuIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
        if (window.lucide) window.lucide.createIcons();
      }
    });

    navMobile.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("active");
        navMobile.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        if (menuIcon) {
          menuIcon.setAttribute("data-lucide", "menu");
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });
  }

  // ─── MARQUEE INFINITO ────────────────────────────────────────────────────
  const marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) marqueeTrack.innerHTML += marqueeTrack.innerHTML;

  // ─── POPUP INICIAL ───────────────────────────────────────────────────────
  const welcomeModal   = document.getElementById("welcomeModal");
  const closeWelcome   = document.getElementById("closeWelcome");
  const enterSite      = document.getElementById("enterSite");
  const welcomeOverlay = document.getElementById("welcomeOverlay");

  const closeModal = () => {
    if (!welcomeModal) return;
    welcomeModal.classList.add("hidden");
    welcomeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  if (welcomeModal) document.body.classList.add("modal-open");
  closeWelcome?.addEventListener("click", closeModal);
  enterSite?.addEventListener("click", closeModal);
  welcomeOverlay?.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // ─── CURSOR GLOW ─────────────────────────────────────────────────────────
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  (function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
    requestAnimationFrame(animateCursor);
  })();

  // ─── ADVANCED SCROLL REVEAL ──────────────────────────────────────────────
  // Assign stagger delays to sibling .reveal elements inside grids
  document.querySelectorAll(".grid, .bento").forEach(grid => {
    const children = grid.querySelectorAll(".reveal");
    children.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // ─── SECTION TITLE CHAR SPLIT ANIMATION ──────────────────────────────────
  document.querySelectorAll(".section-head h2, .hero h1, .final-cta-inner h2").forEach(heading => {
    heading.classList.add("split-heading");
    const html = heading.innerHTML;

    // Only split pure text nodes, preserve child elements (span, etc.)
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    // Walk only if the heading has no complex children (just text or .highlight span)
    const hasOnlyTextAndHighlight = [...wrapper.childNodes].every(
      n => n.nodeType === 3 || (n.nodeType === 1 && n.classList.contains("highlight"))
    );

    if (!hasOnlyTextAndHighlight) return;

    heading.innerHTML = "";
    wrapper.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        // text node – wrap each word
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part.trim()) {
            heading.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          word.className = "word-reveal";
          word.textContent = part;
          heading.appendChild(word);
        });
      } else {
        heading.appendChild(node.cloneNode(true));
      }
    });
  });

  // Observe headings for word-reveal
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".word-reveal").forEach((word, i) => {
          word.style.animationDelay = `${i * 0.06}s`;
          word.classList.add("word-revealed");
        });
        headingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".split-heading").forEach(h => headingObserver.observe(h));

  // ─── PARALLAX HERO ELEMENTS ───────────────────────────────────────────────
  const heroSection = document.querySelector(".hero");
  const heroImg     = document.querySelector(".hero-img");
  const heroOrbs    = document.querySelectorAll(".orb");

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const rect     = heroSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const progress = scrolled / window.innerHeight;

      if (heroImg) {
        heroImg.style.transform = `translateY(${progress * 40}px) scale(${1 - progress * 0.04})`;
      }
      heroOrbs.forEach((orb, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        orb.style.transform = `translateY(${progress * 60 * dir}px)`;
      });
    }, { passive: true });
  }

  // ─── CARD MAGNETIC HOVER ─────────────────────────────────────────────────
  document.querySelectorAll(".card.service, .card.plan, .card.benefit").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = dy * -6;
      const rotY   = dx *  6;

      card.style.transform   = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      card.style.transition  = "transform 0.1s ease";

      // Subtle inner shine
      const shine = card.querySelector(".card-shine");
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${((dx + 1) / 2) * 100}% ${((dy + 1) / 2) * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform  = "";
      card.style.transition = "transform 0.45s ease, border-color 0.25s ease";
      const shine = card.querySelector(".card-shine");
      if (shine) shine.style.background = "none";
    });

    // Add shine layer
    const shine = document.createElement("div");
    shine.className = "card-shine";
    card.appendChild(shine);
  });

  // ─── COUNTER ANIMATION ───────────────────────────────────────────────────
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || "";
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll("[data-target]").forEach(el => counterObserver.observe(el));

  // ─── SMOOTH ANCHOR SCROLL ────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const id  = anchor.getAttribute("href").slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 88;
      const top     = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ─── FAB PULSE ON SCROLL ─────────────────────────────────────────────────
  const fab = document.querySelector(".fab-whatsapp");
  if (fab) {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY + 50) {
        fab.classList.add("fab-hidden");
      } else if (currentY < lastScrollY - 10) {
        fab.classList.remove("fab-hidden");
      }
      lastScrollY = currentY;
    }, { passive: true });
  }

  // ─── PROGRESS BAR (LEITURA) ──────────────────────────────────────────────
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled   = window.scrollY;
    const pct        = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }, { passive: true });

  // ─── PLAN CARD HOVER GLOW ────────────────────────────────────────────────
  document.querySelectorAll(".card.plan").forEach(plan => {
    plan.addEventListener("mouseenter", () => {
      plan.style.boxShadow = "0 24px 70px rgba(168,85,247,0.28), 0 0 0 1px rgba(168,85,247,0.3)";
    });
    plan.addEventListener("mouseleave", () => {
      plan.style.boxShadow = "";
    });
  });

  // ─── SECTION ENTRANCE LINES ──────────────────────────────────────────────
  // Animated decorative line that grows when section enters viewport
  document.querySelectorAll(".section-head .eyebrow").forEach(eyebrow => {
    eyebrow.classList.add("eyebrow-anim");
  });

  // ─── REINIT ICONS AFTER DYNAMIC CHANGES ─────────────────────────────────
  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 300);
});
