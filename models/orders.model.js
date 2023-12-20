const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: { type: String},  
  numero_mesa: { type: Number},
  nombre_mesero: { type: String},
  orden: [
    {
      nombre_producto: { type: String},
      cantidad: { type: Number},
      precio_unitario: { type: Number},
    },
  ],
  total_orden: { type: Number},
  fecha: { type: Date },
});

module.exports = mongoose.model("Order", orderSchema, "orders");

/*
{
  "_id": "1",
  "numero_mesa": 5,
  "nombre_mesero": "Juan",
  "orden": [
    {
      "nombre_producto": "Hamburguesa",
      "cantidad": 2,
      "precio_unitario": 115
    },
    {
      "nombre_producto": "Refresco",
      "cantidad": 3,
      "precio_unitario": 45
    },
    {
      "nombre_producto": "Cerveza",
      "cantidad": 1,
      "precio_unitario": 55
    },
    {
      "nombre_producto": "Ensalada",
      "cantidad": 1,
      "precio_unitario": 80
    },
    {
      "nombre_producto": "Postre",
      "cantidad": 1,
      "precio_unitario": 95
    }
  ]
}

*/ 