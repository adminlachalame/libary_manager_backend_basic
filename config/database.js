const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('thuvien', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
});

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const User = require('../models/user');
        const Book = require('../models/book');
        const Transaction = require('../models/transaction');

        // Only sync the tables in development mode
        if (process.env.NODE_ENV === 'development') {
            await User.sync({ force: true });
            await Book.sync({ force: true });
            await Transaction.sync({ force: true });
            console.log('Database synchronized successfully.');
        } else {
            // In production, ensure tables exist but don't recreate them
            await User.sync();
            await Book.sync();
            await Transaction.sync();
            console.log('Database tables ensured to exist.');
        }
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
};

module.exports = { initDB, sequelize };
