// Current Date

const currentDate = new Date().toDateString();

document.getElementById("datetime").innerHTML = currentDate;

// Book Inventory

const bookEndpoint = 'http://127.0.0.1:3000/book';

async function getBooks() {
    const response = await fetch(bookEndpoint);
    const data = await response.json();

    return data;
}

const addBookButton = document.querySelector(".appMainHeader button");
addBookButton.addEventListener("click", createBookForm);

function createBookForm() {
    const bookForm = document.createElement("section");
    bookForm.classList.add("bookForm");

    const form = document.createElement("form");
    form.classList.add("bookFormContent");

    // Book title

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "title";
    titleLabel.innerText = "Title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.id = "title";
    titleInput.required = true;

    // Book Author

    const authorLabel = document.createElement("label"); authorLabel.htmlFor = "author";
    authorLabel.innerText = "Author";
    const authorInput = document.createElement("input"); authorInput.type = "text";
    authorInput.name = "author";
    authorInput.id = "author";
    authorInput.required = true;

    // Book Genre

    const genreLabel = document.createElement("label"); genreLabel.htmlFor = "genre";
    genreLabel.innerText = "Genre";
    const genreInput = document.createElement("input"); genreInput.type = "text";
    genreInput.name = "genre";
    genreInput.id = "genre";

    // Book Price

    const priceLabel = document.createElement("label"); priceLabel.htmlFor = "price"; 
    priceLabel.innerText = "Price";
    const priceInput = document.createElement("input"); priceInput.type = "number";
    priceInput.name = "price";
    priceInput.id = "price";
    priceInput.min = "0.01";
    priceInput.step = "0.01";
    priceInput.required = true;

    // Book Quantity

    const quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Quantity";
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.name = "quantity";
    quantityInput.id = "quantity";
    quantityInput.min = "1";
    quantityInput.required = true;

    // Submit Button

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerText = "Add Book";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(genreLabel);
    form.appendChild(genreInput);
    form.appendChild(priceLabel);
    form.appendChild(priceInput);
    form.appendChild(quantityLabel);
    form.appendChild(quantityInput);
    form.appendChild(submitButton);
    bookForm.appendChild(form);

    const appMainHeader = document.querySelector(".appMainHeader");
    appMainHeader.parentNode.insertBefore(bookForm, appMainHeader.nextSibling);

    form.addEventListener("submit", async (e) => {e.preventDefault();

        const book = { 
            title: titleInput.value,
            author: authorInput.value,
            genre: genreInput.value,
            price: parseFloat(priceInput.value),
            quantity: parseInt(quantityInput.value),
        };

        const response = await fetch(bookEndpoint, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(book),
        });

        if (response.ok) {

            const successMessage = document.createElement("p");
            successMessage.textContent = "Book added successfully!";
            successMessage.classList.add("success-message");
            form.appendChild(successMessage);

            getBooks().then((data) => {
                const functionalityBubbles = document.querySelectorAll(".functionalityBubble");
                functionalityBubbles[0].innerHTML = data.length;
            });
        }

        titleInput.value = "";
        authorInput.value = "";
        genreInput.value = "";
        priceInput.value = "";
        quantityInput.value = "";

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    })
}

// For Viewing All Books

const viewBooksButton = document.getElementById("viewBooksButton");
viewBooksButton.addEventListener("click", viewAllBooks);

async function viewAllBooks() {
    const bookListContainer = document.querySelector(".bookList");
    
    bookListContainer.innerHTML = "";
    
    const books = await getBooks();
    
    // Displaying books

    books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("bookItem");
        
        const bookItemDetails = document.createElement("div");
        bookItemDetails.classList.add("bookItemDetails");
        
        const title = document.createElement("p");
        title.classList.add("bookItemTitle");
        title.textContent = `Title: ${book.title}`;
        
        const author = document.createElement("p");
        author.classList.add("bookItemAuthor");
        author.textContent = `Author: ${book.author}`;
        
        const genre = document.createElement("p");
        genre.textContent = `Genre: ${book.genre}`;
        
        const price = document.createElement("p");
        price.classList.add("bookItemPrice");
        price.textContent = `Price: $${book.price}`;

        // For deleting books
        
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", async () => {
            await fetch(`${bookEndpoint}/${book._id}`, {
                method: "DELETE"
            });
            bookItem.remove();
        });
        
        bookItemDetails.appendChild(title);
        bookItemDetails.appendChild(author);
        bookItemDetails.appendChild(genre);
        bookItemDetails.appendChild(price);
        bookItem.appendChild(bookItemDetails);
        bookItem.appendChild(deleteButton);
        
        bookListContainer.appendChild(bookItem);
    });
}
