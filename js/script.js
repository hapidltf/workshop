/* ==========================================
   HMTI PROFILE WEBSITE
   File : script.js
========================================== */

/* =====================================================
   ELEMENT SELECTOR
===================================================== */

const navbar = document.querySelector("#navbar");

const hamburger = document.querySelector("#hamburger");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const hamburgerIcon = hamburger ? hamburger.querySelector("i") : null;

const navDropdown = document.querySelector(".nav-dropdown");

const dropdownToggle = navDropdown
  ? navDropdown.querySelector(".nav-link")
  : null;

const dropdownLinks = document.querySelectorAll(".dropdown-menu a");

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);

/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  /*
   * Jalankan navbar scroll sekali
   * ketika halaman pertama kali dibuka.
   */

  handleScroll();
});

/* =====================================================
   HAMBURGER MENU
===================================================== */

function toggleMenu() {
  if (!navMenu || !hamburgerIcon) {
    return;
  }

  navMenu.classList.toggle("show");

  const isMenuOpen = navMenu.classList.contains("show");

  if (isMenuOpen) {
    hamburgerIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    hamburgerIcon.classList.replace("fa-xmark", "fa-bars");
  }
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

function closeMobileMenu() {
  if (!navMenu) {
    return;
  }

  navMenu.classList.remove("show");

  if (navDropdown) {
    navDropdown.classList.remove("open");
  }

  if (hamburgerIcon) {
    hamburgerIcon.className = "fa-solid fa-bars";
  }
}

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    /*
     * Pada mobile, tombol Profil hanya
     * membuka dropdown.
     */

    if (dropdownToggle && link === dropdownToggle && window.innerWidth <= 768) {
      return;
    }

    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");

    closeMobileMenu();
  });
});

/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

function handleScroll() {
  if (!navbar) {
    return;
  }

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleScroll);

/* =====================================================
   MOBILE DROPDOWN
===================================================== */

if (dropdownToggle) {
  dropdownToggle.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      event.preventDefault();

      if (navDropdown) {
        navDropdown.classList.toggle("open");
      }
    }
  });
}

/* =====================================================
   DROPDOWN LINK
===================================================== */

dropdownLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  /*
   * Fallback untuk browser
   * yang tidak mendukung IntersectionObserver.
   */

  revealElements.forEach((element) => {
    element.classList.add("show");
  });
}

/* =====================================================
   VISI & MISI MODAL
===================================================== */

const visionModal = document.querySelector("#visionModal");

const visionMissionButton = document.querySelector("#visionMissionButton");

const visionMissionNav = document.querySelector("#visionMissionNav");

const visionModalClose = document.querySelector("#visionModalClose");

const visionModalOverlay = document.querySelector(".vision-modal-overlay");

/* =====================================================
   OPEN MODAL
===================================================== */

function openVisionModal(event) {
  if (event) {
    event.preventDefault();
  }

  if (!visionModal) {
    return;
  }

  visionModal.classList.add("show");

  document.body.classList.add("modal-open");
}

/* =====================================================
   CLOSE MODAL
===================================================== */

function closeVisionModal() {
  if (!visionModal) {
    return;
  }

  visionModal.classList.remove("show");

  document.body.classList.remove("modal-open");
}

/* =====================================================
   MODAL BUTTON
===================================================== */

if (visionMissionButton) {
  visionMissionButton.addEventListener("click", openVisionModal);
}

/* =====================================================
   MODAL NAVBAR
===================================================== */

if (visionMissionNav) {
  visionMissionNav.addEventListener("click", openVisionModal);
}

/* =====================================================
   MODAL FOOTER
===================================================== */

const footerVisionMission = document.querySelector("#footerVisionMission");

if (footerVisionMission) {
  footerVisionMission.addEventListener("click", openVisionModal);
}

/* =====================================================
   MODAL CLOSE BUTTON
===================================================== */

if (visionModalClose) {
  visionModalClose.addEventListener("click", closeVisionModal);
}

/* =====================================================
   MODAL OVERLAY
===================================================== */

if (visionModalOverlay) {
  visionModalOverlay.addEventListener("click", closeVisionModal);
}

/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVisionModal();

    closeGalleryLightbox();
  }
});

/* =====================================================
   STRUCTURE CARD FLIP
===================================================== */

const structureCards = document.querySelectorAll(".structure-card");

structureCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});

/* =====================================================
   FILTER BERITA
===================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const newsCards = document.querySelectorAll(".news-card");

const newsGrid = document.getElementById("newsGrid");

const newsEmpty = document.getElementById("newsEmpty");

const newsMoreBtn = document.getElementById("newsMoreBtn");

const newsMoreText = document.querySelector(".news-more-text");

let currentFilter = "all";

let showAllNews = false;

/* =====================================================
   UPDATE BERITA
===================================================== */

function updateNews() {
  /*
   * Jika section berita tidak ada,
   * hentikan fungsi.
   */

  if (!newsGrid || !newsEmpty) {
    return;
  }

  const visibleCards = [];

  /* =================================================
     CEK KATEGORI
  ================================================= */

  newsCards.forEach((card) => {
    const categories = card.dataset.category
      ? card.dataset.category.toLowerCase().split(" ")
      : [];

    const matchesFilter =
      currentFilter === "all" || categories.includes(currentFilter);

    if (matchesFilter) {
      visibleCards.push(card);
    }

    /*
     * Sembunyikan semua card
     * sebelum menentukan card mana
     * yang akan ditampilkan.
     */

    card.classList.add("hidden");

    card.classList.remove("limit-hidden");

    card.classList.remove("show-more-animation");
  });

  /* =================================================
     ADA BERITA
  ================================================= */

  if (visibleCards.length > 0) {
    visibleCards.forEach((card, index) => {
      /*
       * Default:
       * hanya tampilkan 3 berita.
       */

      if (!showAllNews && index >= 3) {
        card.classList.add("limit-hidden");

        return;
      }

      card.classList.remove("hidden");

      card.classList.remove("limit-hidden");

      /*
       * Restart animation
       */

      void card.offsetWidth;

      card.classList.add("show-more-animation");
    });

    newsGrid.style.display = "grid";

    newsEmpty.classList.remove("show");

    /* =================================================
       TOMBOL LIHAT SEMUA
    ================================================= */

    if (newsMoreBtn && visibleCards.length > 3) {
      newsMoreBtn.style.display = "inline-flex";
    } else if (newsMoreBtn) {
      newsMoreBtn.style.display = "none";
    }
  } else {
    /* =================================================
       TIDAK ADA BERITA
    ================================================= */

    newsGrid.style.display = "none";

    newsEmpty.classList.add("show");

    if (newsMoreBtn) {
      newsMoreBtn.style.display = "none";
    }
  }

  /* =================================================
     UPDATE TEXT BUTTON
  ================================================= */

  if (newsMoreBtn && newsMoreText) {
    if (showAllNews) {
      newsMoreText.textContent = "Sembunyikan Berita";

      newsMoreBtn.classList.add("expanded");
    } else {
      newsMoreText.textContent = "Lihat Semua Berita";

      newsMoreBtn.classList.remove("expanded");
    }
  }
}

/* =====================================================
   FILTER BUTTON
===================================================== */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    /*
     * Ketika kategori berubah,
     * kembali ke 3 berita.
     */

    showAllNews = false;

    updateNews();
  });
});

/* =====================================================
   BUTTON LIHAT SEMUA
===================================================== */

if (newsMoreBtn) {
  newsMoreBtn.addEventListener("click", () => {
    showAllNews = !showAllNews;

    updateNews();
  });
}

/* =====================================================
   INITIAL NEWS
===================================================== */

updateNews();

/* =====================================================
   READ MORE / READ LESS
===================================================== */

const readMoreButtons = document.querySelectorAll(".news-read-more");

readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".news-card");

    if (!card) {
      return;
    }

    const isExpanded = card.classList.contains("expanded");

    /* =================================================
         COLLAPSE
      ================================================= */

    if (isExpanded) {
      card.classList.remove("expanded");

      button.innerHTML = `
          Baca selengkapnya
          <span>→</span>
        `;
    } else {

    /* =================================================
         EXPAND
      ================================================= */
      card.classList.add("expanded");

      button.innerHTML = `
          Tampilkan lebih sedikit
          <span>↑</span>
        `;
    }
  });
});

/* =====================================================
   GALLERY SLIDESHOW
===================================================== */

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item, itemIndex) => {
  const slides = item.querySelectorAll(".gallery-slide");

  /*
   * Jika hanya ada satu foto,
   * tidak perlu slideshow.
   */

  if (slides.length <= 1) {
    return;
  }

  let currentSlide = 0;

  let slideshowInterval;

  /* =================================================
       GANTI FOTO
    ================================================= */

  function changeSlide() {
    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
  }

  /* =================================================
       START SLIDESHOW
    ================================================= */

  function startSlideshow() {
    /*
     * Setiap gallery memiliki
     * interval sedikit berbeda.
     */

    const delay = 3500 + itemIndex * 450;

    slideshowInterval = setInterval(changeSlide, delay);
  }

  /* =================================================
       STOP SLIDESHOW
    ================================================= */

  function stopSlideshow() {
    clearInterval(slideshowInterval);
  }

  /* =================================================
       HOVER
    ================================================= */

  item.addEventListener("mouseenter", stopSlideshow);

  item.addEventListener("mouseleave", startSlideshow);

  /* =================================================
       START
    ================================================= */

  startSlideshow();
});

/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryLightbox = document.getElementById("galleryLightbox");

const galleryLightboxImage = document.getElementById("galleryLightboxImage");

const galleryLightboxClose = document.getElementById("galleryLightboxClose");

const galleryLightboxPrev = document.getElementById("galleryLightboxPrev");

const galleryLightboxNext = document.getElementById("galleryLightboxNext");

const galleryLightboxCategory = document.getElementById(
  "galleryLightboxCategory",
);

const galleryLightboxTitle = document.getElementById("galleryLightboxTitle");

let currentGalleryImages = [];

let currentGalleryIndex = 0;

/* =====================================================
   BUKA LIGHTBOX
===================================================== */

function openGalleryLightbox(item) {
  if (!galleryLightbox || !galleryLightboxImage) {
    return;
  }

  const slides = Array.from(item.querySelectorAll(".gallery-slide"));

  if (slides.length === 0) {
    return;
  }

  currentGalleryImages = slides;

  /*
   * Ambil foto yang sedang aktif.
   */

  currentGalleryIndex = slides.findIndex((slide) =>
    slide.classList.contains("active"),
  );

  if (currentGalleryIndex < 0) {
    currentGalleryIndex = 0;
  }

  updateLightbox();

  galleryLightbox.classList.add("show");

  document.body.classList.add("modal-open");
}

/* =====================================================
   UPDATE LIGHTBOX
===================================================== */

function updateLightbox() {
  if (!galleryLightboxImage || currentGalleryImages.length === 0) {
    return;
  }

  const currentImage = currentGalleryImages[currentGalleryIndex];

  if (!currentImage) {
    return;
  }

  galleryLightboxImage.src = currentImage.src;

  galleryLightboxImage.alt = currentImage.alt;

  const item = currentImage.closest(".gallery-item");

  if (!item) {
    return;
  }

  const category = item.dataset.category;

  const title = item.dataset.title;

  if (galleryLightboxCategory && category) {
    galleryLightboxCategory.textContent = category;
  }

  if (galleryLightboxTitle && title) {
    galleryLightboxTitle.textContent = title;
  }
}

/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeGalleryLightbox() {
  if (!galleryLightbox) {
    return;
  }

  galleryLightbox.classList.remove("show");

  /*
   * Jangan langsung menghapus modal-open
   * jika Visi & Misi masih terbuka.
   */

  if (!visionModal || !visionModal.classList.contains("show")) {
    document.body.classList.remove("modal-open");
  }
}

/* =====================================================
   FOTO SEBELUMNYA
===================================================== */

function previousGalleryImage() {
  if (currentGalleryImages.length === 0) {
    return;
  }

  currentGalleryIndex--;

  if (currentGalleryIndex < 0) {
    currentGalleryIndex = currentGalleryImages.length - 1;
  }

  updateLightbox();
}

/* =====================================================
   FOTO BERIKUTNYA
===================================================== */

function nextGalleryImage() {
  if (currentGalleryImages.length === 0) {
    return;
  }

  currentGalleryIndex++;

  if (currentGalleryIndex >= currentGalleryImages.length) {
    currentGalleryIndex = 0;
  }

  updateLightbox();
}

/* =====================================================
   CLICK GALLERY
===================================================== */

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openGalleryLightbox(item);
  });
});

/* =====================================================
   LIGHTBOX CLOSE BUTTON
===================================================== */

if (galleryLightboxClose) {
  galleryLightboxClose.addEventListener("click", closeGalleryLightbox);
}

/* =====================================================
   LIGHTBOX PREVIOUS
===================================================== */

if (galleryLightboxPrev) {
  galleryLightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();

    previousGalleryImage();
  });
}

/* =====================================================
   LIGHTBOX NEXT
===================================================== */

if (galleryLightboxNext) {
  galleryLightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();

    nextGalleryImage();
  });
}

/* =====================================================
   CLICK OUTSIDE LIGHTBOX
===================================================== */

if (galleryLightbox) {
  galleryLightbox.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
      closeGalleryLightbox();
    }
  });
}

/* =====================================================
   GALLERY KEYBOARD
===================================================== */

document.addEventListener("keydown", (event) => {
  if (!galleryLightbox || !galleryLightbox.classList.contains("show")) {
    return;
  }

  /* ESC */

  if (event.key === "Escape") {
    closeGalleryLightbox();
  }

  /* KIRI */

  if (event.key === "ArrowLeft") {
    previousGalleryImage();
  }

  /* KANAN */

  if (event.key === "ArrowRight") {
    nextGalleryImage();
  }
});

/* =====================================================
   FOOTER
===================================================== */

/* =====================================================
   TAHUN OTOMATIS
===================================================== */

const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* =========================================================
   DIVISI PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT
    ====================================================== */

    const navbar = document.getElementById("navbar");
    const dock = document.querySelector(".dock");

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    const divisionCards = document.querySelectorAll(".division-card");

    const dropdownToggle =
        document.querySelector(".nav-dropdown-toggle");

    const dropdown =
        document.querySelector(".nav-dropdown");

    const footerYear =
        document.getElementById("footerYear");


    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    function handleNavbarScroll() {

        if (!dock) return;

        if (window.scrollY > 40) {
            dock.classList.add("scrolled");
        } else {
            dock.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();



    /* =====================================================
       HAMBURGER
    ====================================================== */

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("show");

            hamburger.setAttribute(
                "aria-expanded",
                isOpen
            );


            const icon =
                hamburger.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });


        /*
            Tutup menu ketika link dipilih
        */

        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                /*
                    Jangan langsung menutup jika
                    link tersebut adalah dropdown.
                */

                if (
                    !link.classList.contains(
                        "nav-dropdown-toggle"
                    )
                ) {

                    navMenu.classList.remove("show");

                    hamburger.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        hamburger.querySelector("i");

                    if (icon) {

                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");

                    }

                }

            });

        });

    }



    /* =====================================================
       PROFILE DROPDOWN
    ====================================================== */

    if (dropdownToggle && dropdown) {

        dropdownToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                dropdown.classList.toggle("open");

            }
        );


        /*
            Tutup dropdown jika klik di luar
        */

        document.addEventListener(
            "click",
            (event) => {

                if (
                    !dropdown.contains(event.target)
                ) {

                    dropdown.classList.remove("open");

                }

            }
        );

    }



    /* =====================================================
       DIVISION CARD FLIP
    ====================================================== */

    divisionCards.forEach((card) => {

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });


        /*
            Keyboard accessibility
        */

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    card.classList.toggle(
                        "flipped"
                    );

                }

            }
        );

    });



    /* =====================================================
       FOOTER YEAR
    ====================================================== */

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }

});