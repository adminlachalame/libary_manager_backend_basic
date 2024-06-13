const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./user');
const Book = require('./book');

const Transaction = sequelize.define('Transaction', {
    userId:{
        type: DataTypes.INTEGER,
        references:{
            model: 'users',
            key: 'id',
        },
    },
    BookId:{
        type: DataTypes.INTEGER,
        references:{
            model: 'books',
            key: 'id',
        },
    },
    borrowedAt:{
        type: DataTypes.DATE,
    },
    dueDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    returnedAt:{
        type: DataTypes.DATE,
    },
});
module.exports = Transaction;