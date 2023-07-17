var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    helloWithUserName(name:String!):String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!"
  },
  helloWithUserName : (args) =>  `Hi ${args.name} GraphQL server says Hello to you!!`
}

var app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
//NOTE: You can also use app.listen(4000 , ()=> console.log("Running a GraphQL API server at http://localhost:4000/graphql"));