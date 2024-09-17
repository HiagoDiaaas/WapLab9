import express from 'express';
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

const router = express.Router();

router.post('/books', createBook);       // Create
router.get('/books', getBooks);          // Read all
router.get('/books/:id', getBookById);   // Read one
router.put('/books/:id', updateBook);    // Update
router.delete('/books/:id', deleteBook); // Delete

export default router;
