# Mohamed Aathil Portfolio — Product Requirements Document

## 1. Product Overview

**Product Name:** Mohamed Aathil | Full Stack Developer Portfolio  
**Type:** Single Page Application (SPA)  
**Tech Stack:** React 19, Vite 8, TailwindCSS 3.4, Framer Motion 12, EmailJS  
**Base URL:** http://localhost:5173  
**Target Audience:** Recruiters, hiring managers, collaborators, and potential clients

---

## 2. Pages & Sections

### Main Page (/)

A single-page portfolio with scroll-based navigation through the following sections:

| Section ID | Eyebrow | Title | Purpose |
|---|---|---|---|
| hero | - | Landing | Full viewport hero with name, roles, avatar, CTAs |
| about | 01. About | About Me | Personal bio and stats |
| skills | 02. Skills | Tech Stack | Categorized technology skills |
| experience | 03. Experience | Work History | Professional experience timeline |
| projects | 04. Projects | Featured Work | Filterable project showcase |
| education | 05. Education | Academic Background | Education history |
| certifications | 06. Certifications | Credentials | Professional certifications |
| resume | 07. Resume | My Resume | Resume viewer and download |
| contact | 08. Contact | Let's Connect | Contact info and form |

---

## 3. Feature Requirements

### FR-001: Loading Screen
- **Description:** An animated loader is displayed when the page first loads
- **Behavior:** Loader plays entrance animation, then reveals the main portfolio content
- **Acceptance Criteria:**
  - Loader is visible on initial page load
  - After animation completes, main content becomes visible
  - Loader does not reappear after initial load

### FR-002: Navbar Navigation
- **Description:** A sticky top navigation bar providing access to all sections
- **Behavior:**
  - Fixed at top of viewport
  - Transparent initially, transitions to glass/blurred background when user scrolls past 60px
  - Desktop: horizontal links; Mobile: hamburger menu opens a drawer
  - Active section is highlighted with colored underline
  - Smooth scroll to section on link click
  - Logo "MA" scrolls to hero on click
  - Theme toggle button (sun/moon icon) switches dark/light mode
- **Acceptance Criteria:**
  - Navbar is visible and sticky at top
  - Clicking a nav link scrolls smoothly to the correct section
  - Active nav link is visually highlighted
  - Theme toggle works correctly
  - Mobile hamburger opens/closes the drawer

### FR-003: Theme Toggle (Dark/Light Mode)
- **Description:** Global dark/light mode toggle
- **Behavior:**
  - Persists via React Context (ThemeContext)
  - Toggle button in navbar switches between dark and light themes
  - All sections update their color scheme accordingly
- **Acceptance Criteria:**
  - Clicking theme toggle switches the visual theme
  - All sections reflect the new theme
  - Dark mode default

### FR-004: Hero Section
- **Description:** Full-viewport landing section
- **Elements:**
  - Animated particle canvas background (network of dots)
  - Greeting text: "Hello World! 👋 I'm"
  - Name: "Mohamed Aathil" (with gradient on last name)
  - Typing animation cycling through developer roles
  - Tagline paragraph
  - CTA buttons: "View My Work" and "Resume" (with download icon)
  - GitHub and LinkedIn links with icons
  - "Available for opportunities" badge with pulsing green dot
  - Profile avatar with photo, spinning rings, and floating tech badges (Java, React, Django, Node.js)
  - Scroll-down indicator arrow
- **Acceptance Criteria:**
  - Hero occupies full viewport height
  - Name displays correctly
  - Typing animation cycles through roles
  - "View My Work" button scrolls to #projects
  - "Resume" button opens resume URL in new tab
  - GitHub and LinkedIn links open correctly
  - Scroll indicator navigates to About section

### FR-005: Projects Section
- **Description:** Filterable showcase of projects
- **Elements:**
  - Section heading (eyebrow: "04. Projects", title: "Featured Work")
  - Category filter tabs at top (All + category names)
  - Grid of project cards (3-column on large screens)
  - "View more on GitHub" link at bottom
- **Project Card Elements:**
  - Gradient header image with icon and hover scan-line animation
  - "Featured" ribbon badge for featured projects
  - Project title
  - Description
  - Tech stack badges
  - GitHub link
  - Live Demo link (if available)
- **Acceptance Criteria:**
  - "All" filter shows all projects by default
  - Clicking a category filter shows only matching projects
  - Project cards display all required information
  - GitHub/Live Demo links open in new tabs
  - Filter transitions are animated

### FR-006: Contact Form
- **Description:** A functional contact form using EmailJS
- **Form Fields:** Name, Email Address, Subject, Message
- **Behavior:**
  - Validates all fields (required)
  - Shows loading state while sending ("Sending...")
  - Shows success state after send ("Sent! ✓")
  - Shows success or error toast notification
  - Resets form on success
  - Uses EmailJS sendForm with placeholders for service/template/public key
- **Contact Info Panel:**
  - Email address (clickable mailto link)
  - Location
  - GitHub and LinkedIn social icons
  - Availability status badge (pulsing green dot)
- **Acceptance Criteria:**
  - Form renders all fields
  - Submit button is present and clickable
  - Email field validates email format
  - Toast notification appears after submission attempt
  - Contact info panel shows email and location

### FR-007: Mobile Responsiveness
- **Description:** The portfolio is fully responsive
- **Breakpoints:**
  - Mobile: single column layout, hamburger nav
  - Tablet (sm/md): adjusted grid layouts
  - Desktop (lg+): full multi-column layouts, horizontal nav
- **Acceptance Criteria:**
  - Layout adapts correctly at mobile viewport (390px wide)
  - Hamburger menu is visible on mobile
  - Desktop nav is hidden on mobile

### FR-008: Scroll Progress Bar
- **Description:** A thin progress bar at the top of the page indicating scroll progress
- **Acceptance Criteria:**
  - Progress bar is visible and moves as user scrolls

### FR-009: Side Social Links
- **Description:** Fixed side panel with social media icon links
- **Acceptance Criteria:**
  - Social links are visible on desktop

### FR-010: Footer
- **Description:** Page footer with copyright info
- **Acceptance Criteria:**
  - Footer is visible at the bottom of the page

---

## 4. Non-Functional Requirements

- **Performance:** Page loads within 3 seconds on a normal connection
- **Animations:** Framer Motion transitions are smooth and not janky
- **Accessibility:** Interactive elements have aria-labels
- **SEO:** Page has proper title, meta description, Open Graph tags

---

## 5. Known Limitations

- Contact form uses placeholder EmailJS credentials (`YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY`) — form submission will fail with an API error, but the UI flow should be tested up to the point of submission
