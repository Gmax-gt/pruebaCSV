// script.js
const app = document.getElementById('app');

// Leer el archivo CSV
fetch('Libro1.csv')
    .then(response => response.text())
    .then(data => {
        // Procesar los datos
        const rows = data.trim().split('\n');
        const headers = rows[0].split(',');

        // Mostrar los nombres de las columnas en la consola
        console.log('Headers:', headers);

        const dataArray = rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((obj, key, index) => ({ ...obj, [key.trim()]: values[index].trim() }), {});
        });

        // Mostrar los datos procesados en la consola
        console.log('Data Array:', dataArray);

        // Mostrar los datos en la página web
        dataArray.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `<p>Nombre: ${item.nombre}</p><p>Edad: ${item.edad}</p><p>Ciudad: ${item.ciudad}</p>`;
            app.appendChild(div);
        });
    })
    .catch(error => console.error('Error al leer el archivo CSV:', error));
