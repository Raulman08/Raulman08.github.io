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

    const formularioResumenTema_1 = document.getElementById("formulario-resumen-1");

    formularioResumenTema_1.addEventListener("submit", function(event) {
        event.preventDefault();

        const archivoPDF = formularioResumenTema_1.querySelector("#archivo-pdf-1").files[0];
        const nombrePDF = formularioResumenTema_1.querySelector("#contenido-1").value;

        if (archivoPDF && nombrePDF) {
            cargarPDF(document.getElementById("tema-1"), archivoPDF, nombrePDF);

            formularioResumenTema_1.reset();
        }
    });
});

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

    const formularioResumenTema_2 = document.getElementById("formulario-resumen-2");

    formularioResumenTema_2.addEventListener("submit", function(event) {
        event.preventDefault();

        const archivoPDF = formularioResumenTema_2.querySelector("#archivo-pdf-2").files[0];
        const nombrePDF = formularioResumenTema_2.querySelector("#contenido-2").value;

        if (archivoPDF && nombrePDF) {
            cargarPDF(document.getElementById("tema-2"), archivoPDF, nombrePDF);

            formularioResumenTema_2.reset();
        }
    });
});
