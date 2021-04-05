module.exports = (sequelize, Sequelize) => {
  const Carrito = sequelize.define("carrito", {
    numProductos: {
      type: Sequelize.INTEGER,
      default: 0
    },
    total: {
      type: Sequelize.STRING,
    },
  });
  return Carrito;
};
