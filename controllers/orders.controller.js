const Order = require("../models/orders.model");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json({
            message: "Órdenes encontradas",
            data: orders,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al consultar órdenes",
            data: error,
        });
    }
};

exports.getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        return res.status(200).json({
            message: "Consultando la orden con ID: " + orderId,
            data: order,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al consultar la orden",
            data: error,
        });
    }
};

exports.getOrdersByMesero = async (req, res) => {
    const nombreMesero = req.params.nombreMesero;

    try {
        const orders = await Order.find({ nombre_mesero: nombreMesero });

        return res.status(200).json({
            message: "Órdenes encontradas para el mesero: " + nombreMesero,
            data: orders,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al buscar órdenes para el mesero",
            data: error,
        });
    }
};

exports.getOrdersByMesa = async (req, res) => {
    const numeroMesa = req.params.numeroMesa;

    try {
        const orders = await Order.find({ numero_mesa: numeroMesa });

        return res.status(200).json({
            message: "Órdenes encontradas para la mesa: " + numeroMesa,
            data: orders,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al buscar órdenes para la mesa",
            data: error,
        });
    }
};

exports.createNewOrder = async (req, res) => {
    try {
        const { _id,numero_mesa, nombre_mesero, orden } = req.body;

        // Calcula el total de la orden sumando los precios de los productos
        const total_orden = orden.reduce((total, producto) => {
            return total + producto.cantidad * producto.precio_unitario;
        }, 0);

        // Agrega la fecha y hora actuales
        const fecha = new Date();

        // Crea la nueva orden con los datos calculados
        const newOrder = new Order({ _id,numero_mesa, nombre_mesero, orden, total_orden, fecha });

        // Guarda la nueva orden en la base de datos
        await newOrder.save();

        return res.status(200).json({
            message: "Orden creada",
            data: newOrder,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al crear la orden",
            data: error,
        });
    }
};

exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const newData = req.body;
    
    try {
        // Recalcula el total_orden si la orden incluye nuevos detalles
        if (newData.orden) {
            newData.total_orden = newData.orden.reduce((total, producto) => {
                return total + producto.cantidad * producto.precio_unitario;
            }, 0);
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId, newData, {
            new: true,
        });

        return res.status(201).json({
            message: "Actualizando orden encontrado por ID: " + orderId,
            data: updatedOrder,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al actualizar la orden",
            data: error,
        });
    }
};

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        return res.status(201).json({
            message: "Eliminando orden encontrado por ID: " + orderId,
            data: deletedOrder,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al eliminar la orden",
            data: error,
        });
    }
};
