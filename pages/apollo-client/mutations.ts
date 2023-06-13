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

export const ACTIVATE_USER = gql`
  mutation Mutation($input: String!) {
  activateUser(input: $input) {
    success
    error
  }
}
`;

export const CHANGE_PASSWORD = gql`
  mutation Mutation($input: ChangePasswordInput!) {
  changePassword(input: $input)
}
`;

export const SEND_MAIL = gql`
mutation Mutation($input: ResetPasswordInput!) {
  sendMailResetPassword(input: $input)
}
`;