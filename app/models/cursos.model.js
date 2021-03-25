module.exports = (sequelize, Sequelize) => {
  const Curso = sequelize.define("cursos", {
    titulo: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    publicado: {
      type: Sequelize.BOOLEAN,
    },
    imagen: {
      type: Sequelize.STRING(1234),
    },
  });

  return Curso;
};
