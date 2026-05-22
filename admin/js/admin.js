/* ============================================
   ADMIN DASHBOARD JAVASCRIPT
   ============================================ */
   console.log("successfully loaded admin.js");

// ---- MOCK DATA ----
const AdminData = {
  orders: [
    { id: '#FUM-2025-0521', customer: 'Priya Krishnan', service: 'Baby Hand & Feet Gold Frame', city: 'Coimbatore', amount: 3499, status: 'delivered', date: '2025-04-10', emoji: '👶' },
    { id: '#FUM-2025-0520', customer: 'Meena Subramaniam', service: 'Couple Hands Together', city: 'Chennai', amount: 4499, status: 'processing', date: '2025-04-09', emoji: '💑' },
    { id: '#FUM-2025-0519', customer: 'Rajesh Kumar', service: 'Family Together Forever', city: 'Tirupur', amount: 5999, status: 'shipped', date: '2025-04-08', emoji: '👨‍👩‍👧‍👦' },
    { id: '#FUM-2025-0518', customer: 'Sunitha Raman', service: '3D Baby Photo Frame Set', city: 'Salem', amount: 4999, status: 'pending', date: '2025-04-08', emoji: '🌸' },
    { id: '#FUM-2025-0517', customer: 'Karthik Raj', service: 'Sibling Bond Casting', city: 'Erode', amount: 3799, status: 'delivered', date: '2025-04-07', emoji: '👫' },
    { id: '#FUM-2025-0516', customer: 'Deepa Venkat', service: 'Wedding Day Memory', city: 'Madurai', amount: 6999, status: 'processing', date: '2025-04-07', emoji: '💍' },
    { id: '#FUM-2025-0515', customer: 'Ananya Suresh', service: 'Paw Print Keepsake', city: 'Coimbatore', amount: 2499, status: 'delivered', date: '2025-04-06', emoji: '🐾' },
    { id: '#FUM-2025-0514', customer: 'Vignesh P', service: 'Baby Shower Gift Box', city: 'Pollachi', amount: 3999, status: 'delivered', date: '2025-04-05', emoji: '🎀' },
  ],

  products: [
    { id: 'p1', name: 'Baby Hand & Feet Gold Frame', category: 'Baby', price: 3499, stock: 'Available', orders: 128, status: 'active', emoji: '👶' },
    { id: 'p2', name: 'Newborn Silver Edition', category: 'Baby', price: 2999, stock: 'Available', orders: 96, status: 'active', emoji: '🍼' },
    { id: 'p3', name: 'Couple Hands Together', category: 'Couple', price: 4499, stock: 'Available', orders: 74, status: 'active', emoji: '💑' },
    { id: 'p4', name: 'Family Together Forever', category: 'Family', price: 5999, stock: 'Available', orders: 52, status: 'active', emoji: '👨‍👩‍👧‍👦' },
    { id: 'p5', name: 'Sibling Bond Casting', category: 'Sibling', price: 3799, stock: 'Available', orders: 41, status: 'active', emoji: '👫' },
    { id: 'p6', name: 'Paw Print Keepsake', category: 'Pet', price: 2499, stock: 'Available', orders: 29, status: 'active', emoji: '🐾' },
    { id: 'p7', name: 'Wedding Day Memory', category: 'Wedding', price: 6999, stock: 'Available', orders: 18, status: 'inactive', emoji: '💍' },
    { id: 'p8', name: '3D Baby Photo Frame Set', category: 'Baby', price: 4999, stock: 'Available', orders: 63, status: 'active', emoji: '🌸' },
  ],

  customers: [
    { id: 'c1', name: 'Priya Krishnan', email: 'priya@email.com', city: 'Coimbatore', orders: 3, spent: 13997, joined: '2024-12-01', status: 'active' },
    { id: 'c2', name: 'Meena Subramaniam', email: 'meena@email.com', city: 'Chennai', orders: 2, spent: 8998, joined: '2025-01-15', status: 'active' },
    { id: 'c3', name: 'Rajesh Kumar', email: 'rajesh@email.com', city: 'Tirupur', orders: 1, spent: 5999, joined: '2025-02-10', status: 'active' },
    { id: 'c4', name: 'Sunitha Raman', email: 'sunitha@email.com', city: 'Salem', orders: 4, spent: 18495, joined: '2024-10-05', status: 'active' },
    { id: 'c5', name: 'Karthik Raj', email: 'karthik@email.com', city: 'Erode', orders: 1, spent: 3799, joined: '2025-03-20', status: 'active' },
    { id: 'c6', name: 'Deepa Venkat', email: 'deepa@email.com', city: 'Madurai', orders: 2, spent: 10798, joined: '2025-01-08', status: 'inactive' },
  ],

  bookings: [
    { id: '#SESS-041', customer: 'Priya Krishnan', service: 'Baby Casting', city: 'Coimbatore', date: '2025-04-15', time: '10:00 AM', artist: 'Arun Kumar', status: 'confirmed' },
    { id: '#SESS-042', customer: 'Meena Subramaniam', service: 'Couple Casting', city: 'Chennai', date: '2025-04-17', time: '2:00 PM', artist: 'Kavitha Raj', status: 'pending' },
    { id: '#SESS-043', customer: 'Rajesh Kumar', service: 'Family Casting', city: 'Tirupur', date: '2025-04-19', time: '11:00 AM', artist: 'Arun Kumar', status: 'confirmed' },
    { id: '#SESS-044', customer: 'Ananya Suresh', service: 'Pet Casting', city: 'Coimbatore', date: '2025-04-22', time: '4:00 PM', artist: 'Kavitha Raj', status: 'pending' },
  ],

  reviews: [
    { id: 'r1', customer: 'Priya Krishnan', product: 'Baby Hand & Feet Gold Frame', rating: 5, text: 'Amazing experience! The casting is absolutely beautiful.', date: '2025-03-12', status: 'published' },
    { id: 'r2', customer: 'Meena Subramaniam', product: 'Baby Shower Gift Box', rating: 5, text: 'Perfect gift for my sister. She loved it!', date: '2025-03-10', status: 'published' },
    { id: 'r3', customer: 'Unknown User', product: 'Couple Casting', rating: 3, text: 'Good quality but delivery was delayed.', date: '2025-03-08', status: 'pending' },
  ],
};

// ---- FORMAT ----
const fmt = n => '₹' + n.toLocaleString('en-IN');

// ---- PANEL NAVIGATION ----
function switchPanel(id) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-link').forEach(l => l.classList.remove('active'));
  const panel = document.getElementById('panel-' + id);
  if (panel) panel.classList.add('active');
  const link = document.querySelector(`[data-panel="${id}"]`);
  if (link) link.classList.add('active');
  document.querySelector('.admin-topbar-title').textContent = {
    dashboard: '📊 Dashboard', orders: '📦 Orders', products: '🛍️ Products',
    customers: '👥 Customers', bookings: '📅 Bookings', reviews: '⭐ Reviews',
    gallery: '🖼️ Gallery', blog: '📝 Blog', settings: '⚙️ Settings', reports: '📈 Reports'
  }[id] || 'Dashboard';
  // Close mobile sidebar
  document.querySelector('.admin-sidebar')?.classList.remove('open');
}

document.querySelectorAll('.admin-nav-link[data-panel]').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); switchPanel(link.dataset.panel); });
});

// ---- MOBILE SIDEBAR ----
const mobileToggle = document.getElementById('adminMobileToggle');
const sidebar = document.querySelector('.admin-sidebar');
mobileToggle?.addEventListener('click', () => sidebar?.classList.toggle('open'));

// ---- RENDER ORDERS ----
function renderOrders(data = AdminData.orders) {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(o => `
    <tr>
      <td><strong style="color:var(--color-primary)">${o.id}</strong></td>
      <td>
        <div style="font-weight:700;color:#111827">${o.customer}</div>
        <div style="font-size:0.75rem;color:#9ca3af">📍 ${o.city}</div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:32px;height:32px;border-radius:8px;background:rgba(232,24,122,0.1);display:flex;align-items:center;justify-content:center;font-size:1rem">${o.emoji}</div>
          <span style="font-size:0.82rem">${o.service}</span>
        </div>
      </td>
      <td><strong>${fmt(o.amount)}</strong></td>
      <td><span class="admin-badge badge-${o.status}">${{delivered:'✅ Delivered',processing:'⏳ Processing',pending:'🕐 Pending',shipped:'🚚 Shipped'}[o.status]}</span></td>
      <td style="color:#9ca3af;font-size:0.8rem">${o.date}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="showOrderModal('${o.id}')">👁️</button>
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="showToastAdmin('Status updated','success')">✏️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ---- RENDER PRODUCTS ----
function renderProducts(data = AdminData.products) {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div class="product-img-preview">${p.emoji}</div>
          <div>
            <div style="font-weight:700;color:#111827;font-size:0.85rem">${p.name}</div>
            <div style="font-size:0.72rem;color:#9ca3af">${p.category}</div>
          </div>
        </div>
      </td>
      <td><strong>${fmt(p.price)}</strong></td>
      <td><span style="color:#22863a;font-weight:600">${p.stock}</span></td>
      <td>${p.orders}</td>
      <td>
        <button class="admin-toggle ${p.status === 'active' ? 'on' : ''}" onclick="this.classList.toggle('on');showToastAdmin('Product status updated','success')"></button>
      </td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openProductModal('${p.id}')">✏️ Edit</button>
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="confirmDelete('product','${p.name}')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ---- RENDER CUSTOMERS ----
function renderCustomers(data = AdminData.customers) {
  const tbody = document.getElementById('customersTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(c => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.9rem">${c.name[0]}</div>
          <div>
            <div style="font-weight:700;color:#111827">${c.name}</div>
            <div style="font-size:0.72rem;color:#9ca3af">${c.email}</div>
          </div>
        </div>
      </td>
      <td>📍 ${c.city}</td>
      <td>${c.orders}</td>
      <td><strong style="color:var(--color-primary)">${fmt(c.spent)}</strong></td>
      <td style="font-size:0.8rem;color:#9ca3af">${c.joined}</td>
      <td><span class="admin-badge badge-${c.status}">${c.status === 'active' ? '✅ Active' : '⏸️ Inactive'}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="admin-btn admin-btn-outline admin-btn-sm">👁️ View</button>
          <button class="admin-btn admin-btn-outline admin-btn-sm">✉️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ---- RENDER BOOKINGS ----
function renderBookings(data = AdminData.bookings) {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(b => `
    <tr>
      <td><strong style="color:var(--color-primary)">${b.id}</strong></td>
      <td><strong>${b.customer}</strong></td>
      <td>${b.service}</td>
      <td>📍 ${b.city}</td>
      <td><strong>${b.date}</strong><div style="font-size:0.75rem;color:#9ca3af">🕐 ${b.time}</div></td>
      <td>${b.artist}</td>
      <td><span class="admin-badge badge-${b.status === 'confirmed' ? 'delivered' : 'processing'}">${b.status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="showToastAdmin('Session confirmed!','success')">✅</button>
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="showToastAdmin('Session cancelled','info')">✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ---- RENDER REVIEWS ----
function renderReviews(data = AdminData.reviews) {
  const tbody = document.getElementById('reviewsTableBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td><strong>${r.customer}</strong></td>
      <td style="font-size:0.82rem">${r.product}</td>
      <td style="color:#f59e0b">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</td>
      <td style="font-size:0.8rem;color:#6b7280;max-width:240px">"${r.text}"</td>
      <td style="font-size:0.75rem;color:#9ca3af">${r.date}</td>
      <td><span class="admin-badge badge-${r.status === 'published' ? 'active' : 'processing'}">${r.status === 'published' ? '✅ Published' : '⏳ Pending'}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="showToastAdmin('Review published','success')">✅</button>
          <button class="admin-btn admin-btn-danger admin-btn-sm" onclick="showToastAdmin('Review deleted','info')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ---- MODAL: Order Detail ----
function showOrderModal(id) {
  const order = AdminData.orders.find(o => o.id === id);
  if (!order) return;
  const modal = document.getElementById('orderModal');
  document.getElementById('orderModalContent').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">Order ID</div><strong style="color:var(--color-primary)">${order.id}</strong></div>
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">Status</div><span class="admin-badge badge-${order.status}">${order.status}</span></div>
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">Customer</div><strong>${order.customer}</strong></div>
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">City</div>${order.city}</div>
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">Service</div>${order.emoji} ${order.service}</div>
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">Amount</div><strong style="color:var(--color-primary);font-size:1.1rem">${fmt(order.amount)}</strong></div>
      <div><div style="font-size:0.72rem;color:#9ca3af;text-transform:uppercase;font-weight:700;margin-bottom:4px">Date</div>${order.date}</div>
    </div>
    <div style="margin-bottom:16px">
      <label style="font-size:0.8rem;font-weight:700;margin-bottom:6px;display:block">Update Status</label>
      <select class="admin-input admin-select">
        <option ${order.status==='pending'?'selected':''}>pending</option>
        <option ${order.status==='processing'?'selected':''}>processing</option>
        <option ${order.status==='shipped'?'selected':''}>shipped</option>
        <option ${order.status==='delivered'?'selected':''}>delivered</option>
      </select>
    </div>
    <button class="admin-btn admin-btn-primary" style="width:100%;justify-content:center" onclick="showToastAdmin('Order status updated!','success');closeModal()">Save Changes</button>
  `;
  modal.classList.add('open');
}

// ---- MODAL: Product Edit ----
function openProductModal(id) {
  const p = AdminData.products.find(x => x.id === id) || {};
  const modal = document.getElementById('productModal');
  document.getElementById('productModalContent').innerHTML = `
    <div class="admin-form-row">
      <div class="admin-form-group"><label class="admin-label">Product Name</label><input class="admin-input" value="${p.name || ''}"></div>
      <div class="admin-form-group"><label class="admin-label">Category</label>
        <select class="admin-input admin-select"><option ${p.category==='Baby'?'selected':''}>Baby</option><option ${p.category==='Couple'?'selected':''}>Couple</option><option ${p.category==='Family'?'selected':''}>Family</option><option ${p.category==='Sibling'?'selected':''}>Sibling</option><option ${p.category==='Pet'?'selected':''}>Pet</option><option ${p.category==='Wedding'?'selected':''}>Wedding</option></select>
      </div>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group"><label class="admin-label">Price (₹)</label><input class="admin-input" type="number" value="${p.price || ''}"></div>
      <div class="admin-form-group"><label class="admin-label">Status</label>
        <select class="admin-input admin-select"><option ${p.status==='active'?'selected':''}>active</option><option ${p.status==='inactive'?'selected':''}>inactive</option></select>
      </div>
    </div>
    <div class="admin-form-group"><label class="admin-label">Description</label><textarea class="admin-input" rows="3" placeholder="Service description..."></textarea></div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px">
      <button class="admin-btn admin-btn-outline" onclick="closeModal()">Cancel</button>
      <button class="admin-btn admin-btn-primary" onclick="showToastAdmin('Product saved!','success');closeModal()">💾 Save Product</button>
    </div>
  `;
  modal.classList.add('open');
}

function closeModal() {
  document.querySelectorAll('.admin-modal').forEach(m => m.classList.remove('open'));
}

function confirmDelete(type, name) {
  if (confirm(`Delete ${type}: "${name}"? This cannot be undone.`)) {
    showToastAdmin(`${name} deleted`, 'info');
  }
}

// ---- TOAST ----
function showToastAdmin(msg, type = 'success') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  let container = document.querySelector('.admin-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'admin-toast-container';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:10px;z-index:9999';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.style.cssText = `background:white;border-radius:10px;padding:12px 16px;box-shadow:0 4px 16px rgba(0,0,0,0.12);font-size:0.85rem;font-weight:600;display:flex;align-items:center;gap:10px;border-left:4px solid ${type==='success'?'#22863a':type==='error'?'#e53e3e':'#3b82f6'};animation:slideIn 0.3s ease;max-width:300px`;
  t.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

// ---- SEARCH FILTERS ----
function initTableSearch(inputId, tbodyId) {
  const input = document.getElementById(inputId);
  const tbody = document.getElementById(tbodyId);
  input?.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    tbody?.querySelectorAll('tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ---- CHART ANIMATION ----
function animateCharts() {
  document.querySelectorAll('.chart-bar[data-height]').forEach(bar => {
    setTimeout(() => { bar.style.height = bar.dataset.height; }, 200);
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderOrders();
  renderProducts();
  renderCustomers();
  renderBookings();
  renderReviews();
  animateCharts();

  initTableSearch('ordersSearch', 'ordersTableBody');
  initTableSearch('productsSearch', 'productsTableBody');
  initTableSearch('customersSearch', 'customersTableBody');

  // Close modal on backdrop click
  document.querySelectorAll('.admin-modal').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  });

  // Settings toggles
  document.querySelectorAll('.settings-toggle').forEach(t => {
    t.addEventListener('click', () => {
      t.classList.toggle('on');
      showToastAdmin('Setting updated', 'success');
    });
  });
});