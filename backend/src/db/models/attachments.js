const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const attachments = sequelize.define(
    'attachments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,
      
      

      },

description: {
        type: DataTypes.TEXT,
      
      

      },

category: {
        type: DataTypes.ENUM,
      
      

        values: [

"poster",


"subtitle",


"reference",


"other"

        ],

      },

attached_at: {
        type: DataTypes.DATE,
      
      

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

  attachments.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.attachments.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.attachments.belongsTo(db.titles, {
      as: 'title',
      foreignKey: {
        name: 'titleId',
      },
      constraints: false,
    });

    db.attachments.belongsTo(db.episodes, {
      as: 'episode',
      foreignKey: {
        name: 'episodeId',
      },
      constraints: false,
    });



    db.attachments.hasMany(db.file, {
      as: 'file',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.attachments.getTableName(),
        belongsToColumn: 'file',
      },
    });


    db.attachments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.attachments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return attachments;
};


