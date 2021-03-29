module.exports = (sequelize, Sequelize) => {
  const Carrito = sequelize.define("carrito", {
    numProductos: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.STRING,
    },
  });
  return Carrito;
};
