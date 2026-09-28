const toast = document.getElementById('toast');
let toastTimer = null;

function hideToast() {
  toast.classList.remove('show');
}

function showToast(message) {
  toast.innerHTML = '';
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2200);
}

function showAuthPrompt(message) {
  clearTimeout(toastTimer);
  toast.innerHTML = '';

  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  const signinBtn = document.createElement('button');
  signinBtn.className = 'toast-action';
  signinBtn.textContent = 'Sign In';
  signinBtn.addEventListener('click', () => {
    hideToast();
    openSignin();
  });
  toast.appendChild(signinBtn);

  const signupBtn = document.createElement('button');
  signupBtn.className = 'toast-action';
  signupBtn.textContent = 'Sign Up';
  signupBtn.addEventListener('click', () => {
    hideToast();
    openSignup();
  });
  toast.appendChild(signupBtn);

  toast.classList.add('show');
  toastTimer = setTimeout(hideToast, 6000);
}

const dotsBtn = document.getElementById('dotsBtn');
const dropdown = document.getElementById('dropdown');

function closeDropdown() {
  dropdown.classList.remove('open');
  dotsBtn.setAttribute('aria-expanded', 'false');
}

function toggleDropdown() {
  const isOpen = dropdown.classList.toggle('open');
  dotsBtn.setAttribute('aria-expanded', String(isOpen));
}

dotsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && e.target !== dotsBtn) {
    closeDropdown();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDropdown();
});

const OWNERS = {
  'Jiyaan': '#cookie71',
  'Nirmitee': '@mithibhurat',
  'Presha': 'preesh_29',
  'Ananya': '#lalisa67',
};

const signinOverlay = document.getElementById('signinOverlay');
const signinClose = document.getElementById('signinClose');
const signinForm = document.getElementById('signinForm');
const signinUser = document.getElementById('signinUser');
const signinPass = document.getElementById('signinPass');
const signinError = document.getElementById('signinError');

function openSignin() {
  signinOverlay.classList.add('open');
  signinError.textContent = '';
  signinForm.reset();
  signinUser.focus();
}

function closeSignin() {
  signinOverlay.classList.remove('open');
}

signinClose.addEventListener('click', closeSignin);
signinOverlay.addEventListener('click', (e) => {
  if (e.target === signinOverlay) closeSignin();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSignin();
});

const signupOverlay = document.getElementById('signupOverlay');
const signupClose = document.getElementById('signupClose');
const signupForm = document.getElementById('signupForm');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupNumber = document.getElementById('signupNumber');
const signupPassword = document.getElementById('signupPassword');
const signupError = document.getElementById('signupError');

const SIGNUPS_KEY = 'velarque_signups';

function getSignups() {
  try {
    return JSON.parse(localStorage.getItem(SIGNUPS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveSignup(entry) {
  const signups = getSignups();
  signups.push(entry);
  localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups));
}

const ORDERS_KEY = 'velarque_orders';

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveOrder(entry) {
  const orders = getOrders();
  orders.unshift(entry);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find((o) => o.orderId === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}

function getOrdersForCustomer(name) {
  return getOrders().filter((o) => o.customer === name);
}

function findSignupByEmail(email) {
  return getSignups().find((s) => s.email.toLowerCase() === email.toLowerCase());
}

function openSignup() {
  signupOverlay.classList.add('open');
  signupError.textContent = '';
  signupForm.reset();
  signupName.focus();
}

function closeSignup() {
  signupOverlay.classList.remove('open');
}

signupClose.addEventListener('click', closeSignup);
signupOverlay.addEventListener('click', (e) => {
  if (e.target === signupOverlay) closeSignup();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSignup();
});

const myOrdersItem = document.getElementById('myOrdersItem');
const myOrdersLabel = document.getElementById('myOrdersLabel');
const signupItem = document.getElementById('signupItem');
const signinItem = document.getElementById('signinItem');
const logoutItem = document.getElementById('logoutItem');

function setLoggedInMenu(label) {
  myOrdersItem.hidden = false;
  myOrdersLabel.textContent = label;
  signupItem.hidden = true;
  signinItem.hidden = true;
  logoutItem.hidden = false;
  cartBtn.hidden = false;
}

function setLoggedOutMenu() {
  myOrdersItem.hidden = true;
  signupItem.hidden = false;
  signinItem.hidden = false;
  logoutItem.hidden = true;
  cartBtn.hidden = true;
}

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupEmail.value.trim();
  if (findSignupByEmail(email)) {
    signupError.style.color = '#e2685c';
    signupError.textContent = 'An account with this email already exists.';
    return;
  }
  saveSignup({
    name: signupName.value.trim(),
    email,
    number: signupNumber.value.trim(),
    password: signupPassword.value,
  });
  signupError.style.color = '#4caf7d';
  signupError.textContent = 'Signed up successfully.';
  currentUserName = signupName.value.trim();
  setLoggedInMenu('My Orders');
  setTimeout(closeSignup, 900);
});

const heroPage = document.getElementById('heroPage');
const dashboardPage = document.getElementById('dashboardPage');
const dashboardLogout = document.getElementById('dashboardLogout');
const dashboardOwnerName = document.getElementById('dashboardOwnerName');
const salesStats = document.getElementById('salesStats');
const ordersTableBody = document.getElementById('ordersTableBody');
const signupsTableBody = document.getElementById('signupsTableBody');
const signupsTable = document.getElementById('signupsTable');
const signupsEmpty = document.getElementById('signupsEmpty');

const SALES_SUMMARY = [
  { label: "Today's Sales", value: '₹8,420' },
  { label: "This Month", value: '₹1,64,300' },
  { label: "Total Orders", value: '312' },
];

const CUSTOMER_ORDERS = [
  { customer: 'Aarav Deshmukh', item: 'Silk Scarf Set', amount: '₹2,499', status: 'delivered' },
  { customer: 'Meera Joshi', item: 'Leather Tote', amount: '₹4,850', status: 'processing' },
  { customer: 'Rohan Kulkarni', item: 'Velvet Cushion Cover', amount: '₹1,299', status: 'pending' },
  { customer: 'Sanjana Patil', item: 'Ceramic Vase', amount: '₹1,899', status: 'delivered' },
  { customer: 'Devansh Rao', item: 'Handloom Throw', amount: '₹3,199', status: 'pending' },
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderDashboard() {
  salesStats.innerHTML = SALES_SUMMARY.map((s) => `
    <div class="stat-card">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  const liveOrders = getOrders().map((o) => ({
    orderId: o.orderId,
    customer: o.customer,
    item: o.item,
    notes: o.notes,
    amount: `₹${o.amount}`,
    status: o.status || 'pending',
    live: true,
  }));

  const allOrders = liveOrders.concat(CUSTOMER_ORDERS);
  const statusOptions = ['pending', 'processing', 'delivered', 'cancelled'];

  ordersTableBody.innerHTML = allOrders.map((o) => `
    <tr>
      <td>${escapeHtml(o.customer)}</td>
      <td>${escapeHtml(o.item)}${o.notes ? `<div class="order-note">Note: ${escapeHtml(o.notes)}</div>` : ''}</td>
      <td>${escapeHtml(o.amount)}</td>
      <td>${o.live
          ? `<select class="order-status-select" data-order-id="${escapeHtml(o.orderId)}">
              ${statusOptions.map((s) => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}
            </select>`
          : `<span class="order-status ${o.status}">${o.status}</span>`
        }</td>
    </tr>
  `).join('');

  ordersTableBody.querySelectorAll('.order-status-select').forEach((select) => {
    select.addEventListener('change', () => {
      updateOrderStatus(select.dataset.orderId, select.value);
    });
  });

  const signups = getSignups();
  if (signups.length === 0) {
    signupsTable.style.display = 'none';
    signupsEmpty.style.display = 'block';
  } else {
    signupsTable.style.display = '';
    signupsEmpty.style.display = 'none';
    signupsTableBody.innerHTML = signups.map((s) => `
      <tr>
        <td>${escapeHtml(s.name)}</td>
        <td>${escapeHtml(s.email)}</td>
        <td>${escapeHtml(s.number)}</td>
      </tr>
    `).join('');
  }
}

function openDashboard(ownerName) {
  dashboardOwnerName.textContent = `— ${ownerName}`;
  renderDashboard();
  heroPage.hidden = true;
  dashboardPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeDashboard() {
  dashboardPage.hidden = true;
  heroPage.hidden = false;
}

const welcomeBanner = document.getElementById('welcomeBanner');

function showWelcomeBanner(name) {
  welcomeBanner.textContent = `Welcome back, ${name}`;
  welcomeBanner.hidden = false;
}

function greetCustomer(name) {
  showWelcomeBanner(name);
}

let currentOwner = null;
let currentUserName = null;

function logOut() {
  currentOwner = null;
  currentUserName = null;
  closeDashboard();
  closeMyOrders();
  setLoggedOutMenu();
  welcomeBanner.hidden = true;
  welcomeBanner.textContent = '';
  CART = [];
  updateCartBadge();
  closeCart();
  closeCheckout();
}

dashboardLogout.addEventListener('click', logOut);

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = signinUser.value.trim();
  const pass = signinPass.value;

  if (OWNERS[user] && OWNERS[user] === pass) {
    signinError.style.color = '#4caf7d';
    signinError.textContent = `Welcome, ${user}.`;
    setTimeout(() => {
      closeSignin();
      currentOwner = user;
      currentUserName = user;
      showWelcomeBanner(user);
      setLoggedInMenu('Customer Orders');
      openDashboard(user);
    }, 700);
    return;
  }

  const account = findSignupByEmail(user);
  if (account && account.password === pass) {
    signinError.style.color = '#4caf7d';
    signinError.textContent = `Welcome back, ${account.name}.`;
    setTimeout(() => {
      closeSignin();
      currentUserName = account.name;
      greetCustomer(account.name);
      setLoggedInMenu('My Orders');
    }, 700);
    return;
  }

  signinError.style.color = '#e2685c';
  signinError.textContent = 'Invalid username or password.';
});

const myOrdersPage = document.getElementById('myOrdersPage');
const myOrdersBack = document.getElementById('myOrdersBack');

const myOrdersList = document.getElementById('myOrdersList');
const myOrdersEmpty = document.getElementById('myOrdersEmpty');

function renderMyOrders() {
  const orders = getOrdersForCustomer(currentUserName);
  if (orders.length === 0) {
    myOrdersList.innerHTML = '';
    myOrdersList.style.display = 'none';
    myOrdersEmpty.style.display = 'block';
    return;
  }

  myOrdersList.style.display = 'block';
  myOrdersEmpty.style.display = 'none';

  myOrdersList.innerHTML = orders.map((o) => `
    <div class="my-order-card">
      <div class="my-order-card-header">
        <span class="my-order-id">#${escapeHtml(o.orderId)}</span>
        <span class="my-order-date">${new Date(o.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
      </div>
      <div class="my-order-items">${escapeHtml(o.item)}</div>
      <div class="my-order-footer">
        <span class="my-order-amount">Rs ${o.amount}</span>
        <span class="order-status ${o.status || 'pending'}">${o.status || 'pending'}</span>
      </div>
    </div>
  `).join('');
}

function openMyOrders() {
  if (currentOwner) {
    openDashboard(currentOwner);
    return;
  }
  renderMyOrders();
  heroPage.hidden = true;
  dashboardPage.hidden = true;
  myOrdersPage.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeMyOrders() {
  myOrdersPage.hidden = true;
  heroPage.hidden = false;
}

myOrdersBack.addEventListener('click', closeMyOrders);

const storyOverlay = document.getElementById('storyOverlay');
const storyClose = document.getElementById('storyClose');

function openStory() {
  storyOverlay.classList.add('open');
}

function closeStory() {
  storyOverlay.classList.remove('open');
}

storyClose.addEventListener('click', closeStory);
storyOverlay.addEventListener('click', (e) => {
  if (e.target === storyOverlay) closeStory();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeStory();
});

document.querySelectorAll('.dropdown-item').forEach((item) => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    closeDropdown();
    if (action === 'signin') {
      openSignin();
    } else if (action === 'signup') {
      openSignup();
    } else if (action === 'orders') {
      openMyOrders();
    } else if (action === 'logout') {
      logOut();
    } else if (action === 'more') {
      openStory();
    }
  });
});

const footerDate = document.getElementById('footerDate');
if (footerDate) {
  footerDate.textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const PRODUCTS = [
  { tag: 'Notebooks', title: 'Handmade Notebooks', desc: 'Hand-stitched notebooks with floral covers, ready for your next big idea.', price: 'Rs 350', priceValue: 350, weight: 'Each', image: 'images/tile-handmade-notebooks.jpg' },
  { tag: 'Journals', title: 'Mini Journals', desc: 'Pocket-sized journals with butterfly-print covers, perfect for jotting thoughts on the go.', price: 'Rs 280', priceValue: 280, weight: 'Each', image: 'images/tile-mini-journals.jpg' },
  { tag: 'Stickers', title: 'Sticker Packs', desc: 'Colourful sticker sheets to decorate journals, laptops and letters.', price: 'Rs 99', priceValue: 99, weight: 'Pack', image: 'images/tile-sticker-packs.jpg' },
  { tag: 'Bookmarks', title: 'Bookmarks', desc: 'Hand-painted bookmarks with tassels, a little bookmark for a big story.', price: 'Rs 79', priceValue: 79, weight: 'Each', image: 'images/tile-bookmarks.jpg' },
  { tag: 'Cards', title: 'Friendship Cards', desc: 'Hand-illustrated cards to tell your best friend they mean the world.', price: 'Rs 89', priceValue: 89, weight: 'Each', image: 'images/tile-friendship-cards.jpg' },
  { tag: 'Cards', title: 'Greeting Cards', desc: 'Handcrafted greeting cards for birthdays and every little celebration.', price: 'Rs 89', priceValue: 89, weight: 'Each', image: 'images/tile-greeting-cards.jpg' },
  { tag: 'Envelopes', title: 'Handmade Envelopes', desc: 'Wax-sealed handmade envelopes that make any letter feel special.', price: 'Rs 59', priceValue: 59, weight: 'Each', image: 'images/tile-handmade-envelopes.jpg' },
  { tag: 'Scrapbooking', title: 'Scrapbook Kits', desc: 'Everything you need to start your own scrapbook full of good vibes.', price: 'Rs 320', priceValue: 320, weight: 'Kit', image: 'images/tile-scrapbook-kits.jpg' },
  { tag: 'Stationery', title: 'Washi-Style Decorative Sets', desc: 'Washi tape rolls and decorative sets to brighten up your desk.', price: 'Rs 150', priceValue: 150, weight: 'Set', image: 'images/tile-washi-style-decorative-sets.jpg' },
  { tag: 'Charms', title: 'Paper Charms', desc: 'Delicate paper charms shaped like flowers and butterflies.', price: 'Rs 99', priceValue: 99, weight: 'Each', image: 'images/tile-paper-charms.jpg' },
  { tag: 'Charms', title: 'Beaded Charms', desc: 'Colourful beaded charms for bags, keys and bracelets.', price: 'Rs 129', priceValue: 129, weight: 'Each', image: 'images/tile-beaded-charms.jpg' },
  { tag: 'Tags', title: 'Name Tags', desc: 'Handwritten name tags to personalise gifts and bags.', price: 'Rs 69', priceValue: 69, weight: 'Each', image: 'images/tile-name-tags.jpg' },
  { tag: 'Gifting', title: 'Mini Gift Boxes', desc: 'Tiny handcrafted gift boxes for the sweetest surprises.', price: 'Rs 99', priceValue: 99, weight: 'Each', image: 'images/tile-mini-gift-boxes.jpg' },
  { tag: 'Blind Bags', title: 'Blind Bags', desc: 'Mystery bags of handmade goodies — a surprise every time.', price: 'Rs 199', priceValue: 199, weight: 'Each', image: 'images/tile-blind-bags.jpg' },
  { tag: 'Blind Boxes', title: 'Blind Boxes', desc: 'Mystery boxes packed with a handpicked handmade surprise.', price: 'Rs 249', priceValue: 249, weight: 'Each', image: 'images/tile-blind-boxes.jpg' },
  { tag: 'Squishies', title: 'Squishy-Themed Crafts', desc: 'Soft, squishy handmade characters to squeeze and collect.', price: 'Rs 179', priceValue: 179, weight: 'Each', image: 'images/tile-squishy-themed-crafts.jpg' },
  { tag: 'Phone Decor', title: 'Phone Decorations', desc: 'Bow charms and beaded chains to dress up your phone.', price: 'Rs 149', priceValue: 149, weight: 'Each', image: 'images/tile-phone-decorations.jpg' },
  { tag: 'Phone Decor', title: 'Phone Charms', desc: 'Beaded phone charms in playful colours and shapes.', price: 'Rs 129', priceValue: 129, weight: 'Each', image: 'images/tile-phone-charms.jpg' },
  { tag: 'Custom', title: 'Custom Letters', desc: 'Handwritten custom letters, made just for you.', price: 'Rs 199', priceValue: 199, weight: 'Each', image: 'images/tile-custom-letters.jpg' },
  { tag: 'Custom', title: 'Personalised Cards', desc: 'Cards personalised with your own message and design.', price: 'Rs 149', priceValue: 149, weight: 'Each', image: 'images/tile-personalised-cards.jpg' },
  { tag: 'Crochet', title: 'Crochet', desc: 'Hand-crocheted bunnies and yarn crafts, made stitch by stitch.', price: 'Rs 249', priceValue: 249, weight: 'Each', image: 'images/tile-crochet.jpg' },
  { tag: 'Stationery', title: 'Birthday Stationery', desc: "A cheerful stationery set to celebrate someone's big day.", price: 'Rs 129', priceValue: 129, weight: 'Set', image: 'images/tile-birthday-stationery.jpg' },
  { tag: 'Stationery', title: 'Return-Gift Stationery', desc: 'Thoughtful little stationery sets, perfect as return gifts.', price: 'Rs 99', priceValue: 99, weight: 'Set', image: 'images/tile-return-gift-stationery.jpg' },
  { tag: 'Stationery', title: 'School Stationery', desc: 'Cute pens and stationery to make school days more fun.', price: 'Rs 199', priceValue: 199, weight: 'Set', image: 'images/tile-school-stationery.jpg' },
  { tag: 'Memo Pads', title: 'Cute Memo Pads', desc: 'Adorable memo pads for notes, lists and little reminders.', price: 'Rs 89', priceValue: 89, weight: 'Each', image: 'images/tile-cute-memo-pads.jpg' },
  { tag: 'Folders', title: 'Handmade Folders', desc: 'Handmade folders with floral prints to keep your papers pretty.', price: 'Rs 199', priceValue: 199, weight: 'Each', image: 'images/tile-handmade-folders.jpg' },
  { tag: 'Art', title: 'Art Cards', desc: 'Mini art prints featuring hand-illustrated scenes and florals.', price: 'Rs 149', priceValue: 149, weight: 'Set', image: 'images/tile-art-cards.jpg' },
  { tag: 'Paper', title: 'Decorative Paper Sets', desc: 'A rainbow of decorative papers for crafting and gift wrapping.', price: 'Rs 129', priceValue: 129, weight: 'Set', image: 'images/tile-decorative-paper-sets.jpg' },
  { tag: 'Custom', title: 'Custom Name', desc: 'A wooden name charm, custom-made with your name.', price: 'Rs 249', priceValue: 249, weight: 'Each', image: 'images/tile-custom-name.jpg' },
];

const productsGrid = document.getElementById('productsGrid');
const productsEmpty = document.getElementById('productsEmpty');
const searchInput = document.getElementById('searchInput');

function renderProducts(indices) {
  if (!productsGrid) return;

  if (indices.length === 0) {
    productsGrid.style.display = 'none';
    productsEmpty.style.display = 'block';
    return;
  }

  productsGrid.style.display = 'grid';
  productsEmpty.style.display = 'none';

  productsGrid.innerHTML = indices.map((i) => {
    const p = PRODUCTS[i];
    return `
    <div class="product-card">
      <div class="product-card-image">
        <img src="${p.image}" alt="${escapeHtml(p.title)}">
      </div>
      <div class="product-card-body">
        <span class="product-tag">${escapeHtml(p.tag)}</span>
        <h3 class="product-title">${escapeHtml(p.title)}</h3>
        <p class="product-desc">${escapeHtml(p.desc)}</p>
        <div class="product-meta">
          <span class="product-price">${escapeHtml(p.price)}</span>
          <span class="product-weight">${escapeHtml(p.weight)}</span>
        </div>
        <div class="size-selector">
          <button class="size-btn" data-size="S">S</button>
          <button class="size-btn active" data-size="M">M</button>
          <button class="size-btn" data-size="L">L</button>
        </div>
        <button class="product-add-btn" data-index="${i}">Add</button>
      </div>
    </div>
  `;
  }).join('');

  productsGrid.querySelectorAll('.product-card').forEach((card) => {
    card.querySelectorAll('.size-btn').forEach((sizeBtn) => {
      sizeBtn.addEventListener('click', () => {
        card.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('active'));
        sizeBtn.classList.add('active');
      });
    });
  });

  productsGrid.querySelectorAll('.product-add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (cartBtn.hidden) {
        showAuthPrompt('Please sign in or sign up first');
        return;
      }
      const card = btn.closest('.product-card');
      const activeSizeBtn = card.querySelector('.size-btn.active');
      const size = activeSizeBtn ? activeSizeBtn.dataset.size : 'M';
      addToCart(Number(btn.dataset.index), size);
      btn.textContent = 'Added';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = 'Add';
        btn.classList.remove('added');
      }, 1200);
    });
  });
}

function filterProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return PRODUCTS.map((_, i) => i);
  return PRODUCTS
    .map((p, i) => ({ p, i }))
    .filter(({ p }) =>
      p.title.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    )
    .map(({ i }) => i);
}

if (productsGrid) {
  renderProducts(filterProducts(''));
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    renderProducts(filterProducts(searchInput.value));
  });
}

let CART = [];

function addToCart(productIndex, size) {
  const existing = CART.find((c) => c.productIndex === productIndex && c.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    CART.push({ productIndex, size, qty: 1 });
  }
  updateCartBadge();
}

function cartCount() {
  return CART.reduce((sum, c) => sum + c.qty, 0);
}

function cartSubtotal() {
  return CART.reduce((sum, c) => sum + PRODUCTS[c.productIndex].priceValue * c.qty, 0);
}

const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItemsEl = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartSummary = document.getElementById('cartSummary');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function updateCartBadge() {
  const count = cartCount();
  cartBadge.textContent = String(count);
  cartBadge.hidden = count === 0;
}

function renderCart() {
  if (CART.length === 0) {
    cartItemsEl.innerHTML = '';
    cartItemsEl.style.display = 'none';
    cartEmpty.style.display = 'block';
    cartSummary.hidden = true;
    return;
  }

  cartItemsEl.style.display = 'block';
  cartEmpty.style.display = 'none';
  cartSummary.hidden = false;

  cartItemsEl.innerHTML = CART.map((c, i) => {
    const p = PRODUCTS[c.productIndex];
    const sizeOptions = ['S', 'M', 'L'].map((s) =>
      `<option value="${s}" ${s === c.size ? 'selected' : ''}>${s}</option>`
    ).join('');
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${escapeHtml(p.title)}">
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(p.title)}</div>
          <div class="cart-item-price">Rs ${p.priceValue} x ${c.qty}</div>
          <select class="cart-size-select" data-cart-index="${i}" aria-label="Change size">${sizeOptions}</select>
        </div>
        <div class="cart-qty">
          <button data-cart-action="dec" data-cart-index="${i}" aria-label="Decrease quantity">&minus;</button>
          <span>${c.qty}</span>
          <button data-cart-action="inc" data-cart-index="${i}" aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-remove" data-cart-action="remove" data-cart-index="${i}" aria-label="Remove item">&times;</button>
      </div>
    `;
  }).join('');

  cartSubtotalEl.textContent = `Rs ${cartSubtotal()}`;

  cartItemsEl.querySelectorAll('[data-cart-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.cartIndex);
      const action = btn.dataset.cartAction;
      if (action === 'inc') CART[i].qty += 1;
      else if (action === 'dec') {
        CART[i].qty -= 1;
        if (CART[i].qty <= 0) CART.splice(i, 1);
      } else if (action === 'remove') {
        CART.splice(i, 1);
      }
      updateCartBadge();
      renderCart();
    });
  });

  cartItemsEl.querySelectorAll('.cart-size-select').forEach((select) => {
    select.addEventListener('change', () => {
      const i = Number(select.dataset.cartIndex);
      const item = CART[i];
      const newSize = select.value;
      const duplicate = CART.find((c, idx) => idx !== i && c.productIndex === item.productIndex && c.size === newSize);
      if (duplicate) {
        duplicate.qty += item.qty;
        CART.splice(i, 1);
      } else {
        item.size = newSize;
      }
      updateCartBadge();
      renderCart();
    });
  });
}

function openCart() {
  renderCart();
  cartOverlay.classList.add('open');
}

function closeCart() {
  cartOverlay.classList.remove('open');
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', (e) => {
  if (e.target === cartOverlay) closeCart();
});

const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutClose = document.getElementById('checkoutClose');
const checkoutFormView = document.getElementById('checkoutFormView');
const checkoutSuccessView = document.getElementById('checkoutSuccessView');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutAddress = document.getElementById('checkoutAddress');
const checkoutNotes = document.getElementById('checkoutNotes');
const checkoutTotal = document.getElementById('checkoutTotal');
const checkoutError = document.getElementById('checkoutError');
const checkoutSubmitBtn = document.getElementById('checkoutSubmitBtn');
const checkoutOrderId = document.getElementById('checkoutOrderId');
const checkoutDoneBtn = document.getElementById('checkoutDoneBtn');

function openCheckout() {
  if (CART.length === 0) return;
  closeCart();
  checkoutFormView.hidden = false;
  checkoutSuccessView.hidden = true;
  checkoutError.textContent = '';
  checkoutTotal.textContent = `Rs ${cartSubtotal()}`;
  checkoutOverlay.classList.add('open');
}

function closeCheckout() {
  checkoutOverlay.classList.remove('open');
}

checkoutBtn.addEventListener('click', openCheckout);
checkoutClose.addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', (e) => {
  if (e.target === checkoutOverlay) closeCheckout();
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkoutError.textContent = '';
  checkoutSubmitBtn.disabled = true;
  checkoutSubmitBtn.textContent = 'Processing...';

  setTimeout(() => {
    const orderId = 'VLQ-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const total = cartSubtotal();
    const itemSummary = CART.map((c) => `${PRODUCTS[c.productIndex].title} (${c.size}) x${c.qty}`).join(', ');

    saveOrder({
      orderId,
      customer: currentUserName || 'Guest',
      item: itemSummary,
      amount: total,
      address: checkoutAddress.value.trim(),
      notes: checkoutNotes.value.trim(),
      status: 'pending',
      date: new Date().toISOString(),
    });

    checkoutOrderId.textContent = `Order #${orderId} · Rs ${total}`;
    checkoutFormView.hidden = true;
    checkoutSuccessView.hidden = false;
    checkoutSubmitBtn.disabled = false;
    checkoutSubmitBtn.textContent = 'Place Order';
    CART = [];
    updateCartBadge();
    checkoutForm.reset();
  }, 1000);
});

checkoutDoneBtn.addEventListener('click', closeCheckout);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeCheckout();
  }
});
