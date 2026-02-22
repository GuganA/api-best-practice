# Api Best Practice

A production-ready fullstack Stories application built with:
- Frontend: Next.js (minimal UI)
- Backend: Express + TypeScript
- Database: MongoDB with Mongoose

This project demonstrates modern backend API best practices including authentication, security hardening, rate limiting, caching, structured logging, and API documentation — while providing a simple minimal frontend to consume the API.

---

## ✨ Features

- ✅ RESTful API with Express + TypeScript  
- 🔐 JWT Authentication (Login / Signup)  
- 🛡️ Security Best Practices  
  - Helmet (secure HTTP headers)  
  - Rate limiting  
  - CORS  
  - Secure password storage
- ⚡ Performance  
  - API response caching (apicache)  
- 📦 MongoDB with Mongoose  
- 📑 Swagger (OpenAPI 3) API Documentation  
- 📝 Structured logging with Pino  
- 🔄 Slug generation  
- 🧪 Developer-friendly setup (Nodemon, ts-node)  
- Frontend (Minimal UI)
  - Built with Next.js
  - Authentication flow (Sign Up/Sign In)
  - Story creation & listing
---

## 🧱 Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** Next.js
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose)          
- **Auth:** JWT + bcrypt  
- **Docs:** Swagger (swagger-jsdoc, swagger-ui-express)  
- **Security:** helmet, express-rate-limit, cors  
- **Logging:** pino, pino-pretty  

---

## ⚙️ Installation

```bash
git clone https://github.com/GuganA/api-best-practice.git
cd api-best-practices
cd backend
npm install

