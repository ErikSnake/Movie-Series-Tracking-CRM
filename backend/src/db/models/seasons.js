const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const seasons = sequelize.define(
    'seasons',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

season_number: {
        type: DataTypes.INTEGER,
      
      

      },

name: {
        type: DataTypes.TEXT,
      
      

      },

release_date: {
        type: DataTypes.DATE,
      
      

      },

episode_count: {
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

  seasons.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity








    db.seasons.hasMany(db.episodes, {
      as: 'episodes_season',
      foreignKey: {
          name: 'seasonId',
      },
      constraints: false,
    });








//end loop



    db.seasons.belongsTo(db.titles, {
      as: 'series',
      foreignKey: {
        name: 'seriesId',
      },
      constraints: false,
    });




    db.seasons.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.seasons.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return seasons;
};


