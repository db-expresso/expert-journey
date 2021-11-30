import express from 'express';
import userAccountRoutes from './userAccount.routes';
import itemRoutes from './items.routes';

const app = express.Router();

app.use('/api', itemRoutes);
app.use('/api', userAccountRoutes)

export default app;
