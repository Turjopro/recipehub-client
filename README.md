# 🍳 RecipeHub — Recipe Sharing Platform (Client)

RecipeHub is a full-stack recipe sharing platform where food enthusiasts can create, share, discover, and manage recipes. Users can publish their own recipes, browse recipes shared by others, save favorites, purchase premium recipes, and interact with the community — while admins moderate content and manage the platform.

🔗 **Live Site:** [https://recipehub-client-ten.vercel.app](https://recipehub-client-ten.vercel.app)
🔗 **Client Repository:** [github.com/Turjopro/recipehub-client](https://github.com/Turjopro/recipehub-client)
🔗 **Server Repository:** [github.com/Turjopro/recipehub-server](https://github.com/Turjopro/recipehub-server)

---

## ✨ Key Features

- 🔐 **Authentication** — Email/Password + Google login via Better Auth, with JWT-based protected routes and HTTPOnly cookie sessions.
- 🍽️ **Recipe Management** — Add, edit, and delete your own recipes with image upload (imgbb), category, cuisine, and difficulty details.
- ⭐ **Favorites & Likes** — Save recipes to favorites and like recipes you enjoy.
- 💳 **Stripe Payments** — Purchase individual recipes or upgrade to a Premium Membership for unlimited recipe uploads.
- 🚩 **Reporting System** — Report inappropriate recipes (Spam, Offensive Content, Copyright Issue); admins can dismiss or remove reported content.
- 🛡️ **Admin Dashboard** — Manage users (block/unblock), manage recipes (edit/delete/feature), and review reports.
- 🔎 **Filtering & Pagination** — Filter recipes by category (MongoDB `$in`) with server-side pagination.
- 🌗 **Dark/Light Theme Toggle**
- 🎬 **Framer Motion Animations** on key sections
- 📱 **Fully Responsive Design** across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- React Router
- Tailwind CSS + DaisyUI
- Framer Motion / Motion
- Better Auth (client)
- Axios / Fetch API

**Backend:** (see [server repo](https://github.com/Turjopro/recipehub-server))
- Node.js, Express.js
- MongoDB
- Better Auth (server)
- Stripe

---

## 📁 Environment Variables

Create a `.env` file in the root directory with the following:

```env
VITE_API_URL=https://your-server-url.onrender.com
VITE_BETTER_AUTH_URL=https://your-server-url.onrender.com
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

> ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Turjopro/recipehub-client.git
   cd recipehub-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file as shown above.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Admin Credentials (for evaluation)

```
Email: [Add admin email here]
Password: [Add admin password here]
```

---

## 📂 Project Structure (Overview)

```
src/
├── components/       # Reusable UI components
├── layouts/          # Navbar, Footer, layout wrappers
├── pages/            # Route-level pages (Home, Browse, Dashboard, etc.)
├── routes/           # PrivateRoute, AdminRoute, router config
├── lib/              # authClient, API helpers
├── hooks/            # Custom hooks
└── main.jsx
```

---

## 📌 Notes

- Reloading any protected or dynamic route is fully supported (SPA rewrite configured via `vercel.json`) — no 404 errors on refresh.
- Logged-in users remain authenticated across reloads via secure cross-domain cookies.
- Free users can add up to 2 recipes; Premium members get unlimited uploads via Stripe Checkout.

---

## 👤 Author

**Turjo**
GitHub: [@Turjopro](https://github.com/Turjopro)