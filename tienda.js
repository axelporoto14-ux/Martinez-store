// Catálogo público - Martínez Store

const productos = [
  {
    id: 1,
    nombre: "Remera León Dorado",
    precio: 120000,
    descripcion: "Remera negra con logo de león dorado. 100% algodón.",
    talles: ["S", "M", "L", "XL"],
    imagen: "logo.png" // luego podemos cambiar a foto real
  },
  {
    id: 2,
    nombre: "Remera Corona Premium",
    precio: 130000,
    descripcion: "Diseño elegante con corona dorada, ideal para salir.",
    talles: ["M", "L", "XL"],
    imagen: "logo.png"
  },
  {
    id: 3,
    nombre: "Remera Clásica Martínez",
    precio: 110000,
    descripcion: "Remera básica con logo, cómoda para todos los días.",
    talles: ["S", "M", "L"],
    imagen: "logo.png"
  }
];

// Render de productos en la página
const contenedor = document.getElementById("product-list");

function crearTarjetaProducto(producto) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-image-wrapper">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
    </div>
    <h3 class="product-name">${producto.nombre}</h3>
    <p class="product-desc">${producto.descripcion}</p>
    <p class="product-price">Gs. ${producto.precio.toLocaleString("es-PY")}</p>
    <div class="product-sizes">
      <span class="sizes-label">Talles:</span>
      <div class="sizes-buttons"></div>
    </div>
    <p class="selected-size-text">Selecciona un talle</p>
  `;

  const contenedorTalles = card.querySelector(".sizes-buttons");
  const textoSeleccion = card.querySelector(".selected-size-text");

  producto.talles.forEach((talle) => {
    const btn = document.createElement("button");
    btn.textContent = talle;
    btn.className = "size-btn";

    btn.addEventListener("click", () => {
      // Quitar selección previa
      contenedorTalles.querySelectorAll(".size-btn").forEach((b) => {
        b.classList.remove("selected");
      });
      // Marcar seleccionado
      btn.classList.add("selected");
      textoSeleccion.textContent = `Talle seleccionado: ${talle}`;
    });

    contenedorTalles.appendChild(btn);
  });

  return card;
}

function mostrarProductos() {
  if (!contenedor) return;
  contenedor.innerHTML = "";
  productos.forEach((p) => {
    const card = crearTarjetaProducto(p);
    contenedor.appendChild(card);
  });
}

mostrarProductos();
