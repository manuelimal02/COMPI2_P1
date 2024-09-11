let UltimoAST = null;
let TablaDeSimbolosGeneral = [];
let ListaErrores = []; 
import { parse } from '../Interprete/Analizador/Parser.js';
import { Interprete } from '../Interprete/Analizador/InterpreteV.js';

export function FuncionArchivo() {
    const entrada = document.getElementById('txtAreaEntrada');
    const salida = document.getElementById('txtAreaSalida');
    const fileInput = document.getElementById('fileInput');
    const AbrirArchivo = document.getElementById('AbrirArchivo');
    const CrearArchivo = document.getElementById('CrearArchivo');
    const GuardarArchivo = document.getElementById('GuardarArchivo');
    const TablaSimbolos = document.getElementById('TablaSimbolos');
    const TablaErrores = document.getElementById('TablaErrores');

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
            const debeGuardar = confirm("¿Desea Crear Un Archivo Con El Contenido Actual?");
            if (debeGuardar) {
                const nombreArchivo = prompt("Ingrese Nombre De Archivo .OAK", "CrearArchivo.oak");
                if (nombreArchivo) {
                    ContenidoArchivo(entrada.value, nombreArchivo);
                }
            }
        }else{
            alert("No Hay Contenido Para Crear.");
        }
        entrada.value = "";
        salida.value = "";
        ActualizarNumeroLinea(entrada, document.getElementById('lnEntrada'));
        ActualizarNumeroLinea(salida, document.getElementById('lnSalida'));
    }

    async function handleGuardarArchivo() {
        try {
            const options = {
                types: [{
                    description: 'Archivo OakLang',
                    accept: { 'text/plain': ['.oak'] }
                }],
                suggestedName: 'GuardarArchivo.oak'
            };
            const archivoHandler = await window.showSaveFilePicker(options);
            const stream = await archivoHandler.createWritable();
            await stream.write(entrada.value);
            await stream.close();
    
            alert('Archivo Guardado Exitosamente.');
        } catch (error) {
            console.error('Error Al Guardar El Archivo:', error);
        }
    }

    function ActualizarNumeroLinea(areaTexto, numerosLinea) {
        const lineas = areaTexto.value.split('\n').length;
        numerosLinea.innerHTML = Array.from({ length: lineas }, (_, i) => i + 1).join('<br>');
    }

    function TablaSimbolosHTML() {
        if (TablaDeSimbolosGeneral.length === 0) {
            alert('Debe Ejecutar Un Archivo De Entrada.');
            return;
        }
        let contenidoHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tabla De Símbolos</title>
            <style>
                body {
                    font-family: 'Courier New', Courier, monospace;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    background-color: #f0f0f0;
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Tabla De Símbolos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Fila</th>
                        <th>Columna</th>
                        <th>Ambito</th>
                    </tr>
                </thead>
                <tbody>
        `;
        TablaDeSimbolosGeneral.forEach(simbolo => {
            contenidoHTML += `
            <tr>
                <td>${simbolo.nombre}</td>
                <td>${simbolo.tipo}</td>
                <td>${simbolo.valor}</td>
                <td>${simbolo.linea}</td>
                <td>${simbolo.columna}</td>
                <td>${simbolo.ambito}</td>
            </tr>
            `;
        });
        contenidoHTML += `
            </tbody>
            </table>
        <h3>Carlos Manuel Lima y Lima - 202201524 - Tabla De Simbolos - Proyecto 1 - OLC2</h3>
        </body>
        </html>
        `;
        const blob = new Blob([contenidoHTML], { type: 'text/html' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "TablaDeSimbolos.html";
        enlace.click(); 
    }

    function TablaDeErroresHTML() {
        if (ListaErrores.length === 0) {
            alert('No Hay Errores Para Mostrar.');
            return;
        }
        let contenidoHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reporte de Errores</title>
            <style>
                body {
                    font-family: 'Courier New', Courier, monospace;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    background-color: #f0f0f0;
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Reporte de Errores</h1>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Descripción</th>
                        <th>Linea</th>
                        <th>Columna</th>
                        <th>Ambito</th>
                    </tr>
                </thead>
                <tbody>
        `;
        ListaErrores.forEach((error, index) => {
            contenidoHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${error.descripcion}</td>
                <td>${error.linea}</td>
                <td>${error.columna}</td>
                <td>Global</td>
            </tr>
            `;
        });
        contenidoHTML += `
            </tbody>
            </table>
        <h3>Carlos Manuel Lima y Lima - 202201524 - Reporte de Errores - Proyecto 1 - OLC2</h3>
        </body>
        </html>
        `;
        const blob = new Blob([contenidoHTML], { type: 'text/html' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "ReporteDeErrores.html";
        enlace.click();
    }


    AbrirArchivo.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', FuncionAbrirArchivo);

    CrearArchivo.addEventListener('click', () => {
        handleNuevoArchivo();
    });

    GuardarArchivo.addEventListener('click', () => {
        handleGuardarArchivo();
    });

    TablaSimbolos.addEventListener('click', () => {
        TablaSimbolosHTML();
    });

    TablaErrores.addEventListener('click', () => {
        TablaDeErroresHTML();
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
        const interprete = new Interprete();
        let sentencias;
        ListaErrores = [];
        TablaDeSimbolosGeneral = [];
    
        try {
            sentencias = parse(codigo);
        } catch (error) {
            console.log("-----------------------");
            console.log(error);
            console.log("-----------------------");
            const { line: linea, column: columna } = error.location.start;
            ListaErrores.push({
                descripcion: error.message,
                linea: linea,
                columna: columna,
            });
            return;
        }
        sentencias.forEach(sentencia => {
            try {
                sentencia.accept(interprete);
            } catch (error) {
                console.log("-----------------------");
                console.log(error);
                console.log("-----------------------");
                const { line: linea, column: columna } = sentencia.location.start;
                ListaErrores.push({
                    descripcion: error.message,
                    linea: linea,
                    columna: columna,
                });
            }
        });
        salida.value = interprete.salida;
        ActualizarNumeroLinea(salida, LNSalida);
        TablaDeSimbolosGeneral = interprete.entornoActual.RetornarEntorno();
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