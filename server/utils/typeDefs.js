const {gql} = require("apollo-server-express");

const typeDefs = gql`

    type Book {
        _id: ID
        authors: [String]!
        description: String
        bookId: ID
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        email: String
        username: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getUser(_id: ID): User
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(authors: [String]!, description: String!, bookId: ID!, image: String!, link: String!, title: String!): User
        deleteBook(bookId: ID): User
    }

`

module.exports = typeDefs;