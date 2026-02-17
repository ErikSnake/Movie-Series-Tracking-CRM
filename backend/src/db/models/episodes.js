const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const episodes = sequelize.define(
    'episodes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

episode_number: {
        type: DataTypes.INTEGER,
      
      

      },

name: {
        type: DataTypes.TEXT,
      
      

      },

air_date: {
        type: DataTypes.DATE,
      
      

      },

runtime_minutes: {
        type: DataTypes.INTEGER,
      
      

      },

overview: {
        type: DataTypes.TEXT,
      
      

      },

sort_order: {
        type: DataTypes.INTEGER,
      
      

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

  episodes.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity









    db.episodes.hasMany(db.watch_entries, {
      as: 'watch_entries_episode',
      foreignKey: {
          name: 'episodeId',
      },
      constraints: false,
    });


    db.episodes.hasMany(db.watchlist_items, {
      as: 'watchlist_items_episode',
      foreignKey: {
          name: 'episodeId',
      },
      constraints: false,
    });




    db.episodes.hasMany(db.attachments, {
      as: 'attachments_episode',
      foreignKey: {
          name: 'episodeId',
      },
      constraints: false,
    });



//end loop



    db.episodes.belongsTo(db.seasons, {
      as: 'season',
      foreignKey: {
        name: 'seasonId',
      },
      constraints: false,
    });




    db.episodes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.episodes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return episodes;
};


