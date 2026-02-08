// --- BAZA CZYTELNIKÓW (6-cyfrowe kody) ---
const users = [
    { id: "100100", name: "Jan Kowalski" },
    { id: "200200", name: "Anna Nowak" },
    { id: "300300", name: "Marek Woźniak" }
];

// --- BAZA KSIĄŻEK I DOKUMENTÓW (4-cyfrowe kody) ---
const books = [
    { id: "1001", title: "Moje Szczesliwe Malzeństwo cz. 1" },
    { id: "1002", title: "Moje Szczesliwe Malzeństwo cz. 2" },
    { id: "1003", title: "Moje Szczesliwe Malzeństwo cz. 3" },
    { id: "1004", title: "Five nights at Freddy's - Oficialna ksiazka filmowa" },
    { id: "1005", title: "Letni Wyskok - ksiazka dla dzieci" },
    { id: "1006", title: "Five nights at Freddy's - Opowiesci komiksowe cz. 1" },
    { id: "1007", title: "Five nights at Freddy's - Opowiesci komiksowe cz. 2" },
    { id: "1008", title: "Biedronka i Czarny Kot cz. 1" },
    { id: "1009", title: "Biedronka i Czarny Kot cz. 2" },
    { id: "1010", title: "Biedronka i Czarny Kot cz. 3" },
    { id: "1011", title: "Kenmono Jihen cz. 1" },
    { id: "1012", title: "Czeka cie Smierc" },
    { id: "1013", title: "Five nights at Freddy's - W pulapce cz. 1" },
    { id: "1014", title: "Five nights at Freddy's - Aport cz. 2" },
    { id: "1015", title: "Minecraft - Proba Sil" },
    { id: "1016", title: "Prawo Marcina - Znaj swoje prawa w szkole" },
    { id: "1017", title: "Minecraft - Podrecznik kreatywnosci" },
    { id: "1018", title: "Minecraft - Podrecznik wojownika" },
    { id: "1019", title: "Zlomokoty wsrod maszyn" },
    { id: "1020", title: "Biblia dla dzieci" },
    { id: "1021", title: "Gang Swojaków" },
    { id: "1022", title: "Szkola bohaterek i bohaterow" },
    { id: "2001", title: "Minecraft - Nintendo Switch" },
    { id: "2002", title: "The Sims 4 - Ranczo" },
    { id: "2003", title: "The Sims 4 - Licealne Lata" },
    { id: "2004", title: "The Sims 4 - Do wynajęcia" },
    { id: "3001", title: "SUPER Farmer" },
    { id: "3002", title: "Haunted House" },
    { id: "3003", title: "Puzzle 300" },
    { id: "3004", title: "Puzzle 200" }
];

// --- INICJALIZACJA LISTY WYPOŻYCZEŃ Z LOCAL STORAGE ---
// Pobieramy dane lub tworzymy pustą listę, jeśli pamięć jest pusta
let loans = JSON.parse(localStorage.getItem('prolib_loans')) || [];

// Funkcja zapisująca aktualny stan loans do pamięci przeglądarki
function saveToStorage() {
    localStorage.setItem('prolib_loans', JSON.stringify(loans));
    console.log("Zapisano zmiany w pamięci lokalnej.");
    console.table(loans); // Wyświetla listę wypożyczeń w konsoli dla podglądu
}

function showLoanForm() {
    document.getElementById('loan-form').style.display = 'block';
}

function processLoan() {
    const userIdInput = document.getElementById('userId').value;
    const bookIdInput = document.getElementById('bookId').value;

    // 1. Sprawdzanie czytelnika
    const user = users.find(u => u.id === userIdInput);
    if (!user) {
        alert("BŁĄD: Nie znaleziono czytelnika o ID " + userIdInput);
        return;
    }

    // 2. Sprawdzanie dokumentu
    const item = books.find(i => i.id === bookIdInput);
    if (!item) {
        alert("BŁĄD: Nie ma takiego dokumentu w bazie!");
        return;
    }

    // 3. Sprawdzanie czy już wypożyczone
    const isAlreadyBorrowed = loans.some(l => l.bookId === bookIdInput);
    if (isAlreadyBorrowed) {
        alert("BŁĄD: Ten przedmiot jest obecnie wypożyczony!");
        return;
    }

    // 4. Kategoria
    let category = "INNY DOKUMENT";
    const firstDigit = bookIdInput[0];
    if (firstDigit === "1") category = "KSIĄŻKA";
    else if (firstDigit === "2") category = "GRA KOMPUTEROWA";
    else if (firstDigit === "3") category = "GRA PLANSZOWA";

    // 5. Data zwrotu
    let dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    let dateString = dueDate.toLocaleDateString('pl-PL');

    // 6. Dodanie do listy i ZAPIS w LocalStorage
    loans.push({
        userId: userIdInput,
        userName: user.name,
        bookId: bookIdInput,
        bookTitle: item.title,
        returnDate: dateString
    });
    saveToStorage();

    // 7. Wypełnienie wydruku
    document.getElementById('p-userId').innerText = user.id + " (" + user.name + ")";
    document.getElementById('p-category').innerText = category;
    document.getElementById('p-bookTitle').innerText = item.title;
    document.getElementById('p-bookId').innerText = item.id;
    document.getElementById('p-dueDate').innerText = dateString;

    alert("Wypożyczono pomyślnie!");
    window.print();
}

function handleReturn() {
    let code = prompt("Podaj kod dokumentu do zwrotu:");
    if (!code) return;

    const loanIndex = loans.findIndex(l => l.bookId === code);

    if (loanIndex !== -1) {
        const itemTitle = loans[loanIndex].bookTitle;
        loans.splice(loanIndex, 1); // Usuwamy z listy
        saveToStorage(); // Zapisujemy zmiany w pamięci
        alert("Przyjęto zwrot: " + itemTitle);
    } else {
        alert("BŁĄD: Ten dokument nie widnieje jako wypożyczony.");
    }
}
function renderLoans() {
    const listContainer = document.getElementById('loans-list');
    
    // Jeśli lista jest pusta
    if (loans.length === 0) {
        listContainer.innerHTML = "<p style='text-align:center;'>Brak aktywnych wypożyczeń.</p>";
        return;
    }

    // Tworzymy nagłówek tabeli
    let html = `
        <h3>Aktywne wypożyczenia</h3>
        <table>
            <thead>
                <tr>
                    <th>Czytelnik</th>
                    <th>Tytuł</th>
                    <th>Kod</th>
                    <th>Termin zwrotu</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Dodajemy wiersze dla każdego wypożyczenia
    loans.forEach(loan => {
        html += `
            <tr>
                <td>${loan.userName} (${loan.userId})</td>
                <td>${loan.bookTitle}</td>
                <td>${loan.bookId}</td>
                <td>${loan.returnDate}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    
    // Wstawiamy gotowy HTML na stronę
    listContainer.innerHTML = html;
}