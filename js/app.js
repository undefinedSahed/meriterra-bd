/* ================================================
   MARITERRA CORPORATION — Main Application JS
   Renders dynamic content from data files
   ================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderAbout();
  renderMVC();
  renderServices();
  renderGallery();
  renderContactInfo();
  renderFooter();
  initNavigation();
  initScrollAnimations();
  initContactForm();
});

/* ---------- Render Hero Section ---------- */
function renderHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const heroText = hero.querySelector(".hero-text");
  heroText.innerHTML = `
    <p class="hero-welcome">${HERO_DATA.welcome}</p>
    <h1 class="hero-title">${HERO_DATA.company}</h1>
    <p class="hero-established">
      ${HERO_DATA.established}
    </p>
    <h2 class="hero-tagline">${HERO_DATA.tagline1}<br>${HERO_DATA.tagline2}</h2>
    <p class="hero-description">${HERO_DATA.description}</p>
    <div class="hero-values" id="heroValues"></div>
  `;

  const valuesContainer = document.getElementById("heroValues");
  ABOUT_DATA.values.forEach((value) => {
    const badge = document.createElement("div");
    badge.className = "hero-value-badge";
    badge.innerHTML = `
      <span class="badge-icon">✓</span>
      ${value}
    `;
    valuesContainer.appendChild(badge);
  });
}

/* ---------- Render About Section (Separate) ---------- */
function renderAbout() {
  const aboutContent = document.getElementById("aboutContent");
  if (!aboutContent) return;

  let html = "";
  ABOUT_DATA.company.paragraphs.forEach((p, index) => {
    html += `<p class="animate-on-scroll animate-delay-${Math.min(index + 1, 4)}">${p}</p>`;
  });

  html += `<p class="about-contact animate-on-scroll animate-delay-4">${ABOUT_DATA.company.contact.replace(
    "ops@mariterrabd.com",
    '<a href="mailto:ops@mariterrabd.com">ops@mariterrabd.com</a>',
  )}</p>`;

  aboutContent.innerHTML = html;
}

/* ---------- Render Mission / Vision / Commitment ---------- */
function renderMVC() {
  const mvcGrid = document.getElementById("mvcGrid");
  if (!mvcGrid) return;

  const cards = [
    { ...ABOUT_DATA.mission, icon: "◎" },
    { ...ABOUT_DATA.vision, icon: "◉" },
    { ...ABOUT_DATA.commitment, icon: "★" },
  ];

  cards.forEach((card, index) => {
    const el = document.createElement("div");
    el.className = `mvc-card animate-on-scroll animate-delay-${index + 1}`;

    el.innerHTML = `
      <div class="mvc-card-icon">${card.icon}</div>
      <h3 class="mvc-card-title">${card.title}</h3>
      <p class="mvc-card-text">${card.description}</p>
    `;

    mvcGrid.appendChild(el);
  });
}

/* ---------- Render Services Section ---------- */
function renderServices() {
  const servicesGrid = document.getElementById("servicesGrid");
  if (!servicesGrid) return;

  SERVICES_DATA.forEach((service, index) => {
    const card = document.createElement("div");
    card.className = "service-card animate-on-scroll";
    card.style.transitionDelay = `${index * 0.05}s`;
    card.innerHTML = `
      <div class="service-icon">
        <img src="${service.icon}" alt="${service.title}" loading="lazy">
      </div>
      <p class="service-title">${service.title}</p>
    `;
    servicesGrid.appendChild(card);
  });
}

/* ---------- Render Gallery Strip ---------- */
function renderGallery() {
  const gallery = document.getElementById("projectsGallery");
  if (!gallery) return;

  // Use only first 5 items to match the masonry layout
  const itemsToRender = GALLERY_DATA.slice(0, 5);

  itemsToRender.forEach((item, index) => {
    const el = document.createElement("div");
    el.className =
      "project-item animate-on-scroll animate-delay-" + Math.min(index + 1, 4);
    el.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy">`;
    gallery.appendChild(el);
  });
}

/* ---------- Render Contact Info ---------- */
function renderContactInfo() {
  const contactInfo = document.getElementById("contactInfo");
  if (!contactInfo) return;

  contactInfo.innerHTML = `
    <h3 class="contact-info-title">Get In Touch With Us</h3>
    <p class="contact-info-desc">Have a question, project inquiry, or partnership opportunity? We'd love to hear from you. Reach out and our team will respond promptly.</p>

    <div class="contact-detail animate-on-scroll animate-delay-1">
      <div class="contact-detail-icon">📧</div>
      <div class="contact-detail-content">
        <h4>Email</h4>
        <a href="mailto:${CONTACT_DATA.email}">${CONTACT_DATA.email}</a>
      </div>
    </div>

    <div class="contact-detail animate-on-scroll animate-delay-2">
      <div class="contact-detail-icon">📞</div>
      <div class="contact-detail-content">
        <h4>Phone</h4>
        <p>${CONTACT_DATA.phone}</p>
      </div>
    </div>

    <div class="contact-detail animate-on-scroll animate-delay-3">
      <div class="contact-detail-icon">💼</div>
      <div class="contact-detail-content">
        <h4>Corporate Office</h4>
        <p>${CONTACT_DATA.corporate}</p>
      </div>
    </div>

    <div class="contact-detail animate-on-scroll animate-delay-3">
      <div class="contact-detail-icon">🏢</div>
      <div class="contact-detail-content">
        <h4>Dhaka Office</h4>
        <p>${CONTACT_DATA.dhaka}</p>
      </div>
    </div>
  `;
}

/* ---------- Render Footer ---------- */
function renderFooter() {
  const footerValues = document.getElementById("footerValues");
  if (!footerValues) return;

  ABOUT_DATA.footerValues.forEach((val) => {
    const el = document.createElement("span");
    el.className = "footer-value";
    el.textContent = val;
    footerValues.appendChild(el);
  });
}

/* ---------- Contact Form + EmailJS ---------- */
function initContactForm() {
  // Initialize EmailJS — Replace with your actual public key
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: "fzpuRjuKsHJTE-GKo" });
  }

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const formStatus = document.getElementById("formStatus");

    // UI: show loading
    submitBtn.disabled = true;
    btnText.style.display = "none";
    btnLoading.style.display = "inline";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      // EmailJS: Replace SERVICE_ID and TEMPLATE_ID with your actual values
      if (typeof emailjs !== "undefined") {
        await emailjs.sendForm("service_4xmf84b", "template_1c8s5j6", form);
      }

      formStatus.textContent =
        "✓ Message sent successfully! We will get back to you soon.";
      formStatus.className = "form-status success";
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      formStatus.textContent =
        "✗ Failed to send message. Please email us directly at ops@mariterrabd.com";
      formStatus.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = "inline";
      btnLoading.style.display = "none";
    }
  });
}

/* ---------- Navigation ---------- */
function initNavigation() {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const spans = mobileToggle.querySelectorAll("span");
      if (navLinks.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (navLinks) navLinks.classList.remove("open");
      }
    });
  });
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Re-observe after dynamic content is rendered
  setTimeout(() => {
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }, 100);
}
