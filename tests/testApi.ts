import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000/api';

interface Book {
  id?: number;
  title: string;
  ISBN: string;
  publishedDate: string;
  author: string;
}

async function createBook(): Promise<number> {
  const response = await fetch(`${baseUrl}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'The Great Gatsby',
      ISBN: '9780743273565',
      publishedDate: '1925-04-10',
      author: 'F. Scott Fitzgerald'
    })
  });

  const data = (await response.json()) as Book;
  console.log('Create Book Response:', data);
  return data.id!;
}

async function getAllBooks() {
  const response = await fetch(`${baseUrl}/books`);
  const data = (await response.json()) as Book[];
  console.log('Get All Books Response:', data);
}

async function getBookById(id: number) {
  const response = await fetch(`${baseUrl}/books/${id}`);

  if (response.ok) {
    const data = (await response.json()) as Book;
    console.log(`Get Book ${id} Response:`, data);
  } else {
    const errorText = await response.text();
    console.log(`Get Book ${id} Error:`, errorText);
  }
}

async function updateBook(id: number) {
  const response = await fetch(`${baseUrl}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'The Great Gatsby (Updated)',
      ISBN: '9780743273565',
      publishedDate: '1925-04-10',
      author: 'F. Scott Fitzgerald'
    })
  });

  const data = (await response.json()) as Book;
  console.log(`Update Book ${id} Response:`, data);
}

// Function to delete a book
async function deleteBook(id: number) {
  const response = await fetch(`${baseUrl}/books/${id}`, {
    method: 'DELETE'
  });

  if (response.status === 204) {
    console.log(`Delete Book ${id} Response: Book deleted successfully`);
  } else {
    const data = await response.text();
    console.log(`Delete Book ${id} Response:`, data);
  }
}

async function runTests() {
  try {
    const newBookId = await createBook();

    await getAllBooks();

    await getBookById(newBookId);

    await updateBook(newBookId);

    await getBookById(newBookId);

    await deleteBook(newBookId);

    await getBookById(newBookId);
  } catch (error) {
    console.error('Error:', error);
  }
}

runTests();
