const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);



module.exports = router;
