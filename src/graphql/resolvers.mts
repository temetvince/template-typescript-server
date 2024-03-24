import Book from '../models/Book.mjs';

const books = await Book.findAll();

const resolvers = {
   Query: {
      books: () => books,
   },
};

export default resolvers;
