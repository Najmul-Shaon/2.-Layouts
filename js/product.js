/* ============================================
   SINGLE PRODUCT PAGE JS
   ============================================ */

   console.log('Product JS Loaded');

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRODUCT GALLERY ----
  const mainBox    = document.getElementById('mainImageBox');
  const mainDisplay = document.querySelector('.product-main-display');
  const thumbs     = document.querySelectorAll('.product-thumb');
  let currentThumb = 0;

  function selectThumb(index) {
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[index]?.classList.add('active');
    if (mainDisplay) mainDisplay.textContent = thumbs[index]?.dataset.emoji || '👶';
    currentThumb = index;
  }

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => selectThumb(i));
  });

  // Arrow nav
  document.querySelector('.prev-img')?.addEventListener('click', () => {
    const next = (currentThumb - 1 + thumbs.length) % thumbs.length;
    selectThumb(next);
  });

  document.querySelector('.next-img')?.addEventListener('click', () => {
    const next = (currentThumb + 1) % thumbs.length;
    selectThumb(next);
  });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') document.querySelector('.prev-img')?.click();
    if (e.key === 'ArrowRight') document.querySelector('.next-img')?.click();
  });

  // Touch swipe on main image
  let touchStartX = 0;
  mainBox?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  mainBox?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0
        ? document.querySelector('.next-img')?.click()
        : document.querySelector('.prev-img')?.click();
    }
  });

  // ---- VARIANT SELECTION ----
  const finishDisplay = document.getElementById('selectedFinish');
  const frameDisplay  = document.getElementById('selectedFrame');

  document.querySelectorAll('.variant-btn[data-value]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.product-variants')
         .querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (finishDisplay) finishDisplay.textContent = btn.dataset.value;
      // Visual feedback on main image
      if (mainDisplay) {
        mainDisplay.style.transform = 'scale(1.08)';
        setTimeout(() => mainDisplay.style.transform = '', 300);
      }
    });
  });

  document.querySelectorAll('.variant-btn[data-frame]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.product-variants')
         .querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (frameDisplay) frameDisplay.textContent = btn.dataset.frame;
    });
  });

  // ---- STICKY ADD TO CART ----
  const stickyAtc   = document.getElementById('stickyAtc');
  const productHero = document.querySelector('.product-hero');

  if (stickyAtc && productHero) {
    const observer = new IntersectionObserver(
      ([entry]) => stickyAtc.classList.toggle('visible', !entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(productHero);
  }

  // ---- MAIN ATC BUTTON ----
  document.getElementById('mainAtcBtn')?.addEventListener('click', () => {
    const qty    = parseInt(document.getElementById('mainQty')?.value) || 1;
    const finish = finishDisplay?.textContent || 'Gold Metallic';
    const frame  = frameDisplay?.textContent  || 'Wooden Frame';

    State.addToCart({
      id:      'p1',
      name:    'Baby Hand & Feet Gold Frame',
      price:   3499,
      emoji:   '👶',
      variant: `${finish} – ${frame}`,
      qty,
    });

    // Animate button
    const btn = document.getElementById('mainAtcBtn');
    const orig = btn.textContent;
    btn.textContent = '✅ Added!';
    btn.style.background = '#22863a';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 1800);
  });

  // ---- WISHLIST ----
  const wishBtn = document.querySelector('.wishlist-btn[data-id]');
  wishBtn?.addEventListener('click', () => {
    const id = wishBtn.dataset.id;
    const added = State.toggleWishlist({ id, name: 'Baby Hand & Feet Gold Frame', price: 3499, emoji: '👶', variant: 'Gold' });
    wishBtn.textContent = added ? '❤️' : '🤍';
    wishBtn.classList.toggle('active', added);
  });

  // Init wishlist button state
  if (wishBtn && State.isInWishlist(wishBtn.dataset.id)) {
    wishBtn.textContent = '❤️';
    wishBtn.classList.add('active');
  }

  // ---- TABS ----
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
    });
  });

  // Jump to reviews tab when review count clicked
  document.querySelector('.product-review-count')?.addEventListener('click', () => {
    document.querySelector('[data-tab="reviews"]')?.click();
    document.querySelector('.product-tabs-section')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- QTY SYNC (main qty <-> sticky qty) ----
  const mainQty   = document.getElementById('mainQty');
  const stickyQty = stickyAtc?.querySelector('.qty-input');

  mainQty?.addEventListener('change', () => {
    if (stickyQty) stickyQty.value = mainQty.value;
  });
  stickyQty?.addEventListener('change', () => {
    if (mainQty) mainQty.value = stickyQty.value;
  });

});