const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cursos = require("./cursos.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.carrito = require("./carrito.model.js")(sequelize, Sequelize);



db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

//un carrito es para un usuario solamente
db.user.hasOne(db.carrito);
db.carrito.belongsTo(db.user);


//carrito tiene varios cursos, y un curso esta en varios carritos
db.carrito.belongsToMany(db.cursos, {
  through: "carrito_cursos",
  foreignKey: "carritoId",
  otherKey: "cursoId",
});
db.cursos.belongsToMany(db.carrito, {
  through: "carrito_cursos",
  foreignKey: "cursoId",
  otherKey: "carritoId",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
