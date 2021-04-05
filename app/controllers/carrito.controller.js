
const db = require("../models");
const Carrito = db.carrito;
const Curso = db.cursos;
const Op = db.Sequelize.Op;


// Create and Save a new carrito
exports.create = (req, res) => {
  
  // Create a curso
  const carrito = {
    descripcion: req.body.userId,
  };

  // Save curso in the database
  Carrito.create(carrito)
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


// Find a single curso with an id
exports.addCurso = (req, res) => {
  const idCarrito = req.body.idCarrito;
  const idCurso = req.body.idCurso



  Carrito.findByPk(idCarrito)
    .then(carritoDB => {
        Curso.findByPk(idCurso)
            .then(cursoDB => {
                carritoDB.update({
                    numProductos: parseInt(carritoDB.numProductos) + 1
                })
                carritoDB.addCurso(cursoDB);
                 console.log(
                   `>> added Curso id=${cursoDB.id} to Carrito id=${carritoDB.id}`
                 );
                 return carritoDB;
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving curso with id=" + idCurso
                })
            });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving carrito with id=" + idCarrito
      });
    });
};

