# Backend — Campus Cart

## Overview

This folder contains the original Express.js + MongoDB backend used during early development (Sprints 1–2) for user registration, login, and session management.

## Migration to Firebase

As of Sprint 3, the project was migrated to **Firebase** (Authentication, Firestore, and Storage) to simplify deployment and enable real-time features like live messaging. The backend logic now runs through Firebase's client SDK on the frontend, and server-side security is handled via Firestore Rules (`firestore.rules`) and Storage Rules (`storage.rules`) in the project root.

## Original Stack

- **Runtime:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** bcrypt + JWT
- **Endpoints:** `/api/auth/register`, `/api/auth/login`, `/api/users/me`

## Why This Folder Is Kept

This folder is preserved for reference and to document the architectural evolution of the project from a traditional REST API to a serverless Firebase approach.
