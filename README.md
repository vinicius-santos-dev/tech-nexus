# Tech Nexus 🛍️

A modern e-commerce platform built with Next.js 15, powered by Sanity CMS for content management, Clerk for authentication, and Stripe for secure payments.
Features a responsive design and seamless shopping experience.

<img src="https://github.com/user-attachments/assets/eb90e6c9-b3d1-48e0-8326-b68cc5882218" alt="Tech Nexus - Home" width="500">
<img src="https://github.com/user-attachments/assets/098b72c4-cd62-421c-be72-ee4183b86418" alt="Tech Nexus - Search" width="500">
<img src="https://github.com/user-attachments/assets/6da8e5b4-c92c-4623-9b2e-68d4a711024e" alt="Tech Nexus - Product" width="500">
<img src="https://github.com/user-attachments/assets/d2bf9741-797b-4ce6-a06b-237ac3737411" alt="Tech Nexus - Cart" width="500">
<img src="https://github.com/user-attachments/assets/ee6a1a56-1333-4bfd-bef1-65b3f7c4ae4f" alt="Tech Nexus - Order" width="500">

## ✨ Key Features

- 🔐 User authentication via Clerk
- 📝 Content management with Sanity
- 🔍 Real-time product search
- 🛒 Shopping cart with Zustand state management
- 💳 Secure Stripe payment integration
- 🌐 Order tracking system
- 🎨 Draft mode for content preview
- 📱 Responsive design with mobile-first approach

## 🛠️ Technical Stack

### Frontend
- Next.js 15
- TailwindCSS
- Shadcn/ui

### State Management
- Zustand

### Backend & Services
- Sanity CMS
  - Content Management
  - Image Optimization
  - Draft Mode
- Stripe Payments
- Clerk Authentication

### Infrastructure
- Vercel (Hosting)

## 🚀 Getting Started

1. Clone the repository:

```
git clone https://github.com/vinicius-santos-dev/tech-nexus.git
```

2. Install dependencies:

```
npm install
```

3. Configure environment variables:

```
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_DOMAIN_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

SANITY_STUDIO_DATASET=
SANITY_STUDIO_PROJECT_ID=
SANITY_BACKEND_API_TOKEN=
SANITY_API_READ_TOKEN=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

4. Start the development server:

```
npm run dev
```

## 🎯 Project Structure
```
src/
├── app/                # Next.js app routes
├── components/         # React components
├── lib/                # Utilities and helpers
├── sanity/             # Sanity configuration
│   ├── lib/            # Sanity utility functions
│   └── schemaTypes/    # Content schemas
├── store/              # Zustand store
```

## 🔗 Live Demo

Check out the live demo: [Tech Nexus](https://viniciusdev-tech-nexus.vercel.app)

## 📫 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vinicius-santos-dev)
[![Portfolio](https://img.shields.io/badge/Portfolio-470FA3?style=for-the-badge&logo=About.me&logoColor=white)](https://www.viniciussantos.dev)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://api.whatsapp.com/send?phone=5511984375850)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vinicius.ssantos.dev@gmail.com)