module.exports = (app) => {
  const carrito = require("../controllers/carrito.controller.js");

  var router = require("express").Router();

  // Create a new curso
  router.post("/", carrito.create);
  //Add curso to cart
  router.post("/add-curso", carrito.addCurso);

  app.use("/api/carrito", router);

  
};
