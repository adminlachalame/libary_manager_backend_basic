const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
    try{
        const books = await Book.findAll();
        res.json(books);
    }catch(error){
        res.status(500).send(error.message);
    }
};


exports.createBook = async (req, res) => {
    const { title, author, genre, ISBN, quantity } = req.body;

    try {
        if (!title || !author || !genre || !ISBN || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newBook = await Book.create({ title, author, genre, ISBN, quantity });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, ISBN, quantity } = req.body;

    try {
        // Custom validation (adjust as needed)
        if (!id || (title && title.trim().length === 0) || (author && author.trim().length === 0)) {
            return res.status(400).json({ error: 'Missing required fields (id, title, or author)' });
        }

        const updateBook = await Book.findByPk(id);
        if (!updateBook) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Log current book details
        console.log('Current Book Details:', updateBook.toJSON());

        // Perform the update
        await updateBook.update({ title, author, genre, ISBN, quantity });

        // Log updated book details
        console.log('Updated Book Details:', updateBook.toJSON());

        res.json(updateBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: error.message });
    }
};



exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        // Destroy the book using the ORM's destroy method
        const deletedCount = await Book.destroy({ where: { id } });
        if (deletedCount === 0) {
            // Book not found
            return res.status(404).json({ error: 'Không tìm thấy sách cần xóa' });
        }
        // Respond with success message or perform other actions (optional)
        res.status(200).json({ message: 'Sách đã được xóa thành công' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};