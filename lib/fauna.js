import {GraphQLClient, gql} from 'graphql-request'
import {resolveDbDomain} from './constants'

const CLIENT_SECRET =
    process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET
const FAUNA_GRAPHQL_DOMAIN = resolveDbDomain().replace('db', 'graphql')
const FAUNA_GRAPHQL_BASE_URL = `https://${FAUNA_GRAPHQL_DOMAIN}/graphql`

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
    headers: {
        authorization: `Bearer ${CLIENT_SECRET}`,
    },
})

const createTodo = async (text) => {
    const mutation = gql`
    mutation ($text: String!) {
      createTodo(text: $text) {
        code
        text
        completed
      }
    }
  `;

    const data = await graphQLClient.request(mutation, {text});
    return data.createTodo;
}

const getTodos = async () => {
    const query = gql`
    query {
      todos {
        code
        text
        completed
      }
    }
  `;
    const data = await graphQLClient.request(query);
    return data.todos;
}

const getTodo = async (code) => {
    const query = gql`
    query($code: String!) {
  todo(code: $code) {
    code
    text
    completed
  }
}
  `;
    const variables = { code };
    const data = await graphQLClient.request(query, variables);
    return data.todo;
}

const updateTodo = async (code, data) => {
    const mutation = gql`
    mutation ($code: String!, $data: UpdateTodoInput!) {
      updateTodo(code: $code, data: $data) {
        code
        text
        completed
      }
    }
  `;
    const variables = {code, data};
    return await graphQLClient.request(mutation, variables);
}


const resolvers = {
    Query: {
        todos: () => getTodos(),
        todo: () => getTodo(),
    },
    Mutation: {
        createTodo: (_, {text}) => createTodo(text),
        updateTodo: (_, {code, data}) => updateTodo(code, data),
    }
};

module.exports = {
    resolvers,
    graphQLClient,
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
};