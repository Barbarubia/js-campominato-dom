// Seleziono l'elemento HTML corrispondente al bottone play
const buttonPlay = document.getElementById('play');

// Seleziono l'elemento HTML all'interno del quale genererò la griglia
const areaGrid = document.getElementById('grid');

// Cosa succede se clicco sul bottone play?
// Eseguo una funzione che genera la griglia di gioco
buttonPlay.addEventListener('click', playGame);


// Scrivo la funzione che mi genera una griglia di N elementi, dove N dipende dalla difficoltà selezionata
function playGame() {
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

        // Appendo i div creati all'interno dell'HTML
        areaGrid.append(box);

        // Calcolo del N. box per riga e grandezza dei box effettuato direttamente in JS senza bisogno di aggiungere ulteriori classi
        // N. box per riga
        let boxesPerRow = Math.sqrt(functionDifficulty());
        // Grandezza dei box implementando lo style direttamente in JS
        box.style.width = `calc(100% / ${boxesPerRow})`;
        box.style.height = `calc(100% / ${boxesPerRow})`;

        // Riempio l'array con i valori numerici di tutte le caselle
        arrBoxes.push(parseInt(numBox));


        // GENERATORE DI 16 NUMERI CASUALI
        function bombsGenerator(){
            // Creo un array, inizialmente vuoto per i numeri random da non cliccare
            const arrBombs = []

            // Riempio l'array con 16 numeri senza ripetizioni
            while (arrBombs.length < 16) {
                let randomBox = Math.floor(Math.random() * functionDifficulty() + 1);
                if (!arrBombs.includes(randomBox)) {
                    arrBombs.push(randomBox);
                }
            }
            return arrBombs;
        }

        // Seleziono una casella facendole cambiare colore
        let selectedBox = box.addEventListener('click', selectBox);

        // Creo un array delle caselle selezionate, inizialmente vuoto
        let arraySelectedBoxes = [];

        // // Aggiungo all'array il valore delle caselle selezionate
        // COME PESCO QUEL VALORE????
        // arraySelectedBoxes.push()



    }


    

console.log(bombsGenerator());
    
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

// Funzione per cambiare colore alle celle selezionate
function selectBox() {
    this.classList.add('box-clicked');
    console.log(this);
    // vorrei pescare solo il numero contenuto dentro a this
}

// GENERATORE DI 16 NUMERI CASUALI
function bombsGenerator(){
    // Creo un array, inizialmente vuoto per i numeri random da non cliccare
    const arrBombs = []

    // Riempio l'array con 16 numeri senza ripetizioni
    while (arrBombs.length < 16) {
        let randomBox = Math.floor(Math.random() * functionDifficulty() + 1);
        if (!arrBombs.includes(randomBox)) {
            arrBombs.push(randomBox);
        }
    }
    return arrBombs;
}
        
        