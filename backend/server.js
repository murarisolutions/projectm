const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const Enrollment = require('./models/Enrollment');
const { StringDecoder } = require('string_decoder');

const app = express();

app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb+srv://murarivenu45:venu45@cluster0.zkdaprx.mongodb.net/Mtest?retryWrites=true&w=majority&appName=Cluster0', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));


const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  phone: Number,
  message: String,
});

const User = mongoose.model('User',UserSchema);


app.get('/users',async(req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

app.post('/users', async (req, res) => {
  try {
      const { name, email, phone, message } = req.body;
      
      // Create a new user
      const newUser = new User({ name, email, phone, message  });
      await newUser.save();
      
      res.json({ message: 'Our Person will Contact you shortley  ' });
  } catch (error) {
      res.status(500).json({ message: 'Error adding user', error });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));





// const typeDefs = gql`
//   type Enrollment {
//     id: ID!
//     name: String!
//     email: String!
//     phone: String!
//     message: String!
//   }

//   type Query {
//     enrollments: [Enrollment]
//   }

//   type Mutation {
//     addEnrollment(name: String!, email: String!, phone: String!, message: String!): Enrollment
//   }
// `;

// const resolvers = {
//   Query: {
//     enrollments: async () => await Enrollment.find(),
//   },
//   Mutation: {
//     addEnrollment: async (_, { name, email, phone, message }) => {
//       const newEnrollment = new Enrollment({ name, email, phone, message });
//       return await newEnrollment.save();
//     },
//   },
// };

// // async function startServer() {
// //   const server = new ApolloServer({ typeDefs, resolvers });
// //   await server.start();
// //   server.applyMiddleware({ app });

//   // app.get('*', (req, res) => {
//   //   res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   // });

//   app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
//     console.log(`GraphQL endpoint available at http://localhost:${port}${server.graphqlPath}`);
//   });
// // }

// startServer();
