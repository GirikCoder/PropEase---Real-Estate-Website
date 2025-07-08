// Sample property data
const properties = [
  {
    id: 1,
    title: 'Modern Family Home',
    location: 'Los Angeles, CA',
    price: '$1,200,000',
    image: 'https://images.unsplash.com/photo-1560184897-6a8c1b1b1c8b?auto=format&fit=crop&w=800&q=80',
    description: 'A beautiful modern home in the heart of LA.',
    area: '2,500 sq ft',
    rooms: '4 bedrooms, 3 bathrooms'
  },
  {
    id: 2,
    title: 'Cozy Suburban House',
    location: 'Austin, TX',
    price: '$850,000',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'A cozy house perfect for families.',
    area: '1,800 sq ft',
    rooms: '3 bedrooms, 2 bathrooms'
  }
];

function renderProperties() {
  const grid = document.querySelector('.property-grid');
  grid.innerHTML = '';
  properties.forEach(property => {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <img src="${property.image}" alt="${property.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/350x200?text=No+Image';this.classList.add('fallback');">
      <div class="card-content">
        <div class="card-title">${property.title}</div>
        <div class="card-location">${property.location}</div>
        <div class="card-price">${property.price}</div>
        <div class="card-area">Area: ${property.area || '-'} | Rooms: ${property.rooms || '-'}</div>
      </div>
    `;
    card.addEventListener('click', () => openPropertyModal(property));
    grid.appendChild(card);
  });
}

function openPropertyModal(property) {
  window.createModal(property);
}

function updateNavbarAuth() {
  const token = localStorage.getItem('token');
  const navAuthLinks = document.querySelectorAll('.nav-auth');
  const loginBtn = document.querySelector('.btn-outline');
  const signupBtn = document.querySelector('.btn-primary');
  let logoutBtn = document.getElementById('logoutBtn');

  navAuthLinks.forEach(link => link.style.display = token ? '' : 'none');
  if (loginBtn) loginBtn.style.display = token ? 'none' : '';
  if (signupBtn) signupBtn.style.display = token ? 'none' : '';

  if (token && !logoutBtn) {
    logoutBtn = document.createElement('a');
    logoutBtn.href = '#';
    logoutBtn.className = 'btn-outline';
    logoutBtn.id = 'logoutBtn';
    logoutBtn.textContent = 'Logout';
    logoutBtn.onclick = () => {
      localStorage.removeItem('token');
      location.reload();
    };
    document.querySelector('.auth-buttons').appendChild(logoutBtn);
  } else if (!token && logoutBtn) {
    logoutBtn.remove();
  }
}

document.addEventListener('DOMContentLoaded', renderProperties);
document.addEventListener('DOMContentLoaded', updateNavbarAuth); 