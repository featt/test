import express from 'express';
import cors from 'cors'
import userRoutes from './routes/user.route.js';
import orderRoutes from './routes/order.route.js';

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
userRoutes(app);
orderRoutes(app)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;