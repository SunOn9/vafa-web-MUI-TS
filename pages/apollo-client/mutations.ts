import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      email
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation Mutation($input: CreateChatInput!) {
    createChat(input: $input) {
      _id
    }
  }
`;