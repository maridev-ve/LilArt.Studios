# Información del Footer Actual

## Ubicación Exacta
**Archivo:** `/home/maru/LilArt.Studios/index.html`
**Líneas:** 698-747

---

## Estructura Completa del Footer

### Layout Principal
- **Tag:** `<footer class="py-16">`
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid:** `grid md:grid-cols-4 gap-8 mb-8` (4 columnas en desktop)

---

## Contenido por Columnas

### 1. Navegación (líneas 702-711)
**Título:** "Navegación"
**Links incluidos:**
- Inicio → `#top-web`
- hablemos → `#hablemos`
- Blog → `blog.html`
- Galería → `#galeria`
- Reservar → `#reservar`

**Clases CSS:**
- Título: `font-semibold text-lg mb-4`
- Lista: `space-y-2 text-sm opacity-75`
- Links: `hover:opacity-100 transition-opacity`

---

### 2. Contacto (líneas 713-725)
**Título:** "Contacto"
**Links incluidos:**
- Instagram → `https://www.instagram.com/lilart.studios/`
- Facebook → `https://www.facebook.com/profile.php?id=61571389152915`
- WhatsApp → `https://wa.me/34641216186`
- AppWebEl → `https://appwebel.com/`

**Clases CSS:**
- Título: `font-semibold text-lg mb-4`
- Lista: `space-y-2 text-sm opacity-75`
- Links: `hover:opacity-100 transition-opacity target="_blank"`

---

### 3. Horario (líneas 727-732)
**Título:** "Horario"
**Contenido:**
- Días: "Lunes a Viernes"
- Horario: "08:00h - 18:00h"
- Ubicación: "Palma de Mallorca"

**Clases CSS:**
- Título: `font-semibold text-lg mb-4`
- Texto: `text-sm opacity-75`

---

### 4. Logo (líneas 734-739)
**Contenido:**
- Logo claro: `images.img/logo/logo-light.png` (visible en light mode)
- Logo oscuro: `images.img/logo/logo-dark.png` (visible en dark mode)

**Clases CSS:**
- Container: `text-center md:text-right`
- Logo light: `h-32 p-3 w-auto mx-auto md:ml-auto light-mode-logo p-5`
- Logo dark: `h-32 p-3 w-auto mx-auto md:ml-auto dark-mode-logo hidden p-5`

---

## Copyright Section (líneas 742-745)
**Container:** `border-t pt-8 text-center text-sm opacity-60`

**Contenido:**
```html
<p>Palma de Mallorca, España</p>
<p class="mt-2">&copy; 2025 Nails By Lili. Todos los derechos reservados.</p>
```

---

## Notas Técnicas

### Responsive Design
- Mobile (< md): Una sola columna
- Tablet/Desktop (md+): 4 columnas en grid

### Dark/Light Mode
- El footer adapta colores automáticamente con las variables CSS
- Los logos cambian según el tema (light-mode-logo / dark-mode-logo)

### Clases Tailwind Principales
- `py-16` → Padding vertical
- `md:grid-cols-4` → Grid de 4 columnas en desktop
- `gap-8` → Espaciado entre columnas
- `border-t` → Borde superior en sección de copyright

---