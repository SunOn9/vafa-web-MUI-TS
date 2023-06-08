import { gql } from '@apollo/client';

export const GET_CHAT_BY_USER_ID = gql`
    query Query {
    chat {
        question
        answer
    }
}
`;
