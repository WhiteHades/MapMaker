const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
            [0,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
            [0,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
            [0,0,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
            [0,0,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
            [0,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
            [0,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
            [1,0,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
            [1,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
            [1,1,1],
            [0,1,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
            [1,0,0],
            [1,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
            [1,1,1],
            [1,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
            [0,1,1],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
            [1,1,0],
            [0,0,0]],
        rotation: 0,
        mirrored: false
    },
]
const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const missionImages = {
    "Borderlands": "url('assets/missions_eng/Group 78.png')",
    "Edge of Forest": "url('assets/missions_eng/Group 69.png')",
    "Sleepy Valley": "url('assets/missions_eng/Group 74.png')",
    "Watering Potatoes": "url('assets/missions_eng/Group 70.png')",
    "Tree Line": "url('assets/missions_eng/Group 68.png')",
    "Watering Canal": "url('assets/missions_eng/Group 75.png')",
    "Wealthy Town": "url('assets/missions_eng/Group 71.png')",
    "Magicians Valley": "url('assets/missions_eng/Group 76.png')",
    "Empty Site": "url('assets/missions_eng/Group 77.png')",
    "Terraced House": "url('assets/missions_eng/Group 72.png')",
    "Odd Numbered Silos": "url('assets/missions_eng/Group 73.png')",
    "Rich Countryside": "url('assets/missions_eng/Group 79.png')",
};

let seasonCurrent = 0;
let seasonScores = {
    "Spring": { "mission1": 0, "mission2": 0 },
    "Summer": { "mission1": 0, "mission2": 0 },
    "Autumn": { "mission1": 0, "mission2": 0 },
    "Winter": { "mission1": 0, "mission2": 0 }
}
let seasonCurrentTime = 0;
let missionListConstant
const basicMission = ["Borderlands", "Edge of Forest","Sleepy Valley", "Watering Potatoes"];
const extraMission = ["Tree Line", "Watering Canal", "Wealthy Town", "Magicians Valley", "Empty Site", "Terraced House", "Odd Numbered Silos", "Rich Countryside"];

let elementCurrent;
let elementTimeRemaining = 28;
let highestMissionScores = {
    "A": 0,
    "B": 0,
    "C": 0,
    "D": 0
};
let missionA = 0;
let missionB = 0;
let missionC = 0;
let missionD = 0;

document.addEventListener('DOMContentLoaded', () => {
    //load();
    randomMission();
    initialiseGrid(document.querySelector('.grid'));
    updateSeasonDisplayCurrent();

    const restart = document.getElementById('gameRestart');
    const elementRotate = document.getElementById('rotate');
    const elementMirror = document.getElementById('mirror');
    elementCurrent = getRandomElement();

    elementDisplay(elementCurrent)

    missionListConstant = shuffleMissions().slice(0.4);
    updateMissionImages(missionListConstant);

    elementRotate.addEventListener('click', () => { elementRotation(elementCurrent); elementDisplay(elementCurrent); });

    elementMirror.addEventListener('click', () => { elementMirroring(elementCurrent); elementDisplay(elementCurrent); });

    restart.addEventListener('click', () => { location.reload(); });

    addGridEventListeners();
});

function addGridEventListeners() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseover', function() {
            //console.log('Cell hovered:', cell.dataset.row, cell.dataset.col);
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            let change = elementOffset(elementCurrent.shape);
            elementHighlight(elementCurrent, row - change.y, col - change.x);
        });

        cell.addEventListener('mouseout', function() {
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            elementHighlightRemove(elementCurrent, row, col);
        });

        cell.addEventListener('click', function() {
            // console.log('Cell clicked:', cell.dataset.row, cell.dataset.col);
            const row = parseInt(cell.dataset.row, 10);
            const col = parseInt(cell.dataset.col, 10);
            if (elementPlacementValid(elementCurrent, row, col)) {
                elementPlacement(elementCurrent, row, col);
                elementCurrent = getRandomElement(row, col);
                //console.log('elementCurrent after placement:', elementCurrent)
                elementDisplay(elementCurrent);
            }
        });
    });
}

function initialiseGrid(container) {
    const table = document.createElement('table');
    table.className = 'map-grid';

    for (let row = 0; row < 11; row++) {
        const tableRow = document.createElement('tr');
        for (let col = 0; col < 11; col++) {
            const cell = document.createElement('td');
            cell.className = 'grid-cell';

            // Assign a default cell background image (if any)
            cell.style.backgroundImage = 'url("assets/tiles/base_tile.png")';

            // Using dataset to store the row and column index for each cell
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            tableRow.appendChild(cell);
        } table.appendChild(tableRow);
    }
    //Place the mountains after the grid is created
    initialiseMoun(table);
    container.appendChild(table);
}

function initialiseMoun(table) {
    const mountainLocations = [
        { row: 2, col: 2 }, { row: 4, col: 9 },
        { row: 6, col: 4 }, { row: 9, col: 10 },
        { row: 10, col: 6 }
    ];

    mountainLocations.forEach(loc => {
        // The rows are 0-indexed, so subtract 1 from the given positions
        const cell = table.rows[loc.row - 1].cells[loc.col - 1];
        cell.style.backgroundImage = 'url("assets/tiles/mountain_tile.png")';
        cell.className += ' mountain';
    });
}

function getRandomElement() {
    return elements[Math.floor(Math.random() * elements.length)];
}

function elementImage(type) {
    switch (type) {
        case 'forest':
            return 'url("assets/tiles/forest_tile.png")';
        case 'farm':
            return 'url("assets/tiles/plains_tile.png")';
        case 'town':
            return 'url("assets/tiles/village_tile.png")';
        case 'water':
            return 'url("assets/tiles/water_tile.png")';
        default:
            return '';
    }
}

function elementDisplay(element) {
    const displayContainer = document.querySelector('.element-display');

    let elementContainer = displayContainer.querySelector('.element-container');
    if (!elementContainer) {
        elementContainer = document.createElement('div');
        elementContainer.className = 'element-container';
        displayContainer.appendChild(elementContainer);
    }
    else elementContainer.innerHTML = '';

    const table = document.createElement('table');

    // original place: element.shape.forEach(row => {...
    element.shape.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            if (cell === 1) {
                td.style.backgroundImage = elementImage(element.type);
                td.className = 'active-cell';
            } tr.appendChild(td);
        }); table.appendChild(tr);
    }); elementContainer.appendChild(table);

    // Update element time display
    const elementTime = document.getElementById('element-times');
    elementTime.textContent = element.time.toString();
}

function elementRotation(element) {
    element.shape = element.shape[0].map((_, colIndex) => element.shape.map(row => row[colIndex]) ).reverse();
}

function elementMirroring(element) {
    element.shape.forEach(row => row.reverse());
}

function elementPlacementValid(element, row, col) {
    //check if the element can be placed on the grid
    //console.log('Checking placement for element at row:', row, 'col:', col);
    if ( row < 0 || col < 0 || row + element.shape.length > 13 || col + element.shape[0].length > 13 ) {
        //console.log(`ElemRow: ${row + element.shape.length}, ElemCol: ${col + element.shape[0].length}`)
        return false;
    }

    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            if (element.shape[i][j] === 1) {
                const cell = document.querySelector(`.grid-cell[data-row="${row+i}"][data-col="${col+j}"]`);
                if (!cell || cell.classList.contains('mountain') || cell.classList.contains('occupied')) {
                    return false;
                }
            }
        }
    }
    // console.log('Placement is in bounds.');
    // console.log(`ElemRow: ${row + element.shape.length}, ElemCol: ${col + element.shape[0].length}`)
    return true;
}

function elementPlacement(element, row, col) {
    if (!elementPlacementValid(element, row, col)) return;

    elementTimeRemaining -= element.time;
    //console.log(`before: ${seasonCurrentTime}`);

    if(seasonCurrentTime === 7) { seasonCurrentTime = element.time ; seasonChange(); seasonEndScoring(); }
    // else if(seasonCurrentTime === 7) { seasonCurrentTime = ; seasonChange(); seasonEndScoring(); }
    else if (seasonCurrentTime + element.time > 7) { seasonCurrentTime = 1; seasonEndScoring(); seasonChange(); }
    else seasonCurrentTime += element.time;
    //if (seasonCurrentTime + element.time > 7) seasonCurrentTime = 7;
    // seasonCurrentTime += element.time;
    //console.log(`after: ${seasonCurrentTime}`);

    // updateSeasonDisplayCurrent();
    // updateTimeRemainingDisplay();

    //save();

    const totalTime = document.getElementById("season-time");
    totalTime.textContent = `Elapsed time total: ${28 - elementTimeRemaining} / 28`;
    const seasonTime = document.getElementById("season-time2");
    seasonTime.textContent = `Elapsed time season: ${seasonCurrentTime} / 7`;

    function elementPlacementAux(element, row, col){
        for (let i = 0; i < element.shape.length; i++) {
            for (let j = 0; j < element.shape[i].length; j++) {
                if (element.shape[i][j] === 1) {
                    const cell = document.querySelector(`.grid-cell[data-row="${row + i}"][data-col="${col + j}"]`);
                    if (cell) cell.style.backgroundImage = elementImage(element.type);
                    cell.classList.add('occupied');
                    cell.classList.add(element.type);
                }
            }
        }
    }

    elementPlacementAux(element, row, col);

    if(elementTimeRemaining <= 1 && element.time === 2) {
        elementTimeRemaining = 28;
        seasonCurrentTime = 0;
        elementPlacementAux(element, row, col);
        seasonEndScoring();
        calculateFinalScore();
        return;
    }

    updateSeasonDisplayCurrent();
    updateTimeRemainingDisplay();
}

function elementHighlight(element, row, col) {
    let change = elementOffset(element.shape);
    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            if (element.shape[i][j] === 1) {
                const cell = document.querySelector(`.grid-cell[data-row="${row+i+change.y}"][data-col="${col+j+change.x}"]`);
                if (cell && !cell.classList.contains('mountain') && !cell.classList.contains('occupied')) {
                    cell.classList.add('highlight');
                }
            }
        }
    }
}

function elementHighlightRemove(element, row, col) {
    for (let i = 0; i < element.shape.length; i++) {
        for (let j = 0; j < element.shape[i].length; j++) {
            const cell = document.querySelector(`.grid-cell[data-row="${row + i}"][data-col="${col + j}"]`);
            if (cell) cell.classList.remove('highlight');
        }
    }
}

function scoreGrid() {
    const grid = [];
    for (let row = 0; row < 11; row++) {
        const row2 = [];
        for (let col = 0; col < 11; col++) {
            const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
            if (cell.classList.contains('mountain')) {
                row2.push('mountain');
            } else if (cell.classList.contains('occupied')) {
                const type = ['forest', 'farm', 'town', 'water'].find(t => cell.classList.contains(t));
                row2.push(type);
            } else { row2.push('empty'); }
        } grid.push(row2);
    } return grid;
}

function scoreMission(mission) {
    switch (mission) {
        case "Borderlands": return scoreBorderlands();
        case "Edge of Forest": return scoreEdgeForest();
        case "Sleepy Valley": return scoreSleepyValle();
        case "Watering Potatoes": return scoreWateringPot();
        case "Tree Line": return scoreTreeLine();
        case "Watering Canal": return scoreWateringCanal();
        case "Wealthy Town": return scoreWealthyTown();
        case "Magicians Valley": return scoreMagiciansValley();
        case "Empty Site": return scoreEmptySite();
        case "Terraced House": return scoreTerracedHouse();
        case "Odd Numbered Silos": return scoreOddNumberedSilos();
        case "Rich Countryside": return scoreRichCountryside();
        default: return 0;
    }
}

function scoreBorderlands() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach(row => { if (row.every(cell => cell !== 'empty' && cell !== 'mountain')) { score += 6; } });
    for (let col=0; col<11; col++) {
        let all = true;
        for (let row=0; row<11; row++) { if (grid[row][col] === 'empty' || grid[row][col] === 'mountain') { all = false; break; } }
        if (all) score += 6;
    } return score;
}

function scoreEdgeForest() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach((row, i) => { row.forEach((cell, ii) => { if (cell === 'forest' && (i === 0 || i === 10 || ii === 0 || ii === 10)) score++; }); });
    return score;
}

function scoreSleepyValle() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach(row => { const forestCount = row.filter(cell => cell === 'forest').length; if (forestCount >= 3) score += 4; });
    return score;
}

function scoreWateringPot() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach((row, i) => { row.forEach((cell, ii) => { if (cell === 'water' && isAdjacent(grid, i, ii)) score += 2; }); });
    function isAdjacent(grid, row, col) {
        const adjacentPositions = [[row-1, col], [row+1, col], [row, col-1], [row, col+1]];
        return adjacentPositions.some(([a, b]) => grid[a] && grid[a][b] === 'farm');
    } return score;
}

function scoreTreeLine() {
    const grid = scoreGrid();
    let score = 0;

    grid[0].forEach((_, col) => {
        let curr = 0;
        let max = 0;
        grid.forEach(row => { if (row[col] === 'forest') { curr++; max = Math.max(max, curr); } else curr = 0; });
        score = Math.max(score, max);
    }); return score * 2;
}

function scoreWateringCanal() {
    const grid = scoreGrid();
    let score = 0;

    grid[0].forEach((_, col) => {
        let count = 0;
        let count2 = 0;
        grid.forEach(row => { if (row[col] === 'farm') count++; if (row[col] === 'water') count2++; });
        if (count === count2 && count > 0) score += 4;
    }); return score;
}

function scoreWealthyTown() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach((row, i) => {
        row.forEach((cell, ii) => { if (cell === 'town' && isAdjacent(grid, i, ii)) score += 3; });
    }); return score;

    function isAdjacent(grid, row, col) {
        const ways = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        const types = new Set();

        ways.forEach(([a, b]) => {
            const ai = row + a; const bi = col + b;
            if (ai>=0 && ai<grid.length && bi>=0 && bi<grid[0].length) types.add(grid[ai][bi]);
        }); return types.size >= 3;
    }
}

function scoreMagiciansValley() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach((row, i) => { row.forEach((cell, ii) => { if (cell === 'water') { if (isAdjacent(grid, i, ii)) score += 3; } }); });
    return score;

    function isAdjacent(grid, row, col) {
        const adjacent = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return adjacent.some(change => {
            const [rowChange, colChange] = change;
            const adRow = row + rowChange;
            const adCol = col + colChange;
            return grid[adRow][adCol] === 'mountain';
        });
    }
}

function scoreEmptySite() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach((row, i) => { row.forEach((cell, ii) => { if (cell === 'empty' && isAdjacent(grid, i, ii)) score += 2; }); });
    return score;

    function isAdjacent(grid, row, col) {
        const ways = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        return ways.some(([a, b]) => {
            const row2 = row + a;
            const col2 = col + b;
            return row2 >= 0 && row2 < grid.length && col2 >= 0 && col2 < grid[0].length && grid[row2][col2] === 'village';
        });
    }
}

function scoreTerracedHouse() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach(row => {
        let length = 0;
        row.forEach(cell => { if (cell === 'town') { length++; score = Math.max(score, length); } else length = 0; });
    }); return score * 2;
}

function scoreOddNumberedSilos() {
    const grid = scoreGrid();
    let score = 0;

    for (let col=0; col<grid[0].length; col++) { if (isComplete(grid, col) && col%2 === 0) score += 10; }
    return score;

    function isComplete(grid, col) {
        let complete = true;
        grid.forEach(row => { if (row[col] === 'empty' || row[col] === 'mountain') complete = false; });
        return complete;
    }
}

function scoreRichCountryside() {
    const grid = scoreGrid();
    let score = 0;

    grid.forEach(row => { const type = new Set(row); if (type.size>=5) score += 4; });
    return score;
}

function seasonChange() {
    console.log(`scores before season change: ${missionA}, ${missionB}, ${missionC}, ${missionD}`)
    //console.log("Starting seasonChange - Current season: ", seasons[seasonCurrent]);
    //console.log("Before season change:", JSON.stringify(seasonScores));
    seasonCurrent = (seasonCurrent + 1) % seasons.length;
    //console.log("After updating season - New season: ", seasons[seasonCurrent]);
    //seasonCurrentTime = 0;

    updateTimeRemainingDisplay();
    updateSeasonDisplay();
    updateMissionImages(missionListConstant);
    updateMissionScores();
    updateMissionScoresDisplay();
    //save();
    //console.log("After season change:", JSON.stringify(seasonScores));
    console.log(`scores after season change: ${missionA}, ${missionB}, ${missionC}, ${missionD}`)
}

function seasonEndScoring() {
    //console.log("Before scoring:", JSON.stringify(seasonScores));
    const currentSeason = seasons[seasonCurrent];
    const currentSeasonMissions = {
        "Spring": [missionListConstant[0], missionListConstant[1]],
        "Summer": [missionListConstant[1], missionListConstant[2]],
        "Autumn": [missionListConstant[2], missionListConstant[3]],
        "Winter": [missionListConstant[3], missionListConstant[0]]
    }[currentSeason];

    seasonScores[currentSeason].mission1 = scoreMission(currentSeasonMissions[0]);
    seasonScores[currentSeason].mission2 = scoreMission(currentSeasonMissions[1]);


    updateSeasonDisplay();
    //updateTimeRemainingDisplay()
    updateCurrentScoreDisplay();
    updateMissionScores()
    updateMissionScoresHighest();
    updateMissionScoresDisplay()
    updateMissionImages(currentSeasonMissions);
    seasonTotalPoints();
    //if (currentSeason === "Winter") calculateFinalScore();
}

function seasonTotalPoints() {
    const total = document.querySelector(".total-points")
    let totalPoints = calculateCurrentScore();
    total.textContent = `Total Season Points: ${totalPoints}`;
}

function updateSeasonDisplay() {
    seasons.forEach(season => {
        const springDiv = document.getElementById('Spring');
        const summerDiv = document.getElementById('Summer');
        const autumnDiv = document.getElementById('Autumn');
        const winterDiv = document.getElementById('Winter');
        const score = seasonScores[season].mission1 + seasonScores[season].mission2;

        switch (season) {
            case 'Spring':
                springDiv.innerHTML = `Spring: <span>${score} points</span>`; break;
            case 'Summer':
                summerDiv.innerHTML = `Summer: <span>${score} points</span>`; break;
            case 'Autumn':
                autumnDiv.innerHTML = `Autumn: <span>${score} points</span>`; break;
            case 'Winter':
                winterDiv.innerHTML = `Winter: <span>${score} points</span>`; break;
            default:
                return '';
        }
    });
}

function updateSeasonDisplayCurrent() {
    const currentSeasonDisplay = document.getElementById('Current');
    //console.log("Updating season display - Current season: ", seasons[seasonCurrent]);
    switch (seasons[seasonCurrent]) {
        case 'Spring':
            currentSeasonDisplay.textContent = `Current Season: ${seasons[seasonCurrent]} AB`; break;
        case 'Summer':
            currentSeasonDisplay.textContent = `Current Season: ${seasons[seasonCurrent]} BC`; break;
        case 'Autumn':
            currentSeasonDisplay.textContent = `Current Season: ${seasons[seasonCurrent]} CD`; break;
        case 'Winter':
            currentSeasonDisplay.textContent = `Current Season: ${seasons[seasonCurrent]} DA`; break;
        default:
            return '';
    }
}

function updateTimeRemainingDisplay() {
    const timeRemainingElement = document.getElementById('season-time');
    timeRemainingElement.textContent = `Elapsed time total: ${28 - elementTimeRemaining} / 28`;
}

function updateCurrentScoreDisplay() {
    const currentScoreElement = document.getElementById('season-time2');
    let currentScore = calculateCurrentScore();
    currentScoreElement.textContent = `Elapsed time season: ${seasonCurrentTime} / 7`;
}

function updateMissionImages(currentMissions) {
    ['A', 'B', 'C', 'D'].forEach((divId, index) => {
        let missionName = currentMissions[index];
        let image = missionImages[missionName];
        if(image) {
            document.getElementById(divId).style.backgroundImage = image;
            if (seasons[seasonCurrent] === 'Spring' && (index === 0 || index === 1)) {
                document.getElementById(divId).classList.add('mission-highlight');
            } else if (seasons[seasonCurrent] === 'Summer' && (index === 1 || index === 2)) {
                document.getElementById(divId).classList.add('mission-highlight');
            } else if (seasons[seasonCurrent] === 'Autumn' && (index === 2 || index === 3)) {
                document.getElementById(divId).classList.add('mission-highlight');
            } else if (seasons[seasonCurrent] === 'Winter' && (index === 3 || index === 0)) {
                document.getElementById(divId).classList.add('mission-highlight');
            } else {
                document.getElementById(divId).classList.remove('mission-highlight');
            }
        } //console.log(`Mission ${missionName} with image ${image}`);
    });
}

function updateMissionScores() {
    missionA = 0;
    missionB = 0;
    missionC = 0;
    missionD = 0;
    switch(seasonCurrent) {
        case 1:
            missionA += seasonScores.Spring.mission1;
            missionB += seasonScores.Spring.mission2; break;
        case 2:
            missionB += seasonScores.Summer.mission1;
            missionC += seasonScores.Summer.mission2; break;
        case 3:
            missionC += seasonScores.Autumn.mission1;
            missionD += seasonScores.Autumn.mission2; break;
        case 4:
            missionD += seasonScores.Winter.mission1;
            missionA += seasonScores.Winter.mission2; break;
    }
    //console.log(`A: ${missionA}, B: ${missionB}, C: ${missionC}, D: ${missionD}`);
}

function updateMissionScoresHighest() {
    const currentSeason = seasons[seasonCurrent];
    const missionNameABCD = {};
    missionListConstant.forEach((mission, i) => { missionNameABCD[mission] = String.fromCharCode(65+i); })

    const currentSeasonMissions = {
        "Spring": [0, 1],
        "Summer": [1, 2],
        "Autumn": [2, 3],
        "Winter": [3, 0]
    }[currentSeason];

    currentSeasonMissions.forEach(i => {
        const missionName = missionListConstant[i];
        const missionABCD = missionNameABCD[missionName];
        const currentScore = scoreMission(missionName);
        if (currentScore > highestMissionScores[missionABCD]) { highestMissionScores[missionABCD] = currentScore; }
    });
}

function updateMissionScoresDisplay(){
    for (const missionName in highestMissionScores) {
        const missionElementID = `${missionName}i`;
        const missionElement = document.getElementById(missionElementID);
        if (missionElement) { missionElement.textContent = `${highestMissionScores[missionName]} points`; }
    }
}

function calculateFinalScore() {
    let finalOne = 0;
    let final = '';

    for (let season in seasonScores) {
        const seasonScore = seasonScores[season].mission1 + seasonScores[season].mission2;
        finalOne += seasonScore;
        final += `${season}: ${seasonScore} points\n`;
    }

    final += `\nMission Scores:\n`;
    for (let mission in highestMissionScores) { final += `${mission}: ${highestMissionScores[mission]} points\n`; }

    final += `Total score: ${finalOne}`;
    alert(final);
    seasonTotalPoints();

    restart();
}

function calculateCurrentScore() {
    let totalScore = 0;
    for (const season in seasonScores) { totalScore += seasonScores[season].mission1 + seasonScores[season].mission2; }
    return totalScore;
}

function elementOffset(shape) {
    let x = 0, y = 0;
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) { if (shape[i][j] === 1) { x = Math.min(x, j); y = Math.min(y, i); } }
    } return { x: -x, y: -y };
}

function shuffleMissions() {
    for (let i= missionListConstant.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [missionListConstant[i], missionListConstant[j]] = [missionListConstant[j], missionListConstant[i]];
    } return missionListConstant;
}

function restart() {
    setTimeout(function() { location.reload(); }, 1500);
}

// function save() {
//     const game = {
//         seasonCurrent,
//         seasonScores,
//         seasonCurrentTime,
//         missionListConstant,
//         elementTimeRemaining,
//         highestMissionScores,
//     }; localStorage.setItem('game', JSON.stringify(game));
// }
//
// function load() {
//     const savedState = localStorage.getItem('gameState');
//     if (savedState) {
//         const gameState = JSON.parse(savedState);
//         seasonCurrent = gameState.seasonCurrent;
//         seasonScores = gameState.seasonScores;
//         seasonCurrentTime = gameState.seasonCurrentTime;
//         missionListConstant = gameState.missionListConstant;
//         elementTimeRemaining = gameState.elementTimeRemaining;
//         highestMissionScores = gameState.highestMissionScores;
//
//         updateSeasonDisplayCurrent();
//         updateTimeRemainingDisplay();
//         updateMissionImages(missionListConstant);
//         updateSeasonDisplay();
//         updateCurrentScoreDisplay();
//         updateMissionScoresDisplay();
//
//         if (elementCurrent) { elementDisplay(elementCurrent); }
//     }
//     console.log('Game Saved');
// }

function randomMission() {
    let randomNum = Math.floor(Math.random() * 2) + 1;
    if(randomNum === 1) missionListConstant = basicMission;
    else missionListConstant = extraMission;
}