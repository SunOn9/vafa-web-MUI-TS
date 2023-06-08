import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      message
      success
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

export const LOGIN = gql`
  mutation Mutation($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    access_token
    error
  }
}
`;