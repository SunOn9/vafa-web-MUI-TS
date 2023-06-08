import { gql } from '@apollo/client';

export const GET_CHAT_BY_USER_ID = gql`
    query Query {
    chat {
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

