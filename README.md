# Bad Bank Full‑Stack Application

Overview
Bad Bank is a full‑stack banking application built with React (front‑end), Express (back‑end), and MongoDB (database). It allows users to create accounts, log in, and manage balances with secure authentication via Firebase Auth (Google Sign‑In + Email/Password).

The project is fully Dockerized for consistent deployments and can be hosted on platforms like Render, Fly.io, Railway, or Heroku.

👉 Live Demo: https://bad-bank-jcfo.onrender.com

## ✨ Features

- User Authentication

- Email/password login with validation

- Google Sign‑In via Firebase Auth

- Account Management

- Create new accounts

- Login/logout with persistent sessions

- Balance updates and transaction history

- Security

- Firebase Auth handles credential flows

- Password validation (min 8 chars, no whitespace)

- LocalStorage used only for non‑sensitive identifiers

- Deployment

- Dockerfile for containerized builds

- Express serves React build + API routes

- Environment variables injected at runtime (MONGODB_URI, Firebase keys)

- Hosting

- Works on Render (Free/Hobby tiers), Fly.io, Railway, or Heroku

- Front‑end can be deployed separately on Vercel/Netlify for instant load

## 🛠️ Tech Stack

- Front‑end: React, Bootstrap, FontAwesome

- Back‑end: Node.js, Express

- Database: MongoDB Atlas

- Auth: Firebase Authentication (Google + Email/Password)

- Containerization: Docker

- Deployment: Render, Fly.io, Railway, Heroku

## 🚀 Getting Started
Prerequisites
Node.js v18+

Docker installed

MongoDB Atlas cluster (or local MongoDB)

Firebase project with Authentication enabled

Local Development

# Clone repo
git clone https://github.com/e-dovi/bad-bank-fullstack.git
cd bad-bank-fullstack

# Install dependencies
npm install

# Run locally
npm start

# Build image
docker build -t bad-bank .

# Run container
docker run -p 5000:5000 --env-file .env bad-bank
🔑 Environment Variables
Create a .env file with:
MONGODB_URI=your-mongodb-uri
PORT=5000
Firebase config stays in client code (not secret)