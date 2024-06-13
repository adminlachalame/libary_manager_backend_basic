const express = require('express');
const bodyParser = require('body-parser');
const {initDB} = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transacntionRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Gọi hàm initDB để khởi tạo cơ sở dữ liệu
initDB();


app.get('/', (req, res) => {
    res.render('index');
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});