const db = require("../models");
const Curso = db.cursos;
const Op = db.Sequelize.Op;

// Create and Save a new curso
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a curso
  const curso = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    publicado: req.body.publicado ? req.body.publicado : false,
    imagen: req.body.imagen,
  };

  // Save curso in the database
  Curso.create(curso)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the curso."
      });
    });
};

// Retrieve all cursos from the database.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

  Curso.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cursos."
      });
    });
};

// Find a single curso with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Curso.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving curso with id=" + id
      });
    });
};

// Update a curso by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Curso.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "curso was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update curso with id=${id}. Maybe curso was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating curso with id=" + id
      });
    });
};

// Delete a curso with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Curso.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "curso was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete curso with id=${id}. Maybe curso was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete curso with id=" + id
      });
    });
};

// Delete all cursos from the database.
exports.deleteAll = (req, res) => {
  Curso.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} cursos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cursos."
      });
    });
};

// find all publicado curso
exports.findAllPublicados = (req, res) => {
  Curso.findAll({ where: { publicado: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cursos."
      });
    });
};
