// ==============================
// CATÁLOGO POR TALLE (P, M, G, GG)
// ENVÍA LINK DE LA FOTO POR WHATSAPP
// ==============================

const NUMERO_WHATSAPP = "595982352177";
const BASE_URL_IMAGENES = "https://axelporoto14-ux.github.io/Martinez-store/";

// 👉 ACÁ DEFINÍS TODAS LAS REMERAS
// Cambiá los nombres de imagen por los archivos que subas a GitHub
const PRODUCTOS = [
  // TALLE P
  {
    nombre: "Remera P 1",
    talle: "P",
    precio: 85000,
    descripcion: "Remera talle P.",
    imagen: "p1.jpg"
  },
  {
    nombre: "Remera P 2",
    talle: "P",
    precio: 85000,
    descripcion: "Remera talle P.",
    imagen: "p2.jpg"
  },

  // TALLE M
  {
    nombre: "Remera M 1",
    talle: "M",
    precio: 85000,
    descripcion: "Remera talle M.",
    imagen: "m1.jpg"
  },

  // TALLE G
  {
    nombre: "Remera G 1",
    talle: "G",
    precio: 85000,
    descripcion: "Remera talle G.",
    imagen: "g1.jpg"
  },

  // TALLE GG
  {
    nombre: "Remera GG 1",
    talle: "GG",
    precio: 85000,
    descripcion: "Remera talle GG.",
    imagen: "gg1.jpg"
  }
];

// ==============================
// LÓGICA
// ==============================

let talleActivo = "P"; // por defecto se muestra P

function crearTarjetaProducto(producto) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-image-wrapper">
        <img src="${producto.imagen || 'logo.png'}"
             alt="${producto.nombre}"
             class="product-image" />
    </div>
    <h3 class="product-name">${producto.nombre}</h3>
    <p class="product-desc">${producto.descripcion || ""}</p>
    <p class="product-price">Gs. ${Number(producto.precio || 0).toLocaleString("es-PY")}</p>
    <p class="product-size-label">Talle: ${producto.talle}</p>
    <button class="btn-wsp">Pedir por WhatsApp</button>
  `;

  const btnWsp = card.querySelector(".btn-wsp");

  btnWsp.addEventListener("click", () => {
    const urlImagen = producto.imagen
      ? BASE_URL_IMAGENES + producto.imagen
      : "Sin imagen";

    const mensaje = `
Hola! Me interesa la *${producto.nombre}*.
Talle: *${producto.talle}*
Precio: Gs. ${Number(producto.precio || 0).toLocaleString("es-PY")}
Foto: ${urlImagen}
    `;

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(url, "_blank");
  });

  return card;
}

function mostrarProductos() {
  const contenedor = document.getElementById("product-list");
  contenedor.innerHTML = "";

  const productosFiltrados = PRODUCTOS.filter(
    (p) => p.talle === talleActivo
  );

  if (!productosFiltrados.length) {
    contenedor.innerHTML = `
      <p style="color:#b38f00; text-align:center; font-size:15px; padding:20px;">
        No hay remeras en talle ${talleActivo}.
      </p>
    `;
    return;
  }

  productosFiltrados.forEach((p) => {
    const card = crearTarjetaProducto(p);
    contenedor.appendChild(card);
  });
}

function configurarTabs() {
  const tabs = document.querySelectorAll(".size-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      talleActivo = tab.getAttribute("data-talle");
      mostrarProductos();
    });
  });
}

// inicializar
configurarTabs();
mostrarProductos();
