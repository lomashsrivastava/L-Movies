# L-Movies Platform 🎬

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status)](https://lmovies2026.netlify.app)
**🔴 Live Demo (Netlify):** [https://lmovies2026.netlify.app](https://lmovies2026.netlify.app)
**🟢 Live Demo (GitHub Pages):** [https://lomashsrivastava.github.io/L-Movies/](https://lomashsrivastava.github.io/L-Movies/)

## 🚀 Overview
L-Movies is a fully functional, modern, animated, and responsive movie streaming application platform inspired by Netflix. It features a sleek glassmorphism design, dynamic animations, and a robust backend to deliver a premium user experience.

Developed by **Lomash Srivastava**.

## 🛠 Tech Stack
### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS, Vanilla CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **State Management:** React Hooks
- **Routing:** React Router DOM

### Backend
- **Framework:** Django (Python)
- **API:** Django REST Framework (DRF)
- **Database Connection:** Djongo
- **Authentication:** JWT (JSON Web Tokens)

### Database
- **Primary:** MongoDB (NoSQL)

### DevOps & Tools
- **Containerization:** Docker, Docker Compose
- **Version Control:** Git, GitHub
- **Deployment:** Netlify (Frontend), GitHub Pages (Frontend), Render (Backend - Planned)

A fully functional, modern, animated, and responsive movie website inspired by Netflix.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Framer Motion
- **Backend**: Django, Django REST Framework, Djongo
- **Database**: MongoDB
- **DevOps**: Docker, Docker Compose

## Features
- Dark cinematic theme with glassmorphism
- Responsive Grid Layouts
- Authentication (JWT)
- Watchlist Management
- Admin Panel (Django Admin default at /admin)
- Animated UI

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local dev)

### Running with Docker (Recommended)
1. **Build and Run**:
   ```bash
   docker-compose up --build
   ```
2. **Access the App**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000/api](http://localhost:8000/api)
   - Admin Panel: [http://localhost:8000/admin](http://localhost:8000/admin)

### Local Development
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Folder Structure
- `frontend/`: React application
- `backend/`: Django application
- `backend/apps/`: Django apps (movies, users, watchlist)
