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
}

function setLoggedOutMenu() {
  myOrdersItem.hidden = true;
  signupItem.hidden = false;
  signinItem.hidden = false;
  logoutItem.hidden = true;
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
