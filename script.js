// Premi divisi in due categorie
const highPrizes = ["Gratta e Vinci", "25€", "50€", "75€", "100€"]; // Premi maggiori dal più scarso
const lowPrizes = ["du café", "du fell d pan", "du fell d prsutt", "du mustacciuol", "du turrun"]; // Premi minori dal più scarso

// Elementi del DOM
const leftContainer = document.getElementById("left-container");
const rightContainer = document.getElementById("right-container");
const resultDiv = document.getElementById("result");
const remainingPrizesList = document.getElementById("remaining-prizes");
const fullscreenPrize = document.getElementById("fullscreen-prize");

// Combina tutti i premi per gestire i rimanenti
let remainingPrizes = [...highPrizes, ...lowPrizes];

// Funzione per aggiornare la lista dei premi rimasti
function updateRemainingPrizes() {
  remainingPrizesList.innerHTML = "";
  remainingPrizes.sort((a, b) => a - b); // Ordina per valore
  remainingPrizes.forEach(prize => {
    const listItem = document.createElement("li");
    listItem.textContent = `${prize}`;
    remainingPrizesList.appendChild(listItem);
  });
}

// Funzione per gestire l'animazione dei premi rossi
function showFullscreenPrize(value) {
  fullscreenPrize.textContent = `${value}`;
  fullscreenPrize.classList.remove("fullscreen-hidden");
  fullscreenPrize.classList.add("fullscreen");

  // Nasconde l'animazione dopo 1 secondo
  setTimeout(() => {
    fullscreenPrize.classList.remove("fullscreen");
    fullscreenPrize.classList.add("fullscreen-hidden");
  }, 2000);
}

// Funzione per creare i pacchi
function createBox(value, container, colorClass) {
  const box = document.createElement("div");
  box.classList.add("box", colorClass);
  box.textContent = `${value}`; // Mostra il premio
  box.dataset.prize = value;

  // Evento al click
  box.addEventListener("click", function () {
    // Mostra il risultato
    // resultDiv.textContent = `Hai trovato: "${value}"!`;

    // Rimuovi il premio dai rimanenti
    remainingPrizes = remainingPrizes.filter(prize => prize != value);
    updateRemainingPrizes();

    // Animazione
    showFullscreenPrize(value);

    // Distruggi il pacco cliccato
    setTimeout(() => box.remove(), 2000); // Attende la fine dell'animazione per i rossi
  });

  container.appendChild(box);
}

// Crea i pacchi per la sinistra (blu - piccoli premi)
lowPrizes.forEach(prize => createBox(prize, leftContainer, "blue"));

// Crea i pacchi per la destra (rossi - grandi premi)
highPrizes.forEach(prize => createBox(prize, rightContainer, "red"));

// Inizializza lista dei premi rimasti
updateRemainingPrizes();
