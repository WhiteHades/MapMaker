document.addEventListener('DOMContentLoaded', () => {
    initializeGrid();
});

function initializeGrid() {
    const table = document.createElement('table');
    table.className = 'map-grid';

    for (let row = 0; row < 11; row++) {
        const tableRow = document.createElement('tr');
        for (let col = 0; col < 11; col++) {
            const cell = document.createElement('td');
            cell.className = 'grid-cell';
            
            // Assign a default cell background image (if any)
            cell.style.backgroundImage = 'url("assets/tiles/default_cell.png")';

            // Using dataset to store the row and column index for each cell
            cell.dataset.row = row;
            cell.dataset.col = col;

            tableRow.appendChild(cell);
        }
        table.appendChild(tableRow);
    }

    // Place the mountains after the grid is created
    placeMountains(table);

    // Append the table directly to the document's body or a specific container
    document.body.appendChild(table);
}

function placeMountains(table) {
    const mountainLocations = [
        { row: 1, col: 1 }, { row: 3, col: 8 },
        { row: 5, col: 3 }, { row: 8, col: 9 },
        { row: 9, col: 5 }
    ];

    mountainLocations.forEach(loc => {
        // The rows are 0-indexed, so subtract 1 from the given positions
        const cell = table.rows[loc.row - 1].cells[loc.col - 1];
        cell.style.backgroundImage = 'url("assets/tiles/mountain.png")';
        cell.className += ' mountain';
    });
}