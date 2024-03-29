const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Carrito = db.carrito;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
      // Save carrito in the database
      const carrito = {
        userId: user.id,
      };
      Carrito.create(carrito)
        .then(carritoDB => {
          user.setCarrito(carritoDB);
          res.send(carritoDB);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the carrito."
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if(!req.body.fromGoogle){
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        Carrito.findAll({
          limit: 1,
          where: {
            //your where conditions, or without them if you need ANY entry
            userId: user.id
          },
          order: [['createdAt', 'DESC']]
        }).then(function (carritos) {
  
          //only difference is that you get users list limited to 1
          if(carritos.length > 0){
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authorities,
              carrito: carritos[0],
              accessToken: token,
            });
          }
        })
        
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
