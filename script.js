
const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

let books = [];

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("author").value.trim();
    const bookId = document.getElementById("bookId").value.trim();

    if (!title || !author || !bookId) {
        alert("Please fill in all fields.");
        return;
    }

    const duplicate = books.some(book => book.id === bookId);

    if (duplicate) {
        alert("This Book ID already exists.");
        return;
    }

    const book = {
        title: title,
        author: author,
        id: bookId,
        status: "Available"
    };

    books.push(book);

    displayBooks();
    updateDashboard();

    bookForm.reset();

    alert("Book added successfully!");
});

function displayBooks() {
    bookList.innerHTML = "";

    books.forEach(function(book) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(book.title)}</td>
            <td>${escapeHTML(book.author)}</td>
            <td>${escapeHTML(book.id)}</td>
            <td>${book.status}</td>
        `;

        bookList.appendChild(row);
    });
}

function updateDashboard() {
    const total = books.length;
    const issued = books.filter(book => book.status === "Issued").length;
    const available = total - issued;

    document.getElementById("totalBooks").textContent = total;
    document.getElementById("issuedBooks").textContent = issued;
    document.getElementById("availableBooks").textContent = available;
}

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, function(character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[character];
    });
}
