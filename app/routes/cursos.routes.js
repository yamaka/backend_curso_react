module.exports = app => {
  const cursos = require("../controllers/cursos.controller.js");

  var router = require("express").Router();

  // Create a new curso
  router.post("/", cursos.create);

  // Retrieve all cursos
  router.get("/", cursos.findAll);

  // Retrieve all published cursos
  router.get("/published", cursos.findAllPublicados);

  // Retrieve a single cruso with id
  router.get("/:id", cursos.findOne);

  // Update a curso with id
  router.put("/:id", cursos.update);

  // Delete a curso with id
  router.delete("/:id", cursos.delete);

  // Delete all cursos
  router.delete("/", cursos.deleteAll);

  app.use('/api/cursos', router);
};
