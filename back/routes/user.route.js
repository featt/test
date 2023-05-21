import { Router } from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import { userOrderList } from '../controllers/order.controller.js'

const router = Router();

router.get('/api/users', getAllUsers);
router.get('/api/user/orders', userOrderList);
router.get('/api/user/:id', getUserById);
router.put('/api/user/:id', updateUser);
router.delete('/api/user/:id', deleteUser);
router.post('/api/user', createUser);

export default function userRoutes(app) {
  app.use(router);
}