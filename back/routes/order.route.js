import { Router } from 'express';
import { createOrder, deleteOrder, getAllOrders, updateOrder } from '../controllers/order.controller.js'

const router = Router();

router.get('/api/orders', getAllOrders);
router.put('/api/order/:id', updateOrder);
router.delete('/api/order/:id', deleteOrder);
router.post('/api/order', createOrder);

export default function orderRoutes(app) {
  app.use(router);
}