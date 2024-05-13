import Book from "../models/Book.js";

export async function getBooks(req, res) {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function getBookById(req, res) {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);

        res.json(book)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export async function addBook(req, res) {
    const { title, author, genre, price, quantity } = req.body;

    if (!title || !author || !genre || !price || !quantity) {
        res.status(400).json({ message: "All fields are required"});
        return;
    }

    const newBook = new Book({
        title,
        author,
        genre,
        price,
        quantity
    })

    try {
        await newBook.save();

        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function deleteBookById(req, res) {
    const { id } = req.params;

    try {
        const response = await Book.findByIdAndDelete(id);
        if (!response) {
            res.status(404).json({ message: "Book not found"});
            return;
        }

        res.json({ message: "success"})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}