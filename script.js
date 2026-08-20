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

  const toggleMenu = (shouldOpen) => {
    const open = typeof shouldOpen === "boolean" ? shouldOpen : !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    header?.classList.toggle("nav-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    document.body.classList.toggle("modal-open", open);
  };

  menuToggle?.addEventListener("click", () => toggleMenu());

  $$(".site-nav a").forEach(link => {
    link.addEventListener("click", () => {
      toggleMenu(false);
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
      image: "https://scontent-gru1-1.xx.fbcdn.net/v/t39.30808-6/608845844_1266555941951004_3976551202829362885_n.jpg?stp=dst-jpg_tt6&cstp=mx1738x2048&ctp=s1738x2048&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-y714_pVSU8Q7kNvwGWxDfb&_nc_oc=AdqVq_OqR05hohx9rOvPZtoXo_tdQPAVS-MLWCCdE-ks0t0_UNCSbwC0ucqkDlP7fkFePWKQObQ38agueuUxInnr&_nc_zt=23&_nc_ht=scontent-gru1-1.xx&_nc_gid=BC3CBhqmC3wbc_nNkmDtYA&_nc_ss=7b289&oh=00_AQHu-eHnL4p7esP284FkgTI_xN53O9R9aD4kOJ7LdpZ87A&oe=6A8CF8DE",
      alt: "Sadie Adler"
    },
    {
      name: "Hosea<br>Matthews",
      ghost: "HOSEA",
      role: "A CONSCIÊNCIA",
      description: "O mais experiente companheiro de Dutch. Um mestre da oratória e estrategista lúcido, capaz de enxergar o colapso do bando antes de todos os outros.",
      image: "https://scontent-gru1-2.cdninstagram.com/v/t51.82787-15/639475501_18562364992029885_7075735183521946343_n.webp?_nc_cat=108&ig_cache_key=MzgzNTIwMjAzOTM3OTE1MDIzOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=60wQVestt-oQ7kNvwGrxak-&_nc_oc=Adox8UngDirb5_CqOcqpDmrmK1CdhDGTLQnnqbOFmACNv3ai-rCCTeHJP-GCX6B78UbSwfXW4Xui2QT0s8hytGgS&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-gru1-2.cdninstagram.com&_nc_gid=hQGgjOIRCKoLa4rp8SKCcA&_nc_ss=7a22e&oh=00_AQHkA3_jNAcGVDh1JgGYBOQvGBCNrTmGViSD0efUoxkYIQ&oe=6A8D0F4B",
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
     Gallery lightbox
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

  const renderLightbox = () => {
    const item = galleryItems[state.galleryIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption;
  };

  const openLightbox = index => {
    state.galleryIndex = index;
    renderLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  galleryShots.forEach((shot, i) => shot.addEventListener("click", () => openLightbox(i)));
  $("[data-close-lightbox]")?.addEventListener("click", closeLightbox);
  $("[data-lightbox-prev]")?.addEventListener("click", () => {
    state.galleryIndex = (state.galleryIndex - 1 + galleryItems.length) % galleryItems.length;
    renderLightbox();
  });
  $("[data-lightbox-next]")?.addEventListener("click", () => {
    state.galleryIndex = (state.galleryIndex + 1) % galleryItems.length;
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
  const trailerURL = "https://www.youtube.com/embed/eaW0tYpxyp0?autoplay=1&rel=0";

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
      if (nav?.classList.contains("is-open")) toggleMenu(false);
      if (lightbox?.classList.contains("is-open")) closeLightbox();
      if (videoModal?.classList.contains("is-open")) closeTrailer();
    }

    if (lightbox?.classList.contains("is-open")) {
      if (e.key === "ArrowLeft") {
        state.galleryIndex = (state.galleryIndex - 1 + galleryItems.length) % galleryItems.length;
        renderLightbox();
      }
      if (e.key === "ArrowRight") {
        state.galleryIndex = (state.galleryIndex + 1) % galleryItems.length;
        renderLightbox();
      }
    }
  });

  /* ---------------------------
     Image Preloading & High-Res Optimization
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
    });
  } else {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloadImages(characters.map(c => c.image));
        preloadImages(galleryItems.map(g => g.src));
      }, 500);
    });
  }
})();

