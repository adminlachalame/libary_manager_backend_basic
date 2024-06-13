const User = require('../models/user');
const {where} = require("sequelize");

exports.getAllUsers = async (req, res) =>{
    try{
        const users = await User.findAll();
        res.json(users);
    }catch (error){
        res.status(500).send(error.message);
    }
};

exports.createUser = async (req, res) => {
    try{
        const {name, email,role} = req.body;
        const newUser = await User.create({name, email,role});
        res.status(201).json(newUser);
    }catch (error){
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) =>{
        const {id} = req.params;
        const {name,email,role} = req.body;
        try{
            const update = await  User.findByPk(id);
    if(!update){
        return res.status(404).json({error:'User not Found'});
    }
    await update.update({name, email,role});
    res.json(update);
    }catch (error){
            res.status(500).send(error.message);
        }
};
exports.deleteUser = async (req,res) =>{
    const { id } = req.params;
    try {
        // Destroy the book using the ORM's destroy method
        const deletedCount = await User.destroy({ where: { id } });
        if (deletedCount === 0) {
            // Book not found
            return res.status(404).json({ error: 'Không tìm thấy User cần xóa' });
        }
        // Respond with success message or perform other actions (optional)
        res.status(200).json({ message: 'User đã được xóa thành công' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};