const express = require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');

const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

const PORT = 4000;

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
