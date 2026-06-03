# Interactive Developer Portfolio

This repository contains the source code for a custom-built, highly interactive, and responsive personal portfolio website.

**Live Site:** [https://aunraza97.github.io/aunraza-portfolio/](https://aunraza97.github.io/aunraza-portfolio/)

## Architecture & Tech Stack

This project was built entirely from scratch without using any heavy frontend frameworks (like React or Angular), prioritizing lightweight performance, fast load times, and custom interactivity.

### Core Technologies
- **HTML5:** Semantic structuring with deep attention to accessibility and SEO.
- **CSS3 (Vanilla):** 
  - Comprehensive use of **CSS Variables** for consistent theming and an easy-to-implement dark/light mode toggle.
  - **CSS Grid & Flexbox** for fluid, responsive layouts.
  - Advanced **CSS Animations & Transitions** for hover states, magnetic buttons, and glassmorphism styling.
- **Vanilla JavaScript (ES6+):**
  - Custom interactivity logic, handling split-panel navigation and intersection observers.
  - An interactive, physics-based particle network rendered on a `<canvas>` element.
  - Custom trailing-cursor physics.

## Key Features

- **Particle Network Background (Canvas):** A dynamic, node-based particle animation runs in the hero section. The nodes interact with the user's cursor, drawing connections when the mouse hovers nearby.
- **Custom Trailing Cursor:** Implemented via vanilla JS and CSS, providing a modern, magnetic feel when hovering over actionable elements like links or buttons.
- **Split-Panel Project Viewer:** An interactive showcase built with custom event listeners. Clicking a project on the left updates the detailed view on the right, seamlessly integrating smooth scrolling on mobile devices.
- **Responsive Design:** Fluid typography and layout shifts ensure the site looks pixel-perfect across ultrawide monitors, laptops, and mobile devices.

## Running Locally

To run the site locally for development:

1. Clone the repository:
   ```bash
   git clone https://github.com/aunraza97/aunraza-portfolio.git
   ```
2. Navigate into the directory:
   ```bash
   cd aunraza-portfolio
   ```
3. Start a local HTTP server (using Python, for example):
   ```bash
   python -m http.server 5500
   ```
4. Open your browser and navigate to `http://localhost:5500`

## File Structure

- `index.html` - The core application entry point.
- `css/style.css` - All styling, variables, and responsive breakpoints.
- `js/app.js` - Global application logic, particle physics, and event handlers.
- `assets/` & `Icons/` - Static assets, images, and the SVG favicon.
