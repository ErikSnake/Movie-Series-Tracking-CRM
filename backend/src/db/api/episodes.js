
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EpisodesDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const episodes = await db.episodes.create(
            {
                id: data.id || undefined,
        
        episode_number: data.episode_number
        ||
        null
            ,
            
        name: data.name
        ||
        null
            ,
            
        air_date: data.air_date
        ||
        null
            ,
            
        runtime_minutes: data.runtime_minutes
        ||
        null
            ,
            
        overview: data.overview
        ||
        null
            ,
            
        sort_order: data.sort_order
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await episodes.setSeason( data.season || null, {
            transaction,
        });
        

        

        

        return episodes;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const episodesData = data.map((item, index) => ({
                id: item.id || undefined,
                
                episode_number: item.episode_number
            ||
            null
            ,
            
                name: item.name
            ||
            null
            ,
            
                air_date: item.air_date
            ||
            null
            ,
            
                runtime_minutes: item.runtime_minutes
            ||
            null
            ,
            
                overview: item.overview
            ||
            null
            ,
            
                sort_order: item.sort_order
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const episodes = await db.episodes.bulkCreate(episodesData, { transaction });

        // For each item created, replace relation files
        

        return episodes;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const episodes = await db.episodes.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.episode_number !== undefined) updatePayload.episode_number = data.episode_number;
        
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.air_date !== undefined) updatePayload.air_date = data.air_date;
        
        
        if (data.runtime_minutes !== undefined) updatePayload.runtime_minutes = data.runtime_minutes;
        
        
        if (data.overview !== undefined) updatePayload.overview = data.overview;
        
        
        if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order;
        
        
        updatePayload.updatedById = currentUser.id;

        await episodes.update(updatePayload, {transaction});

        
        
        if (data.season !== undefined) {
            await episodes.setSeason(
              
              data.season,
              
              { transaction }
            );
        }
        

        
        

        

        return episodes;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const episodes = await db.episodes.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of episodes) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of episodes) {
                await record.destroy({transaction});
            }
        });


        return episodes;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const episodes = await db.episodes.findByPk(id, options);

        await episodes.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await episodes.destroy({
            transaction
        });

        return episodes;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const episodes = await db.episodes.findOne(
            { where },
            { transaction },
        );

        if (!episodes) {
            return episodes;
        }

        const output = episodes.get({plain: true});

        
        
        
        
        
        
        
        
        output.watch_entries_episode = await episodes.getWatch_entries_episode({
            transaction
        });
        
        
        output.watchlist_items_episode = await episodes.getWatchlist_items_episode({
            transaction
        });
        
        
        
        
        output.attachments_episode = await episodes.getAttachments_episode({
            transaction
        });
        
        
        
        output.season = await episodes.getSeason({
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
        model: db.seasons,
        as: 'season',
        
        where: filter.season ? {
          [Op.or]: [
            { id: { [Op.in]: filter.season.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.season.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
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
                        'episodes',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.overview) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'episodes',
                        'overview',
                        filter.overview,
                    ),
                };
            }
            

            
            

            
            if (filter.episode_numberRange) {
                const [start, end] = filter.episode_numberRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    episode_number: {
                    ...where.episode_number,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    episode_number: {
                    ...where.episode_number,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.air_dateRange) {
                const [start, end] = filter.air_dateRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    air_date: {
                    ...where.air_date,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    air_date: {
                    ...where.air_date,
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
            
            if (filter.sort_orderRange) {
                const [start, end] = filter.sort_orderRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    sort_order: {
                    ...where.sort_order,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    sort_order: {
                    ...where.sort_order,
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
            const { rows, count } = await db.episodes.findAndCountAll(queryOptions);

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
                        'episodes',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.episodes.findAll({
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

