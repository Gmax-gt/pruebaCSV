// script.js
const app = document.getElementById('app');

// Leer el archivo CSV
fetch('Libro1.csv')
    .then(response => response.text())
    .then(data => {
        // Procesar los datos
        const rows = data.trim().split('\n');
        const headers = rows[0].split(',');
        const dataArray = rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
        });

        // Mostrar los datos en la página web
        dataArray.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<p>${item.nombre}</p><p>${item.edad}</p>`; // Ejemplo de cómo mostrar datos
            app.appendChild(div);
        });
    })
    .catch(error => console.error('Error al leer el archivo CSV:', error));
