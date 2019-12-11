module.exports = (sequelize, DataTypes) => {
  const Diagnosis = sequelize.define(
    'Diagnosis',
    {
      categoryCode: DataTypes.STRING,
      diagnosisCode: DataTypes.STRING,
      fullCode: DataTypes.STRING,
      abbreviatedCode: DataTypes.STRING,
      fullDescription: DataTypes.TEXT,
      categoryTitle: DataTypes.STRING,
    },
    {},
  );
  Diagnosis.associate = function (models) {
    // associations can be defined here
  };
  return Diagnosis;
};
