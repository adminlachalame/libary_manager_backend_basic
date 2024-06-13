const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) =>{

    try{
        const {userId, BookId, dueDate} = req.body;
        if(!userId || !BookId || !dueDate) {
            return res.status(400).send({error: 'Please fill all required fields'});
        }
        const newTransaction = await Transaction.create({userId, BookId,borrowedAt: new Date(), dueDate})
    res.status(201).json(newTransaction);
    }catch (error) {
        res.status(500).send(error.message);
    }
};

exports.returnBook = async (req,res)=>{
    try{
        const {id} = req.params;
        const transaction = await Transaction.findByPk(id);
        if(transaction){
            transaction.returnedAt = new Date();
            await transaction.save();
            res.status(200).json(transaction);
        }else {
            res.status(404).send('Transaction not found');
        }
    }catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};