
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SeasonsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const seasons = await db.seasons.create(
            {
                id: data.id || undefined,
        
        season_number: data.season_number
        ||
        null
            ,
            
        name: data.name
        ||
        null
            ,
            
        release_date: data.release_date
        ||
        null
            ,
            
        episode_count: data.episode_count
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

        
        await seasons.setSeries( data.series || null, {
            transaction,
        });
        

        

        

        return seasons;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const seasonsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                season_number: item.season_number
            ||
            null
            ,
            
                name: item.name
            ||
            null
            ,
            
                release_date: item.release_date
            ||
            null
            ,
            
                episode_count: item.episode_count
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
        const seasons = await db.seasons.bulkCreate(seasonsData, { transaction });

        // For each item created, replace relation files
        

        return seasons;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const seasons = await db.seasons.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.season_number !== undefined) updatePayload.season_number = data.season_number;
        
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.release_date !== undefined) updatePayload.release_date = data.release_date;
        
        
        if (data.episode_count !== undefined) updatePayload.episode_count = data.episode_count;
        
        
        if (data.overview !== undefined) updatePayload.overview = data.overview;
        
        
        if (data.sort_order !== undefined) updatePayload.sort_order = data.sort_order;
        
        
        updatePayload.updatedById = currentUser.id;

        await seasons.update(updatePayload, {transaction});

        
        
        if (data.series !== undefined) {
            await seasons.setSeries(
              
              data.series,
              
              { transaction }
            );
        }
        

        
        

        

        return seasons;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const seasons = await db.seasons.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of seasons) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of seasons) {
                await record.destroy({transaction});
            }
        });


        return seasons;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const seasons = await db.seasons.findByPk(id, options);

        await seasons.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await seasons.destroy({
            transaction
        });

        return seasons;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const seasons = await db.seasons.findOne(
            { where },
            { transaction },
        );

        if (!seasons) {
            return seasons;
        }

        const output = seasons.get({plain: true});

        
        
        
        
        
        
        
        output.episodes_season = await seasons.getEpisodes_season({
            transaction
        });
        
        
        
        
        
        
        
        
        output.series = await seasons.getSeries({
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
        model: db.titles,
        as: 'series',
        
        where: filter.series ? {
          [Op.or]: [
            { id: { [Op.in]: filter.series.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.series.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
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
                        'seasons',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.overview) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'seasons',
                        'overview',
                        filter.overview,
                    ),
                };
            }
            

            
            

            
            if (filter.season_numberRange) {
                const [start, end] = filter.season_numberRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    season_number: {
                    ...where.season_number,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    season_number: {
                    ...where.season_number,
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
            
            if (filter.episode_countRange) {
                const [start, end] = filter.episode_countRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    episode_count: {
                    ...where.episode_count,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    episode_count: {
                    ...where.episode_count,
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
            const { rows, count } = await db.seasons.findAndCountAll(queryOptions);

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
                        'seasons',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.seasons.findAll({
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

