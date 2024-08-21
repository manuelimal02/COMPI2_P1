/*let UltimoAST = null;
import { Parser } from '../Interprete/Analizador/Parser.js';
import { Interprete } from '../Interprete/Analizador/Interprete.js';
*/
export function FuncionArchivo() {
    const entrada = document.getElementById('txtAreaEntrada');
    const salida = document.getElementById('txtAreaSalida');
    const fileInput = document.getElementById('fileInput');
    const AbrirArchivo = document.getElementById('AbrirArchivo');
    const CrearArchivo = document.getElementById('CrearArchivo');
    const GuardarArchivo = document.getElementById('GuardarArchivo');

    function FuncionAbrirArchivo(evento) {
        const archivo = evento.target.files[0];
        if (archivo && archivo.name.endsWith('.oak')) {
            const lector = new FileReader();
            lector.onload = function(e) {
                entrada.value = e.target.result;
                ActualizarNumeroLinea(entrada, document.getElementById('lnEntrada'));
            };
            lector.readAsText(archivo);
        } else {
            alert('Seleccione Archivo Con La Extensión .OAK');
        }
    }

    function ContenidoArchivo(contenido, nombreArchivo) {
        const blob = new Blob([contenido], { type: 'text/plain' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = nombreArchivo;
        enlace.click();
    }

    function handleNuevoArchivo() {
        if (entrada.value.trim() !== "") {
            const debeGuardar = confirm("¿Desea Guardar El Archivo Actual?");
            if (debeGuardar) {
                handleGuardarArchivo();
            }
        }
        entrada.value = "";
        salida.value = "";
        ActualizarNumeroLinea(entrada, document.getElementById('lnEntrada'));
        ActualizarNumeroLinea(salida, document.getElementById('lnSalida'));
    }

    function handleGuardarArchivo() {
        const nombreArchivo = prompt("Ingrese Nombre De Archivo .OAK", "GuardarArchivo.oak");
        if (nombreArchivo) {
            ContenidoArchivo(entrada.value, nombreArchivo);
        }
    }

    function ActualizarNumeroLinea(areaTexto, numerosLinea) {
        const lineas = areaTexto.value.split('\n').length;
        numerosLinea.innerHTML = Array.from({ length: lineas }, (_, i) => i + 1).join('<br>');
    }

    AbrirArchivo.addEventListener('click', () => {
        console.log('Abrir Archivo');
        fileInput.click();
    });

    fileInput.addEventListener('change', FuncionAbrirArchivo);

    CrearArchivo.addEventListener('click', () => {
        console.log('Crear Archivo');
        handleNuevoArchivo();
    });

    GuardarArchivo.addEventListener('click', () => {
        console.log('Guardar Archivo');
        handleGuardarArchivo();
    });
}

export function FuncionInterprete() {
    const entrada = document.getElementById('txtAreaEntrada');
    const salida = document.getElementById('txtAreaSalida');
    const LNEntrada = document.getElementById('lnEntrada');
    const LNSalida = document.getElementById('lnSalida');
    const BtnEjecutar = document.getElementById('analizaEntrada');

    if (!entrada || !salida || !LNEntrada || !LNSalida || !BtnEjecutar) {
        console.error("Faltan Elementos En EL DOM");
        return;
    }

    function ActualizarNumeroLinea(areaTexto, numerosLinea) {
        const lineas = areaTexto.value.split('\n').length;
        numerosLinea.innerHTML = Array.from({ length: lineas }, (_, i) => i + 1).join('<br>');
    }

    function sincronizarScroll(areaTexto, numerosLinea) {
        numerosLinea.scrollTop = areaTexto.scrollTop;
    }

    function manejarEntrada() {
        ActualizarNumeroLinea(entrada, LNEntrada);
        ActualizarNumeroLinea(salida, LNSalida);
    }

    function ejecutarCodigo() {
        const codigo = entrada.value;
        try {
            const sentencias = Parser(codigo);
            const interprete = new Interprete();
            console.log({ sentencias });
            sentencias.forEach(sentencia => sentencia.accept(interprete));
            salida.value = interprete.salida;
        } catch (error) {
            salida.value = "Error: " + error.message;
            console.error("Error Al Ejecutar:", error);
            UltimoAST = null;
        }
        ActualizarNumeroLinea(salida, LNSalida);
    }

    entrada.addEventListener('input', manejarEntrada);
    entrada.addEventListener('scroll', () => sincronizarScroll(entrada, LNEntrada));
    salida.addEventListener('scroll', () => sincronizarScroll(salida, LNSalida));
    BtnEjecutar.addEventListener('click', ejecutarCodigo);

    manejarEntrada();
}

export function obtenerAST() {
    return UltimoAST;
}

document.addEventListener("DOMContentLoaded", function() {
    FuncionInterprete();
    FuncionArchivo();
});
