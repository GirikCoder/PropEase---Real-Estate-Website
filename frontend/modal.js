// Modal logic for property details and enquiry
const backendUrl = 'https://your-backend-url.com/api'; // Change to your backend URL

function createModal(property) {
  // Remove existing modal if any
  const existing = document.getElementById('property-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'property-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${property.image}" alt="${property.title}" class="modal-image">
      <h2>${property.title}</h2>
      <p><strong>Location:</strong> ${property.location}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Area:</strong> ${property.area || '-'}</p>
      <p><strong>Rooms:</strong> ${property.rooms || '-'}</p>
      <p><strong>Parking:</strong> ${property.parking ? 'Yes' : 'No'}</p>
      <p><strong>Floor:</strong> ${property.floor || '-'}</p>
      <p>${property.description}</p>
      ${localStorage.getItem('token') ? `
        <form id="enquiryForm">
          <textarea name="message" placeholder="Your enquiry..." required></textarea>
          <button type="submit" class="btn-primary">Send Enquiry</button>
        </form>
        <div id="enquiry-success" style="display:none;color:green;margin-top:1rem;">Enquiry sent!</div>
      ` : `
        <div style="margin-top:1.5rem;color:#d32f2f;font-weight:500;">Please <a href='login.html'>log in</a> to send an enquiry.</div>
      `}
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector('.close-modal').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

  const form = modal.querySelector('#enquiryForm');
  form.onsubmit = async (e) => {
    e.preventDefault();
    const message = form.message.value;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to send an enquiry.');
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ propertyId: property._id || property.id, message })
      });
      if (res.ok) {
        form.style.display = 'none';
        modal.querySelector('#enquiry-success').style.display = 'block';
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to send enquiry');
      }
    } catch (err) {
      alert('Failed to send enquiry');
    }
  };
}

// Export for use in other scripts
window.createModal = createModal; 