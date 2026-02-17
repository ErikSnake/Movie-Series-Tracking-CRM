module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            
                
                    await queryInterface.createTable('users', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('roles', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('permissions', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('franchises', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('titles', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('seasons', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('episodes', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('watch_entries', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('watchlist_items', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('tags', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('title_tags', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    await queryInterface.createTable('attachments', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'firstName',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'phoneNumber',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'disabled',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationToken',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'passwordResetToken',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'passwordResetTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'users',
                      'app_roleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'roles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'roles',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'roles',
                      'role_customization',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'permissions',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'franchises',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'franchises',
                      'slug',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'franchises',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'franchises',
                      'universe',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'franchises',
                      'sort_order',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'franchises',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'original_name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'title_type',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['movie','series'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'franchiseId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'franchises',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'phase',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'season_count',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'release_year',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'release_date',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'runtime_minutes',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'synopsis',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'imdb_url',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'poster_url',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'franchise_order',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'titles',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'seriesId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'titles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'season_number',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'release_date',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'episode_count',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'overview',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'seasons',
                      'sort_order',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'seasonId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'seasons',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'episode_number',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'air_date',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'runtime_minutes',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'overview',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'episodes',
                      'sort_order',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'userId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'titleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'titles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'episodeId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'episodes',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'status',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['planned','watching','watched','on_hold','dropped'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'started_at',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'finished_at',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'watched_at',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'rating',
                      {
                          type: Sequelize.DataTypes.DECIMAL,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'revisit',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'rewatch_count',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'notes',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watch_entries',
                      'contains_spoilers',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'userId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'titleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'titles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'episodeId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'episodes',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'priority',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['low','medium','high'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'position',
                      {
                          type: Sequelize.DataTypes.INTEGER,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'added_at',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'planned_for',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'watchlist_items',
                      'note',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tags',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tags',
                      'color',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tags',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'tags',
                      'is_active',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,
                          
                            defaultValue: false,
                            allowNull: false,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'title_tags',
                      'titleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'titles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'title_tags',
                      'tagId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'tags',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'userId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'users',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'titleId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'titles',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'episodeId',
                      {
                          type: Sequelize.DataTypes.UUID,
                          
                          
                          
                            references: {
                                model: 'episodes',
                                key: 'id',
                            },
                          
                      },
                      { transaction }
                    );
                
            
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'category',
                      {
                          type: Sequelize.DataTypes.ENUM,
                          
                          
                            values: ['poster','subtitle','reference','other'],
                          
                          
                      },
                      { transaction }
                    );
                
            
                
                    
                    await queryInterface.addColumn(
                      'attachments',
                      'attached_at',
                      {
                          type: Sequelize.DataTypes.DATE,
                          
                          
                          
                      },
                      { transaction }
                    );
                
            
            
            
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'attached_at',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'category',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'description',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'episodeId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'titleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'attachments',
                        'userId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'title_tags',
                        'tagId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'title_tags',
                        'titleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tags',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tags',
                        'description',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tags',
                        'color',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'tags',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'note',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'planned_for',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'added_at',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'position',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'priority',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'episodeId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'titleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watchlist_items',
                        'userId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'contains_spoilers',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'notes',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'rewatch_count',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'revisit',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'rating',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'watched_at',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'finished_at',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'started_at',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'status',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'episodeId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'titleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'watch_entries',
                        'userId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'sort_order',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'overview',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'runtime_minutes',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'air_date',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'episode_number',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'episodes',
                        'seasonId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'sort_order',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'overview',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'episode_count',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'release_date',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'season_number',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'seasons',
                        'seriesId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'franchise_order',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'poster_url',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'imdb_url',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'synopsis',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'runtime_minutes',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'release_date',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'release_year',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'season_count',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'phase',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'franchiseId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'title_type',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'original_name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'titles',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'franchises',
                        'is_active',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'franchises',
                        'sort_order',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'franchises',
                        'universe',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'franchises',
                        'description',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'franchises',
                        'slug',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'franchises',
                        'name',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'permissions',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'roles',
                        'role_customization',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'roles',
                        'name',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'app_roleId',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'provider',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetTokenExpiresAt',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetToken',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationTokenExpiresAt',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationToken',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'emailVerified',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'password',
                        { transaction }
                    );
                
            
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'disabled',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'email',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'phoneNumber',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'lastName',
                        { transaction }
                    );
                
            
                
                    await queryInterface.removeColumn(
                        'users',
                        'firstName',
                        { transaction }
                    );
                
            
                
                    await queryInterface.dropTable('attachments', { transaction });
                
            
                
                    await queryInterface.dropTable('title_tags', { transaction });
                
            
                
                    await queryInterface.dropTable('tags', { transaction });
                
            
                
                    await queryInterface.dropTable('watchlist_items', { transaction });
                
            
                
                    await queryInterface.dropTable('watch_entries', { transaction });
                
            
                
                    await queryInterface.dropTable('episodes', { transaction });
                
            
                
                    await queryInterface.dropTable('seasons', { transaction });
                
            
                
                    await queryInterface.dropTable('titles', { transaction });
                
            
                
                    await queryInterface.dropTable('franchises', { transaction });
                
            
                
                    await queryInterface.dropTable('permissions', { transaction });
                
            
                
                    await queryInterface.dropTable('roles', { transaction });
                
            
                
                    await queryInterface.dropTable('users', { transaction });
                
            
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
