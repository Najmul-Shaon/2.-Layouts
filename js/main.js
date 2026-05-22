/* ============================================
   FREEZE MEMORIES - GLOBAL JAVASCRIPT
   ============================================ */

   console.log('Main JS Loaded');

// ============================================
// UTILITY FUNCTIONS
// ============================================

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================
// STATE MANAGEMENT
// ============================================

const State = {
  cart: JSON.parse(localStorage.getItem("fm_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("fm_wishlist") || "[]"),

  saveCart() {
    localStorage.setItem("fm_cart", JSON.stringify(this.cart));
  },
  saveWishlist() {
    localStorage.setItem("fm_wishlist", JSON.stringify(this.wishlist));
  },

  addToCart(product) {
    const idx = this.cart.findIndex(
      (i) => i.id === product.id && i.variant === product.variant,
    );
    if (idx >= 0) {
      this.cart[idx].qty += product.qty || 1;
    } else {
      this.cart.push({ ...product, qty: product.qty || 1 });
    }
    this.saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`, "success");
  },

  removeFromCart(id, variant) {
    this.cart = this.cart.filter(
      (i) => !(i.id === id && i.variant === variant),
    );
    this.saveCart();
    updateCartUI();
  },

  updateQty(id, variant, qty) {
    const idx = this.cart.findIndex(
      (i) => i.id === id && i.variant === variant,
    );
    if (idx >= 0) {
      if (qty <= 0) {
        this.removeFromCart(id, variant);
        return;
      }
      this.cart[idx].qty = qty;
      this.saveCart();
      updateCartUI();
    }
  },

  getCartTotal() {
    return this.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCartCount() {
    return this.cart.reduce((sum, i) => sum + i.qty, 0);
  },

  toggleWishlist(product) {
    const idx = this.wishlist.findIndex((i) => i.id === product.id);
    if (idx >= 0) {
      this.wishlist.splice(idx, 1);
      showToast(`${product.name} removed from wishlist`, "info");
    } else {
      this.wishlist.push(product);
      showToast(`${product.name} added to wishlist! 💕`, "success");
    }
    this.saveWishlist();
    updateWishlistUI();
    return idx < 0;
  },

  isInWishlist(id) {
    return this.wishlist.some((i) => i.id === id);
  },
};

// ============================================
// ANNOUNCEMENT BAR
// ============================================

function initAnnouncementBar() {
  const bar = $(".announcement-bar");
  const closeBtn = $(".announcement-close");
  if (!bar) return;

  const hidden = sessionStorage.getItem("fm_announcement_hidden");
  if (hidden) bar.style.display = "none";

  closeBtn?.addEventListener("click", () => {
    bar.style.transform = "translateY(-100%)";
    bar.style.transition = "transform 0.3s ease";
    setTimeout(() => {
      bar.style.display = "none";
    }, 300);
    sessionStorage.setItem("fm_announcement_hidden", "1");
  });
}

// ============================================
// NAVBAR
// ============================================

function initNavbar() {
  const navbar = $(".navbar");
  if (!navbar) return;

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    debounce(() => {
      const current = window.scrollY;
      navbar.classList.toggle("scrolled", current > 10);
      lastScroll = current;
    }, 50),
  );

  // Hamburger / mobile menu
  const hamburger = $(".hamburger");
  const mobileMenu = $(".mobile-menu");
  const overlay = $(".overlay");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu?.classList.toggle("open");
    overlay?.classList.toggle("active");
    document.body.style.overflow = mobileMenu?.classList.contains("open")
      ? "hidden"
      : "";
  });

  $(".mobile-menu-close")?.addEventListener("click", closeMobileMenu);
  overlay?.addEventListener("click", closeMobileMenu);

  function closeMobileMenu() {
    hamburger?.classList.remove("active");
    mobileMenu?.classList.remove("open");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Active nav link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  $$(".nav-link, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(currentPath)) link.classList.add("active");
  });
}

// ============================================
// CART UI
// ============================================

function updateCartUI() {
  const count = State.getCartCount();
  $$(".navbar-badge").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
  renderCartDrawer();
}

function renderCartDrawer() {
  const body = $(".cart-drawer-body");
  const footer = $(".cart-drawer-footer");
  if (!body) return;

  if (State.cart.length === 0) {
    body.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some beautiful casting memories to your cart!</p>
        <a href="products.html" class="btn btn-primary mt-4">Explore Services</a>
      </div>
    `;
    if (footer) footer.innerHTML = "";
    return;
  }

  body.innerHTML = State.cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item-image">${item.emoji || "🎁"}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        ${item.variant ? `<div class="cart-item-variant">${item.variant}</div>` : ""}
        <div class="flex items-center justify-between mt-4">
          <div class="qty-selector">
            <button class="qty-btn" onclick="State.updateQty('${item.id}', '${item.variant}', ${item.qty - 1})">−</button>
            <input class="qty-input" type="number" value="${item.qty}" min="1" 
              onchange="State.updateQty('${item.id}', '${item.variant}', parseInt(this.value))">
            <button class="qty-btn" onclick="State.updateQty('${item.id}', '${item.variant}', ${item.qty + 1})">+</button>
          </div>
          <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
        </div>
      </div>
      <button class="cart-item-remove" onclick="State.removeFromCart('${item.id}', '${item.variant}')">✕</button>
    </div>
  `,
    )
    .join("");

  const total = State.getCartTotal();
  if (footer) {
    footer.innerHTML = `
      <div class="cart-totals">
        <div class="cart-total-row">
          <span>Subtotal</span>
          <span>${formatPrice(total)}</span>
        </div>
        <div class="cart-total-row">
          <span>Shipping</span>
          <span class="text-primary" style="color:var(--color-primary)">Free</span>
        </div>
        <div class="cart-total-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>
      <a href="checkout.html" class="btn btn-primary" style="width:100%;justify-content:center;margin-bottom:var(--space-2)">Proceed to Checkout</a>
      <a href="cart.html" class="btn btn-outline" style="width:100%;justify-content:center">View Full Cart</a>
    `;
  }
}

function initCartDrawer() {
  const cartBtn = $(".cart-toggle-btn");
  const drawer = $(".cart-drawer");
  const overlay = $(".overlay");

  cartBtn?.addEventListener("click", () => {
    drawer?.classList.toggle("open");
    overlay?.classList.toggle("active");
    document.body.style.overflow = drawer?.classList.contains("open")
      ? "hidden"
      : "";
  });

  $(".cart-drawer-close")?.addEventListener("click", () => {
    drawer?.classList.remove("open");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
  });

  updateCartUI();
}

// ============================================
// WISHLIST UI
// ============================================

function updateWishlistUI() {
  const count = State.wishlist.length;
  $$(".wishlist-count").forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });

  $$(".wishlist-btn[data-id]").forEach((btn) => {
    const id = btn.dataset.id;
    btn.classList.toggle("active", State.isInWishlist(id));
  });
}

// ============================================
// SEARCH OVERLAY
// ============================================

function initSearch() {
  const searchBtns = $$(".search-toggle");
  const overlay = $(".search-overlay");
  const input = $(".search-input");

  searchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      overlay?.classList.add("open");
      setTimeout(() => input?.focus(), 100);
    });
  });

  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay?.classList.remove("open");
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      overlay?.classList.add("open");
      setTimeout(() => input?.focus(), 100);
    }
  });

  input?.addEventListener("input", debounce(handleSearch, 300));

  function handleSearch(e) {
    const q = e.target.value.trim();
    const suggestions = $(".search-suggestions");
    if (!suggestions) return;
    if (q.length < 2) {
      suggestions.style.display = "none";
      return;
    }
    suggestions.style.display = "block";
    const results = getSearchResults(q);
    suggestions.innerHTML =
      results
        .map(
          (r) => `
      <div class="search-suggestion-item" onclick="window.location='${r.url}'">
        <span>${r.icon}</span>
        <div>
          <div style="font-weight:600;font-size:0.875rem">${r.title}</div>
          <div style="font-size:0.75rem;color:var(--color-text-light)">${r.category}</div>
        </div>
      </div>
    `,
        )
        .join("") ||
      '<div style="padding:1rem;text-align:center;color:var(--color-text-light)">No results found</div>';
  }

  function getSearchResults(q) {
    const items = [
      {
        title: "Baby Casting",
        category: "Service",
        url: "product.html",
        icon: "👶",
      },
      {
        title: "Couple Casting",
        category: "Service",
        url: "product.html",
        icon: "💑",
      },
      {
        title: "Family Casting",
        category: "Service",
        url: "product.html",
        icon: "👨‍👩‍👧‍👦",
      },
      {
        title: "Sibling Casting",
        category: "Service",
        url: "product.html",
        icon: "👫",
      },
      {
        title: "Photo Gallery",
        category: "Page",
        url: "products.html",
        icon: "🖼️",
      },
      { title: "About Us", category: "Page", url: "about.html", icon: "📖" },
      { title: "Contact", category: "Page", url: "contact.html", icon: "📞" },
      {
        title: "Video Gallery",
        category: "Gallery",
        url: "products.html",
        icon: "🎥",
      },
    ];
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q.toLowerCase()) ||
        i.category.toLowerCase().includes(q.toLowerCase()),
    );
  }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = "success", duration = 3500) {
  let container = $(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const icons = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || "📢"}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ============================================
// SCROLL REVEAL
// ============================================

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  $$(".reveal, .reveal-left, .reveal-right").forEach((el) =>
    observer.observe(el),
  );
}

// ============================================
// SCROLL TO TOP
// ============================================

function initScrollTop() {
  const btn = $(".scroll-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
// QUANTITY SELECTOR
// ============================================

function initQtySelectors() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-btn")) {
      const selector = e.target.closest(".qty-selector");
      const input = selector?.querySelector(".qty-input");
      if (!input) return;
      const current = parseInt(input.value) || 1;
      const isPlus = e.target.textContent === "+";
      const newVal = isPlus ? current + 1 : Math.max(1, current - 1);
      input.value = newVal;
      input.dispatchEvent(new Event("change"));
    }
  });
}

// ============================================
// SLIDER / CAROUSEL
// ============================================

class Slider {
  constructor(el, options = {}) {
    this.el = typeof el === "string" ? $(el) : el;
    if (!this.el) return;

    this.track = this.el.querySelector(".slider-track");
    this.slides = [...this.el.querySelectorAll(".slide")];
    this.prevBtn = this.el.querySelector(".slider-prev");
    this.nextBtn = this.el.querySelector(".slider-next");
    this.dotsContainer = this.el.querySelector(".slider-dots");

    this.current = 0;
    this.total = this.slides.length;
    this.auto = options.auto !== false;
    this.interval = options.interval || 4500;
    this.timer = null;

    this.init();
  }

  init() {
    this.buildDots();
    this.update();
    this.prevBtn?.addEventListener("click", () => this.prev());
    this.nextBtn?.addEventListener("click", () => this.next());
    if (this.auto) this.startAuto();
    this.el.addEventListener("mouseenter", () => this.stopAuto());
    this.el.addEventListener("mouseleave", () => this.startAuto());
    this.initTouch();
  }

  buildDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = this.slides
      .map(
        (_, i) =>
          `<button class="slider-dot ${i === 0 ? "active" : ""}" data-i="${i}"></button>`,
      )
      .join("");
    this.dotsContainer.addEventListener("click", (e) => {
      if (e.target.dataset.i !== undefined) this.goTo(+e.target.dataset.i);
    });
  }

  update() {
    if (this.track) {
      this.track.style.transform = `translateX(-${this.current * 100}%)`;
    }
    this.slides.forEach((s, i) =>
      s.classList.toggle("active", i === this.current),
    );
    this.dotsContainer?.querySelectorAll(".slider-dot").forEach((d, i) => {
      d.classList.toggle("active", i === this.current);
    });
  }

  next() {
    this.goTo((this.current + 1) % this.total);
  }
  prev() {
    this.goTo((this.current - 1 + this.total) % this.total);
  }
  goTo(i) {
    this.current = i;
    this.update();
  }

  startAuto() {
    this.timer = setInterval(() => this.next(), this.interval);
  }
  stopAuto() {
    clearInterval(this.timer);
  }

  initTouch() {
    let startX;
    this.el.addEventListener(
      "touchstart",
      (e) => (startX = e.touches[0].clientX),
      { passive: true },
    );
    this.el.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    });
  }
}

// ============================================
// PRODUCT GALLERY (ZOOM / LIGHTBOX)
// ============================================

function initProductGallery() {
  const mainImg = $(".product-main-image");
  const thumbs = $$(".product-thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      if (mainImg) mainImg.src = thumb.dataset.full || thumb.src;
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}

// ============================================
// COUPON FIELD
// ============================================

function initCouponField() {
  const couponForm = $(".coupon-form");
  if (!couponForm) return;

  couponForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = couponForm.querySelector("input");
    const code = input?.value.trim().toUpperCase();
    const CODES = { FREEZE10: 10, MEMORY20: 20, BABY15: 15 };

    if (CODES[code]) {
      showToast(`Coupon applied! ${CODES[code]}% discount`, "success");
      const result = couponForm.querySelector(".coupon-result");
      if (result) result.textContent = `✓ ${CODES[code]}% off applied`;
    } else {
      showToast("Invalid coupon code", "error");
    }
  });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation(formEl) {
  if (!formEl) return;

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    formEl.querySelectorAll("[required]").forEach((field) => {
      const errorEl = field.parentElement.querySelector(".form-error");
      field.classList.remove("error");
      if (errorEl) errorEl.remove();

      if (!field.value.trim()) {
        valid = false;
        field.classList.add("error");
        const err = document.createElement("span");
        err.className = "form-error";
        err.textContent = "This field is required";
        field.parentElement.appendChild(err);
      } else if (
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ) {
        valid = false;
        field.classList.add("error");
        const err = document.createElement("span");
        err.className = "form-error";
        err.textContent = "Please enter a valid email";
        field.parentElement.appendChild(err);
      }
    });

    if (valid) {
      const action = formEl.dataset.action;
      if (action === "contact") {
        showToast("Message sent! We'll get back to you soon. 💌", "success");
        formEl.reset();
      } else if (action === "checkout") {
        window.location.href = "thank-you.html";
      } else if (action === "login") {
        window.location.href = "account.html";
      } else if (action === "register") {
        window.location.href = "account.html";
      }
    }
  });
}

// ============================================
// FILTERS & SORTING
// ============================================

function initFilters() {
  const filterBtns = $$(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      const cards = $$(".product-card[data-category]");
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });

  const sortSelect = $(".sort-select");
  sortSelect?.addEventListener("change", () => {
    showToast("Sorting applied", "info", 1500);
  });
}

// ============================================
// STICKY ADD TO CART
// ============================================

function initStickyATC() {
  const atcBar = $(".sticky-atc");
  const productHero = $(".product-hero");
  if (!atcBar || !productHero) return;

  const observer = new IntersectionObserver(([entry]) => {
    atcBar.classList.toggle("visible", !entry.isIntersecting);
  });
  observer.observe(productHero);
}

// ============================================
// NEWSLETTER
// ============================================

function initNewsletter() {
  const forms = $$(".newsletter-form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type=email]");
      if (!input?.value) return;
      showToast("Thank you for subscribing! 💕", "success");
      input.value = "";
    });
  });
}

// ============================================
// INIT
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initAnnouncementBar();
  initNavbar();
  initCartDrawer();
  updateWishlistUI();
  initSearch();
  initScrollReveal();
  initScrollTop();
  initQtySelectors();
  initStickyATC();
  initFilters();
  initProductGallery();
  initCouponField();
  initNewsletter();

  // Init forms
  $$("form[data-action]").forEach(initFormValidation);

  // Init sliders
  $$(".slider").forEach((el) => new Slider(el));
});
