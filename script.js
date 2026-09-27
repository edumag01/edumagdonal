// =====================================================================
//  CONFIGURACIÓN — edita estos datos para adaptar la web a tu negocio
// =====================================================================

// Número de WhatsApp con código de país, sin "+" ni espacios (ej.: 34600000000)
const WHATSAPP_NUMBER = "34600000000";
const WHATSAPP_MESSAGE = "¡Hola Edumagdonal! Quiero hacer un pedido 🍔";

// Horario de apertura: día de la semana (0 = domingo … 6 = sábado) → [abre, cierra] en formato 24 h
const OPENING_HOURS = {
  0: ["13:00", "21:00"],
  1: ["12:00", "22:00"],
  2: ["12:00", "22:00"],
  3: ["12:00", "22:00"],
  4: ["12:00", "22:00"],
  5: ["12:00", "23:30"],
  6: ["12:00", "23:30"],
};

// Menú: añade, quita o cambia platos. "tag" es opcional.
const CURRENCY = "€";
const MENU = [
  { category: "Hamburguesas", emoji: "🍔", name: "La Clásica", price: 8.5, description: "Carne de res, queso cheddar, lechuga, tomate y salsa de la casa.", tag: "Más pedida" },
  { category: "Hamburguesas", emoji: "🍔", name: "BBQ Bacon", price: 9.9, description: "Doble carne, bacon crujiente, cebolla caramelizada y salsa barbacoa." },
  { category: "Hamburguesas", emoji: "🥬", name: "Veggie", price: 8.9, description: "Hamburguesa de garbanzos y verduras, aguacate y alioli de hierbas.", tag: "Vegetariana" },
  { category: "Platos del día", emoji: "🍲", name: "Guiso de la abuela", price: 10.5, description: "Receta tradicional de cocción lenta, con pan casero." },
  { category: "Platos del día", emoji: "🌮", name: "Tacos al pastor", price: 9.0, description: "Tres tacos con cerdo adobado, piña, cilantro y cebolla." },
  { category: "Platos del día", emoji: "🥗", name: "Ensalada completa", price: 7.5, description: "Mezcla de hojas, pollo a la plancha, huevo, maíz y vinagreta." },
  { category: "Acompañantes", emoji: "🍟", name: "Papas fritas", price: 3.0, description: "Crujientes, cortadas a mano y con sal marina." },
  { category: "Acompañantes", emoji: "🧅", name: "Aros de cebolla", price: 3.5, description: "Rebozado casero con salsa para mojar." },
  { category: "Bebidas", emoji: "🥤", name: "Refresco", price: 2.0, description: "Varios sabores, 33 cl." },
  { category: "Bebidas", emoji: "🍋", name: "Limonada natural", price: 2.8, description: "Hecha al momento con limones frescos y hierbabuena." },
  { category: "Postres", emoji: "🍰", name: "Tarta de queso", price: 4.5, description: "Cremosa, al horno, con mermelada de frutos rojos.", tag: "Casera" },
  { category: "Postres", emoji: "🍫", name: "Brownie", price: 4.0, description: "Chocolate intenso con nueces y helado de vainilla." },
];

// =====================================================================
//  A partir de aquí no hace falta tocar nada
// =====================================================================

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll(".js-whatsapp").forEach((a) => {
  a.href = whatsappUrl;
  a.target = "_blank";
  a.rel = "noopener";
});

// ----- Menú con filtros -----
const grid = document.querySelector(".menu-grid");
const filtersEl = document.querySelector(".filters");
const categories = ["Todo", ...new Set(MENU.map((d) => d.category))];

const formatPrice = (n) => `${n.toFixed(2).replace(".", ",")} ${CURRENCY}`;

function renderMenu(category) {
  const dishes = category === "Todo" ? MENU : MENU.filter((d) => d.category === category);
  grid.innerHTML = dishes.map((d) => `
    <article class="dish">
      <div class="dish-emoji" aria-hidden="true">${d.emoji}</div>
      <div class="dish-head">
        <h3>${d.name}</h3>
        <span class="price">${formatPrice(d.price)}</span>
      </div>
      <p>${d.description}</p>
      ${d.tag ? `<span class="tag">${d.tag}</span>` : ""}
    </article>`).join("");
}

filtersEl.innerHTML = categories
  .map((c, i) => `<button class="filter${i === 0 ? " active" : ""}" role="tab" aria-selected="${i === 0}">${c}</button>`)
  .join("");

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  filtersEl.querySelectorAll(".filter").forEach((b) => {
    b.classList.toggle("active", b === btn);
    b.setAttribute("aria-selected", b === btn);
  });
  renderMenu(btn.textContent);
});

renderMenu("Todo");

// ----- ¿Abierto ahora? -----
function updateStatus() {
  const el = document.querySelector(".js-status");
  const now = new Date();
  const hours = OPENING_HOURS[now.getDay()];
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const current = now.getHours() * 60 + now.getMinutes();
  const open = hours && current >= toMin(hours[0]) && current < toMin(hours[1]);
  el.textContent = open ? `🟢 Abierto ahora · cerramos a las ${hours[1]}` : "🔴 Cerrado ahora";
  el.classList.toggle("open", open);
  el.classList.toggle("closed", !open);
}
updateStatus();

// ----- Menú móvil -----
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});

document.querySelector(".js-year").textContent = new Date().getFullYear();
