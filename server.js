const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

// database connection
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('mongodb connected');
    } catch(error) {
        console.log('mongodb error', error);
    }
};
db();

// merge gql typeDefs and resolvers
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

// create apollo gql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

// connect apollo gql server to express server
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);

app.get('/rest', (req, res) => {
    res.json({ data: 'you hit rest endpoint' });
});

app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`)
});