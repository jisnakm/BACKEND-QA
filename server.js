const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const registerRouter = require ('./routes/register.js');
const loginRouter = require ('./routes/login.js');
const questionRouter = require ('./routes/questions.js');
const categoryRouter = require ('./routes/category.js')

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/qa', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Mount the routes
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/questions', questionRouter);
app.use('/category', categoryRouter);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
})

  // Start the server

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});