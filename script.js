// Przykładowa baza książek
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

function showLoanForm() {
    document.getElementById('loan-form').style.display = 'block';
}

function handleReturn() {
    let code = prompt("Podaj kod zwracanej książki:");
    if(code) alert("Książka " + code + " została zwrócona!");
}

function processLoan() {
    const userId = document.getElementById('userId').value;
    const bookId = document.getElementById('bookId').value;

    // 1. Szukamy książki w naszej liście
    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert("Błąd: Nie znaleziono książki o takim kodzie!");
        return;
    }

    if (userId.length !== 6) {
        alert("Błąd: ID czytelnika musi mieć 6 cyfr!");
        return;
    }

    // 2. Obliczamy datę (dzisiaj + 30 dni)
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    let dateString = dueDate.toLocaleDateString('pl-PL');

    // 3. Wypełniamy szablon wydruku danymi
    document.getElementById('p-userId').innerText = userId;
    document.getElementById('p-bookTitle').innerText = book.title;
    document.getElementById('p-bookId').innerText = book.id;
    document.getElementById('p-dueDate').innerText = dateString;

    // 4. Komunikat i druk
    alert("Wypożyczono!");
    window.print();
}