module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Diagnoses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    categoryCode: {
      type: Sequelize.STRING,
    },
    diagnosisCode: {
      type: Sequelize.STRING,
    },
    fullCode: {
      type: Sequelize.STRING,
    },
    abbreviatedCode: {
      type: Sequelize.STRING,
    },
    fullDescription: {
      type: Sequelize.TEXT,
    },
    categoryTitle: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date(),
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Diagnoses'),
};
