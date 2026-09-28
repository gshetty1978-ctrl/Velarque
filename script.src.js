const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
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

  ordersTableBody.innerHTML = CUSTOMER_ORDERS.map((o) => `
    <tr>
      <td>${o.customer}</td>
      <td>${o.item}</td>
      <td>${o.amount}</td>
      <td><span class="order-status ${o.status}">${o.status}</span></td>
    </tr>
  `).join('');

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

const heroSub = document.getElementById('heroSub');
const welcomeBanner = document.getElementById('welcomeBanner');
const HERO_DEFAULT_TEXT = heroSub.textContent;

function showWelcomeBanner(name) {
  welcomeBanner.textContent = `Welcome back, ${name}`;
  welcomeBanner.hidden = false;
}

function greetCustomer(name) {
  heroSub.textContent = `Welcome back, ${name}.`;
  showWelcomeBanner(name);
}

let currentOwner = null;

function logOut() {
  currentOwner = null;
  closeDashboard();
  closeMyOrders();
  setLoggedOutMenu();
  welcomeBanner.hidden = true;
  welcomeBanner.textContent = '';
  heroSub.textContent = HERO_DEFAULT_TEXT;
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

function openMyOrders() {
  if (currentOwner) {
    openDashboard(currentOwner);
    return;
  }
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
  {
    tag: 'Keychains',
    title: 'Character Keychains',
    desc: 'Handmade acrylic keychains in cute character designs, perfect for bags and keys.',
    price: 'Rs 150',
    priceValue: 150,
    weight: 'Each',
    image: 'images/slide-keychains.jpg',
  },
  {
    tag: 'Notebooks',
    title: 'Handmade Notebooks',
    desc: 'Leather-bound journals with hand-stitched pages, ready for your next big idea.',
    price: 'Rs 350',
    priceValue: 350,
    weight: 'A5 size',
    image: 'images/slide-notebooks.jpg',
  },
  {
    tag: 'Stationery',
    title: 'Stationery & Accessories',
    desc: 'Washi tapes, pens and sticky notes to brighten up your desk.',
    price: 'Rs 220',
    priceValue: 220,
    weight: 'Set of 5',
    image: 'images/slide-stationery.jpg',
  },
  {
    tag: 'Cards',
    title: 'Birthday Cards & Prints',
    desc: 'Hand-illustrated greeting cards for birthdays and every celebration.',
    price: 'Rs 120',
    priceValue: 120,
    weight: 'Each',
    image: 'images/slide-cards.jpg',
  },
  {
    tag: 'Teddy Bears',
    title: 'Handmade Teddy Bears',
    desc: 'Soft, hand-stitched teddy bears made with love, each one one-of-a-kind.',
    price: 'Rs 450',
    priceValue: 450,
    weight: 'Each',
    image: 'images/product-teddybears.jpg',
  },
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
        <button class="product-add-btn" data-index="${i}">Add</button>
      </div>
    </div>
  `;
  }).join('');

  productsGrid.querySelectorAll('.product-add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (cartBtn.hidden) {
        showToast('Please sign up or sign in first');
        openSignin();
        return;
      }
      addToCart(Number(btn.dataset.index));
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

function addToCart(productIndex) {
  const existing = CART.find((c) => c.productIndex === productIndex);
  if (existing) {
    existing.qty += 1;
  } else {
    CART.push({ productIndex, qty: 1 });
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
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${escapeHtml(p.title)}">
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(p.title)}</div>
          <div class="cart-item-price">Rs ${p.priceValue} x ${c.qty}</div>
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
    checkoutOrderId.textContent = `Order #${orderId} · Rs ${cartSubtotal()}`;
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
