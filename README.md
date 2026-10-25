# 🐘 WhiteElephantHQ

> **The Ultimate Holiday Gift Directory & Live Party Companion**  
> Built with **React 19, TypeScript, Vite, Tailwind CSS**, and **shadcn/ui** to capture over **2.5M+ high-volume holiday search queries**.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🎯 Targeted High-Volume Holiday Search Traffic

WhiteElephantHQ is designed to address and solve all 6 high-volume holiday gift exchange queries from December search data:

| Targeted Search Keyword | Dec Searches | Application Route | How WhiteElephantHQ Solves It |
| :--- | :---: | :--- | :--- |
| **`white elephant gift ideas`** | **1.22M** | `/` & `/gifts` | **Central Ideas Hub**: Dual search with real-time URL sync (`?q=...`), quick price filters (<$15, <$25, <$50), and gift detail modal. |
| **`white elephant rules`** | **450K** | `/rules` | **Interactive Rule Stepper**: 6-step visual guide, 3-steal freeze rule mechanics, and 1-click copyable cheat sheet for group chats. |
| **`white elephant gifts`** | **246K** | `/` & `/gifts` | **Curated Gift Directory**: Tangible product catalog with steal popularity meters, crowd ratings, and direct Amazon buy links. |
| **`funny white elephant gifts`** | **201K** | `/?category=funny#gifts` | **Gag & Humor Filter**: 1-click category pill isolating hilarious gifts (*Burrito Blanket*, *Nicolas Cage Pillow*, *Toilet Timer*, etc.). |
| **`best white elephant gifts`** | **201K** | `/?category=best#gifts` | **Crowd Pleaser Filter**: Curated high-utility items people fight to keep (*YETI Tumbler*, *Electric Mug Warmer*, *AeroPress Go*). |
| **`secret santa gift ideas`** | **135K** | `/secret-santa` | **Secret Santa Hub**: Top 5 picks under $25, interactive persona matcher (*The Foodie*, *The Workaholic*), and exchange rules breakdown. |

---

## ✨ Key Features

### 🎁 1. Curated Gift Directory (`/` & `/gifts`)
- **Instant Search with URL Sync (`?q=...`)**: Real-time filtering that updates the browser URL without page reloads.
- **Smart Category Pills**: Toggle between *All Gifts*, *😂 Funny & Gag*, *⭐ Best & Useful*, *🎁 Under $25*, *💸 Under $15*, and *🎅 Secret Santa*. Clicking an active pill or its `(X)` cancel icon instantly clears it.
- **Filter Dropdown**: Real budget filters (*Under $15*, *Under $25*, *Under $50*, or *All Prices*) with active checkmark indicators.
- **Active Filters Strip**: Displays active badges for search, price, and category with individual cancel icons and a 1-click *Clear All* button.
- **Quick View Modal**: Built with **shadcn/ui Dialog** showing price, ratings, badges, "Why it gets stolen at parties", and Amazon affiliate links.
- **Persistent Wishlist**: Save favorite gifts to local storage with header counter and quick-view drawer.

### 📜 2. Interactive Game Rules & Stepper (`/rules`)
- **6-Step Interactive Stepper**: Guides players step-by-step from gift contribution to the Player #1 finale steal.
- **1-Click Copy Sheet**: Instant clipboard copy formatted for WhatsApp, iMessage, and Slack party threads, complete with confetti animations.
- **Deep Linking**: Direct jumps to specific game rules (e.g. `/rules#step-5` for the 3-Steal Freeze Rule).
- **House Variations**: Clear breakdowns of popular twists (Theme Nights, Marked Steals, Secret Santa variations).

### 🎲 3. Live Digital Party Tool (`/party-tool`)
- **Digital Number Drawer**: Eliminates cutting paper strips; generates random turn order with sound & confetti.
- **Live 3-Steal Tracker**: Tracks who holds which gift and automatically triggers a **"FROZEN 🔒"** state when a gift hits 3 steals.
- **Shadcn Dialog Modals**: Elegant confirmation and result modals replacing disruptive browser alerts.

### 🎅 4. Secret Santa Guide & Persona Matcher (`/secret-santa`)
- **5 Best Recommendations Under $25**: Features top picks (*AeroPress Go*, *YETI Rambler Mug*, *Desktop Vacuum*, *Magnetic Fidget Pen*, *TRUFF Hot Sauce*).
- **Persona Matcher**: Tailored suggestions for *The Coffee Addict*, *The Workaholic*, *The Foodie*, and *The Stressed Coworker*.
- **"Surprise Me" Generator**: Instant randomized gift prompt with confetti effects.
- **White Elephant vs. Secret Santa Guide**: Clear comparative breakdown explaining the difference between both holiday traditions.

### ⚡ 5. Performance & Clean UX Architecture
- **Instant Client-Side Navigation**: Instant zero-lag transitions between the 4 core pages using React Router.
- **Sub-Second Build**: Powered by Vite and React 19, building in ~130ms.
- **Zero Cumulative Layout Shift (CLS = 0)**: Product cards enforce explicit aspect ratios (`aspect-[4/3]`) and fixed dimensional heights (`h-36 sm:h-44 xl:h-48`) to guarantee zero visual jumps.
- **Lean Dependency Footprint**: Strict dependency diet with zero bloated libraries, ensuring simple and readable code.
- **Responsive & Touch-Friendly**: Full mobile and tablet support with clean tap targets, keyboard accessibility, and modern aesthetics.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (`Dialog`, `DropdownMenu`, `Select`, `Button`, `Badge`, `Card`, `Input`)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Delight & Animations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📂 Project Structure

```text
React-assignment/
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (button, badge, card, dialog, dropdown, input, select)
│   │   ├── Footer.tsx        # Responsive footer with category links & attribution
│   │   ├── GiftCard.tsx      # Product card with price, badge, favorite & modal trigger
│   │   ├── GiftModal.tsx     # shadcn Dialog for detailed gift overview & Amazon buy link
│   │   ├── Navbar.tsx        # Sticky header with active routes & wishlist counter
│   │   ├── PartyAssistant.tsx# Live turn drawer & 3-steal tracker game engine
│   │   ├── RulesSection.tsx  # 6-step rule stepper & 1-click group chat copy sheet
│   │   ├── SecretSantaGuide.tsx # Persona matcher & comparison guide
│   │   └── WishlistModal.tsx # LocalStorage shortlisted gifts modal
│   ├── data/
│   │   ├── gifts.ts          # Curated gift catalog & category data
│   │   └── rules.ts          # Official 6-step rules & house variations
│   ├── pages/
│   │   ├── GiftsPage.tsx     # Gifts catalog with search, price filters, category tabs & sorting
│   │   ├── RulesPage.tsx     # Interactive 6-step rules guide & party checklist
│   │   ├── PartyToolPage.tsx # Digital party companion (turn drawer & steal tracker)
│   │   ├── SecretSantaPage.tsx # Secret Santa recommendations & persona matcher
│   │   └── NotFoundPage.tsx  # 404 page with return navigation
│   ├── routes/
│   │   └── AppRoutes.tsx     # Centralized React Router configuration
│   ├── App.tsx               # Root layout wrapper (Navbar, Routes, Footer)
│   ├── main.tsx              # React DOM entry point
│   └── index.css             # Tailwind v4 import & custom utilities
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Navneet-divine/React-Deliverback-Assignment.git

# Navigate into directory
cd React-Deliverback-Assignment

# Install dependencies
npm install
```

### 3. Running Locally
```bash
# Start development server with Hot Module Replacement
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

---

## 📤 Pushing to GitHub

To push this codebase to your GitHub repository:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all project files
git add .

# 3. Commit the changes
git commit -m "feat: complete WhiteElephantHQ gift directory, rules & party companion"

# 4. Set the default branch to main
git branch -M main

# 5. Connect your remote repository
git remote add origin https://github.com/Navneet-divine/React-Deliverback-Assignment.git

# 6. Push to main
git push -u origin main
```
