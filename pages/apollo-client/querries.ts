import { gql } from '@apollo/client';

export const GET_CHAT_BY_USER_ID = gql`
    query Query($authorId: ID!) {
        chat(authorId: $authorId) {
            _id
            createdAt
            question
            answer
        }
    }
`;

export const GET_USER_BY_EMAIL = gql`
    query Query($email: String!) {
        user(email: $email) {
            _id
            email
            password
        }
    }
`;

