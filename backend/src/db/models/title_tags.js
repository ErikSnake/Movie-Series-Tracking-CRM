const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const title_tags = sequelize.define(
    'title_tags',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  title_tags.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.title_tags.belongsTo(db.titles, {
      as: 'title',
      foreignKey: {
        name: 'titleId',
      },
      constraints: false,
    });

    db.title_tags.belongsTo(db.tags, {
      as: 'tag',
      foreignKey: {
        name: 'tagId',
      },
      constraints: false,
    });




    db.title_tags.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.title_tags.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return title_tags;
};


