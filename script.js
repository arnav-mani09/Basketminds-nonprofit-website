const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

const stats = document.querySelectorAll(".stat-number");
let statsAnimated = false;

const animateStats = () => {
  if (statsAnimated) return;
  statsAnimated = true;
  stats.forEach((stat) => {
    const target = Number(stat.dataset.target);
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 80));
    const tick = () => {
      current += increment;
      if (current >= target) {
        stat.textContent = target.toLocaleString();
      } else {
        stat.textContent = current.toLocaleString();
        requestAnimationFrame(tick);
      }
    };
    tick();
  });
};

const impactSection = document.getElementById("impact");
const impactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        impactObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

impactObserver.observe(impactSection);

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Please complete all required fields.";
    formStatus.style.color = "var(--red-secondary)";
    return;
  }
  formStatus.textContent = "Thank you! Placeholder: Your message has been received.";
  formStatus.style.color = "var(--gray-500)";
  contactForm.reset();
});
