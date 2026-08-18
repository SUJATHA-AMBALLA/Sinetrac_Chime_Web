// Sinetrac site — shared interactions
document.addEventListener('DOMContentLoaded', function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Light-only site: theme switching intentionally removed.

  // Mobile navigation
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Gallery filter
  var filterBtns = document.querySelectorAll('.gal-filter button');
  var galItems = document.querySelectorAll('.gal-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-cat');
      galItems.forEach(function (item) {
        var show = cat === 'all' || item.getAttribute('data-cat') === cat;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // Tabs (Approvals & Registrations)
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.tabs').parentElement;
      group.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      group.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  // Simple price-calculator estimate on footer form (illustrative only)
  var footerForm = document.querySelector('.footer-form');
  if (footerForm) {
    footerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks — your enquiry has been noted. Our engineering team will call you back to confirm the exact kVA rating and price. (Demo form — connect this to your CRM/email service before going live.)');
      footerForm.reset();
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks — we\u2019ve received your message and will respond shortly. (Demo form — connect this to your CRM/email service before going live.)');
      contactForm.reset();
    });
  }

  // ---- Modern scroll-reveal (fade + rise into view) ----
  var revealTargets = document.querySelectorAll(
    '.card, .section-head, .badge, .tl-item, .credbar .stat, .marquee-item, .gal-item, .dl-row'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---- Lazy-load pattern for any future <img data-src="..."> ----
  // When real photography is added, use: <img data-src="images/xyz.jpg" class="lazy-img" alt="...">
  // (or simply add loading="lazy" decoding="async" to a normal <img src="..."> — both are supported.)
  var lazyImgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window && lazyImgs.length) {
    var imgIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.addEventListener('load', function () { img.classList.add('loaded'); });
          imgIO.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyImgs.forEach(function (img) { imgIO.observe(img); });
  }
});
