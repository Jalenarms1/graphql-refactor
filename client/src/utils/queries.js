import { gql } from "@apollo/client";


export const GET_USER = gql`
    query getUser($_id: ID!) {
        getUser(_id: $id) {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!){
        createUser(username: $username, email: $email, password: $password){
            token 
            user {
                _id
                username
                email
            }
        }
    }
`

export const CHECK_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($authors: [String]!, $description: String!, $bookId: ID!, $image: String!, $link: String!, $title: String!){
        saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title){
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: ID!){
        deleteBook(bookId: $bookId){
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`