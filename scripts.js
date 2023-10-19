document.addEventListener("DOMContentLoaded", function() {
    function cargarPDF(seccion, archivoPDF, nombrePDF) {
        const lista = document.createElement("li");  // Crear un elemento de lista <li>
        const enlaceDescarga = document.createElement("a"); // Crear un enlace <a> dentro del elemento de lista

        enlaceDescarga.innerText = nombrePDF;
        enlaceDescarga.href = URL.createObjectURL(archivoPDF);
        enlaceDescarga.target = "_blank"; // Abre el enlace en una nueva ventana/tabla

        lista.appendChild(enlaceDescarga); // Agregar el enlace al elemento de lista <li>

        seccion.querySelector("ul.pdf-list").appendChild(lista); // Agregar el elemento de lista a la lista ordenada <ul>
    }

    const formularioResumenAlgebra = document.getElementById("formulario-resumen-algebra");

    formularioResumenAlgebra.addEventListener("submit", function(event) {
        event.preventDefault();

        const archivoPDF = formularioResumenAlgebra.querySelector("#archivo-pdf-algebra").files[0];
        const nombrePDF = formularioResumenAlgebra.querySelector("#contenido-algebra").value;

        if (archivoPDF && nombrePDF) {
            cargarPDF(document.getElementById("tema-algebra"), archivoPDF, nombrePDF);

            formularioResumenAlgebra.reset();
        }
    });
});
//Obtener el boton toggle
var toggleButton = document.getElementById("toggle-button");
 
//Agregar un evento click al boton toggle
toggleButton.addEventListener("click", function() {
  // Obtener el elemento body
  var body = document.querySelector("body");
 
  // Revisar si el elemento body tiene la clase "dark-mode"
  if (body.classList.contains("dark-mode")) {
    // Remover la clase "dark-mode" del elemento body
    body.classList.remove("dark-mode");
    // Cambiar el texto del botón toggle
    toggleButton.innerHTML = "Activar modo oscuro";
  } else {
    // Agregar la clase "dark-mode" al elemento body
    body.classList.add("dark-mode");
    // Cambiar el texto del botón toggle
    toggleButton.innerHTML = "Activar modo claro";
  }
});
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', "dark");
} else {
  document.documentElement.setAttribute('data-theme', "light");
}
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', event => {
    if (event.matches) {
      //dark mode
      document.documentElement.setAttribute('data-theme', "dark")
    } else {
      //light mode
      document.documentElement.setAttribute('data-theme', "light");
    }
  })
