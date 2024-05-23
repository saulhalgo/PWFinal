
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

let csvData = [];
let csvFileName = "";

function readCSV() {
    const input = document.getElementById('csvFileInput');
    if (!input.files.length) {
        alert('Por favor, selecciona un archivo CSV.');
        return;
    }
    const file = input.files[0];
    csvFileName = file.name;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        csvData = content.split('\n').map(row => row.split(','));
        document.getElementById('csvContent').textContent = content;
    };
    reader.readAsText(file);
}


function insertRow() {
    const newRow = document.getElementById('newRow').value;
    if (newRow.trim() === "") {
        alert('Por favor, ingresa datos para insertar.');
        return;
    }
    csvData.push(newRow.split(','));
    updateCSVContent();
}


function deleteRow() {
    const rowToDelete = document.getElementById('deleteRow').value;
    if (rowToDelete.trim() === "") {
        alert('Por favor, ingresa el contenido de la fila a borrar.');
        return;
    }
    const rowToDeleteArray = rowToDelete.split(',');
    csvData = csvData.filter(row => JSON.stringify(row) !== JSON.stringify(rowToDeleteArray));
    updateCSVContent();
}


function updateCSVContent() {
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    document.getElementById('csvContent').textContent = csvContent;
    document.getElementById('insertResult').textContent = 'Datos insertados correctamente.';
    document.getElementById('deleteResult').textContent = 'Datos borrados correctamente.';
}


function downloadCSV() {
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', csvFileName || 'archivo_modificado.csv');
    a.click();
}

document.body.insertAdjacentHTML('beforeend', '<button id="boton" onclick="downloadCSV()">Descargar CSV Modificado</button>');
