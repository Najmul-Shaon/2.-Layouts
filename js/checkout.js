/* ============================================
   CHECKOUT PAGE JS
   ============================================ */

   console.log('Checkout JS Loaded');

document.addEventListener('DOMContentLoaded', () => {

  // ---- STEP MANAGEMENT ----
  let currentStep = 1;
  const TOTAL_STEPS = 3;

  window.goToStep = function(n) {
    // Validate current step before advancing
    if (n > currentStep && !validateStep(currentStep)) return;

    currentStep = n;

    document.querySelectorAll('.checkout-step-panel').forEach((p, i) => {
      p.classList.toggle('active', i + 1 === n);
    });

    document.querySelectorAll('.checkout-step-tab').forEach((tab, i) => {
      tab.classList.remove('active', 'done');
      if (i + 1 === n)      tab.classList.add('active');
      if (i + 1 < n)        tab.classList.add('done');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCheckoutSummary();
  };

  // ---- FORM VALIDATION PER STEP ----
  function validateStep(step) {
    const panel  = document.getElementById('step' + step);
    if (!panel) return true;

    let valid = true;
    panel.querySelectorAll('[required]').forEach(field => {
      // Clear previous errors
      field.classList.remove('error');
      panel.querySelectorAll('.field-error').forEach(e => e.remove());

      const val = field.value.trim();
      let error = '';

      if (!val) {
        error = 'This field is required';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        error = 'Please enter a valid email';
      } else if (field.type === 'tel' && !/^[6-9]\d{9}$/.test(val.replace(/\s/g, ''))) {
        error = 'Enter a valid 10-digit phone number';
      }

      if (error) {
        valid = false;
        field.classList.add('error');
        const errEl = document.createElement('span');
        errEl.className = 'form-error field-error';
        errEl.textContent = error;
        field.parentElement.appendChild(errEl);
        field.focus();
      }
    });

    if (!valid) {
      showToast('Please fill in all required fields', 'error');
    }

    return valid;
  }

  // ---- PAYMENT METHOD TOGGLE ----
  const paymentMethods = document.querySelectorAll('input[name="payment"]');
  paymentMethods.forEach(radio => {
    radio.addEventListener('change', () => {
      // Update active styles
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
      radio.closest('.payment-method')?.classList.add('active');

      // Show/hide field groups
      document.querySelectorAll('.payment-fields').forEach(f => f.style.display = 'none');
      const fields = document.getElementById('fields-' + radio.value);
      if (fields) fields.style.display = 'block';
    });
  });

  // ---- CARD NUMBER FORMATTING ----
  const cardInput = document.querySelector('input[placeholder*="1234 5678"]');
  cardInput?.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = val.match(/.{1,4}/g)?.join(' ') || val;
  });

  // ---- ORDER SUMMARY ----
  function renderCheckoutSummary() {
    const items  = document.getElementById('checkoutItems');
    const totals = document.getElementById('checkoutTotals');
    if (!items || !totals) return;

    if (State.cart.length === 0) {
      items.innerHTML = `
        <div style="text-align:center;padding:var(--space-6);color:var(--color-text-light)">
          <div style="font-size:2rem;margin-bottom:var(--space-2)">🛒</div>
          <p>Your cart is empty</p>
          <a href="products.html" style="color:var(--color-primary);font-weight:600">Browse Services</a>
        </div>`;
      totals.innerHTML = '';
      return;
    }

    items.innerHTML = State.cart.map(item => `
      <div class="checkout-item">
        <div class="checkout-item-img">${item.emoji || '🎁'}</div>
        <div class="checkout-item-info">
          <div class="checkout-item-name">${item.name}</div>
          ${item.variant ? `<div class="checkout-item-variant">${item.variant}</div>` : ''}
          <div class="checkout-item-qty">Qty: ${item.qty}</div>
        </div>
        <div class="checkout-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      </div>
    `).join('');

    const subtotal = State.getCartTotal();
    const discount = appliedCoupon ? Math.round(subtotal * appliedCoupon.pct / 100) : 0;
    const total    = subtotal - discount;

    totals.innerHTML = `
      <div class="checkout-total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
      ${discount ? `<div class="checkout-total-row" style="color:#22863a"><span>Discount (${appliedCoupon.code})</span><span>−₹${discount.toLocaleString('en-IN')}</span></div>` : ''}
      <div class="checkout-total-row"><span>Shipping</span><span style="color:#22863a;font-weight:600">FREE</span></div>
      <div class="checkout-total-row"><span>Home Visit</span><span style="color:#22863a;font-weight:600">FREE</span></div>
      <div class="checkout-total-row checkout-grand-total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    `;
  }

  // ---- COUPON ----
  let appliedCoupon = null;
  const COUPONS = { FREEZE10: { pct: 10 }, MEMORY20: { pct: 20 }, BABY15: { pct: 15 } };

  document.querySelector('.coupon-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const code  = input?.value.trim().toUpperCase();
    if (COUPONS[code]) {
      appliedCoupon = { code, pct: COUPONS[code].pct };
      showToast(`Coupon ${code} applied! ${appliedCoupon.pct}% off 🎉`, 'success');
      renderCheckoutSummary();
    } else {
      showToast('Invalid coupon code', 'error');
    }
  });

  // ---- FORM SUBMIT (place order) ----
  document.getElementById('checkoutForm')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateStep(3)) return;

    const btn = document.getElementById('placeOrderBtn');
    btn.textContent = '⏳ Processing your order...';
    btn.disabled    = true;
    btn.style.opacity = '0.8';

    setTimeout(() => { window.location.href = 'thank-you.html'; }, 1800);
  });

  // ---- INIT ----
  renderCheckoutSummary();
  goToStep(1);

});