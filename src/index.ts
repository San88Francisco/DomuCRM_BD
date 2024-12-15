import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import apartmentRoutes from './routes/apartment';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Конфігурація Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Квартир',
      version: '1.0.0',
      description: 'API для управління квартирами',
    },
    servers: [
      {
        url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${port}`,
        description: 'Сервер API',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../models/*.ts'),
    path.join(__dirname, '../controllers/*.ts')
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());

// Налаштування Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, { explorer: true }));

// Підключення до MongoDB
const mongoAPI = process.env.MONGO_URI || "mongodb+srv://Vasyl:Telefon2001dev@cluster0.1qmdv.mongodb.net/domu_srm?retryWrites=true&w=majority";

mongoose.connect(mongoAPI)
  .then(() => console.log('MongoDB підключено до бази domu_srm'))
  .catch((err: Error) => console.log('Помилка підключення до MongoDB: ', err));

// Маршрути
app.use('/apartments', apartmentRoutes);

app.get('/', (req, res) => {
  res.send('Привіт, MongoDB та Express працюють!');
});

// Обробка JSON Swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.listen(port, () => {
  console.log(`Сервер працює на порту ${port}`);
  console.log(`Swagger документація доступна за адресою: http://localhost:${port}/api-docs`);
});

export default app;

