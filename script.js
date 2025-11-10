
/* script.js */
/* Smooth scroll, reveal, navbar toggle, hero slider, popup form */

// ===== RUN AFTER PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function () {

  // ===== HERO SLIDER =====
  const slides = document.querySelectorAll('.hero-slider .slide');
  let index = 0;

  function showSlide() {
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
    });
    slides[index].classList.add('active');
    slides[index].style.opacity = '1';
    index = (index + 1) % slides.length;
  }

  // Show first slide immediately
  showSlide();
  setInterval(showSlide, 4000); // every 4 seconds

  // ===== NAVBAR TOGGLE (Mobile Menu) =====
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
  }

  // Close menu when link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ===== REVEAL ON SCROLL =====
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const setActiveOnScroll = () => {
    const scrollPos = window.scrollY + 90;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        link && link.classList.add('active');
      } else {
        link && link.classList.remove('active');
      }
    });
  };
  window.addEventListener('scroll', setActiveOnScroll);
  setActiveOnScroll();

  // ===== FOOTER YEAR =====
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

// ===== POPUP FORM (Apply Button) =====
const applyBtn = document.getElementById("applyBtn");
const applyPopup = document.getElementById("applyPopup");
const closePopup = document.getElementById("closePopup");
const form = document.getElementById("whatsappForm");

if (applyBtn && applyPopup && closePopup && form) {
  applyBtn.addEventListener("click", () => {
    applyPopup.style.display = "block";
  });

  closePopup.addEventListener("click", () => {
    applyPopup.style.display = "none";
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let studentClass = document.getElementById("class").value;
    let parent = document.getElementById("parent").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    // School WhatsApp Number
    let schoolNumber = "918109716889"; // 91 + your number

    let whatsappMessage = `🎓 *New Admission Enquiry* %0A👦 Student: ${name}%0A🏫 Class: ${studentClass}%0A👨‍👩‍👦 Parent: ${parent}%0A📞 Phone: ${phone}%0A📝 Message: ${message}`;

    window.open(`https://wa.me/${schoolNumber}?text=${whatsappMessage}`, "_blank");

    document.getElementById("successMsg").innerText = "✅ Form submitted successfully!";
    form.reset();

    setTimeout(() => {
      applyPopup.style.display = "none";
      document.getElementById("successMsg").innerText = "";
    }, 2500);
  });
}
