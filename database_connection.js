require('dotenv').config();

const { Sequelize } = require('sequelize');

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
};

const sequelize = new Sequelize(config);

async function connectToDatabase() {
    try {
        await sequelize.authenticate()
            .then(() => console.log('Connected to PostgreSQL database'))
            .catch(error => console.error('Error connecting to PostgreSQL:', error));
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sequelize,
    connectToDatabase,
};
