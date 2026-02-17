const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const tags = sequelize.define(
    'tags',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,
      
      

      },

color: {
        type: DataTypes.TEXT,
      
      

      },

description: {
        type: DataTypes.TEXT,
      
      

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

  tags.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity












    db.tags.hasMany(db.title_tags, {
      as: 'title_tags_tag',
      foreignKey: {
          name: 'tagId',
      },
      constraints: false,
    });




//end loop






    db.tags.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.tags.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return tags;
};


