const form = document.getElementById("productForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;

  const producto = {
    nombre,
    precio,
    imagen
  };

  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));

  alert("Remera cargada correctamente");

  form.reset();
});
