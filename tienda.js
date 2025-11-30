/* ============================================
   CATALOGO CONECTADO AL PANEL ADMIN
   ============================================ */

const NUMERO_WHATSAPP = "595982352177"; 
const STORAGE_KEY = "productosMartinezStore"; // misma clave que admin.js

// obtener productos guardados desde el admin
function obtenerProductos() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data) || [];
    } catch {
        return [];
    }
}

// crear una tarjeta de producto
function crearTarjetaProducto(producto) {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" />
        </div>
        <h3 class="product-name">${producto.nombre}</h3>
        <p class="product-desc">${producto.descripcion || ""}</p>
        <p class="product-price">Gs. ${Number(producto.precio).toLocaleString("es-PY")}</p>

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

    // crear botones de talles
    if (producto.talles && Array.isArray(producto.talles)) {
        producto.talles.forEach(talle => {
            const btn = document.createElement("button");
            btn.textContent = talle;
            btn.className = "size-btn";

            btn.addEventListener("click", () => {
                contTalles.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");

                talleSeleccionado = talle;
                textoTalle.textContent = `Talle seleccionado: ${talle}`;
                btnWsp.disabled = false;
            });

            contTalles.appendChild(btn);
        });
    }

    // botón WhatsApp
    btnWsp.addEventListener("click", () => {
        if (!talleSeleccionado) return;

        const mensaje = `
Hola! Me interesa la *${producto.nombre}*.
Talle: *${talleSeleccionado}*
Precio: Gs. ${Number(producto.precio).toLocaleString("es-PY")}

¿Está disponible?
        `;

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    });

    return card;
}

// mostrar productos
function mostrarProductos() {
    const contenedor = document.getElementById("product-list");
    const productos = obtenerProductos();

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `
            <p style="color:#b38f00; text-align:center; font-size:16px; padding:20px;">
                No hay productos aún.  
                <br>💡 Cargalos desde el panel administrador.
            </p>
        `;
        return;
    }

    productos.forEach(p => {
        const card = crearTarjetaProducto(p);
        contenedor.appendChild(card);
    });
}

mostrarProductos();
