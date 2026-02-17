const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const watch_entries = sequelize.define(
    'watch_entries',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

status: {
        type: DataTypes.ENUM,
      
      

        values: [

"planned",


"watching",


"watched",


"on_hold",


"dropped"

        ],

      },

started_at: {
        type: DataTypes.DATE,
      
      

      },

finished_at: {
        type: DataTypes.DATE,
      
      

      },

watched_at: {
        type: DataTypes.DATE,
      
      

      },

rating: {
        type: DataTypes.DECIMAL,
      
      

      },

revisit: {
        type: DataTypes.BOOLEAN,
      
        allowNull: false,
        defaultValue: false,
      
      

      },

rewatch_count: {
        type: DataTypes.INTEGER,
      
      

      },

notes: {
        type: DataTypes.TEXT,
      
      

      },

contains_spoilers: {
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

  watch_entries.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity















//end loop



    db.watch_entries.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.watch_entries.belongsTo(db.titles, {
      as: 'title',
      foreignKey: {
        name: 'titleId',
      },
      constraints: false,
    });

    db.watch_entries.belongsTo(db.episodes, {
      as: 'episode',
      foreignKey: {
        name: 'episodeId',
      },
      constraints: false,
    });




    db.watch_entries.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.watch_entries.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return watch_entries;
};


