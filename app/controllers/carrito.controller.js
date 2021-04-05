
const db = require("../models");
const Carrito = db.carrito;
const Curso = db.cursos;
const User = db.user;
const Op = db.Sequelize.Op;


// Create and Save a new carrito
exports.create = (req, res) => {
  
  // Create a curso

  User.findByPk(req.body.userId)
    .then(userDB => {
     

      Carrito.findAll({
        limit: 1,
        where: {
          //your where conditions, or without them if you need ANY entry
          userId: userDB.id
        },
        order: [['createdAt', 'DESC']]
      }).then(function (carritos) {

        //only difference is that you get users list limited to 1
        if(carritos.length > 0){
          res.send(carritos[0]);
        }else{
          // Save carrito in the database
          const carrito = {
            userId: userDB.id,
          };
          Carrito.create(carrito)
            .then(carritoDB => {
              userDB.setCarrito(carritoDB);
              res.send(carritoDB);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the carrito."
              });
            });
        }
      });        
    })
    .catch (err => {
      res.status(500).send({
        message: "Error finding user " + err.message
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
              res.send(carritoDB);
            })
            .catch(err => {
                res.status(500).send({
                  message: "Error finding curso" + err.message
                })
            });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error finding carrito " + err.message
      });
    });
};


// Find a single cart with cursos
exports.getCursos = (req, res) => {
  const id = req.params.id;

  Carrito.findAll({
    where: {
      id: id
    },
    include: [
      { model: Curso, as: Curso.tableName }
    ]
  } )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving cart with id=" + id
      });
    });
};

