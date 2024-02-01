import { GraphQLClient, gql } from 'graphql-request';
import { resolveDbDomain } from './constants';

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET;
const FAUNA_GRAPHQL_DOMAIN = resolveDbDomain().replace('db', 'graphql');
const FAUNA_GRAPHQL_BASE_URL = `https://${FAUNA_GRAPHQL_DOMAIN}/graphql`;

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
});

const createInvite = async (data) => {
  const mutation = gql`
    mutation ($data: InviteInput!) {
      createInvite(data: $data) {
        code
        name
        phone
        guests
        confirmedGuests
        rsvp
        attending
        message
      }
    }
  `;
  return await graphQLClient.request(mutation, { data });
};

const deleteInvite = async (code) => {
  const mutation = gql`
    mutation ($code: String!) {
      deleteInvite(code: $code)
    }
  `;
  return await graphQLClient.request(mutation, code);
};

const getInvites = async () => {
  const query = gql`
    query {
      invites(_size: 200) {
        data {
          code
          name
          phone
          guests
          confirmedGuests
          rsvp
          attending
          message
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  return data.invites;
};

const getInvite = async (code) => {
  const query = gql`
    query ($code: String!) {
      invite(code: $code) {
        code
        name
        phone
        guests
        confirmedGuests
        rsvp
        attending
        message
      }
    }
  `;
  const data = await graphQLClient.request(query, { code });
  return data.invite;
};

const updateInvite = async (code, data) => {
  const mutation = gql`
    mutation ($code: String!, $data: UpdateInviteInput!) {
      updateInvite(code: $code, data: $data) {
        name
        phone
        confirmedGuests
        rsvp
        attending
        message
      }
    }
  `;
  return await graphQLClient.request(mutation, { code, data });
};

const resolvers = {
  Query: {
    invites: () => getInvites(),
    invite: () => getInvite(),
  },
  Mutation: {
    createInvite: (data) => createInvite(data),
    updateInvite: (_, { code, data }) => updateInvite(code, data),
    deleteInvite: (code) => deleteInvite(code),
  },
};

module.exports = {
  resolvers,
  graphQLClient,
  createInvite,
  getInvites,
  getInvite,
  updateInvite,
};
