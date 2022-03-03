// Seleziono l'elemento HTML corrispondente al bottone play
const buttonPlay = document.getElementById('play');

// Seleziono l'elemento HTML all'interno del quale genererò la griglia
const areaGrid = document.getElementById('grid');

// Cosa succede se clicco sul bottone play?
// Eseguo una funzione che genera la griglia di gioco
buttonPlay.addEventListener('click', generateGrid);


// Scrivo la funzione che mi genera una griglia di N elementi, dove N dipende dalla difficoltà selezionata
function generateGrid() {
    // Se clicco 2 volte consecutive non voglio che mi generi 2 griglie, quindi ad ogni click prima ripulisco l'area
    areaGrid.innerHTML = '';

    // Creo un array vuoto che conterrà il valore di tutte le caselle
    let arrBoxes = [];

    // Genero un ciclo for che mi genera tante caselle in base alla difficoltà selezionata
    for (let numBox = 1; numBox <= functionDifficulty(); numBox++) {
        // Creo un nuovo div
        let box = document.createElement('button');
        // Attribuisco all'elemento box la classe box definita nel css
        box.classList.add('box');
        // Scrivo il numero della casella all'interno del box
        box.innerHTML = numBox;

        // TODO CLICK SU CASELLA
        box.addEventListener('click', changeColorBox);

        // Appendo i div creati all'interno dell'HTML
        areaGrid.append(box);

        /*
        Sezione di codice non più necessaria
        // Quanti box su ogni riga (voglio che la griglia sia un quadrato)
        if (functionDifficulty() == 100) {
            box.classList.add('box-10');
        } else if (functionDifficulty() == 81) {
            box.classList.add('box-9');
        } else if (functionDifficulty() == 49) {
            box.classList.add('box-7');
        }
        */

        // Calcolo del N. box per riga e grandezza dei box effettuato direttamente in JS senza bisogno di aggiungere ulteriori classi
        // N. box per riga
        let boxesPerRow = Math.sqrt(functionDifficulty());
        // Grandezza dei box implementando lo style direttamente in JS
        box.style.width = `calc(100% / ${boxesPerRow})`;
        box.style.height = `calc(100% / ${boxesPerRow})`;

        arrBoxes.push(parseInt(numBox));
        
    
    }
    console.log(arrBoxes);

// GENERATORE DI 5 NUMERI CASUALI: """""QUESTA PARTE ANCORA NON SERVE"""""
    // Creo un array, inizialmente vuoto per i numeri random da non cliccare
    const arrBombs = []

    // Riempio l'array con 5 numeri senza ripetizioni
    while (arrBombs.length < 5) {
        let randomBox = Math.floor(Math.random() * functionDifficulty() + 1);
        if (!arrBombs.includes(randomBox)) {
            arrBombs.push(randomBox);
        }
    }
    console.log(arrBombs);

}


/*
Da quante caselle deve essere composta la griglia?
Dipende dalla difficoltà selezionata:
Facile: 100 caselle (10 x 10)
Media: 81 caselle (9 x 9)
Difficile: 49 caselle (7 x 7)
*/
function functionDifficulty() {
    // Seleziono l'elemento HTML dove il giocatore sceglie la difficoltà
    let inputDifficulty = document.getElementById('difficulty');
    // Leggo la difficoltà selezionata dal giocatore
    let selectedDifficulty = inputDifficulty.value;
    if (selectedDifficulty == "facile") {
        return 100;
    } else if (selectedDifficulty == "media") {
        return 81;
    } else {
        return 49;
    }
}


function changeColorBox() {
    this.classList.add('box-clicked');
}