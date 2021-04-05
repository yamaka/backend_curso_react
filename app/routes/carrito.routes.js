module.exports = (app) => {
  const carrito = require("../controllers/carrito.controller.js");

  var router = require("express").Router();

  // Create a new cart
  router.post("/", carrito.create);
  //Add curso to cart
  router.post("/add-curso", carrito.addCurso);
  //Get cursos in cart

  router.get("/get-cursos/:id", carrito.getCursos);


  app.use("/api/carrito", router);
  

  
};
