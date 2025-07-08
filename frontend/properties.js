// Sample property data (should be fetched from backend in real app)
const properties = [
  {
    id: 1,
    title: 'Modern Family Home',
    location: 'Los Angeles, CA',
    price: '$1,200,000',
    image: 'https://media.istockphoto.com/id/2155901088/photo/exterior-view-of-a-contemporary-new-home-in-los-angeles.jpg?s=612x612&w=0&k=20&c=9uVZiYWqMQjZwz_FhlLFxOucUpzPCJVvtLk7Rz5yqJU=',
    description: 'A beautiful modern home in the heart of LA.'
  },
  {
    id: 2,
    title: 'Cozy Suburban House',
    location: 'Austin, TX',
    price: '$850,000',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'A cozy house perfect for families.'
  }
];

function renderProperties() {
  const grid = document.querySelector('.property-grid');
  grid.innerHTML = '';
  properties.forEach(property => {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <img src="${property.image}" alt="${property.title}">
      <div class="card-content">
        <div class="card-title">${property.title}</div>
        <div class="card-location">${property.location}</div>
        <div class="card-price">${property.price}</div>
      </div>
    `;
    card.addEventListener('click', () => openPropertyModal(property));
    grid.appendChild(card);
  });
}

function openPropertyModal(property) {
  window.createModal(property);
}

document.addEventListener('DOMContentLoaded', renderProperties); 