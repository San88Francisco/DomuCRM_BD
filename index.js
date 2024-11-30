const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Завантажуємо змінні середовища з .env файлу
dotenv.config();

const app = express();

// Налаштовуємо JSON парсинг
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB: ', err));

// Базовий маршрут
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
