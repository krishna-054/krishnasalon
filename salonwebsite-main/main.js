/* ===================== GLOW & GRACE SALON — MAIN JS ===================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ----- Current Year in Footer ----- */
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  /* ----- Navbar Scroll Effect ----- */
  const navbar = document.getElementById("mainNav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ----- Close Mobile Navbar on Link Click ----- */
  const navLinks = document.querySelectorAll("#navMenu .nav-link, #navMenu .nav-cta");
  const navCollapse = document.getElementById("navMenu");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* ----- Smooth Scrolling (offset for fixed navbar) ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });

  /* ----- Scroll Reveal Animations ----- */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );
  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ----- Animated Counter for Stats ----- */
  const statNumbers = document.querySelectorAll(".stat-number");
  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach(function (el) {
    statObserver.observe(el);
  });

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute("data-target"));
    const suffix = el.getAttribute("data-suffix") || "";
    const isDecimal = el.getAttribute("data-decimal") === "true";
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      if (isDecimal) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /* ----- Booking Form Validation & Submission ----- */
  const bookingForm = document.getElementById("bookingForm");
  const bookingSuccess = document.getElementById("bookingSuccess");
  const resetFormBtn = document.getElementById("resetFormBtn");

  // Set min date to today
  const dateInput = document.getElementById("prefDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate each required field
    const requiredFields = bookingForm.querySelectorAll("[required]");
    requiredFields.forEach(function (field) {
      if (!field.checkValidity()) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    // Email format check
    const emailField = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value && !emailPattern.test(emailField.value)) {
      emailField.classList.add("is-invalid");
      isValid = false;
    }

    // Phone format check
    const phoneField = document.getElementById("phone");
    const phonePattern = /^[0-9+\s-]{10,15}$/;
    if (phoneField.value && !phonePattern.test(phoneField.value)) {
      phoneField.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      bookingForm.classList.add("d-none");
      bookingSuccess.classList.remove("d-none");
      bookingSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // Remove invalid state on input
  bookingForm.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
    field.addEventListener("change", function () {
      this.classList.remove("is-invalid");
    });
  });

  // Reset form to book again
  if (resetFormBtn) {
    resetFormBtn.addEventListener("click", function () {
      bookingForm.reset();
      bookingForm.classList.remove("d-none");
      bookingSuccess.classList.add("d-none");
      bookingForm.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ----- Back to Top Button ----- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----- Active Nav Link on Scroll (Scrollspy enhancement) ----- */
  const sections = document.querySelectorAll("section[id], header[id]");
  const navItems = document.querySelectorAll("#navMenu .nav-link");
  window.addEventListener("scroll", function () {
    let currentSection = "";
    sections.forEach(function (section) {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 120) {
        currentSection = section.getAttribute("id");
      }
    });
    navItems.forEach(function (item) {
      item.classList.remove("active");
      if (item.getAttribute("href") === "#" + currentSection) {
        item.classList.add("active");
      }
    });
  });
});
