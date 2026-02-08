console.log("System proLIB załadowany poprawnie!");
// 1. BAZA CZYTELNIKÓW (6-cyfrowe kody)
const users = [
    { id: "100100", name: "Jan Kowalski" },
    { id: "200200", name: "Anna Nowak" },
    { id: "300300", name: "Marek Woźniak" },
    { id: "400400", name: "Adam Kamiński" },
];

// 2. baza książek
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
    { id: "3004", title: "Puzzle 200" },

];
let loans = [

];
function showLoanForm() {
    document.getElementById('loan-form').style.display = 'block';
}

function processLoan() {
    const userIdInput = document.getElementById('userId').value;
    const bookIdInput = document.getElementById('bookId').value;

    // 1. Sprawdzamy, czy czytelnik istnieje w bazie users
    const user = users.find(u => u.id === userIdInput);
    if (!user) {
        alert("BŁĄD: Nie znaleziono czytelnika o ID " + userIdInput + " w bazie!");
        return;
    }

    // 2. Sprawdzamy, czy dokument istnieje w bazie books
    const item = books.find(i => i.id === bookIdInput);
    if (!item) {
        alert("BŁĄD: Nie ma takiego dokumentu w bazie!");
        return;
    }

    // 3. Sprawdzamy, czy ten dokument nie jest już wypożyczony (czy jest w liście loans)
    const isAlreadyBorrowed = loans.some(l => l.bookId === bookIdInput);
    if (isAlreadyBorrowed) {
        alert("BŁĄD: Ta pozycja jest już wypożyczona i nie została zwrócona!");
        return;
    }

    // 4. Rozpoznajemy kategorię na podstawie pierwszej cyfry kodu
    let category = "INNY DOKUMENT";
    const firstDigit = bookIdInput[0];
    if (firstDigit === "1") {
        category = "KSIĄŻKA";
    } else if (firstDigit === "2") {
        category = "GRA KOMPUTEROWA";
    } else if (firstDigit === "3") {
        category = "GRA PLANSZOWA";
    }

    // 5. Obliczamy termin zwrotu (za miesiąc)
    let dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    let dateString = dueDate.toLocaleDateString('pl-PL');

    // 6. ZAPISUJEMY wypożyczenie do listy (żeby system o nim pamiętał)
    loans.push({
        userId: userIdInput,
        userName: user.name,
        bookId: bookIdInput,
        bookTitle: item.title,
        loanDate: new Date().toLocaleDateString('pl-PL'),
        returnDate: dateString
    });

    // 7. Wypełniamy pola w sekcji wydruku (HTML)
    document.getElementById('p-userId').innerText = user.id + " (" + user.name + ")";
    document.getElementById('p-category').innerText = category;
    document.getElementById('p-bookTitle').innerText = item.title;
    document.getElementById('p-bookId').innerText = item.id;
    document.getElementById('p-dueDate').innerText = dateString;

    // 8. Komunikat dla bibliotekarza i wywołanie drukowania
    alert("Wypożyczono pomyślnie!");
    window.print();

    // Opcjonalnie: czyścimy pola formularza po wypożyczeniu
    document.getElementById('userId').value = "";
    document.getElementById('bookId').value = "";
}

function handleReturn() {
    // 1. Pytamy bibliotekarza o kod zwracanego przedmiotu
    let code = prompt("Zeskanuj lub wpisz kod dokumentu do zwrotu (4 cyfry):");

    // Jeśli użytkownik kliknął "Anuluj" lub nic nie wpisał, kończymy funkcję
    if (!code) return;

    // 2. Szukamy wypożyczenia na liście aktywnych wypożyczeń (loans)
    const loanIndex = loans.findIndex(l => l.bookId === code);

    // 3. Sprawdzamy, czy ten przedmiot w ogóle był oznaczony jako wypożyczony
    if (loanIndex !== -1) {
        // Pobieramy dane o wypożyczeniu, żeby wyświetlić ładny komunikat
        const returnedItem = loans[loanIndex];
        
        // Usuwamy wypożyczenie z tablicy loans
        loans.splice(loanIndex, 1);

        // Informujemy o sukcesie
        alert("ZWROT PRZYJĘTY!\n\nDokument: " + returnedItem.bookTitle + "\nCzytelnik: " + returnedItem.userName);
        
        console.log("Aktualna lista aktywnych wypożyczeń:", loans);
    } else {
        // Jeśli kodu nie ma na liście loans, oznacza to, że książka jest już na półce
        // lub wpisano błędny kod.
        
        // Dodatkowe sprawdzenie, czy taka książka w ogóle istnieje w bazie books
        const itemExists = books.some(b => b.id === code);
        
        if (itemExists) {
            alert("INFORMACJA: Ta pozycja o kodzie " + code + " znajduje się już w bibliotece (nie była wypożyczona).");
        } else {
            alert("BŁĄD: Nie znaleziono dokumentu o kodzie " + code + " w bazie danych biblioteki.");
        }
    }
}