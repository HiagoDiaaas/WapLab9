import { Request, Response } from 'express';
import { Book, books } from '../models/book';

let nextId = 1;

export const createBook = (req: Request, res: Response) => {
  const { title, ISBN, publishedDate, author } = req.body;
  const newBook: Book = {
    id: nextId++,
    title,
    ISBN,
    publishedDate,
    author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

export const getBooks = (req: Request, res: Response) => {
  res.json(books);
};

export const getBookById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
};

export const updateBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, ISBN, publishedDate, author } = req.body;
  const book = books.find((b) => b.id === id);
  if (book) {
    book.title = title;
    book.ISBN = ISBN;
    book.publishedDate = publishedDate;
    book.author = author;
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
};

export const deleteBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send('Book not found');
  }
};