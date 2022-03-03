// Seleziono l'elemento HTML corrispondente al bottone play
const buttonPlay = document.getElementById('play');

// Seleziono l'elemento HTML all'interno del quale genererò la griglia
const areaGrid = document.getElementById('grid');

// Seleziono l'elemento HTML dove stampo il risultato
const outputMessage = document.getElementById('result');

// Creo un array vuoto delle caselle cliccate
let selectedBoxes = [];

// Numero di bombe nel gioco
let nBombs = 16;

// Cosa succede se clicco sul bottone play?
// Eseguo una funzione che genera la griglia di gioco
buttonPlay.addEventListener('click', playGame);


// Scrivo la funzione che mi genera una griglia di N elementi, dove N dipende dalla difficoltà selezionata
function playGame() {
    // Se clicco 2 volte consecutive non voglio che mi generi 2 griglie, quindi ad ogni click prima ripulisco l'area
    areaGrid.innerHTML = '';
    
    // Ripulisco il messaggio con il risultato
    outputMessage.innerHTML = '';

    // Ripulisco l'array delle caselle cliccate nei precedenti giochi
    selectedBoxes = [];

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

        // Leggo il numero della casella cliccata e verifico se è una bomba
        let selectedBox = box.addEventListener('click', isBomb);
    }

    // GENERATORE DI "nBombs" NUMERI CASUALI (BOMBE)
    // Creo un array, inizialmente vuoto per i numeri random da non cliccare
    const arrBombs = []

    // Riempio l'array con nBombs numeri senza ripetizioni
    while (arrBombs.length < nBombs) {
    let randomBox = parseInt(Math.floor(Math.random() * functionDifficulty() + 1));
    if (!arrBombs.includes(randomBox)) {
        arrBombs.push(randomBox);
        }
    }     

    // Test: stampo l'array delle bombe in console per testare il funzionamento
    // console.log(arrBombs);
    
    // Seleziono tutte le caselle della griglia
    let gridBoxes = [...document.querySelectorAll('button.box')];
    // Creo un array vuoto
    let arrGridBoxesContent = []
    // E lo riempio con i valori contenuti nelle singole caselle
    for (let numGridBox = 0; numGridBox < gridBoxes.length; numGridBox++) {
        arrGridBoxesContent.push(parseInt(gridBoxes[numGridBox].textContent));
    }
    // test
    // console.log(arrGridBoxesContent);

    // Funzione per verificare se la casella selezionata è una bomba
    function isBomb() {
        

        if (arrBombs.includes(parseInt(this.textContent))){
            // if true, applico la classe box-bomb (sfondo rosso) alla casella
            this.classList.add('box-bomb');
            // esce il messaggio di errore
            outputMessage.innerHTML = `Hai perso :-( Il tuo punteggio di sopravvivenza è ${selectedBoxes.length}. Prova ancora!`;
            for (let i = 0; i < gridBoxes.length; i++) {
                // Elimino la visualizzazione del puntatore del mouse all'interno della griglia
                gridBoxes[i].classList.add('box-no-pointer');
                // Rimuovo l'evento che permette di cliccare sulle caselle
                gridBoxes[i].removeEventListener('click', isBomb);
            }

            // Applico la visualizzazione di tutte le bombe
            for (let numGridBox = 0; numGridBox < gridBoxes.length; numGridBox++) {
                if (arrBombs.includes(arrGridBoxesContent[numGridBox])) {
                    gridBoxes[numGridBox].classList.add('box-bomb');
                } else { // e coloro anche la visualizzazione delle caselle safe
                    gridBoxes[numGridBox].classList.add('box-safe');
                }
            }

        } else if (selectedBoxes.length == gridBoxes.length - arrBombs.length - 1) {
            // esce il messaggio di vittoria
            outputMessage.innerHTML = `Hai completato la griglia! Il tuo punteggio di sopravvivenza è ${selectedBoxes.length}.`;
            
            for (let i = 0; i < gridBoxes.length; i++) {
                // Elimino la visualizzazione del puntatore del mouse all'interno della griglia
                gridBoxes[i].classList.add('box-no-pointer');
                // Rimuovo l'evento che permette di cliccare sulle caselle
                gridBoxes[i].removeEventListener('click', isBomb);
            }

            // Applico uno sfondo verde a tutte le caselle
            for (let numGridBox = 0; numGridBox < gridBoxes.length; numGridBox++) {
                gridBoxes[numGridBox].classList.add('box-win');
            }

        } else { // altrimenti
            // applico la classe box-safe (sfondo azzurro) alla casella
            this.classList.add('box-safe');
            // aggiungo la casella selezionata all'array delle caselle selezionate controllando che il giocatore non abbia cliccato 2 volte sulla stessa casella
            if (!selectedBoxes.includes(parseInt(this.textContent))) {
            selectedBoxes.push(parseInt(this.textContent));
            }
        }
    }
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