const express = require('express');
const app = express();
const eventRouter = require('./routes/event_route');
const { sequelize, connectToDatabase } = require('./database_connection');

connectToDatabase();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/events', eventRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});