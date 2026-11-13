

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];

function saveBooks() {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
}

function displayBooks() {
    bookList.innerHTML = "";

    books.forEach(function(book, index) {
        const row = document.createElement("tr");

        const title = document.createElement("td");
        title.textContent = book.title;

        const author = document.createElement("td");
        author.textContent = book.author;

        const id = document.createElement("td");
        id.textContent = book.id;

        const status = document.createElement("td");
        status.textContent = book.status;

        const actions = document.createElement("td");

        const issueButton = document.createElement("button");
        issueButton.textContent =
            book.status === "Available" ? "Issue" : "Return";

        issueButton.addEventListener("click", function() {
            books[index].status =
                book.status === "Available" ? "Issued" : "Available";

            saveBooks();
            displayBooks();
            updateDashboard();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            if (confirm("Delete this book?")) {
                books.splice(index, 1);
                saveBooks();
                displayBooks();
                updateDashboard();
            }
        });

        actions.appendChild(issueButton);
        actions.appendChild(deleteButton);

        row.append(title, author, id, status, actions);
        bookList.appendChild(row);
    });
}

function updateDashboard() {
    document.getElementById("totalBooks").textContent = books.length;

    document.getElementById("issuedBooks").textContent =
        books.filter(book => book.status === "Issued").length;

    document.getElementById("availableBooks").textContent =
        books.filter(book => book.status === "Available").length;
}

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("author").value.trim();
    const id = document.getElementById("bookId").value.trim();

    if (books.some(book => book.id.toLowerCase() === id.toLowerCase())) {
        alert("This Book ID already exists!");
        return;
    }

    books.push({
        title: title,
        author: author,
        id: id,
        status: "Available"
    });

    saveBooks();
    displayBooks();
    updateDashboard();

    bookForm.reset();
    alert("Book added successfully!");
});

displayBooks();
updateDashboard();
