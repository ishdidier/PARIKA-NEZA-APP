# PARIKA-NEZA-APP


# Car Rental & Service Management System (CRPMS)

A full-stack web application for managing car rentals, tracking service records, recording payments, and generating business reports.

## Features

### Car Management
- Register and track vehicles with complete details (plate number, type, model, manufacturing year)
- Maintain driver information and assigned mechanics
- View all cars and their complete service history

### Service Management
- Create and manage service catalog with pricing
- Record service delivery for vehicles
- Update and delete service entries
- Track service records with dates and vehicle information

### Payment Tracking
- Record payments for completed services
- Link payments to specific vehicles and services
- View all payment history with dates and amounts
- Currency support (FRW)

### Advanced Reporting
- Generate daily, weekly, monthly, and yearly reports
- View total services and revenue by period
- Includes services with and without payments
- Summary cards showing totals and key metrics

### User Authentication
- Secure registration and login system
- Password hashing with bcrypt
- Session-based authentication
- Protected routes and user persistence

## Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM 7.6.0** - Client-side routing
- **Tailwind CSS 4.1.7** - Utility-first styling
- **Axios 1.9.0** - HTTP client
- **Vite** - Build tool & dev server

### Backend
- **Node.js + Express 5.1.0** - Server framework
- **MySQL2 3.22.3** - Database driver
- **bcrypt 6.0.0** - Password hashing
- **express-session 1.18.1** - Session management
- **CORS** - Cross-origin request handling

### Database
- **MySQL** - Relational database
- Tables: users, services, car, servicerecord, payments

## Installation

### Prerequisites
- Node.js (v14+)
- MySQL server running
- Database: `crpms`

### Setup

1. **Clone and install dependencies:**
```bash
cd frontend-project
npm install

cd ../backend-project
npm install
