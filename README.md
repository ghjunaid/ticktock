# TickTock Timesheet Management App

A simple SaaS-style timesheet management application built with Next.js, TypeScript, NextAuth, and TailwindCSS.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Tentwenty
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the project root:
     ```
     NEXTAUTH_SECRET=your_generated_secret
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

5. **Build and run in production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🛠 Frameworks & Libraries Used
- [Next.js](https://nextjs.org/) (React framework)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) (authentication)

---

## 📝 Assumptions & Notes
- **Authentication** uses NextAuth with a dummy credentials provider and mock user data.
- **API routes** serve mock timesheet data; no real database is used.
- **All API calls** are made to internal Next.js API routes, not direct imports.
- **Default landing page** is `/login` (root URL redirects to login).
- **Do not commit `.env.local`** or any real secrets to version control.

---

## ⏱ Time Spent
- **Project setup, configuration, and dependencies:** ~2 hours
- **Authentication and API routes:** ~2 hours
- **UI components and pages:** ~2 hours
- **Testing, polish, and documentation:** ~1 hour
- **Total:** ~7 hours 