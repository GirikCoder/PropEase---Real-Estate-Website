const backendUrl = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const formContainer = document.getElementById('property-form-container');
  if (!token) {
    formContainer.innerHTML = '<div style="color:#d32f2f;font-weight:500;">Please <a href="login.html">log in</a> to register a property.</div>';
    return;
  }
  formContainer.innerHTML = `
    <form id="propertyForm" enctype="multipart/form-data" class="property-form">
      <h3>Register New Property</h3>
      <input type="text" name="title" placeholder="Title" required>
      <textarea name="description" placeholder="Description" required></textarea>
      <input type="text" name="price" placeholder="Price" required>
      <input type="text" name="location" placeholder="Location" required>
      <input type="text" name="area" placeholder="Area (e.g., 2000 sq ft)" required>
      <input type="number" name="rooms" placeholder="Number of Rooms" required min="1">
      <label>Parking:
        <select name="parking" required>
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <label>Floor:
        <select name="floor" required>
          <option value="">Select</option>
          <option value="Ground">Ground</option>
          <option value="First">First</option>
          <option value="Top">Top</option>
          <option value="Entire House">Entire House</option>
        </select>
      </label>
      <input type="file" name="image" accept="image/*" required>
      <button type="submit" class="btn-primary">Register Property</button>
      <div id="property-success" style="display:none;color:green;margin-top:1rem;">Property registered!</div>
    </form>
  `;

  document.getElementById('propertyForm').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.set('parking', form.parking.value === 'true');
    try {
      const res = await fetch(`${backendUrl}/properties`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        form.reset();
        document.getElementById('property-success').style.display = 'block';
        fetchMyProperties();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to register property');
      }
    } catch (err) {
      alert('Failed to register property');
    }
  };

  fetchMyProperties();
});

async function fetchMyProperties() {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const res = await fetch(`${backendUrl}/properties/my`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const properties = await res.json();
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
  } catch (err) {
    // handle error
  }
} 