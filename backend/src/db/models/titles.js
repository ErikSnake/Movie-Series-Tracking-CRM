const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const titles = sequelize.define(
    'titles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,
      
      

      },

original_name: {
        type: DataTypes.TEXT,
      
      

      },

title_type: {
        type: DataTypes.ENUM,
      
      

        values: [

"movie",


"series"

        ],

      },

phase: {
        type: DataTypes.TEXT,
      
      

      },

season_count: {
        type: DataTypes.INTEGER,
      
      

      },

release_year: {
        type: DataTypes.INTEGER,
      
      

      },

release_date: {
        type: DataTypes.DATE,
      
      

      },

runtime_minutes: {
        type: DataTypes.INTEGER,
      
      

      },

synopsis: {
        type: DataTypes.TEXT,
      
      

      },

imdb_url: {
        type: DataTypes.TEXT,
      
      

      },

poster_url: {
        type: DataTypes.TEXT,
      
      

      },

franchise_order: {
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

  titles.associate = (db) => {


/// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity







    db.titles.hasMany(db.seasons, {
      as: 'seasons_series',
      foreignKey: {
          name: 'seriesId',
      },
      constraints: false,
    });



    db.titles.hasMany(db.watch_entries, {
      as: 'watch_entries_title',
      foreignKey: {
          name: 'titleId',
      },
      constraints: false,
    });


    db.titles.hasMany(db.watchlist_items, {
      as: 'watchlist_items_title',
      foreignKey: {
          name: 'titleId',
      },
      constraints: false,
    });



    db.titles.hasMany(db.title_tags, {
      as: 'title_tags_title',
      foreignKey: {
          name: 'titleId',
      },
      constraints: false,
    });


    db.titles.hasMany(db.attachments, {
      as: 'attachments_title',
      foreignKey: {
          name: 'titleId',
      },
      constraints: false,
    });



//end loop



    db.titles.belongsTo(db.franchises, {
      as: 'franchise',
      foreignKey: {
        name: 'franchiseId',
      },
      constraints: false,
    });



    db.titles.hasMany(db.file, {
      as: 'poster_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.titles.getTableName(),
        belongsToColumn: 'poster_image',
      },
    });


    db.titles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.titles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return titles;
};


