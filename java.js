document.addEventListener('DOMContentLoaded', function () {
    const csvFileInput = document.getElementById('csvFileInput');
    const tableContainer = document.getElementById('tableContainer');
    const viewButton = document.createElement('button');
    viewButton.addEventListener('click', handleView);

    csvFileInput.insertAdjacentElement('afterend', viewButton);

    function handleFile(event) {
        const file = event.target.files[0];

        if (file && file.type === 'text/csv') {
            const reader = new FileReader();

            reader.onload = function (e) {
                const csvData = e.target.result;
                const table = createTable(csvData);
                tableContainer.innerHTML = ''; // Limpa o conteúdo anterior
                tableContainer.appendChild(table);
            };

            reader.readAsText(file, 'UTF-8'); // Defini como utf-8 em ambos, mas mesmo assim não reconhece os caracteres especiais.
        } else {
            alert('Por favor, selecione um arquivo CSV.');
        }
    }

    function handleView() {
        const csvData = tableContainer.innerText;
        alert('Clique em escolher arquivo novamente para visualizar um novo arquivo!\n\n');
    
    }

    function createTable(csvData) {
        const table = document.createElement('table');
        const rows = csvData.split('\n').map(row => row.trim()); // Remove espaços em branco

        rows.forEach(rowData => {
            const row = document.createElement('tr');
            const columns = rowData.split(';').map(column => column.trim()); // Remove espaços em branco

            columns.forEach(columnData => {
                const cell = document.createElement('td');
                cell.textContent = columnData;
                row.appendChild(cell);
            });

            table.appendChild(row);
        });

        return table;
    }

    csvFileInput.addEventListener('change', handleFile);
});
