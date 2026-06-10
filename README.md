# 🚌 TedBus - Full Stack Bus Booking Platform

TedBus is a full-stack bus booking application inspired by RedBus, built using the MEAN Stack (MongoDB, Express.js, Angular, Node.js). The platform allows users to search buses, select seats, book tickets, manage bookings, and authenticate securely using Google OAuth.

---

# 🚀 Live Features

## Authentication

* Google OAuth Login
* JWT Authentication
* Protected Routes
* Angular Route Guards
* HTTP Interceptor for automatic JWT attachment
* Logout Functionality

---

## Bus Search

* Search buses by Source and Destination
* Dynamic data fetched from MongoDB Atlas
* Responsive search interface

---

## Seat Selection

* Dynamic seat layout generation
* Real-time booked seat display
* Booked seats are disabled
* Multiple seat selection support

---

## Booking System

* Passenger Details Form
* Payment Simulation
* Booking Confirmation
* Booking History
* Booking Cancellation

---

## Security Features

* JWT-based Authorization
* Protected APIs
* User-specific Booking History
* Double Seat Booking Prevention
* Secure MongoDB Integration

---

# 🛠️ Tech Stack

## Frontend

* Angular 20
* TypeScript
* Bootstrap 5
* Angular Router
* Angular Forms
* Angular HttpClient

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* Passport.js
* Google OAuth 2.0

---

# 📂 Project Structure

## Frontend

```bash
src/app/

core/
├── constants/
├── guards/
├── interceptors/
└── models/

shared/
├── navbar/
├── footer/
├── loader/
└── not-found/

pages/
├── home/
├── bus-list/
├── seat-selection/
├── booking-form/
├── payment/
├── profile/
├── booking-history/
├── login-success/

services/
├── auth.service.ts
├── bus.service.ts
├── booking.service.ts
└── profile.service.ts
```

## Backend

```bash
src/

config/
├── db.js
├── passport.js

controllers/
├── auth.controller.js
├── bus.controller.js
├── booking.controller.js
└── profile.controller.js

middleware/
├── authMiddleware.js

models/
├── User.js
├── Bus.js
└── Booking.js

routes/
├── auth.route.js
├── bus.route.js
├── booking.route.js
├── profile.route.js
├── protected.route.js

app.js
server.js
```

---

# 🗄️ Database Collections

## User

```javascript
{
  name,
  email,
  picture,
  googleId
}
```

## Bus

```javascript
{
  busName,
  source,
  destination,
  departureTime,
  arrivalTime,
  fare,
  totalSeats,
  availableSeats,
  bookedSeats[]
}
```

## Booking

```javascript
{
  user,
  bus,
  passengerName,
  age,
  gender,
  phone,
  seats[],
  amount,
  paymentStatus
}
```

---

# 🔑 API Endpoints

## Authentication

```http
GET /api/auth/google
GET /api/auth/google/callback
```

## Buses

```http
GET /api/buses
GET /api/buses/search
GET /api/buses/:id
POST /api/buses
```

## Bookings

```http
POST /api/bookings
GET /api/bookings/my-bookings
DELETE /api/bookings/:id
```

## Profile

```http
GET /api/profile
```

---

# 🎯 Key Functionalities

### Search Buses

Users can search available buses using source and destination.

### Seat Reservation

Booked seats are fetched from MongoDB and displayed as unavailable.

### Double Booking Prevention

Before booking:

```javascript
const alreadyBooked = seats.some(
  seat => bus.bookedSeats.includes(seat)
);
```

This prevents multiple users from booking the same seat.

### Booking History

Users can only view their own bookings.

```javascript
Booking.find({
  user: req.user._id
});
```

### Cancel Booking

Users can cancel their bookings and seats are automatically released.

---

# 🔐 Authentication Flow

```text
User
 ↓
Google OAuth
 ↓
Passport.js
 ↓
JWT Token Generation
 ↓
Angular Login Success Page
 ↓
Token Stored in localStorage
 ↓
Protected Routes Accessible
```

---

# 🧠 Learning Outcomes

* MEAN Stack Development
* REST API Design
* JWT Authentication
* Google OAuth Integration
* MongoDB Relationships
* Route Protection
* Angular Standalone Components
* Seat Reservation Logic
* Full Stack Deployment



# 🚀 Future Enhancements

* Admin Dashboard
* Bus CRUD Management
* Razorpay Payment Gateway
* Email Ticket Confirmation
* PDF Ticket Download
* Real-Time Seat Updates
* Bus Tracking
* Ratings & Reviews

---

# ⚙️ Installation

## Backend

```bash
cd backend

npm install

npm run dev
```

## Frontend

```bash
cd frontend

npm install

ng serve
```

---

# Environment Variables

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

JWT_SECRET=YOUR_SECRET_KEY

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

SESSION_SECRET=YOUR_SESSION_SECRET
```

---

# 👨‍💻 Author

**Swastik Kumar Purohit**

Full Stack Developer

Skills:
Angular • Node.js • Express.js • MongoDB • React • Next.js • PostgreSQL • JavaScript

---

# ⭐ If you like this project

Give it a Star on GitHub and feel free to contribute.
