# 🌐 Connexta – One Stop Campus Connect  

Connexta is a centralized campus portal designed to make it easier for students and clubs to stay connected. It solves the common problem of fragmented communication across WhatsApp groups, notice boards, and social media by bringing everything into one clean, accessible hub.  

---

## ✨ Features  

### 👨‍🎓 Students  
- Browse **upcoming and trending events** (seminars, fests, workshops, hackathons)  
- Search and filter events by category, keyword, or club  
- Participate in **event-specific discussions** (ask questions, get clarifications, upvote helpful answers)  
- View the **official Notice Board** for announcements (holidays, rules, exams, placements)  
- Discover **clubs and societies**, what they do, and their upcoming events  

### 👩‍💼 Club Managers  
- Create, edit, and manage events with posters, descriptions, categories, and dates  
- Reply to student queries in discussion boards  
- Post official notices and updates to the Notice Board  
- Edit club information and showcase events  

### 🌟 UI/UX Highlights  
- Clean **card-based layout** with hover animations  
- White theme with **colorful confetti-style circles** for a vibrant student vibe  
- **Dark mode toggle** (preference saved in localStorage)  
- **Confetti celebration** when users log in or create events  
- **Toast notifications** for success/error messages  
- Emoji-based section headers (🎉 Events, 🏛️ Clubs, 📢 Notices, 💬 Discussions)  

---

## ⚙️ How It Works  

- **Frontend & Backend**: Built entirely with **HTML, TailwindCSS, and Vanilla JavaScript** (no frameworks).  
- **Routing**: Uses hash-based navigation (`#/home`, `#/events`, `#/events/:id`, `#/clubs`, `#/clubs/:id`, `#/noticeboard`, `#/about`).  
- **Mock Data & Persistence**: Events, clubs, notices, and discussions are seeded with mock data. All user interactions (create, edit, delete) persist using **localStorage**.  
- **Role System**: Mock login lets you act as a **Student** or **Club Manager**, with different permissions.  
- **Accessibility**: Keyboard navigable, focus-visible states, aria labels on key interactive elements.  

---

## 🚀 Deployment  

🔗 Live Demo: https://connexta-blond.vercel.app/

---

## 🛠️ Tech Stack  

- **HTML** – Structure  
- **TailwindCSS (CDN)** – Styling & dark mode  
- **JavaScript (Vanilla)** – Logic, routing, and state management  
- **LocalStorage** – Data persistence  

---

## 🏆 Credits  

This project was built using **Cursor AI** for the **Pillai College of Engineering – Vibe Coding Competition**.  
