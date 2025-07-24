# ✈️ Tripma - Flight & Trip Booking Platform

A full-featured travel booking system where users can search for flights, book trips, explore destinations, and manage their travel experiences — all in one place.

<img width="1889" height="1012" alt="Screenshot 2025-07-24 193645" src="https://github.com/user-attachments/assets/7322921a-78aa-46c0-8096-10e8a5fcf860" />

---

## 🚀 Features

### ✈️ Flight Booking
- Search by city codes (`from`, `to`)
- Round-trip and one-way support
- Departure and return date selection
- Passenger selection (adults & minors)
- Seat map handling by class (economy, business, first)
- Real-time seat availability & pricing

### 🌍 Trip & Destination Exploration
- Discover featured places associated with flights
- Destination galleries, descriptions, and tags
- Plan trips with multiple places, tags, and reviews

### 👤 User System
- Full user profile: name, DOB, contacts, address
- OAuth support: Google, Apple, Facebook
- Emergency contacts and known traveler IDs
- Social features via user relations

### 📦 Booking & Payment
- Book flights or full multi-destination trips
- Traveler-specific info (seat, bag count, class)
- Discount codes, fees, and taxes included
- Trip feedback and rating system

---

## 🛠 Tech Stack

| Layer        | Tech Used                              |
|--------------|----------------------------------------|
| Frontend     | React.js, TailwindCSS, Framer Motion   |
| Backend      | Node.js, Express.js                    |
| Database     | MongoDB + Mongoose                     |
| Auth         | JWT + OAuth (Google, Apple, Facebook)  |
| API Comm     | RESTful API + Axios                    |
| Deployment   | Ready for Vercel / Render / Railway    |

---

## 🗃️ Schema Overview

This project uses MongoDB models via Mongoose:

- `Flight`, `Aircraft`, `Airport` — manage flight logistics
- `DirectBooking`, `TripBooking` — handle booking and traveler data
- `User`, `UserAccount`, `UserRelation` — manage identity and relationships
- `Place`, `FeaturedPlace`, `Tag`, `Trip` — destination and itinerary system
- `UserFeedback`, `UserTrip` — rating, reviews, trip history

---

## 🔧 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sadeeshasathsara/tripma.git
cd tripma
cd tripma-frontend
npm install
cd ..
cd tripma-backend
npm install
```

### 2. Setup environment variables

## Backend .env
```
lufthansaKey=''
lufthansaSecret=''
MONGO_URI=''
SALT_ROUNDS=''
GOOGLE_CLIENT_ID=''
GOOGLE_CLIENT_SECRET=''
JWT_SECRET=''
JWT_EXPIRES_IN=7d
```

## Frontend .env
```
VITE_GOOGLE_CLIENT_ID=''
VITE_GOOGLE_CLIENT_SECRET=''
```

### 3. Run the both development servers
```bash
npm run dev
```

##  📈 Future Improvements

Seat selection interface (interactive)
Payment gateway integration (Stripe/PayPal)
Admin dashboard for managing flights and destinations
Real-time flight updates and notifications
Multi-language support

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.
