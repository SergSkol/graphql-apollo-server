export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String!
    writer: [String!]!
    reviews: [Review!]
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    book: Book!
    author: Author!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
    addBook(book: AddBookInput!): Book
    deleteBook(id: ID!): [Book]
    updateBook(id: ID!, edits: EditBookInput): Book
  }

  input AddBookInput {
    title: String!,
    writer: [String!]!
  }

  input EditBookInput {
    title: String,
    writer: [String!]
  }
  
`;
