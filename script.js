// 1. BAZA CZYTELNIKÓW (6-cyfrowe kody)
const users = [
    { id: "100100", name: "Jan Kowalski" },
    { id: "200200", name: "Anna Nowak" },
    { id: "300300", name: "Marek Woźniak" }
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

function showLoanForm() {
    document.getElementById('loan-form').style.display = 'block';
}

function processLoan() {
    const userIdInput = document.getElementById('userId').value;
    const bookIdInput = document.getElementById('bookId').value;

    // --- LOGIKA SPRAWDZANIA CZYTELNIKA ---
    const user = users.find(u => u.id === userIdInput);
    
    if (!user) {
        alert("BŁĄD: Nie znaleziono czytelnika o ID " + userIdInput + " w bazie!");
        return; // Zatrzymuje funkcję, nie pozwala na wydruk
    }

    // --- LOGIKA SPRAWDZANIA DOKUMENTU ---
    const item = libraryData.find(i => i.id === bookIdInput);

    if (!item) {
        alert("BŁĄD: Nie ma takiego dokumentu w bazie!");
        return;
    }

    // Jeśli wszystko OK, rozpoznaj kategorię
    let category = "";
    const firstDigit = bookIdInput[0];
    if (firstDigit === "1") category = "KSIĄŻKA";
    else if (firstDigit === "2") category = "GRA KOMPUTEROWA";
    else if (firstDigit === "3") category = "GRA PLANSZOWA";

    // Oblicz datę
    let dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    let dateString = dueDate.toLocaleDateString('pl-PL');

    // Wypełnij szablon (z dodaniem imienia czytelnika dla pewności)
    document.getElementById('p-userId').innerText = user.id + " (" + user.name + ")";
    document.getElementById('p-category').innerText = category;
    document.getElementById('p-bookTitle').innerText = item.title;
    document.getElementById('p-bookId').innerText = item.id;
    document.getElementById('p-dueDate').innerText = dateString;

    alert("Wypożyczono dla: " + user.name);
    window.print();
}

function handleReturn() {
    let code = prompt("Podaj kod dokumentu do zwrotu:");
    if(code) alert("Dokument " + code + " wrócił do biblioteki.");
}