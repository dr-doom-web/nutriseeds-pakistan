(()=>{
'use strict';

const products = window.NUTRI_PRODUCTS || [];
const recipes = window.NUTRI_RECIPES || [];
const config = window.NUTRI_CONFIG || {};
const KEY = 'nutriseeds-cart-v1';
let cart = [];
let toastTimer = 0;

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
const byId = id => products.find(p => p.id === id);
const money = n => 'Rs. ' + Number(n || 0).toLocaleString('en-PK');
const clean = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const img = p => `assets/images/${p.id}.svg`;
const endpointValid = s => /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+\/?$/.test(String(s || '').trim());
const numberValid = s => /^\d{10,15}$/.test(String(s || '').trim());
const key = (id, size) => `${id}:${size}`;

function loadCart() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    cart = Array.isArray(v)
      ? v.filter(x => byId(x.id) && ['25', '50', '100'].includes(String(x.size)) && Number.isInteger(x.qty) && x.qty > 0)
         .map(x => ({ ...x, qty: Math.min(x.qty, 99) }))
      : [];
  } catch {
    cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {}
  updateCartUI();
}

const count = () => cart.reduce((s, x) => s + x.qty, 0);
const total = () => cart.reduce((s, x) => s + (byId(x.id)?.prices[x.size] || 0) * x.qty, 0);

function add(id, size = '25', qty = 1) {
  if (!byId(id) || !['25', '50', '100'].includes(String(size))) return;
  qty = Math.max(1, Math.min(99, Number(qty) || 1));
  const item = cart.find(x => key(x.id, x.size) === key(id, String(size)));
  if (item) {
    item.qty = Math.min(99, item.qty + qty);
  } else {
    cart.push({ id, size: String(size), qty });
  }
  saveCart();
  toast(`${byId(id).name} (${size}g) added to basket`);
}

function changeQty(id, size, delta) {
  const item = cart.find(x => key(x.id, x.size) === key(id, size));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(x => x !== item);
    toast('Removed from your basket');
  } else {
    item.qty = Math.min(item.qty, 99);
  }
  saveCart();
}

function remove(id, size) {
  cart = cart.filter(x => key(x.id, x.size) !== key(id, size));
  saveCart();
  toast('Removed from your basket');
}

function toast(message, isError = false) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('error', isError);
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3400);
}

function card(p) {
  return `<article class="product-card">
    <a class="product-media" style="--tile:${p.tile}" href="product.html?id=${p.id}">
      <span class="small-badge">25g trial pack</span>
      <img src="${img(p)}" loading="lazy" alt="Illustrated NutriSeeds ${p.name} packet and seed bowl">
    </a>
    <div class="product-content">
      <span class="product-meta">${clean(p.tag)}</span>
      <h3><a href="product.html?id=${p.id}">${clean(p.name)}</a></h3>
      <p>${clean(p.blurb)}</p>
      <div class="product-price">From ${money(p.prices['25'])} <small>/ 25g</small></div>
      <div class="product-purchase">
        <select data-size-select aria-label="Choose size of ${clean(p.name)}">
          <option value="25">25g - ${money(p.prices['25'])}</option>
          <option value="50">50g - ${money(p.prices['50'])}</option>
          <option value="100">100g - ${money(p.prices['100'])}</option>
        </select>
        <button type="button" data-add="${p.id}">+ Add</button>
      </div>
    </div>
  </article>`;
}

function recipeCard(r) {
  return `<article class="recipe-card">
    <img src="assets/images/${r.id}.svg" loading="lazy" alt="Illustrated ${clean(r.title)} recipe bowl">
    <div class="recipe-content">
      <span class="recipe-tag">${clean(r.category)} &middot; ${clean(r.time)}</span>
      <h3>${clean(r.title)}</h3>
      <p>${clean(r.summary)}</p>
      <a href="recipes.html#${r.id}" class="text-link">See the food idea &rarr;</a>
    </div>
  </article>`;
}

function recipeCardDetailed(r) {
  return `<article class="recipe-card" id="${r.id}">
    <img src="assets/images/${r.id}.svg" loading="lazy" alt="Illustrated ${clean(r.title)} recipe bowl">
    <div class="recipe-content">
      <span class="recipe-tag">${clean(r.category)} &middot; ${clean(r.time)}</span>
      <h3>${clean(r.title)}</h3>
      <p>${clean(r.summary)}</p>
      <details>
        <summary>Ingredients &amp; preparation</summary>
        <ul>${r.ingredients.map(x => `<li>${clean(x)}</li>`).join('')}</ul>
        <p>${clean(r.steps)}</p>
        <a class="text-link" href="product.html?id=${r.seed}">Explore ${clean(byId(r.seed).name)} &rarr;</a>
      </details>
    </div>
  </article>`;
}

function openDrawer() {
  const d = $('#cart-drawer');
  const b = $('#drawer-backdrop');
  if (!d || !b) return;
  d.classList.add('is-open');
  d.removeAttribute('inert');
  d.setAttribute('aria-hidden', 'false');
  b.hidden = false;
  document.body.classList.add('drawer-open');
  $('[data-drawer-close]')?.focus();
}

function closeDrawer() {
  const d = $('#cart-drawer');
  const b = $('#drawer-backdrop');
  if (!d || !b) return;
  d.classList.remove('is-open');
  d.setAttribute('inert', '');
  d.setAttribute('aria-hidden', 'true');
  b.hidden = true;
  document.body.classList.remove('drawer-open');
}

function updateCartUI() {
  $$('[data-cart-count]').forEach(el => el.textContent = count());
  const ds = $('#drawer-subtotal');
  if (ds) ds.textContent = money(total());
  const container = $('#drawer-items');
  if (container) {
    container.innerHTML = cart.length
      ? cart.map(x => {
          const p = byId(x.id);
          return `<div class="drawer-row" style="--tile:${p.tile}">
            <img src="${img(p)}" alt="${clean(p.name)}">
            <div>
              <strong>${clean(p.name)}</strong>
              <small>${x.size}g &times; ${x.qty}</small>
            </div>
            <span class="drawer-row-price">${money(p.prices[x.size] * x.qty)}</span>
          </div>`;
        }).join('')
      : '<div class="drawer-empty"><p>Your basket is empty.</p><a href="shop.html">Explore seeds &rarr;</a></div>';
  }
  renderCartPage();
}

function renderHome() {
  if ($('#featured-products')) $('#featured-products').innerHTML = products.map(card).join('');
  if ($('#featured-recipes')) $('#featured-recipes').innerHTML = recipes.slice(0, 4).map(recipeCard).join('');
}

function renderShop() {
  const wrap = $('#shop-products');
  if (!wrap) return;
  const filt = $('#seed-filter')?.value || 'all';
  const sort = $('#seed-sort')?.value || 'featured';
  let items = products.filter(p => filt === 'all' || p.tags.includes(filt));
  if (sort === 'price-asc') items.sort((a, b) => a.prices[25] - b.prices[25]);
  if (sort === 'price-desc') items.sort((a, b) => b.prices[25] - a.prices[25]);
  if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
  wrap.innerHTML = items.map(card).join('');
  const countEl = $('#product-count');
  if (countEl) countEl.textContent = `${items.length} product${items.length !== 1 ? 's' : ''}`;
}

function renderProduct() {
  const node = $('#product-details');
  if (!node) return;
  const id = new URLSearchParams(window.location.search).get('id') || 'chia';
  const p = byId(id);
  if (!p) {
    node.innerHTML = '<p>That product was not found. <a href="shop.html" class="text-link">See all seeds</a></p>';
    return;
  }
  document.title = `${p.name} | NutriSeeds Pakistan`;
  const crumb = $('#breadcrumb-product');
  if (crumb) crumb.textContent = p.name;

  node.innerHTML = `
    <div class="product-detail-image" style="--tile:${p.tile}">
      <img src="${img(p)}" alt="Illustrated NutriSeeds ${clean(p.name)} packet and seed bowl">
    </div>
    <div class="detail-info">
      <span class="eyebrow">NUTRISEEDS ORIGINAL SELECTION</span>
      <h1>${clean(p.name)}</h1>
      <p class="lead">${clean(p.long)}</p>
      <div class="detail-price" id="detail-price">${money(p.prices[25])}</div>
      <label class="detail-control-label">SELECT A PACK SIZE</label>
      <div class="size-options" role="group" aria-label="Choose pack size">
        ${['25', '50', '100'].map(s => `
          <button type="button" class="size-choice ${s === '25' ? 'is-selected' : ''}" data-detail-size="${s}" aria-pressed="${s === '25' ? 'true' : 'false'}">
            ${s}g <small>${s === '25' ? 'Trial' : s === '50' ? 'Everyday' : 'Value'} pack</small>
          </button>
        `).join('')}
      </div>
      <label class="detail-control-label">QUANTITY</label>
      <div class="detail-buy-row">
        <div class="quantity-control">
          <button type="button" id="detail-minus" aria-label="Decrease quantity">&minus;</button>
          <span id="detail-qty">1</span>
          <button type="button" id="detail-plus" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="btn btn-primary" id="detail-add">Add to basket &rarr;</button>
        <a class="btn btn-whatsapp" id="detail-whatsapp-btn" target="_blank" rel="noopener noreferrer" href="#">Inquire via WhatsApp &rarr;</a>
      </div>
      <p class="fine-print">Prices shown are examples for the student project. No payment is collected online.</p>
      <ul class="detail-bullets">
        <li>Available in 25g trial, 50g everyday, and 100g value packs.</li>
        <li>Clear food-use and storage information.</li>
        <li>Order via Email or instant WhatsApp chat.</li>
      </ul>
      <div class="detail-notes">
        <details open>
          <summary>Everyday uses</summary>
          <p>${clean(p.use)}</p>
        </details>
        <details>
          <summary>Preparation guidance</summary>
          <p>${clean(p.prep)}</p>
        </details>
        <details>
          <summary>Ingredients and storage</summary>
          <p>${clean(p.ingredients)} ${clean(p.storage)}</p>
        </details>
      </div>
    </div>`;

  let size = '25', qty = 1;

  function updateDetailWhatsAppLink() {
    const waBtn = $('#detail-whatsapp-btn', node);
    if (!waBtn) return;
    const msg = `Hello NutriSeeds Pakistan! I am interested in ${p.name} (${size}g pack, quantity: ${qty}). Please share product availability and delivery information.`;
    const num = config.whatsappNumber || '923297676956';
    waBtn.href = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }

  $$('[data-detail-size]', node).forEach(button => button.addEventListener('click', () => {
    size = button.dataset.detailSize;
    $$('[data-detail-size]', node).forEach(b => {
      b.classList.toggle('is-selected', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    $('#detail-price').textContent = money(p.prices[size]);
    updateDetailWhatsAppLink();
  }));

  $('#detail-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    $('#detail-qty').textContent = qty;
    updateDetailWhatsAppLink();
  });

  $('#detail-plus').addEventListener('click', () => {
    qty = Math.min(99, qty + 1);
    $('#detail-qty').textContent = qty;
    updateDetailWhatsAppLink();
  });

  $('#detail-add').addEventListener('click', () => {
    add(p.id, size, qty);
    openDrawer();
  });

  updateDetailWhatsAppLink();

  const related = $('#related-products');
  if (related) related.innerHTML = products.filter(x => x.id !== id).map(card).join('');
}

function renderCartPage() {
  const list = $('#cart-list');
  if (!list) return;
  const el = $('#summary-items');
  const totalEl = $('#summary-subtotal');
  const estTotalEl = $('#summary-estimated-total');

  if (totalEl) totalEl.textContent = money(total());
  if (estTotalEl) estTotalEl.textContent = money(total());

  if (el) {
    el.innerHTML = cart.map(x => {
      const p = byId(x.id);
      return `<div class="summary-item">
        <span>${clean(p.name)} (${x.size}g) &times; ${x.qty}</span>
        <strong>${money(p.prices[x.size] * x.qty)}</strong>
      </div>`;
    }).join('') || '<p class="fine-print">No products selected.</p>';
  }

  list.innerHTML = cart.length
    ? cart.map(x => {
        const p = byId(x.id);
        return `<div class="cart-row" style="--tile:${p.tile}">
          <img src="${img(p)}" alt="${clean(p.name)} packet">
          <div class="cart-row-main">
            <strong><a href="product.html?id=${p.id}">${clean(p.name)}</a></strong>
            <small>${x.size}g pack &middot; ${money(p.prices[x.size])} each</small>
            <div class="cart-row-actions">
              <div class="qty-stepper">
                <button type="button" data-qty="-1" data-id="${p.id}" data-size="${x.size}" aria-label="Decrease ${clean(p.name)} quantity">&minus;</button>
                <span>${x.qty}</span>
                <button type="button" data-qty="1" data-id="${p.id}" data-size="${x.size}" aria-label="Increase ${clean(p.name)} quantity">+</button>
              </div>
              <button type="button" data-remove data-id="${p.id}" data-size="${x.size}">Remove</button>
            </div>
          </div>
          <div class="cart-row-cost">${money(p.prices[x.size] * x.qty)}</div>
        </div>`;
      }).join('')
    : `<div class="empty-basket">
        <div class="empty-symbol">&#10022;</div>
        <h3>Your basket is waiting</h3>
        <p>Choose a few seeds to start your order request.</p>
        <a class="btn btn-primary" href="shop.html">Shop the collection &rarr;</a>
      </div>`;

  const formCard = $('#checkout-form-card');
  if (formCard) formCard.hidden = cart.length === 0;
}

function initFinder() {
  const r = $('#finder-result');
  if (!r) return;
  const choices = {
    breakfast: { id: 'chia', recipe: 'Soaked Chia Breakfast Bowl', detail: 'Chia works well in soaked breakfast recipes. Always soak fully in liquid before eating.' },
    baking: { id: 'flax', recipe: 'Ground Flax & Oats', detail: 'Ground flax can be stirred into oats or used in wholesome baked foods.' },
    salads: { id: 'pumpkin', recipe: 'Crunchy Salad Topper', detail: 'Hulled, ready-to-eat pumpkin kernels provide great crunch for salads and savory meals.' },
    snacks: { id: 'sunflower', recipe: 'Sunflower Granola Bowl', detail: 'Shelled, ready-to-eat sunflower kernels make an easy, nutrient-dense snack bowl topping.' }
  };

  $$('[data-finder]').forEach(b => b.addEventListener('click', () => {
    const val = b.dataset.finder;
    const c = choices[val];
    const p = byId(c.id);
    $$('[data-finder]').forEach(o => o.classList.toggle('is-selected', o === b));
    r.hidden = false;
    r.innerHTML = `
      <span class="eyebrow">STEP 02 / 02 &middot; SUGGESTED FOOD USE</span>
      <div class="finder-result-row">
        <img src="${img(p)}" alt="Illustrated ${clean(p.name)} packet">
        <div>
          <h3>${clean(p.name)}</h3>
          <p>${clean(c.detail)}</p>
          <p class="fine-print">This is a general culinary match, not personalized dietary or medical advice.</p>
          <a class="btn btn-primary" href="product.html?id=${p.id}">Explore ${clean(p.name)} &rarr;</a>
        </div>
      </div>`;
    r.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  }));
}

function initRecipes() {
  const node = $('#recipe-list');
  if (node) node.innerHTML = recipes.map(recipeCardDetailed).join('');
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      const d = target.querySelector('details');
      if (d) d.open = true;
      setTimeout(() => target.scrollIntoView(), 80);
    }
  }
}

function formFeedback(selector, msg, type = 'error') {
  const e = $(selector);
  if (e) {
    e.textContent = msg;
    e.dataset.type = type;
  }
}

async function postForm(endpoint, data, button) {
  const label = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Sending...';
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    if (result.ok) return { ok: true };
    let body;
    try { body = await result.json(); } catch {}
    const message = body?.errors?.map(e => e.message).filter(Boolean).join('; ') || `Service returned ${result.status}`;
    return { ok: false, error: message };
  } catch (e) {
    return { ok: false, error: 'Could not connect to the form service. Please check your internet connection.' };
  } finally {
    button.disabled = false;
    button.innerHTML = label;
  }
}

function buildWhatsAppOrderMessage({ name = '', phone = '', email = '', city = '', address = '', notes = '' } = {}) {
  const ref = 'NS-' + Date.now().toString().slice(-6);
  const lines = [
    'NUTRISEEDS PAKISTAN — ORDER REQUEST',
    `Reference: ${ref}`,
    `Customer: ${name.trim() || 'Demo Customer'}`
  ];
  if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
  if (email.trim()) lines.push(`Email: ${email.trim()}`);

  lines.push('', 'Order Details:');
  cart.forEach(x => {
    const p = byId(x.id);
    const itemTotal = (p?.prices[x.size] || 0) * x.qty;
    lines.push(`• ${p ? p.name : x.id} — ${x.size}g × ${x.qty} (${money(itemTotal)})`);
  });

  const sub = total();
  lines.push(
    '',
    `Subtotal: ${money(sub)}`,
    'Delivery: To be confirmed',
    `Total: ${money(sub)} (Estimated - delivery to be confirmed)`
  );

  const loc = [address.trim(), city.trim()].filter(Boolean).join(', ');
  lines.push(`Delivery Location: ${loc || 'To be shared in chat'}`);
  lines.push(`Additional Notes: ${notes.trim() || 'None'}`);
  lines.push('', 'Please confirm product availability, final price, and delivery charges.');

  return lines.join('\n');
}

function orderSummary(ref = '', name = '', city = '', phone = '', email = '', address = '', notes = '') {
  if (!ref) ref = 'NS-' + Date.now().toString().slice(-6);
  const lines = [
    'NUTRISEEDS PAKISTAN — ORDER REQUEST',
    `Reference: ${ref}`,
    `Customer Name: ${name || 'N/A'}`,
    `Email: ${email || 'N/A'}`,
    `Phone / WhatsApp: ${phone || 'N/A'}`,
    `Delivery City: ${city || 'N/A'}`,
    `Delivery Address: ${address || 'N/A'}`,
    `Order Notes: ${notes || 'None'}`,
    '',
    'Order Details:'
  ];
  cart.forEach(x => {
    const p = byId(x.id);
    const itemCost = (p?.prices[x.size] || 0) * x.qty;
    lines.push(`- ${p ? p.name : x.id} — ${x.size}g × ${x.qty} (${money(itemCost)})`);
  });
  lines.push(
    '',
    `Subtotal: ${money(total())}`,
    'Delivery: Delivery charges will be confirmed before your order is finalized.',
    `Total: ${money(total())} (Estimated - excluding delivery charges)`,
    'Payment Status: Not collected online (Order Request only)'
  );
  return lines.join('\n');
}

function getOrderForm() {
  const form = $('#checkout-form');
  if (!form) return null;
  formFeedback('#order-feedback', '');
  if (!cart.length) {
    formFeedback('#order-feedback', 'Your basket is empty. Please add products before placing an order request.');
    return null;
  }
  if (!form.reportValidity()) return null;
  return form;
}

function initOrder() {
  const form = $('#checkout-form');
  if (!form) return;

  const orderHint = $('#order-connection-hint');
  if (orderHint) {
    if (endpointValid(config.orderFormEndpoint)) {
      orderHint.textContent = 'Email form connected to Formspree. Submitted orders deliver directly to ghulamujtabaedu@gmail.com.';
    } else {
      orderHint.textContent = 'Email setup note: Formspree endpoint pending in assets/js/config.js. WhatsApp ordering is active and ready below.';
    }
  }

  // Option A: Submit Order Request (Email via Form Backend)
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = getOrderForm();
    if (!f) return;

    if (!endpointValid(config.orderFormEndpoint)) {
      formFeedback('#order-feedback',
        'Email delivery setup is pending: please add your verified Formspree endpoint in assets/js/config.js. In the meantime, you can instantly submit your order via Option B (WhatsApp: 03297676956) or email ghulamujtabaedu@gmail.com directly.',
        'error');
      return;
    }

    const name = $('#order-name').value;
    const email = $('#order-email').value;
    const phone = $('#order-phone').value;
    const city = $('#order-city').value;
    const address = $('#order-address').value;
    const notes = $('#order-notes').value || 'None';
    const ref = 'NS-' + Date.now().toString().slice(-6);

    const fd = new FormData(form);
    fd.append('order_reference', ref);
    fd.append('_subject', `NutriSeeds — New Order Request (${ref})`);
    fd.append('_replyto', email);
    fd.append('customer_name', name);
    fd.append('customer_email', email);
    fd.append('customer_phone', phone);
    fd.append('delivery_city', city);
    fd.append('delivery_address', address);
    fd.append('order_notes', notes);
    fd.append('order_summary', orderSummary(ref, name, city, phone, email, address, notes));
    const itemsFormatted = cart.map(x => {
      const p = byId(x.id);
      const itemCost = (p?.prices[x.size] || 0) * x.qty;
      return `${p ? p.name : x.id} [${x.size}g] x ${x.qty} = ${money(itemCost)}`;
    }).join('\n');
    fd.append('order_items', itemsFormatted);
    fd.append('subtotal_pkr', String(total()));
    fd.append('currency', 'PKR');
    fd.append('source', 'NutriSeeds Pakistan Website');

    const button = $('#submit-email-order');
    const result = await postForm(config.orderFormEndpoint, fd, button);

    if (result.ok) {
      formFeedback('#order-feedback',
        'Thank you! Your order request has been received by NutriSeeds Pakistan. A confirmation has been sent to our verified inbox (ghulamujtabaedu@gmail.com). We will contact you at your provided phone/email to confirm availability and delivery charges.',
        'success');
      cart = [];
      saveCart();
      form.reset();
      toast('Order request submitted successfully!');
    } else {
      formFeedback('#order-feedback',
        `Order could not be sent: ${result.error}. Your basket items and details are preserved. You can also place this order via WhatsApp (03297676956) or email ghulamujtabaedu@gmail.com.`,
        'error');
    }
  });

  // Option B: Order via WhatsApp
  $('#submit-whatsapp-order')?.addEventListener('click', () => {
    if (!cart.length) {
      formFeedback('#order-feedback', 'Your basket is empty. Please add seeds before placing an order request.');
      return;
    }

    const num = config.whatsappNumber || '923297676956';
    if (!numberValid(num)) {
      formFeedback('#order-feedback', 'WhatsApp is not connected yet. Add your verified business number in assets/js/config.js.');
      return;
    }

    const name = $('#order-name')?.value || '';
    const phone = $('#order-phone')?.value || '';
    const email = $('#order-email')?.value || '';
    const city = $('#order-city')?.value || '';
    const address = $('#order-address')?.value || '';
    const notes = $('#order-notes')?.value || '';

    const msg = buildWhatsAppOrderMessage({ name, phone, email, city, address, notes });
    const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    formFeedback('#order-feedback',
      'WhatsApp chat opened with your order summary prefilled. Please review and tap "Send" in WhatsApp to submit your request to NutriSeeds Pakistan (+92 329 7676956). (Your basket items remain saved).',
      'info');
  });
}

function initContact() {
  const form = $('#contact-form');
  if (!form) return;

  const num = config.whatsappNumber || '923297676956';
  const link = $('#contact-wa-link');
  if (link && numberValid(num)) {
    link.hidden = false;
    link.href = `https://wa.me/${num}?text=${encodeURIComponent('Hello NutriSeeds Pakistan! I am interested in your seed products. Please share more information.')}`;
    const unavail = $('#contact-wa-unavailable');
    if (unavail) unavail.hidden = true;
  }

  const hint = $('#contact-connection-hint');
  if (hint) {
    if (endpointValid(config.contactFormEndpoint)) {
      hint.textContent = 'Email form connected to Formspree. Inquiries deliver to ghulamujtabaedu@gmail.com.';
    } else {
      hint.textContent = 'Email setup note: Formspree endpoint pending in assets/js/config.js. WhatsApp chat is active and ready.';
    }
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    formFeedback('#contact-feedback', '');
    if (!form.reportValidity()) return;

    if (!endpointValid(config.contactFormEndpoint)) {
      formFeedback('#contact-feedback',
        'Email delivery setup is pending in assets/js/config.js. You can contact us directly by email at ghulamujtabaedu@gmail.com or via WhatsApp at 03297676956.',
        'error');
      return;
    }

    const name = $('#contact-name').value;
    const email = $('#contact-email').value;
    const phone = $('#contact-phone')?.value || '';
    const subject = $('#contact-subject').value;
    const message = $('#contact-message').value;

    const data = new FormData(form);
    data.append('_subject', `NutriSeeds — New Customer Inquiry: ${subject}`);
    data.append('_replyto', email);
    data.append('customer_name', name);
    data.append('customer_email', email);
    if (phone) data.append('customer_phone', phone);
    data.append('subject', subject);
    data.append('message', message);
    data.append('source', 'NutriSeeds Pakistan Website');

    const result = await postForm(config.contactFormEndpoint, data, $('#contact-submit'));
    if (result.ok) {
      formFeedback('#contact-feedback',
        'Thank you for contacting NutriSeeds Pakistan! Your message has been received. Our team will respond as soon as possible.',
        'success');
      form.reset();
      toast('Message sent successfully!');
    } else {
      formFeedback('#contact-feedback',
        `Message could not be sent: ${result.error}. You can also reach us directly at ghulamujtabaedu@gmail.com or WhatsApp: 03297676956.`,
        'error');
    }
  });
}

function initGlobal() {
  loadCart();

  const yr = $('#year');
  if (yr) yr.textContent = String(new Date().getFullYear());

  const num = config.whatsappNumber || '923297676956';
  const defaultWaMsg = 'Hello NutriSeeds Pakistan! I am interested in your seed products. Please share more information.';

  $$('[data-wa-general]').forEach(a => {
    if (numberValid(num)) {
      a.hidden = false;
      a.href = `https://wa.me/${num}?text=${encodeURIComponent(defaultWaMsg)}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });

  // Drawer quick WhatsApp order button
  $('#drawer-whatsapp-btn')?.addEventListener('click', () => {
    if (!cart.length) {
      toast('Your basket is empty. Please add seeds first.', true);
      return;
    }
    const msg = buildWhatsAppOrderMessage();
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    closeDrawer();
    toast('WhatsApp opened with your basket items. Tap Send in WhatsApp to submit.');
  });

  const toggle = $('[data-menu-toggle]');
  const menu = $('#mobile-nav');
  toggle?.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  document.addEventListener('click', e => {
    if (e.target.closest('[data-drawer-open]')) openDrawer();
    if (e.target.closest('[data-drawer-close]') || e.target.id === 'drawer-backdrop') closeDrawer();

    const addButton = e.target.closest('[data-add]');
    if (addButton) {
      const select = addButton.closest('.product-purchase')?.querySelector('select');
      add(addButton.dataset.add, select?.value || '25');
      openDrawer();
    }

    const inc = e.target.closest('[data-qty]');
    if (inc) changeQty(inc.dataset.id, inc.dataset.size, Number(inc.dataset.qty));

    const rem = e.target.closest('[data-remove]');
    if (rem) remove(rem.dataset.id, rem.dataset.size);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
    if (e.key === 'Tab' && $('#cart-drawer')?.classList.contains('is-open')) {
      const focusables = $$('a[href],button:not(:disabled)', $('#cart-drawer'));
      if (focusables.length) {
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  updateCartUI();
}

document.addEventListener('DOMContentLoaded', () => {
  initGlobal();
  renderHome();
  renderShop();
  renderProduct();
  initFinder();
  initRecipes();
  initOrder();
  initContact();
  $$('#seed-filter,#seed-sort').forEach(el => el.addEventListener('change', renderShop));
});

})();
