# ShopAI — E-commerce Platform with AI Chatbot

A full-featured e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, Firebase, and Claude AI.

## 🚀 Quick Start (VS Code)

### 1. Install dependencies
```bash
npm install
```

### 2. Run in demo mode (no setup needed)
```bash
npm run dev
```
Open **http://localhost:3000**

### 3. Demo Login Credentials
| Role  | Email                | Password |
|-------|----------------------|----------|
| User  | user@example.com     | 123456   |
| Admin | admin@example.com    | 123456   |

Click **"User Demo"** or **"Admin Demo"** buttons on the login page for instant access.

---

## 🔥 Firebase Setup (Optional — for real auth)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password + Google
4. Enable **Firestore Database**
5. Copy your config to `.env.local`:

```bash
cp .env.example .env.local
# Then fill in your Firebase credentials
```

---

## 🤖 AI Chatbot (Claude API)

The AI chatbot is powered by Claude. It works automatically in the deployed version. For local development, the chatbot will work if you have internet access.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home (12 sections)
│   ├── products/           # Product listing + detail
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── auth/               # Login + Register
│   ├── dashboard/
│   │   ├── user/           # User dashboard (5 pages)
│   │   └── admin/          # Admin dashboard (7 pages)
│   ├── blog/               # Blog listing + post
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── help/               # Help center
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms & conditions
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── products/           # ProductCard, Skeleton
│   └── ai/                 # AI Chatbot
├── context/                # Auth + Cart context
├── lib/                    # Firebase, mock data
└── types/                  # TypeScript interfaces
```

---

## ✅ Features Checklist

### Pages
- [x] Home — 12 sections (hero, categories, featured, promo, popular, stats, services, testimonials, blog, FAQ, newsletter, CTA)
- [x] Products — search, 4 filters, sorting, pagination, skeleton loading
- [x] Product Detail — gallery, tabs (description/specs/reviews), related products
- [x] Cart — quantity controls, promo code, order summary
- [x] Checkout — shipping + payment form with validation
- [x] Login — demo buttons, Google login, form validation
- [x] Register — password strength meter, form validation
- [x] User Dashboard — overview, orders, profile, wishlist, settings
- [x] Admin Dashboard — overview, users, products, orders, analytics, coupons, settings
- [x] Blog — listing with search/filter, full article view
- [x] About, Contact, Help, Privacy, Terms

### Technical
- [x] Next.js 14 App Router
- [x] TypeScript throughout
- [x] Tailwind CSS
- [x] Dark Mode (full support)
- [x] Fully Responsive (mobile/tablet/desktop)
- [x] Firebase Auth (demo mode fallback)
- [x] React Hook Form + validation
- [x] AI Chatbot (Claude API)
- [x] Recharts (Bar, Line, Area, Pie charts)
- [x] Role-based dashboard (User + Admin)
- [x] Skeleton loaders
- [x] Toast notifications

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| Next.js 14 | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Firebase | Auth + Database |
| Claude API | AI Chatbot |
| Recharts | Dashboard charts |
| React Hook Form | Form handling |
| next-themes | Dark mode |
| Framer Motion | Animations |
| react-hot-toast | Notifications |
| lucide-react | Icons |

---

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

```bash
npx vercel
```
# Shop-AI-Project
