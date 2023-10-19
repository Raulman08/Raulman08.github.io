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
