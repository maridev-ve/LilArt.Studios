# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Objective

Modern static website for **Nails By Lili** that:
- Displays work (gallery/carousel) and a hero section with video background
- Provides clear CTAs to **Book** with smooth scrolling interactions
- Allows **booking an appointment** through a **Netlify Forms** submission, with an interactive calendar widget for picking date/time
- Maintains **responsive design** with Tailwind CSS
- Implements **dark/light mode** theme switching with localStorage persistence

**Language Note:** The **code** (CSS class names, IDs, variables, functions and internal comments) **must be in English**. The **visible content** of the page (texts, labels, placeholders) **must be in Spanish**.

## Project Overview

Nails By Lili is a modern static website for a manicure salon built with vanilla HTML, CSS, and JavaScript. The site features a contemporary design with Tailwind CSS framework, video hero section, image galleries, smooth scroll interactions, appointment booking, and dynamic dark/light theme switching with localStorage persistence.

## 📦 Current State (keep functional)

Main files (do not break their behavior):
- `index.html` — main page (hero, carousel, form, footer)
- `styleLilArt.css` — global stylesheet
- `btnGoReservar.js` — buttons that smooth scroll to reservation section
- `navBar.js` — responsive menu behavior (collapse/controlled scroll)
- `phoneOnlyNumber.js` — sanitizes phone input to numbers only
- `reservationCalendar.js` — powers the calendar widget (`#calendar-widget`), populates available dates/times, and fills the hidden `#date` input and `#time` select used by the Netlify Forms submission
- `images.img/…` — image and video resources
- (Optional per repo) `carousel.js` — specific carousel logic if exists

Current hard rules:
- Do not introduce **console errors**
- Do not break existing image/video paths
- Do not break compatibility with **Tailwind CSS** (CDN)
- Maintain CSS custom properties for dynamic theming (light/dark mode)

## 🧱 Target Architecture (hexagonal "lite")

Apply layer separation without unnecessarily complicating a static front-end:

```
/public
  index.html
  /styles
    main.css
  /assets
    /images.img
    /video

/src
  /domain                 # pure rules/validations (no DOM)
    validators.js
    reservation.js

  /application            # use cases (no DOM)
    createReservation.js
    listSlots.js

  /infrastructure         # adapters to services/environments
    whatsappGateway.js
    calendarGateway.js
    storageGateway.js     # (optional future)

  /ui                     # DOM/Tailwind CSS interaction
    main.js               # entry point (ESM)
    navBar.js
    scrollButtons.js
    phoneOnlyNumber.js
    reservationForm.js
    carousel.js
```

**Key Principles**
- `domain` and `application` **do not** touch DOM or `window`/`document`
- `ui` only handles DOM and delegates logic to `application`/`domain`
- `infrastructure` encapsulates external effects (WhatsApp, Calendar, storage/fetch)
- Dependency flows: `ui → application → domain`, and `application ↔ infrastructure` via functions. Never backwards

## 🚦 Migration Policies (incremental, non-breaking)

1) Create `src/ui/main.js` and load it with `<script type="module">` in `index.html`. Import existing UI modules from there (nav, scroll, phoneOnlyNumber, reservationForm)
2) Extract link creation (WhatsApp and Google Calendar) to `infrastructure`
3) Extract validations and formatting to `domain` (e.g.: `isValidPhone`, `formatDate`, `formatTime`)
4) Create use cases in `application` (e.g.: `createReservation(data)` that validates, builds links and returns results for `ui` to use)
5) Keep small PRs with clear titles: `[refactor]`, `[feat]`, `[fix]`, `[docs]` and brief description of *what* changed and *why*

Each PR must confirm:
- ✅ Same visible functionality (no unexpected changes)
- ✅ No console errors (desktop and mobile)
- ✅ Asset paths intact or correctly updated
- ✅ Tailwind CSS classes working properly
- ✅ Dark/light mode theme switching functional

## Project Structure

### Core Architecture
- **Static HTML Site**: Single-page application with `index.html` as the main entry point
- **Modular JavaScript**: Feature-based JS modules in `/javascript/` and `/src/ui/` directories
- **CSS Theming**: CSS custom properties for dynamic light/dark mode switching
- **Tailwind CSS Integration**: Uses Tailwind CSS (utility-first) for responsive layout and modern styling
- **CSS Custom Properties**: Dynamic variables for theming (--text-primary, --bg-secondary, etc.) that adapt to `.light-mode` and `.dark-mode` classes

### Key Directories
- `public/styles/`: Main CSS file with theme variables and responsive design
- `javascript/`: Core functionality modules (form handling, navigation, validation)
- `src/ui/`: Modern ES6 modules (theme toggle, main entry point)
- `images.img/`: All website media assets organized by category

### Component System
The site uses a component-based approach with separate JavaScript modules:

- **Theme System** (`src/ui/themeToggle.js`): Handles light/dark mode with localStorage persistence
- **Form Handler**: the `index.html` reservation form (`name="reserva-cita"`) submits via **Netlify Forms** (`data-netlify="true"`); `javascript/reservationCalendar.js` drives the calendar widget that fills the hidden `#date` field and `#time` select
- **Navigation** (`javascript/navBar.js`): Responsive navigation menu with smooth scrolling interactions
- **UI Controls** (`javascript/btnGoReservar.js`): Smooth scroll-to-section functionality

## Development Commands

This is a static website with no build process. Serve directly:

### Local Development
```bash
# Simple HTTP server (Python)
python3 -m http.server 8000

# Or Node.js http-server
npx http-server

# Or PHP built-in server
php -S localhost:8000
```

### File Structure
- Entry point: `index.html`
- Styles: `public/styles/main.css`
- Main JS module: `src/ui/main.js` (imports theme toggle)
- Legacy JS: Files in `javascript/` directory loaded via script tags

## Key Features

### Theme System
- CSS custom properties for dynamic theming
- Light/dark mode toggle persists in localStorage
- Theme classes: `.light-mode` and `.dark-mode` on body element

### Form Integration
- Reservation form submits via **Netlify Forms** (no custom JS submission logic)
- Dynamic date/time selection with hardcoded available slots (`javascript/reservationCalendar.js`)
- Phone number validation (digits only)

### Responsive Design
- Mobile-first approach with Tailwind breakpoints (sm, md, lg, xl)
- Dual carousel system (desktop/mobile variants)
- Tailwind responsive utilities (hidden, flex, grid) for adaptive layouts
- Dark mode support with Tailwind's `dark:` prefix for all responsive elements

## 🛠️ Code Conventions

- **Language**: *code in English*, *UI copy in Spanish*
- **JS**: ES Modules (use `type="module"`), `const`/`let`, arrow functions when it makes sense
- **Strings**: use **template literals** (``${...}``) instead of concatenation with `+`
- **CSS**: classes in **kebab-case** (`.submit-button`), IDs only if necessary and unique
- **Files**: names in kebab-case (`reservation-form.js`, `whatsapp-gateway.js`)
- **Internal comments** in English, clear and concise
- Avoid duplication: factor out utilities
- No inline styles if it can go in CSS

### CSS
- **Framework**: Tailwind CSS (utility-first approach) via CDN (`https://cdn.tailwindcss.com`)
- **Theming**: CSS custom properties for dynamic light/dark mode (--text-primary, --bg-secondary, --accent-primary, etc.)
- **Mobile-first**: Responsive design with Tailwind breakpoints (md:, lg:, xl:)
- **Custom Styles**: Complementary custom CSS in `public/styles/main.css` for advanced styling, animations, and component-specific rules
- **CSS Variables**: Root-level variables that adapt based on `.light-mode` and `.dark-mode` classes on body element
- **Dark Mode**: Tailwind's `dark:` prefix for responsive dark mode styling alongside custom CSS variable support

### JavaScript
- ES6 modules in `src/ui/` directory
- Traditional script loading for `javascript/` files
- Event-driven architecture with DOMContentLoaded listeners
- No heavy external dependencies (only Tailwind CSS via CDN)

### HTML
- Semantic HTML5 structure
- Tailwind CSS utility classes for styling and layout
- Accessibility attributes (aria-labels, roles)

## Business Logic

### Appointment System
Available dates and times are hardcoded in `javascript/reservationCalendar.js` (`this.availableDates`):
```javascript
this.availableDates = {
  '2026-07-08': ['10:00', '12:00', '14:00', '16:00'],
  '2026-07-10': ['09:00', '11:00', '15:00', '17:00'],
  '2026-07-13': ['10:00', '13:00', '16:00', '18:00']
};
```

### Contact Integration
- Phone number published in plain text in JSON-LD structured data (`"telephone": "+34624643500"` in `index.html`)
- Social media links: Instagram, Facebook, TikTok

### Security Features
- Netlify Forms honeypot field (`bot-field`) for spam/bot protection
- No client-side phone number obfuscation (number is intentionally public in structured data)

## Asset Management
- All images stored in `images.img/` with descriptive subdirectories
- Video files for background/hero sections
- Logo and branding assets in dedicated folders

## Maintenance Notes
- Update available appointment dates in `javascript/reservationCalendar.js` (`this.availableDates`, lines ~5-14) — these are hardcoded and will go stale; refresh periodically
- Social media links are hardcoded in HTML
- No database or server-side components - all client-side functionality

## 📋 Work Rules for Agents
- Maintain **separation**: HTML (structure), CSS (styles), JS (behavior)
- Do not add heavy libraries without justification (size, performance, accessibility)
- Before deleting or renaming functions, **explain in PR** the reason
- Before restructuring, **describe** the plan and impact (brief)
- Maintain basic accessibility (labels, `aria-*`, navigable focus)

## ✅ Manual Verification Checklist
- `index.html` loads without errors (including Tailwind CSS CDN)
- Dark/light mode toggle works and persists in localStorage
- Responsive menu works (open/close; scroll to sections)
- **Book** buttons smooth scroll to form section
- Form: phone numbers only, correct date/time selection via calendar widget
- Reservation form submits successfully through Netlify Forms
- Carousel and video display and don't break layout
- All colors adapt correctly in dark/light mode
- **Clean console** (no errors or critical warnings)

## ❌ Do Not (without explicit approval)
- Replace Tailwind CSS or add large frameworks
- Rewrite entire structure in a single PR
- Change image/video paths without updating references
- Leave *console errors* or degrade perceptible performance
- Break the CSS custom properties theming system

## 🧪 Responsibility Examples (reference)
- `domain/validators.js`: `isValidPhone(value)`, `isValidDate(value)`, `isValidTime(value)`
- `infrastructure/calendarGateway.js`: `createCalendarLink({ date, time, durationHours, title, description })`
- `infrastructure/whatsappGateway.js`: `createWhatsAppLink({ phoneNumber, message })`
- `application/createReservation.js`: orchestrates: validates data, builds links and returns `{ calendarUrl, whatsappUrl }`
- `ui/reservationForm.js`: reads DOM, prevents submit, calls `createReservation(data)` and opens links
- `ui/scrollButtons.js`: adds listeners to buttons to perform smooth `scrollIntoView`
- `ui/navBar.js`: manages collapse and navigation on mobile
- `ui/main.js`: entry point that imports UI modules

## 📌 Implementation Notes
- Maintain compatibility with **Tailwind CSS** (CDN from `https://cdn.tailwindcss.com`)
- Preserve CSS custom properties in `:root` and `body.dark-mode` for theming
- If paths are migrated, update `<link rel="stylesheet">` and `<script type="module">` in `index.html`
- Keep reasonable image sizes (optimize if necessary)
- Avoid *magic strings*: centralize repeated texts in constants when internal to code
- Use Tailwind utility classes combined with custom CSS variables for responsive dark/light mode styling

## 🔍 Instrucciones Personalizadas de Maru

### Verificación Antes de Responder
- **SIEMPRE** verificar que los cambios funcionan en el navegador (abrir en navegador local para comprobar)
- Comprobar que lo que pediste está implementado correctamente
- Revisar que nada se haya roto alrededor de los cambios (elementos vecinos, estilos relacionados, funcionalidad)
- Nunca decir "todo está bien" sin haber verificado previamente en el navegador

### Cuestionamiento y Pensamiento Crítico
- Ante cada solicitud, preguntarme si hay una forma **más efectiva**, **más simple**, **más clara** o **más sencilla** de hacerlo
- Si veo una alternativa mejor, sugerirla ANTES de ejecutar
- Nunca asumir que tu forma es la única solución
- Desafiar suavemente las solicitudes si creo que hay un mejor camino

### Verificación de Código
- Si sugieres un fragmento de código: verificar si ya existe algo parecido en el proyecto
- Si ya está implementado: decirte dónde existe y no repetir trabajo
- Si hay una forma más simple o clara de hacer lo mismo: proponerla antes de proceder
- Buscar soluciones existentes en Tailwind, CSS variables o JavaScript ya presentes

### Formato de Respuesta
- Explicar mi análisis y cuestionamientos antes de hacer cambios
- Si encuentro algo existente: "Vi que esto ya existe en [ubicación], ¿quieres que lo modifique o prefieres una nueva implementación?"
- Si tengo una alternativa: "Podrías también hacer esto así... ¿cuál prefieres?"

### Recordatorio de Git Commits
- **SIEMPRE** después de hacer cambios en archivos, recordarle a Maru que haga commit
- Sugerirle el mensaje de commit basado en lo que se cambió
- Formato: "¿Quieres hacer commit de estos cambios? Sugerencia: `git commit -m 'descripción del cambio'`"
- Recordarle que puede hacer push al final de la sesión cuando termine todos los cambios

### Idioma de Comunicación
- **Por defecto, responder siempre en INGLÉS** para que Maru practique
- Si Maru explícitamente pide que hable en español, cambiar a español temporalmente
- Volver a inglés en la siguiente conversación o cuando Maru lo pida
- Mantener el código y comentarios internos en inglés según las convenciones del proyecto