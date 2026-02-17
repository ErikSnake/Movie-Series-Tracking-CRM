const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const watchlist_items = sequelize.define(
    'watchlist_items',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

priority: {
        type: DataTypes.ENUM,
      
      

        values: [

"low",


"medium",


"high"

        ],

      },

position: {
        type: DataTypes.INTEGER,
      
      

      },

added_at: {
        type: DataTypes.DATE,
      
      

      },

planned_for: {
        type: DataTypes.DATE,
      
      

      },

is_active: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

      },

note: {
        type: DataTypes.TEXT,
      
      

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

  watchlist_items.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.watchlist_items.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.watchlist_items.belongsTo(db.titles, {
      as: 'title',
      foreignKey: {
        name: 'titleId',
      },
      constraints: false,
    });

    db.watchlist_items.belongsTo(db.episodes, {
      as: 'episode',
      foreignKey: {
        name: 'episodeId',
      },
      constraints: false,
    });




    db.watchlist_items.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.watchlist_items.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return watchlist_items;
};


