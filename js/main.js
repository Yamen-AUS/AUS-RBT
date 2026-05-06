/* ========================================
   RBT - REGAL BUS TRANSPORT
   Main JavaScript – Bilingual + Interactions
   ======================================== */

'use strict';

/* ── LANGUAGE DATA ── */
const translations = {
  en: {
    /* Navbar */
    'nav-services': 'Services',
    'nav-safety': 'Safety',
    'nav-fleet': 'Our Fleet',
    'nav-schools': 'Schools',
    'nav-about': 'About Us',
    'nav-contact': 'Contact',
    'nav-book': 'Book Now',
    /* Hero */
    'hero-badge': '🏆 Serving Dubai Since 2009',
    'hero-subtitle': "Dubai's premier independent school transportation provider. GPS-tracked, RTA-certified, and trusted by families across the city.",
    'btn-register': 'Register Your Child',
    'btn-explore': 'Explore Services',
    'trust-rta': 'RTA Certified',
    'trust-gps': 'Live GPS Tracking',
    'trust-cctv': 'CCTV On Every Bus',
    'trust-driver': 'Certified Drivers',
    /* Stats */
    'stat-buses': 'Buses in Fleet',
    'stat-years': 'Years of Excellence',
    'stat-students': 'Students Transported Daily',
    'stat-rta': 'RTA Standard Compliance',
    /* General */
    'send-enquiry': 'Send Enquiry',
    'sending': 'Sending...',
    'form-success': "Thank you! We'll be in touch soon.",
    'submit-booking': 'Submit Registration',
    'booking-sending': 'Sending...',
    'booking-success': 'Thank you! Your registration has been received. We will contact you within 24 hours.',
  },
  ar: {
    /* Navbar */
    'nav-services': 'الخدمات',
    'nav-safety': 'السلامة',
    'nav-fleet': 'أسطولنا',
    'nav-schools': 'المدارس',
    'nav-about': 'من نحن',
    'nav-contact': 'اتصل بنا',
    'nav-book': 'احجز الآن',
    /* Hero */
    'hero-badge': '🏆 نخدم دبي منذ عام 2009',
    'hero-subtitle': 'الشركة المستقلة الرائدة في نقل الطلاب بدبي. أسطول مُجهَّز بنظام GPS، معتمد من هيئة الطرق والمواصلات، وموثوق به لدى عائلات في جميع أنحاء المدينة.',
    'btn-register': 'سجّل طفلك الآن',
    'btn-explore': 'استكشف خدماتنا',
    'trust-rta': 'معتمد من هيئة الطرق',
    'trust-gps': 'تتبع GPS مباشر',
    'trust-cctv': 'كاميرات على كل حافلة',
    'trust-driver': 'سائقون معتمدون',
    /* Stats */
    'stat-buses': 'حافلة في الأسطول',
    'stat-years': 'عام من التميز',
    'stat-students': 'طالب ينقل يومياً',
    'stat-rta': 'امتثال معايير هيئة الطرق',
    /* General */
    'send-enquiry': 'إرسال الاستفسار',
    'sending': 'جارٍ الإرسال...',
    'form-success': 'شكرًا لك! سنتواصل معك قريبًا.',
    'submit-booking': 'إرسال طلب التسجيل',
    'booking-sending': 'جارٍ الإرسال...',
    'booking-success': 'شكرًا لك! تم استلام طلبك. سنتواصل معك خلال 24 ساعة.',
  }
};

/* ── STATE ── */
let currentLang = localStorage.getItem('rbt-lang') || 'en';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initLanguage();
  initCounters();
  initScrollTop();
  initMobileMenu();
  initForms();
});

/* ========================================
   AOS INIT
   ======================================== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
}

/* ========================================
   NAVBAR SCROLL
   ======================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  // Create overlay
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const open = () => {
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) close();
    else open();
  });

  overlay.addEventListener('click', close);

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', close);
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ========================================
   LANGUAGE TOGGLE
   ======================================== */
function initLanguage() {
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ar' : 'en';
      localStorage.setItem('rbt-lang', currentLang);
      applyLanguage(currentLang);
    });
  }
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  const htmlRoot = document.getElementById('html-root');
  const body = document.body;

  // Direction and lang attribute
  htmlRoot.setAttribute('lang', lang);
  htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  body.className = body.className.replace(/lang-(en|ar)/g, '').trim();
  body.classList.add(`lang-${lang}`);

  // Translate all [data-en] / [data-ar] elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) {
      // Only update text if element has no significant children (or is an input placeholder)
      if (el.children.length === 0) {
        el.textContent = text;
      }
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`) || '';
  });

  // Hero title visibility handled by CSS classes
  // Update page title
  if (lang === 'ar') {
    document.title = 'RBT - ريجال للنقل بالحافلات | نقل مدرسي آمن في دبي';
  } else {
    document.title = 'RBT - Regal Bus Transport | Safe School Transportation Dubai';
  }

  // Update button texts via data attributes on specific elements
  updateButtonTexts(lang);
}

function updateButtonTexts(lang) {
  // Update submit buttons
  const submitBtns = document.querySelectorAll('[data-en-submit]');
  submitBtns.forEach(btn => {
    const key = lang === 'ar' ? 'data-ar-submit' : 'data-en-submit';
    if (btn.getAttribute(key)) {
      const span = btn.querySelector('span[data-en]');
      if (span) span.textContent = btn.getAttribute(key);
    }
  });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start = performance.now();
    const isPlus = el.classList.contains('counter-plus');
    const isPercent = el.classList.contains('counter-percent');

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(easeOut(progress) * target);
      el.textContent = value.toLocaleString();

      if (isPlus) el.textContent = value.toLocaleString() + '+';
      if (isPercent) el.textContent = value + '%';

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ========================================
   SCROLL TO TOP
   ======================================== */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ========================================
   FORMS – QUICK ENQUIRY
   ======================================== */
function initForms() {
  initQuickEnquiryForm();
  initBookingForm();
}

function initQuickEnquiryForm() {
  const form = document.getElementById('quick-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('qe-submit');
    const successEl = document.getElementById('qe-success');
    const lang = currentLang;

    // Gather data
    const name = document.getElementById('qe-name')?.value.trim();
    const phone = document.getElementById('qe-phone')?.value.trim();
    const email = document.getElementById('qe-email')?.value.trim();
    const school = document.getElementById('qe-school')?.value.trim();
    const message = document.getElementById('qe-message')?.value.trim();

    if (!name || !phone) {
      alert(lang === 'ar' ? 'يرجى ملء الاسم ورقم الهاتف.' : 'Please fill in your name and phone number.');
      return;
    }

    // Disable button
    submitBtn.disabled = true;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}`;

    try {
      const response = await fetch('tables/booking_enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_name: name,
          phone,
          email,
          school_name: school,
          message,
          language: lang,
          service_type: 'Standard Route',
          status: 'New'
        })
      });

      if (response.ok || response.status === 201) {
        form.reset();
        if (successEl) {
          successEl.style.display = 'flex';
          // Update text based on language
          const textSpan = successEl.querySelector('span');
          if (textSpan) textSpan.textContent = lang === 'ar' ? 'شكرًا لك! سنتواصل معك قريبًا.' : "Thank you! We'll be in touch soon.";
        }
        setTimeout(() => {
          if (successEl) successEl.style.display = 'none';
        }, 6000);
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      alert(lang === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرةً.' : 'Something went wrong. Please try again or contact us directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  });
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('booking-submit');
    const successEl = document.getElementById('booking-success');
    const lang = currentLang;

    // Gather data
    const data = {
      parent_name: document.getElementById('b-parent-name')?.value.trim(),
      email: document.getElementById('b-email')?.value.trim(),
      phone: document.getElementById('b-phone')?.value.trim(),
      student_name: document.getElementById('b-student-name')?.value.trim(),
      school_name: document.getElementById('b-school')?.value.trim(),
      grade: document.getElementById('b-grade')?.value.trim(),
      pickup_area: document.getElementById('b-area')?.value.trim(),
      service_type: document.getElementById('b-service')?.value,
      message: document.getElementById('b-message')?.value.trim(),
      language: lang,
      status: 'New'
    };

    if (!data.parent_name || !data.phone || !data.student_name) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة (*).' : 'Please fill in all required fields (*).');
      return;
    }

    submitBtn.disabled = true;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}`;

    try {
      const response = await fetch('tables/booking_enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok || response.status === 201) {
        form.reset();
        if (successEl) {
          successEl.style.display = 'flex';
          const textSpan = successEl.querySelector('.success-text');
          if (textSpan) {
            textSpan.textContent = lang === 'ar'
              ? 'شكرًا لك! تم استلام طلبك. سنتواصل معك خلال 24 ساعة.'
              : 'Thank you! Your registration has been received. We will contact you within 24 hours.';
          }
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      alert(lang === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  });
}

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90; // navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
