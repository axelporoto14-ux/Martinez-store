// ==============================
// CATÁLOGO FIJO (SE VE IGUAL EN CELU Y PC)
// Y ENVÍA LINK DE LA FOTO POR WHATSAPP
// ==============================

const NUMERO_WHATSAPP = "595982352177";
const BASE_URL_IMAGENES = "https://axelporoto14-ux.github.io/Martinez-store/";

// 👉 Acá definís tus remeras
const PRODUCTOS = [
  {
    nombre: "Remera 100% algodón",
    precio: 85000,
    categoria: "P",
    descripcion: "Remera negra 100% algodón premium.",
    talles: ["P", "M", "G", "XL"],
    imagen: "remera1.png" // el archivo que subas a GitHub
  }
  // agregá más productos aquí...
];

// crea una tarjeta en la web
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

        <div class="product-sizes">
            <span class="sizes-label">Talles:</span>
            <div class="sizes-buttons"></div>
        </div>

        <p class="selected-size-text">Selecciona un talle</p>

        <button class="btn-wsp" disabled>Pedir por WhatsApp</button>
    `;

  const contTalles = card.querySelector(".sizes-buttons");
  const textoTalle = card.querySelector(".selected-size-text");
  const btnWsp = card.querySelector(".btn-wsp");

  let talleSeleccionado = null;

  const talles = producto.talles && producto.talles.length
    ? producto.talles
    : ["P", "M", "G", "XL"];

  talles.forEach((talle) => {
    const btn = document.createElement("button");
    btn.textContent = talle;
    btn.className = "size-btn";

    btn.addEventListener("click", () => {
      contTalles
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");

      talleSeleccionado = talle;
      textoTalle.textContent = `Talle seleccionado: ${talle}`;
      btnWsp.disabled = false;
    });

    contTalles.appendChild(btn);
  });

  btnWsp.addEventListener("click", () => {
    if (!talleSeleccionado) return;

    const urlImagen = producto.imagen
      ? BASE_URL_IMAGENES + producto.imagen
      : "Sin imagen";

    const mensaje = `
Hola! Me interesa la *${producto.nombre}*.
Talle: *${talleSeleccionado}*
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

// muestra todo el catálogo
function mostrarProductos() {
  const contenedor = document.getElementById("product-list");

  if (!PRODUCTOS.length) {
    contenedor.innerHTML = `
            <p style="color:#b38f00; text-align:center; font-size:16px; padding:20px;">
                Aún no hay productos cargados en el código.
            </p>
        `;
    return;
  }

  contenedor.innerHTML = "";
  PRODUCTOS.forEach((p) => {
    const card = crearTarjetaProducto(p);
    contenedor.appendChild(card);
  });
}

mostrarProductos();
