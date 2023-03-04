import Book from './../models/Book.js';

// POST book  => create book
export const postBook = async (req, res) => {
  const { title, author, price } = req.body;
  // validations will go here
  const book = new Book({
    title,
    author,
    price,
  });

  const savedBook = await book.save();

  res.json({
    success: true,
    message: 'Book created successfully',
    data: savedBook,
  });
};

// GET book/:id => get book by id

export const getBookId = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  res.json({
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
};

// GET book?title= => get book by title
export const getBookTitle = async (req, res) => {
  const { title } = req.query;
  const book = await Book.findOne({ title });

  res.json({
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
};

// GET books => get all books
export const getBooks = async (req, res) => {
  const books = await Book.find();

  res.json({
    success: true,
    message: 'Books fetched successfully',
    data: books,
  });
};

// PUT book/:id => update book by id
export const putBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  await Book.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        title,
        author,
        price,
      },
    }
  );

  const updatedBook = await Book.findById(id);

  res.json({
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  });
};

// DELETE book/:id => delete book by id
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.deleteOne({
    _id: id,
  });

  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: book,
  });
};
