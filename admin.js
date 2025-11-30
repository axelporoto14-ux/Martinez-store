// ==============================
//  Panel de admin - Martínez Store
//  Guarda productos en localStorage
// ==============================

const ADMIN_PASSWORD = "martinez2024"; // cámbiala si querés

const STORAGE_KEY = "productosMartinezStore";

// Elementos del DOM
const loginSection = document.getElementById("login-section");
const loginForm = document.getElementById("login-form");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");

const adminSection = document.getElementById("admin-section");
const listaSection = document.getElementById("lista-section");
const productForm = document.getElementById("product-form");

const productIndexInput = document.getElementById("product-index");
const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const categoriaInput = document.getElementById("categoria");
const imagenInput = document.getElementById("imagen");
const tallesInput = document.getElementById("talles");
const descripcionInput = document.getElementById("descripcion");

const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");

const sinProductosDiv = document.getElementById("sin-productos");
const tablaContenedor = document.getElementById("tabla-contenedor");
const productosTbody = document.getElementById("productos-tbody");

// ------------------------------
// LOGIN
// ------------------------------
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (passwordInput.value === ADMIN_PASSWORD) {
        loginError.style.display = "none";
        loginSection.style.display = "none";
        adminSection.style.display = "block";
        listaSection.style.display = "block";
        cargarProductos();
    } else {
        loginError.style.display = "block";
    }
});

// ------------------------------
// LOCALSTORAGE
// ------------------------------
function obtenerProductos() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data) || [];
    } catch (err) {
        console.error("Error al parsear productos:", err);
        return [];
    }
}

function guardarProductos(productos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

// ------------------------------
// TABLA
// ------------------------------
function renderTabla(productos) {
    productosTbody.innerHTML = "";

    if (!productos.length) {
        sinProductosDiv.style.display = "block";
        tablaContenedor.style.display = "none";
        return;
    }

    sinProductosDiv.style.display = "none";
    tablaContenedor.style.display = "block";

    productos.forEach((p, index) => {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = p.nombre;
        tr.appendChild(tdNombre);

        const tdCategoria = document.createElement("td");
        tdCategoria.textContent = p.categoria || "-";
        tr.appendChild(tdCategoria);

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = p.precio
            ? `Gs. ${Number(p.precio).toLocaleString("es-PY")}`
            : "-";
        tr.appendChild(tdPrecio);

        const tdTalles = document.createElement("td");
        tdTalles.textContent = p.talles && p.talles.length
            ? p.talles.join(", ")
            : "-";
        tr.appendChild(tdTalles);

        const tdImagen = document.createElement("td");
        if (p.imagen) {
            tdImagen.innerHTML = `<a href="${p.imagen}" target="_blank" style="color:#b38f00; font-size:12px;">Ver imagen</a>`;
        } else {
            tdImagen.textContent = "-";
        }
        tr.appendChild(tdImagen);

        const tdAcciones = document.createElement("td");
        tdAcciones.classList.add("text-right");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn btn-secondary";
        btnEditar.style.marginRight = "6px";
        btnEditar.addEventListener("click", () => editarProducto(index));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger";
        btnEliminar.addEventListener("click", () => eliminarProducto(index));

        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);
        tr.appendChild(tdAcciones);

        productosTbody.appendChild(tr);
    });
}

function cargarProductos() {
    const productos = obtenerProductos();
    renderTabla(productos);
}

// ------------------------------
// CREAR / EDITAR
// ------------------------------
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productos = obtenerProductos();

    const nuevoProducto = {
        nombre: nombreInput.value.trim(),
        precio: precioInput.value.trim(),
        categoria: categoriaInput.value.trim(),
        imagen: imagenInput.value.trim(),
        descripcion: descripcionInput.value.trim(),
        talles: tallesInput.value
            .split(",")
            .map(t => t.trim().toUpperCase())
            .filter(t => t !== "")
    };

    const index = Number(productIndexInput.value);

    if (index === -1) {
        productos.push(nuevoProducto);
    } else {
        productos[index] = nuevoProducto;
    }

    guardarProductos(productos);
    renderTabla(productos);
    limpiarFormulario();
});

btnCancelar.addEventListener("click", () => {
    limpiarFormulario();
});

function limpiarFormulario() {
    productIndexInput.value = -1;
    nombreInput.value = "";
    precioInput.value = "";
    categoriaInput.value = "";
    imagenInput.value = "";
    tallesInput.value = "";
    descripcionInput.value = "";
    btnGuardar.textContent = "Guardar producto";
    btnCancelar.style.display = "none";
}

// ------------------------------
// EDITAR / ELIMINAR
// ------------------------------
function editarProducto(index) {
    const productos = obtenerProductos();
    const p = productos[index];
    if (!p) return;

    productIndexInput.value = index;
    nombreInput.value = p.nombre || "";
    precioInput.value = p.precio || "";
    categoriaInput.value = p.categoria || "";
    imagenInput.value = p.imagen || "";
    tallesInput.value = p.talles ? p.talles.join(",") : "";
    descripcionInput.value = p.descripcion || "";

    btnGuardar.textContent = "Actualizar producto";
    btnCancelar.style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarProducto(index) {
    const productos = obtenerProductos();
    const p = productos[index];
    if (!p) return;

    const confirmar = window.confirm(`¿Eliminar "${p.nombre}"?`);
    if (!confirmar) return;

    productos.splice(index, 1);
    guardarProductos(productos);
    renderTabla(productos);
}
