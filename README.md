# Edumagdonal — Página web

Página web para un negocio de comida: portada, menú con filtros, sección "Sobre nosotros", horarios con indicador de abierto/cerrado, mapa y pedidos por WhatsApp. Es HTML, CSS y JavaScript puro: no hace falta instalar nada.

## Ver la web

Abre `index.html` en el navegador.

## Personalizar

| Qué quieres cambiar | Dónde |
| --- | --- |
| Número de WhatsApp, mensaje, horarios y **menú (platos y precios)** | Al principio de `script.js` |
| Nombre del negocio, textos, dirección, teléfono, Instagram | `index.html` |
| Tabla de horarios visible | `index.html`, sección `#horarios` (debe coincidir con `OPENING_HOURS` en `script.js`) |
| Mapa | `index.html`: cambia `q=Madrid` en el `iframe` por tu dirección |
| Colores y tipografía | Variables al principio de `styles.css` |

## Publicar gratis con GitHub Pages

1. En GitHub, ve a **Settings → Pages**.
2. En *Source* elige **Deploy from a branch**, selecciona la rama y la carpeta `/ (root)`.
3. Guarda. En uno o dos minutos la web estará en `https://<tu-usuario>.github.io/edumagdonal/`.
