const backendUrl = 'https://your-backend-url.com/api'; // Change to your backend URL

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const list = document.querySelector('.enquiry-list');
  if (!token) {
    list.innerHTML = '<div style="color:#d32f2f;font-weight:500;">Please <a href="login.html">log in</a> to view your enquiries.</div>';
    return;
  }
  fetchEnquiries();
});

async function fetchEnquiries() {
  const token = localStorage.getItem('token');
  const list = document.querySelector('.enquiry-list');
  list.innerHTML = '<div>Loading...</div>';
  try {
    const [receivedRes, sentRes] = await Promise.all([
      fetch(`${backendUrl}/enquiries/received`, { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch(`${backendUrl}/enquiries/sent`, { headers: { 'Authorization': `Bearer ${token}` } })
    ]);
    const received = await receivedRes.json();
    const sent = await sentRes.json();
    list.innerHTML = `
      <h3>Received Enquiries</h3>
      <ul>${received.map(e => `
        <li>
          <strong>Property:</strong> ${e.property?.title || '-'}<br>
          <strong>From:</strong> ${e.sender?.name || '-'} (${e.sender?.email || '-'})<br>
          <strong>Message:</strong> ${e.message}<br>
          <strong>Status:</strong> ${e.status}
        </li>
      `).join('') || '<li>None</li>'}</ul>
      <h3>Sent Enquiries</h3>
      <ul>${sent.map(e => `
        <li>
          <strong>Property:</strong> ${e.property?.title || '-'}<br>
          <strong>To:</strong> ${e.receiver?.name || '-'} (${e.receiver?.email || '-'})<br>
          <strong>Message:</strong> ${e.message}<br>
          <strong>Status:</strong> ${e.status}
        </li>
      `).join('') || '<li>None</li>'}</ul>
    `;
  } catch (err) {
    list.innerHTML = '<div style="color:#d32f2f;">Failed to load enquiries.</div>';
  }
} 