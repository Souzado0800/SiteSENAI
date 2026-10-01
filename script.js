(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const state = {
    lastScroll: window.scrollY,
    characterIndex: 0,
    galleryIndex: 0,
    edition: "standard",
    platform: "PC",
    price: 299.90
  };

  /* ---------------------------
     Header / mobile navigation
  ---------------------------- */
  const header = $(".site-header");
  const menuToggle = $(".menu-toggle");
  const nav = $(".site-nav");

  const updateHeader = () => {
    const current = window.scrollY;
    header.classList.toggle("is-scrolled", current > 60);
    header.classList.toggle("is-hidden", current > state.lastScroll && current > 520 && !nav.classList.contains("is-open"));
    state.lastScroll = current;
  };

  menuToggle?.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  $$(".site-nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------
     Reveal / IntersectionObserver
  ---------------------------- */
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

  $$(".reveal").forEach(el => revealObserver.observe(el));

  /* ---------------------------
     Parallax
  ---------------------------- */
  const parallaxItems = $$(".parallax-media");

  const updateParallax = () => {
    const viewport = window.innerHeight;
    parallaxItems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -150 || rect.top > viewport + 150) return;
      const speed = Number(el.dataset.speed || 0.05);
      const offset = (rect.top + rect.height / 2 - viewport / 2) * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      updateHeader();
      updateParallax();
      ticking = false;
    });
    ticking = true;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateHeader();
  updateParallax();

  /* ---------------------------
     Custom cursor + magnetic UI
  ---------------------------- */
  const outer = $(".cursor--outer");
  const inner = $(".cursor--inner");
  let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0;

  if (window.matchMedia("(pointer:fine)").matches && outer && inner) {
    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const cursorLoop = () => {
      outerX += (mouseX - outerX) * 0.14;
      outerY += (mouseY - outerY) * 0.14;
      outer.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
      requestAnimationFrame(cursorLoop);
    };
    cursorLoop();

    $$("a, button, .gallery-shot").forEach(el => {
      el.addEventListener("mouseenter", () => outer.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => outer.classList.remove("is-hovering"));
    });

    $$(".magnetic").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------------------------
     Character experience
  ---------------------------- */
  const characters = [
    {
      name: "Arthur<br>Morgan",
      ghost: "ARTHUR",
      role: "O BRAÇO DIREITO",
      description: "Um experiente fora da lei e homem de confiança de Dutch, forçado a escolher entre a vida violenta que o moldou e a consciência que ainda pode salvá-lo.",
      image: "https://preview.redd.it/arthur-morgan-a-great-man-v0-6tqoe6we3c7f1.jpeg?auto=webp&s=49299ceebd0dd8a818bf974b7951dc3eda45442b",
      alt: "Arthur Morgan"
    },
    {
      name: "Dutch van<br>der Linde",
      ghost: "DUTCH",
      role: "O LÍDER",
      description: "Carismático, idealista e cada vez mais perigoso — um homem cujo sonho intransigente de liberdade começa a ruir e a consumir todos ao seu redor.",
      image: "https://preview.redd.it/dutch-van-der-linde-theories-v0-04x6r6sig7pc1.jpeg?width=1080&crop=smart&auto=webp&s=21f480b946ee4d9315dcb4d2d8abdbe945983e04",
      alt: "Dutch van der Linde"
    },
    {
      name: "John<br>Marston",
      ghost: "JOHN",
      role: "O SOBREVIVENTE",
      description: "Um atirador endurecido tentando construir um futuro além da fumaça dos disparos, das velhas dívidas de lealdade e dos fantasmas do seu passado.",
      image: "https://static.wikia.nocookie.net/reddeadredemption/images/7/73/John_Marston_TBTN_5_Cropped.png/revision/latest?cb=20250808171334",
      alt: "John Marston"
    },
    {
      name: "Sadie<br>Adler",
      ghost: "SADIE",
      role: "A CAÇADORA",
      description: "Destemida, implacável e indomável. Após perder tudo, transformou o luto em fúria e a sobrevivência em uma nova e feroz forma de liberdade.",
      image: "img/sadie.jpg",
      alt: "Sadie Adler"
    },
    {
      name: "Hosea<br>Matthews",
      ghost: "HOSEA",
      role: "A CONSCIÊNCIA",
      description: "O mais experiente companheiro de Dutch. Um mestre da oratória e estrategista lúcido, capaz de enxergar o colapso do bando antes de todos os outros.",
      image: "img/hosea.jpg",
      alt: "Hosea Matthews"
    }
  ];

  const characterImage = $("#characterImage");
  const characterName = $("#characterName");
  const characterGhost = $("#characterGhost");
  const characterRole = $("#characterRole");
  const characterDescription = $("#characterDescription");
  const characterNumber = $("#characterNumber");
  const characterButtons = $$(".character-list button");

  const setCharacter = index => {
    state.characterIndex = (index + characters.length) % characters.length;
    const c = characters[state.characterIndex];

    characterImage.classList.add("is-changing");

    setTimeout(() => {
      characterImage.src = c.image;
      characterImage.alt = c.alt;
      characterName.innerHTML = c.name;
      characterGhost.textContent = c.ghost;
      characterRole.textContent = c.role;
      characterDescription.textContent = c.description;
      characterNumber.textContent = `${String(state.characterIndex + 1).padStart(2, "0")} / ${String(characters.length).padStart(2, "0")}`;
      characterButtons.forEach((btn, i) => btn.classList.toggle("active", i === state.characterIndex));
      characterImage.classList.remove("is-changing");
    }, 230);
  };

  characterButtons.forEach(btn => {
    btn.addEventListener("click", () => setCharacter(Number(btn.dataset.character)));
  });

  $("#charPrev")?.addEventListener("click", () => setCharacter(state.characterIndex - 1));
  $("#charNext")?.addEventListener("click", () => setCharacter(state.characterIndex + 1));

  /* ---------------------------
     Wildlife Compendium Filters
  ---------------------------- */
  const wildlifeFilterBtns = $$(".wildlife-filter-btn");
  const wildlifeCards = $$(".wildlife-card");

  wildlifeFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      wildlifeFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      wildlifeCards.forEach(card => {
        const cat = card.dataset.category || "";
        if (filter === "all" || cat.includes(filter)) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });

  const wildlifeItems = wildlifeCards.map(card => {
    const img = $("img", card);
    const name = $(".wildlife-card__name", card)?.textContent || "";
    const latin = $(".wildlife-card__latin", card)?.textContent || "";
    const habitat = $(".wildlife-card__habitat", card)?.textContent || "";
    const desc = $(".wildlife-card__desc", card)?.textContent || "";
    return {
      src: img ? img.src : "",
      alt: img ? img.alt : name,
      caption: `${name} (${latin}) — ${habitat} · ${desc}`
    };
  });

  /* ---------------------------
     Unified Lightbox (Gallery + Wildlife)
  ---------------------------- */
  const galleryShots = $$(".gallery-shot");
  const galleryItems = galleryShots.map(shot => ({
    src: $("img", shot).src,
    alt: $("img", shot).alt,
    caption: $("span", shot)?.textContent || ""
  }));

  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCaption = $("#lightboxCaption");

  let activeLightboxCollection = galleryItems;
  let activeLightboxIndex = 0;

  const renderLightbox = () => {
    const item = activeLightboxCollection[activeLightboxIndex];
    if (!item) return;
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption;
  };

  const openLightboxWith = (collection, index) => {
    activeLightboxCollection = collection;
    activeLightboxIndex = index;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  galleryShots.forEach((shot, i) => shot.addEventListener("click", () => openLightboxWith(galleryItems, i)));
  wildlifeCards.forEach((card, i) => card.addEventListener("click", () => openLightboxWith(wildlifeItems, i)));

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  $("[data-close-lightbox]")?.addEventListener("click", closeLightbox);
  $("[data-lightbox-prev]")?.addEventListener("click", () => {
    activeLightboxIndex = (activeLightboxIndex - 1 + activeLightboxCollection.length) % activeLightboxCollection.length;
    renderLightbox();
  });
  $("[data-lightbox-next]")?.addEventListener("click", () => {
    activeLightboxIndex = (activeLightboxIndex + 1) % activeLightboxCollection.length;
    renderLightbox();
  });
  lightbox?.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---------------------------
     Trailer modal
  ---------------------------- */
  const videoModal = $("#videoModal");
  const trailerFrame = $("#trailerFrame");
  const trailerURL = "https://www.youtube.com/embed/gmA6MrX81z4?autoplay=1&rel=0";

  const openTrailer = () => {
    trailerFrame.src = trailerURL;
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeTrailer = () => {
    trailerFrame.src = "";
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  $$("[data-open-trailer]").forEach(btn => btn.addEventListener("click", openTrailer));
  $("[data-close-trailer]")?.addEventListener("click", closeTrailer);
  videoModal?.addEventListener("click", e => {
    if (e.target === videoModal) closeTrailer();
  });

  /* ---------------------------
     Keyboard accessibility
  ---------------------------- */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (nav?.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
      }
      if (lightbox?.classList.contains("is-open")) closeLightbox();
      if (videoModal?.classList.contains("is-open")) closeTrailer();
    }

    if (lightbox?.classList.contains("is-open")) {
      if (e.key === "ArrowLeft") {
        activeLightboxIndex = (activeLightboxIndex - 1 + activeLightboxCollection.length) % activeLightboxCollection.length;
        renderLightbox();
      }
      if (e.key === "ArrowRight") {
        activeLightboxIndex = (activeLightboxIndex + 1) % activeLightboxCollection.length;
        renderLightbox();
      }
    }
  });

  /* ---------------------------
     Image Preloading
  ---------------------------- */
  const preloadImages = (urls) => {
    urls.forEach(url => {
      if (!url) return;
      const img = new Image();
      img.decoding = "async";
      img.src = url;
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      preloadImages(characters.map(c => c.image));
      preloadImages(galleryItems.map(g => g.src));
      preloadImages(wildlifeItems.map(w => w.src));
    });
  } else {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloadImages(characters.map(c => c.image));
        preloadImages(galleryItems.map(g => g.src));
        preloadImages(wildlifeItems.map(w => w.src));
      }, 500);
    });
  }
})();

