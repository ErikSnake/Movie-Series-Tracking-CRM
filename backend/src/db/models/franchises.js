const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const franchises = sequelize.define(
    'franchises',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,
      
      

      },

slug: {
        type: DataTypes.TEXT,
      
      

      },

description: {
        type: DataTypes.TEXT,
      
      

      },

universe: {
        type: DataTypes.TEXT,
      
      

      },

sort_order: {
        type: DataTypes.INTEGER,
      
      

      },

is_active: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  franchises.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity






    db.franchises.hasMany(db.titles, {
      as: 'titles_franchise',
      foreignKey: {
          name: 'franchiseId',
      },
      constraints: false,
    });










//end loop





    db.franchises.hasMany(db.file, {
      as: 'cover_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.franchises.getTableName(),
        belongsToColumn: 'cover_image',
      },
    });


    db.franchises.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.franchises.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return franchises;
};


