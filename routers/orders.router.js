const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const authMiddleware = require("../utils/auth.middleware");

router.get('/',ordersController.getOrders);
router.get('/:orderId', ordersController.getOrderById);
router.get('/mesero/:nombreMesero', ordersController.getOrdersByMesero);
router.get('/mesa/:numeroMesa', ordersController.getOrdersByMesa);
router.post('/',authMiddleware.authenticateToken,ordersController.createNewOrder);
router.put('/:orderId',authMiddleware.authenticateToken,ordersController.updateOrder);
router.delete('/:orderId',authMiddleware.authenticateToken,ordersController.deleteOrder);

module.exports = router;