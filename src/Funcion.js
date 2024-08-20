function AbrirArchivo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.oak';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('editor').value = event.target.result;
            ActualizarLinea();
        };
        reader.readAsText(file);
    };
    input.click();
}

function ActualizarLinea() {
    const editor = document.getElementById('editor');
    const lineNumbers = document.getElementById('line-numbers');
    const lines = editor.value.split('\n').length;
    lineNumbers.innerHTML = '';
    
    for (let i = 1; i <= lines; i++) {
        lineNumbers.innerHTML += i + '<br>';
    }
}

function SincronizarScroll() {
    const editor = document.getElementById('editor');
    const lineNumbers = document.getElementById('line-numbers');
    lineNumbers.scrollTop = editor.scrollTop;
}

document.addEventListener('DOMContentLoaded', () => {
    ActualizarLinea();
});