
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class TitlesDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const titles = await db.titles.create(
            {
                id: data.id || undefined,
        
        name: data.name
        ||
        null
            ,
            
        original_name: data.original_name
        ||
        null
            ,
            
        title_type: data.title_type
        ||
        null
            ,
            
        phase: data.phase
        ||
        null
            ,
            
        season_count: data.season_count
        ||
        null
            ,
            
        release_year: data.release_year
        ||
        null
            ,
            
        release_date: data.release_date
        ||
        null
            ,
            
        runtime_minutes: data.runtime_minutes
        ||
        null
            ,
            
        synopsis: data.synopsis
        ||
        null
            ,
            
        imdb_url: data.imdb_url
        ||
        null
            ,
            
        poster_url: data.poster_url
        ||
        null
            ,
            
        franchise_order: data.franchise_order
        ||
        null
            ,
            
        is_active: data.is_active
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await titles.setFranchise( data.franchise || null, {
            transaction,
        });
        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.titles.getTableName(),
                belongsToColumn: 'poster_image',
                belongsToId: titles.id,
            },
            data.poster_image,
            options,
        );
        

        return titles;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const titlesData = data.map((item, index) => ({
                id: item.id || undefined,
                
                name: item.name
            ||
            null
            ,
            
                original_name: item.original_name
            ||
            null
            ,
            
                title_type: item.title_type
            ||
            null
            ,
            
                phase: item.phase
            ||
            null
            ,
            
                season_count: item.season_count
            ||
            null
            ,
            
                release_year: item.release_year
            ||
            null
            ,
            
                release_date: item.release_date
            ||
            null
            ,
            
                runtime_minutes: item.runtime_minutes
            ||
            null
            ,
            
                synopsis: item.synopsis
            ||
            null
            ,
            
                imdb_url: item.imdb_url
            ||
            null
            ,
            
                poster_url: item.poster_url
            ||
            null
            ,
            
                franchise_order: item.franchise_order
            ||
            null
            ,
            
                is_active: item.is_active
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const titles = await db.titles.bulkCreate(titlesData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < titles.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.titles.getTableName(),
                    belongsToColumn: 'poster_image',
                    belongsToId: titles[i].id,
                },
                data[i].poster_image,
                options,
            );
        }
        

        return titles;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const titles = await db.titles.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.original_name !== undefined) updatePayload.original_name = data.original_name;
        
        
        if (data.title_type !== undefined) updatePayload.title_type = data.title_type;
        
        
        if (data.phase !== undefined) updatePayload.phase = data.phase;
        
        
        if (data.season_count !== undefined) updatePayload.season_count = data.season_count;
        
        
        if (data.release_year !== undefined) updatePayload.release_year = data.release_year;
        
        
        if (data.release_date !== undefined) updatePayload.release_date = data.release_date;
        
        
        if (data.runtime_minutes !== undefined) updatePayload.runtime_minutes = data.runtime_minutes;
        
        
        if (data.synopsis !== undefined) updatePayload.synopsis = data.synopsis;
        
        
        if (data.imdb_url !== undefined) updatePayload.imdb_url = data.imdb_url;
        
        
        if (data.poster_url !== undefined) updatePayload.poster_url = data.poster_url;
        
        
        if (data.franchise_order !== undefined) updatePayload.franchise_order = data.franchise_order;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        updatePayload.updatedById = currentUser.id;

        await titles.update(updatePayload, {transaction});

        
        
        if (data.franchise !== undefined) {
            await titles.setFranchise(
              
              data.franchise,
              
              { transaction }
            );
        }
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.titles.getTableName(),
                belongsToColumn: 'poster_image',
                belongsToId: titles.id,
            },
            data.poster_image,
            options,
        );
        

        return titles;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const titles = await db.titles.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of titles) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of titles) {
                await record.destroy({transaction});
            }
        });


        return titles;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const titles = await db.titles.findByPk(id, options);

        await titles.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await titles.destroy({
            transaction
        });

        return titles;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const titles = await db.titles.findOne(
            { where },
            { transaction },
        );

        if (!titles) {
            return titles;
        }

        const output = titles.get({plain: true});

        
        
        
        
        
        
        output.seasons_series = await titles.getSeasons_series({
            transaction
        });
        
        
        
        output.watch_entries_title = await titles.getWatch_entries_title({
            transaction
        });
        
        
        output.watchlist_items_title = await titles.getWatchlist_items_title({
            transaction
        });
        
        
        
        output.title_tags_title = await titles.getTitle_tags_title({
            transaction
        });
        
        
        output.attachments_title = await titles.getAttachments_title({
            transaction
        });
        
        
        
        output.franchise = await titles.getFranchise({
            transaction
        });
        
        
        output.poster_image = await titles.getPoster_image({
            transaction
        });
        
        

        return output;
    }

    static async findAll(
          filter,
           options
        ) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        

        

        offset = currentPage * limit;

        const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [

      {
        model: db.franchises,
        as: 'franchise',
        
        where: filter.franchise ? {
          [Op.or]: [
            { id: { [Op.in]: filter.franchise.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.franchise.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },



      {
        model: db.file,
        as: 'poster_image',
      },

    ];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            
            if (filter.name) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'titles',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.original_name) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'titles',
                        'original_name',
                        filter.original_name,
                    ),
                };
            }
            
            if (filter.phase) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'titles',
                        'phase',
                        filter.phase,
                    ),
                };
            }
            
            if (filter.synopsis) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'titles',
                        'synopsis',
                        filter.synopsis,
                    ),
                };
            }
            
            if (filter.imdb_url) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'titles',
                        'imdb_url',
                        filter.imdb_url,
                    ),
                };
            }
            
            if (filter.poster_url) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'titles',
                        'poster_url',
                        filter.poster_url,
                    ),
                };
            }
            

            
            

            
            if (filter.season_countRange) {
                const [start, end] = filter.season_countRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    season_count: {
                    ...where.season_count,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    season_count: {
                    ...where.season_count,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.release_yearRange) {
                const [start, end] = filter.release_yearRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    release_year: {
                    ...where.release_year,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    release_year: {
                    ...where.release_year,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.release_dateRange) {
                const [start, end] = filter.release_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    release_date: {
                    ...where.release_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    release_date: {
                    ...where.release_date,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.runtime_minutesRange) {
                const [start, end] = filter.runtime_minutesRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    runtime_minutes: {
                    ...where.runtime_minutes,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    runtime_minutes: {
                    ...where.runtime_minutes,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.franchise_orderRange) {
                const [start, end] = filter.franchise_orderRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    franchise_order: {
                    ...where.franchise_order,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    franchise_order: {
                    ...where.franchise_order,
                            [Op.lte]: end,
                    },
                };
                }
            }
            

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            
            if (filter.title_type) {
                where = {
                    ...where,
                title_type: filter.title_type,
            };
            }
            
            if (filter.is_active) {
                where = {
                    ...where,
                is_active: filter.is_active,
            };
            }
            


      



            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }
        

        

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.titles.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset, ) {
        let where = {};
        
        

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'titles',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.titles.findAll({
            attributes: [ 'id', 'name' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['name', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.name,
        }));
    }

    
};

