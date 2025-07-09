const backendUrl = 'https://your-backend-url.com/api'; // CHANGE THIS to your backend API URL

async function fetchProperties() {
  try {
    const res = await fetch(`${backendUrl}/properties`);
    const properties = await res.json();
    renderProperties(properties);
  } catch (err) {
    renderProperties([]);
  }
}

function renderProperties(properties = []) {
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
    card.onclick = () => window.createModal(property);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', fetchProperties);
document.addEventListener('DOMContentLoaded', updateNavbarAuth); 