// LogiAtlas — promotional site interactions

// Initialize Lucide icons
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

// Mobile menu toggle
(function () {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
  // close after clicking a link
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => menu.classList.add('hidden'));
  });
})();

// Sticky navbar background intensify on scroll
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Scroll reveal via IntersectionObserver
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
})();

// Current year in footer
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Count-up animation for stat numbers (optional, lightweight)
(function () {
  const nums = document.querySelectorAll('.stat-number');
  if (!('IntersectionObserver' in window) || nums.length === 0) return;

  const animate = (el) => {
    const text = el.textContent.trim();
    // Extract numeric prefix, keep suffix as-is
    const match = text.match(/^(<?)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const prefix = match[1] || '';
    const target = parseFloat(match[2]);
    const suffix = match[3] || '';
    const duration = 900;
    const start = performance.now();
    const originalHTML = el.innerHTML;

    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const current = target * eased;
      const display = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
      // preserve the styled suffix span if any was in original
      el.textContent = `${prefix}${display}${suffix}`;
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        // restore original rich HTML (to keep colored % etc.)
        el.innerHTML = originalHTML;
      }
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  nums.forEach((n) => io.observe(n));
})();
