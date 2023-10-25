import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuidv4 } from 'uuid';

// types
import { typeDefs } from '../schema.js';

//db
import db from '../_db.js';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => db.books,

    authors: () => db.authors,

    reviews: () => db.reviews,

    book(_, args) {
      return db.books.find((book) => book.id === args.id)
    },

    author(_, args) {
      return db.authors.find((author) => author.id === args.id)
    },

    review(_, args) {
      return db.reviews.find((review) => review.id === args.id)
    }
  },
  Book: {
    reviews(parent) {
      return db.reviews.filter((r) => r.book_id === parent.id)
    }
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id)
    },
    book(parent) {
      return db.books.find((b) => b.id === parent.book_id)
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id)
    }
  },
  Mutation: {
    addBook(_, args) {
      let book = {
        ...args.book, 
        id: uuidv4()
      }
      db.books.push(book)

      return book
    },
    deleteBook(_, args) {
      db.books = db.books.filter((b) => b.id !== args.id)

      return db.books
    },
    updateBook(_, args) {
      db.books = db.books.map((b) => {
        if (b.id === args.id) {
          return {...b, ...args.edits}
        }

        return b
      })

      return db.books.find((b) => b.id === args.id)
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
