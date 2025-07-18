# PropEase

PropEase is a full-stack property management web application. It allows users to sign up, log in, list properties, view all properties, and manage their own properties and enquiries.

---

## Project Structure

```
Prop/
  backend/    # Node.js/Express/MongoDB backend API
  frontend/   # Static HTML/CSS/JS frontend
```

---

## Key Features

### User Authentication
- **Sign Up & Login:** Secure registration and login using JWT-based authentication.
- **Session Management:** User sessions are managed via tokens stored in local storage.

### Property Management
- **List Properties:** Authenticated users can add new properties with details.
- **View All Properties:** Anyone can browse all available properties.
- **My Properties:** Users can view and manage only the properties they have listed.
- **Edit/Delete:** Property owners can update or remove their listings.

### Enquiry System
- **Send Enquiries:** Users can send enquiries about any property.
- **My Enquiries:** Users can view all the enquiries they have made.
- **Owner Notifications:** Property owners can view enquiries received for their properties.

### Responsive Frontend
- **Modern UI:** Clean, mobile-friendly design using HTML, CSS, and vanilla JS.
- **Dynamic Content:** Property cards, modals, and forms are dynamically rendered.
- **User Feedback:** Real-time alerts and feedback for actions (e.g., signup, login, CRUD operations).

---

## 👤 User Stories

- **As a guest:**  
  I can browse all properties and view details without logging in.
- **As a new user:**  
  I can sign up with my name, email, and password.
- **As a logged-in user:**  
  - I can list new properties for others to see.
  - I can view, edit, or delete only my own properties.
  - I can send enquiries to property owners.
  - I can view all the enquiries I have made.
- **As a property owner:**  
  I can see all enquiries made on my properties.

---


## API Endpoints

- `POST /api/auth/signup` — User registration
- `POST /api/auth/login` — User login
- `GET /api/properties` — List all properties
- `POST /api/properties` — Add a property (auth required)
- `GET /api/enquiries` — List enquiries (auth required)
---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** HTML, CSS, JavaScript 

---

