import Order from "../models/order.model.js";


async function createOrder(req, res) {
    const { userId, productName, quantity } = req.body;
    console.log(req.body);
    if (!userId || !productName || !quantity) {
      return res.status(400).json({ error: "Invalid inputs" });
    }  
    try {
      await Order.create(userId, productName, quantity);      
    } catch (e) {
      return res.status(500).json({ error: "Internal server error" });
    }
}


async function userOrderList(req, res) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    try {
        const orders = await Order.findByUserId(id)
        res.json(orders)
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
}


async function getAllOrders(req, res) {
    const pageSize = req.query.pageSize || 10;
    const pageNumber = req.query.pageNumber || 1;
    try {
        const order = await Order.getAll(pageSize, pageNumber)
        res.json(order)
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateOrder(req, res) {
    const { id } = req.params
    const { product_name, quantity } = req.body
    console.log(req.body);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    try {
        await Order.update(id, product_name, quantity)
        res.status(200).json({ message: `order ${id} updated` })
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteOrder(req, res) {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    try {
        await Order.delete(id)
        res.status(200).json({ message: `order ${id} deleted` })
    } catch (e) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export { createOrder, userOrderList, getAllOrders, updateOrder, deleteOrder }