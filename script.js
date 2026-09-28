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

const dashboardOverlay = document.getElementById('dashboardOverlay');
const dashboardClose = document.getElementById('dashboardClose');
const dashboardOwnerName = document.getElementById('dashboardOwnerName');
const salesStats = document.getElementById('salesStats');
const ordersTableBody = document.getElementById('ordersTableBody');

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
}

function openDashboard(ownerName) {
  dashboardOwnerName.textContent = `— ${ownerName}`;
  renderDashboard();
  dashboardOverlay.classList.add('open');
}

function closeDashboard() {
  dashboardOverlay.classList.remove('open');
}

dashboardClose.addEventListener('click', closeDashboard);
dashboardOverlay.addEventListener('click', (e) => {
  if (e.target === dashboardOverlay) closeDashboard();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDashboard();
});

signinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = signinUser.value.trim();
  const pass = signinPass.value;
  if (OWNERS[user] && OWNERS[user] === pass) {
    signinError.style.color = '#4caf7d';
    signinError.textContent = `Welcome, ${user}.`;
    setTimeout(() => {
      closeSignin();
      openDashboard(user);
    }, 700);
  } else {
    signinError.style.color = '#e2685c';
    signinError.textContent = 'Invalid username or password.';
  }
});

document.querySelectorAll('.dropdown-item').forEach((item) => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    closeDropdown();
    if (action === 'signin') {
      openSignin();
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
