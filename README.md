# Altius Capital Website Crawler

A full-stack web application for authenticating with and crawling financial deal data from Altius Capital's financial platforms (fo1.altius.finance and fo2.altius.finance).

## 🌐 Live Demo

**🚀 [View Live Application](https://altiuscapital.netlify.app)**

## 🏗️ Architecture Overview

This project consists of two main components:

- **Frontend**: React + TypeScript application with modern UI components
- **Backend**: FastAPI-based REST API for secure authentication and data retrieval

```
AltiusCapital/
├── frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/    # UI components (forms, selectors, etc.)
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   └── config/        # Application configuration
│   └── package.json
├── backend/           # FastAPI REST API
│   ├── models/           # Pydantic data models
│   ├── services/         # Business logic layer
│   ├── routers/          # API endpoint definitions
│   ├── middleware/       # Authentication middleware
│   └── requirements.txt
└── README.md
```

## ✨ Features

### Frontend Features
- 🔐 **Secure Authentication** - Login form with React Hook Form + Zod validation
- 🌐 **Website Selection** - Support for multiple financial platforms
- 📊 **Deal Management** - View and manage financial deals
- 🎨 **Modern UI** - Tailwind CSS with shadcn/ui components
- 🌙 **Dark Mode** - Theme switching capability
- 📱 **Responsive Design** - Mobile-first approach

### Backend Features
- 🔒 **JWT Authentication** - Stateless session management
- 🍪 **Secure Cookies** - HTTPOnly cookies for XSS protection
- 🌐 **External API Integration** - Proxy to Altius financial platforms
- 📝 **Comprehensive Logging** - Structured error handling
- 🚀 **Async Architecture** - High-performance async I/O
- 🛡️ **CORS Support** - Configurable cross-origin requests

## 📱 Frontend Technology Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **React Hook Form** - Form state management with validation
- **Zod** - Schema validation
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library

## 🛠️ Backend Technology Stack

- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation using type hints
- **httpx** - Async HTTP client for external APIs
- **PyJWT** - JWT token handling
- **uvicorn** - ASGI server

## 🔐 Authentication Flow

1. **User Login**: Frontend sends credentials to `/api/auth/login`
2. **External Auth**: Backend authenticates with Altius platforms
3. **JWT Creation**: Backend creates JWT containing session cookies
4. **Secure Cookie**: HTTPOnly cookie set in browser
5. **Protected Requests**: Frontend automatically sends cookie with requests
6. **Token Validation**: Middleware validates JWT on each request

## 🌐 Supported Platforms

### FO1 Platform
- **URL**: fo1.altius.finance
- **Test Email**: fo1_test_user@whatever.com
- **Test Password**: Test123!

### FO2 Platform  
- **URL**: fo2.altius.finance
- **Test Email**: fo2_test_user@whatever.com
- **Test Password**: Test223!

## 🛡️ Security Considerations

### Frontend Security
- ✅ Form validation with Zod schemas
- ✅ XSS protection via React's built-in escaping
- ✅ Secure cookie handling (no JavaScript access)
- ✅ HTTPS enforcement in production

### Backend Security
- ✅ HTTPOnly cookies prevent XSS attacks
- ✅ JWT tokens with expiration (24 hours)
- ✅ CORS properly configured
- ✅ Input validation with Pydantic
- ✅ Secure password handling (never stored)
- ✅ Automatic session cleanup on expiration

---

**Built with ❤️ for Altius Capital**