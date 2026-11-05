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

let progresoEnMemoria = {};
let almacenamientoDisponible = true;
function obtenerProgreso() {
    let datos = progresoEnMemoria;
    try {
        const leido = almacenamientoDisponible ? JSON.parse(localStorage.getItem("progresoGemologia") || "null") : null;
        if (leido && typeof leido === "object" && !Array.isArray(leido)) datos = leido;
    } catch (error) { almacenamientoDisponible = false; }
    const progreso = {};
    for (let i = 1; i <= TOTAL_MODULOS; i++) progreso[i] = datos[i] === true;
    progresoEnMemoria = progreso;
    return progreso;
}
function guardarProgreso(progreso) {
    progresoEnMemoria = progreso;
    try { localStorage.setItem("progresoGemologia", JSON.stringify(progreso)); almacenamientoDisponible = true; }
    catch (error) { almacenamientoDisponible = false; }
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
        " marcado como leído."
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
    const contenedor = document.getElementById("certificadoContainer");
    if (contenedor) contenedor.style.display = calcularProgresoGeneral() === 100 ? "block" : "none";
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


        mensaje.id = "campusMessage";
        mensaje.setAttribute("role", "status");
        mensaje.setAttribute("aria-live", "polite");


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


    const abierto = menu.classList.toggle("mobile-open");
    const boton = document.querySelector(".mobile-menu-button");
    if (boton) boton.setAttribute("aria-expanded", String(abierto));

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


    progresoEnMemoria = {};
    try { localStorage.removeItem("progresoGemologia"); } catch (error) {}


    location.reload();

}
function actualizarBotonLectura() {
    const numero = detectarModuloActual();
    const boton = document.querySelector(".complete-button");
    if (!numero || !boton) return;
    const leido = obtenerProgreso()[numero];
    boton.textContent = leido ? "Desmarcar lectura" : "Marcar lectura como realizada";
    boton.setAttribute("aria-pressed", String(leido));
}
function alternarLectura(numero) {
    if (!Number.isInteger(numero) || numero < 1 || numero > TOTAL_MODULOS) return;
    const progreso = obtenerProgreso();
    progreso[numero] = !progreso[numero];
    guardarProgreso(progreso);
    actualizarProgresoModulo(); actualizarProgresoGeneral(); actualizarBotonLectura(); verificarCursoCompleto();
    mostrarMensaje(almacenamientoDisponible ? (progreso[numero] ? "Lectura marcada en este navegador." : "Marca de lectura retirada.") : "Lectura actualizada solo durante esta sesión; el navegador no permite guardarla.");
}
document.addEventListener("DOMContentLoaded", function () {
    verificarCursoCompleto(); actualizarBotonLectura();
    const campo = document.getElementById("buscar-recursos");
    const estado = document.getElementById("resultados-recursos");
    const tarjetas = Array.from(document.querySelectorAll("#carpetas-drive .iga-drive-card"));
    const normalizar = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    if (campo && estado) {
        const filtrar = () => {
            const consulta = normalizar(campo.value);
            let cantidad = 0;
            tarjetas.forEach(tarjeta => { const visible = normalizar(tarjeta.textContent).includes(consulta); tarjeta.hidden = !visible; if (visible) cantidad++; });
            estado.textContent = cantidad ? cantidad + " carpetas disponibles en el directorio." : "No se encontraron carpetas con ese término.";
        };
        campo.addEventListener("input", filtrar); filtrar();
    }
});
