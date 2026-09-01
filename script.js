/* =========================================================
   CAMPUS VIRTUAL
   INSTITUTO GEMOLÓGICO DE ANTIOQUIA
========================================================= */


/* =========================================================
   CONFIGURACIÓN GENERAL
========================================================= */

const TOTAL_MODULOS = 8;


/* =========================================================
   INICIALIZAR PROGRESO
========================================================= */

function obtenerProgreso() {

    let progreso =
        JSON.parse(
            localStorage.getItem("progresoGemologia")
        );

    if (!progreso) {

        progreso = {};

        for (
            let i = 1;
            i <= TOTAL_MODULOS;
            i++
        ) {

            progreso[i] = false;

        }

        localStorage.setItem(
            "progresoGemologia",
            JSON.stringify(progreso)
        );

    }

    return progreso;

}


/* =========================================================
   GUARDAR PROGRESO
========================================================= */

function guardarProgreso(progreso) {

    localStorage.setItem(
        "progresoGemologia",
        JSON.stringify(progreso)
    );

}


/* =========================================================
   COMPLETAR MÓDULO
========================================================= */

function completarModulo(numeroModulo) {

    let progreso =
        obtenerProgreso();


    progreso[numeroModulo] =
        true;


    guardarProgreso(
        progreso
    );


    actualizarProgresoModulo();


    actualizarProgresoGeneral();


    mostrarMensaje(
        "✓ Módulo " +
        numeroModulo +
        " completado correctamente."
    );


    verificarCursoCompleto();

}


/* =========================================================
   DESMARCAR MÓDULO
========================================================= */

function desmarcarModulo(numeroModulo) {

    let progreso =
        obtenerProgreso();


    progreso[numeroModulo] =
        false;


    guardarProgreso(
        progreso
    );


    actualizarProgresoModulo();


    actualizarProgresoGeneral();

}


/* =========================================================
   CALCULAR PROGRESO GENERAL
========================================================= */

function calcularProgresoGeneral() {

    const progreso =
        obtenerProgreso();


    let completados = 0;


    for (
        let i = 1;
        i <= TOTAL_MODULOS;
        i++
    ) {

        if (
            progreso[i] === true
        ) {

            completados++;

        }

    }


    return Math.round(
        (completados / TOTAL_MODULOS) * 100
    );

}


/* =========================================================
   ACTUALIZAR PROGRESO DEL MÓDULO
========================================================= */

function actualizarProgresoModulo() {

    const barra =
        document.getElementById(
            "moduleProgressBar"
        );


    const porcentaje =
        document.getElementById(
            "modulePercentage"
        );


    if (
        !barra ||
        !porcentaje
    ) {

        return;

    }


    const moduloActual =
        detectarModuloActual();


    const progreso =
        obtenerProgreso();


    const completado =
        progreso[moduloActual] === true;


    if (completado) {

        barra.style.width =
            "100%";

        porcentaje.textContent =
            "100%";

    } else {

        barra.style.width =
            "0%";

        porcentaje.textContent =
            "0%";

    }

}


/* =========================================================
   DETECTAR MÓDULO ACTUAL
========================================================= */

function detectarModuloActual() {

    const pagina =
        window.location.pathname;


    const resultado =
        pagina.match(
            /modulo-(\d+)/i
        );


    if (resultado) {

        return parseInt(
            resultado[1]
        );

    }


    return 0;

}


/* =========================================================
   ACTUALIZAR PROGRESO GENERAL
========================================================= */

function actualizarProgresoGeneral() {

    const porcentaje =
        calcularProgresoGeneral();


    const elementos =
        document.querySelectorAll(
            ".general-progress-percentage"
        );


    elementos.forEach(
        elemento => {

            elemento.textContent =
                porcentaje + "%";

        }
    );


    const barras =
        document.querySelectorAll(
            ".general-progress-bar"
        );


    barras.forEach(
        barra => {

            barra.style.width =
                porcentaje + "%";

        }
    );


    const contador =
        document.getElementById(
            "completedModules"
        );


    if (contador) {

        let completados =
            Math.round(
                (porcentaje *
                TOTAL_MODULOS) /
                100
            );


        contador.textContent =
            completados +
            "/" +
            TOTAL_MODULOS;

    }

}


/* =========================================================
   VERIFICAR SI EL CURSO ESTÁ COMPLETO
========================================================= */

function verificarCursoCompleto() {

    const porcentaje =
        calcularProgresoGeneral();


    if (
        porcentaje === 100
    ) {

        mostrarMensaje(
            "🎓 ¡Felicitaciones! El curso de Gemología ha sido completado."
        );

        mostrarBotonCertificado();

    }

}


/* =========================================================
   MOSTRAR BOTÓN DE CERTIFICADO
========================================================= */

function mostrarBotonCertificado() {

    const contenedor =
        document.getElementById(
            "certificadoContainer"
        );


    if (
        !contenedor
    ) {

        return;

    }


    contenedor.style.display =
        "block";

}


/* =========================================================
   MENSAJE DEL SISTEMA
========================================================= */

function mostrarMensaje(texto) {

    let mensaje =
        document.getElementById(
            "campusMessage"
        );


    if (!mensaje) {

        mensaje =
            document.createElement(
                "div"
            );


        mensaje.id =
            "campusMessage";


        document.body.appendChild(
            mensaje
        );

    }


    mensaje.textContent =
        texto;


    mensaje.classList.add(
        "show"
    );


    setTimeout(
        function() {

            mensaje.classList.remove(
                "show"
            );

        },
        3500
    );

}


/* =========================================================
   MENÚ MÓVIL
========================================================= */

function toggleMenu() {

    const menu =
        document.querySelector(
            ".main-navigation"
        );


    if (!menu) {

        return;

    }


    menu.classList.toggle(
        "mobile-open"
    );

}


/* =========================================================
   NAVEGACIÓN AUTOMÁTICA
========================================================= */

function irAlSiguienteModulo() {

    const modulo =
        detectarModuloActual();


    if (
        modulo >= TOTAL_MODULOS
    ) {

        window.location.href =
            "index.html";

        return;

    }


    const siguiente =
        modulo + 1;


    window.location.href =
        "modulo-" +
        String(siguiente).padStart(2, "0") +
        ".html";

}


/* =========================================================
   NAVEGACIÓN AL MÓDULO ANTERIOR
========================================================= */

function irAlModuloAnterior() {

    const modulo =
        detectarModuloActual();


    if (
        modulo <= 1
    ) {

        window.location.href =
            "index.html";

        return;

    }


    const anterior =
        modulo - 1;


    window.location.href =
        "modulo-" +
        String(anterior).padStart(2, "0") +
        ".html";

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        obtenerProgreso();


        actualizarProgresoModulo();


        actualizarProgresoGeneral();


        configurarNavegacion();

    }
);


/* =========================================================
   CONFIGURAR NAVEGACIÓN
========================================================= */

function configurarNavegacion() {

    const modulo =
        detectarModuloActual();


    if (
        modulo === 0
    ) {

        return;

    }


    const anterior =
        document.querySelector(
            ".previous-module"
        );


    const siguiente =
        document.querySelector(
            ".next-module"
        );


    if (
        anterior
    ) {

        anterior.onclick =
            function(evento) {

                evento.preventDefault();

                irAlModuloAnterior();

            };

    }


    if (
        siguiente
    ) {

        siguiente.onclick =
            function(evento) {

                evento.preventDefault();

                irAlSiguienteModulo();

            };

    }

}


/* =========================================================
   REINICIAR CURSO
========================================================= */

function reiniciarCurso() {

    const confirmar =
        confirm(
            "¿Se desea reiniciar todo el progreso del curso?"
        );


    if (!confirmar) {

        return;

    }


    localStorage.removeItem(
        "progresoGemologia"
    );


    location.reload();

}