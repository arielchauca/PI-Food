const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    puntuation:{
      type: DataTypes.INTEGER,
    },
    level:{
      type: DataTypes.INTEGER,
    },
    steps:{
      type: DataTypes.TEXT,
    },
    image:{
      type: DataTypes.STRING,
    },
  },{
    timestamps: false,
  });
};
