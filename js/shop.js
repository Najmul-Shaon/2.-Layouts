/* ============================================
   PRODUCTS / SHOP PAGE JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRODUCT DATA (mirrors HTML) ----
  const products = [
    { id:'p1',  name:'Baby Hand & Feet Gold Frame',  cat:'baby',    price:3499,  rating:5, emoji:'👶' },
    { id:'p2',  name:'Newborn Silver Edition',        cat:'baby',    price:2999,  rating:5, emoji:'🍼' },
    { id:'p3',  name:'Couple Hands Together',         cat:'couple',  price:4499,  rating:5, emoji:'💑' },
    { id:'p4',  name:'Family Together Forever',       cat:'family',  price:5999,  rating:5, emoji:'👨‍👩‍👧‍👦' },
    { id:'p5',  name:'Sibling Bond Casting',          cat:'sibling', price:3799,  rating:5, emoji:'👫' },
    { id:'p6',  name:'Paw Print Keepsake',            cat:'pet',     price:2499,  rating:4, emoji:'🐾' },
    { id:'p7',  name:'Wedding Day Memory',            cat:'wedding', price:6999,  rating:5, emoji:'💍' },
    { id:'p8',  name:'3D Baby Photo Frame Set',       cat:'baby',    price:4999,  rating:5, emoji:'🌸' },
    { id:'p9',  name:'Heart of the Family',           cat:'family',  price:5499,  rating:5, emoji:'🫶' },
    { id:'p10', name:'Anniversary Special Set',       cat:'couple',  price:7499,  rating:5, emoji:'💏' },
    { id:'p11', name:'Twin Impression Set',           cat:'sibling', price:5299,  rating:5, emoji:'🤝' },
    { id:'p12', name:'Baby Shower Gift Box',          cat:'baby',    price:3999,  rating:5, emoji:'🎀' },
  ];

  // ---- SIDEBAR FILTER ----
  const sidebarFilters = document.querySelectorAll('.sidebar-filter-item[data-filter]');
  sidebarFilters.forEach(item => {
    item.addEventListener('click', () => {
      sidebarFilters.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      applyFilters();
    });
  });

  // ---- SORT ----
  const sortSelect = document.querySelector('.sort-select');
  sortSelect?.addEventListener('change', applyFilters);

  // ---- PRICE RANGE ----
  const priceRange = document.getElementById('priceRange');
  const priceVal   = document.getElementById('priceVal');
  priceRange?.addEventListener('input', () => {
    priceVal.textContent = '₹' + parseInt(priceRange.value).toLocaleString('en-IN');
    applyFilters();
  });

  // ---- VIEW TOGGLE ----
  const viewBtns = document.querySelectorAll('.view-btn');
  const grid     = document.getElementById('productGrid');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      grid?.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  });

  // ---- APPLY ALL FILTERS ----
  function applyFilters() {
    const activeCat  = document.querySelector('.sidebar-filter-item.active')?.dataset.filter || 'all';
    const maxPrice   = parseInt(priceRange?.value || 15000);
    const sortVal    = sortSelect?.value || 'Featured';
    const cards      = document.querySelectorAll('.product-card[data-category]');
    const resultCount = document.querySelector('.shop-result-count');

    let visible = 0;
    cards.forEach(card => {
      const cat   = card.dataset.category;
      const price = parseInt(card.dataset.price || 9999);
      const show  = (activeCat === 'all' || cat === activeCat) && price <= maxPrice;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (resultCount) resultCount.innerHTML = `Showing <strong>${visible}</strong> services`;

    // Sort (DOM reorder)
    if (grid) {
      const visibleCards = [...grid.querySelectorAll('.product-card[data-category]')]
        .filter(c => c.style.display !== 'none');

      visibleCards.sort((a, b) => {
        const pA = parseInt(a.dataset.price || 0);
        const pB = parseInt(b.dataset.price || 0);
        if (sortVal.includes('Low to High')) return pA - pB;
        if (sortVal.includes('High to Low')) return pB - pA;
        return 0;
      });

      visibleCards.forEach(c => grid.appendChild(c));
    }
  }

  // ---- CLEAR FILTERS ----
  document.querySelector('.clear-filters-btn')?.addEventListener('click', () => {
    sidebarFilters.forEach(i => i.classList.remove('active'));
    const allFilter = document.querySelector('.sidebar-filter-item[data-filter="all"]');
    if (allFilter) allFilter.classList.add('active');
    if (priceRange) { priceRange.value = 15000; priceVal.textContent = '₹15,000'; }
    document.querySelectorAll('.product-card').forEach(c => c.style.display = '');
    document.querySelectorAll('.active-filter').forEach(f => f.remove());
  });

  // ---- PAGINATION ----
  document.querySelectorAll('.pagination-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ---- SET PRICE DATA ATTR (for sorting) ----
  const priceMap = { p1:3499, p2:2999, p3:4499, p4:5999, p5:3799, p6:2499, p7:6999, p8:4999, p9:5499, p10:7499, p11:5299, p12:3999 };
  document.querySelectorAll('.product-card[data-category]').forEach((card, i) => {
    const id = 'p' + (i + 1);
    if (!card.dataset.price && priceMap[id]) card.dataset.price = priceMap[id];
  });

});