const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const mongoose = require('mongoose');
const { authCheckMiddleware } = require('./helpers/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

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
  } catch (error) {
    console.log('mongodb error', error);
  }
};
db();

// merge gql typeDefs and resolvers
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, './typeDefs'))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './resolvers'))
);

// create apollo gql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

// connect apollo gql server to express server
apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);

app.get('/rest', (req, res) => {
  res.json({ data: 'you hit rest endpoint' });
});

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.post('/uploadimages', authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(
    req.body.image,
    (result) => {
      res.send({
        url: result.secure_url,
        public_id: result.public_id
      });
    },
    {
      public_id: `${Date.now()}`, // public name
      resource_type: 'auto'
    }
  );
});

app.post('/removeimage', authCheckMiddleware, (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) {
      return res.json({ success: false, error });
    }
    res.send('successfully removed');
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
