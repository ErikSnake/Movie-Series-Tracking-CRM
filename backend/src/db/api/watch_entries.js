
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Watch_entriesDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const watch_entries = await db.watch_entries.create(
            {
                id: data.id || undefined,
        
        status: data.status
        ||
        null
            ,
            
        started_at: data.started_at
        ||
        null
            ,
            
        finished_at: data.finished_at
        ||
        null
            ,
            
        watched_at: data.watched_at
        ||
        null
            ,
            
        rating: data.rating
        ||
        null
            ,
            
        revisit: data.revisit
        ||
        false
        
            ,
            
        rewatch_count: data.rewatch_count
        ||
        null
            ,
            
        notes: data.notes
        ||
        null
            ,
            
        contains_spoilers: data.contains_spoilers
        ||
        false
        
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await watch_entries.setUser( data.user || null, {
            transaction,
        });
        
        await watch_entries.setTitle( data.title || null, {
            transaction,
        });
        
        await watch_entries.setEpisode( data.episode || null, {
            transaction,
        });
        

        

        

        return watch_entries;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const watch_entriesData = data.map((item, index) => ({
                id: item.id || undefined,
                
                status: item.status
            ||
            null
            ,
            
                started_at: item.started_at
            ||
            null
            ,
            
                finished_at: item.finished_at
            ||
            null
            ,
            
                watched_at: item.watched_at
            ||
            null
            ,
            
                rating: item.rating
            ||
            null
            ,
            
                revisit: item.revisit
            ||
            false
        
            ,
            
                rewatch_count: item.rewatch_count
            ||
            null
            ,
            
                notes: item.notes
            ||
            null
            ,
            
                contains_spoilers: item.contains_spoilers
            ||
            false
        
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const watch_entries = await db.watch_entries.bulkCreate(watch_entriesData, { transaction });

        // For each item created, replace relation files
        

        return watch_entries;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const watch_entries = await db.watch_entries.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.status !== undefined) updatePayload.status = data.status;
        
        
        if (data.started_at !== undefined) updatePayload.started_at = data.started_at;
        
        
        if (data.finished_at !== undefined) updatePayload.finished_at = data.finished_at;
        
        
        if (data.watched_at !== undefined) updatePayload.watched_at = data.watched_at;
        
        
        if (data.rating !== undefined) updatePayload.rating = data.rating;
        
        
        if (data.revisit !== undefined) updatePayload.revisit = data.revisit;
        
        
        if (data.rewatch_count !== undefined) updatePayload.rewatch_count = data.rewatch_count;
        
        
        if (data.notes !== undefined) updatePayload.notes = data.notes;
        
        
        if (data.contains_spoilers !== undefined) updatePayload.contains_spoilers = data.contains_spoilers;
        
        
        updatePayload.updatedById = currentUser.id;

        await watch_entries.update(updatePayload, {transaction});

        
        
        if (data.user !== undefined) {
            await watch_entries.setUser(
              
              data.user,
              
              { transaction }
            );
        }
        
        if (data.title !== undefined) {
            await watch_entries.setTitle(
              
              data.title,
              
              { transaction }
            );
        }
        
        if (data.episode !== undefined) {
            await watch_entries.setEpisode(
              
              data.episode,
              
              { transaction }
            );
        }
        

        
        

        

        return watch_entries;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const watch_entries = await db.watch_entries.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of watch_entries) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of watch_entries) {
                await record.destroy({transaction});
            }
        });


        return watch_entries;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const watch_entries = await db.watch_entries.findByPk(id, options);

        await watch_entries.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await watch_entries.destroy({
            transaction
        });

        return watch_entries;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const watch_entries = await db.watch_entries.findOne(
            { where },
            { transaction },
        );

        if (!watch_entries) {
            return watch_entries;
        }

        const output = watch_entries.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.user = await watch_entries.getUser({
            transaction
        });
        
        
        output.title = await watch_entries.getTitle({
            transaction
        });
        
        
        output.episode = await watch_entries.getEpisode({
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
        model: db.users,
        as: 'user',
        
        where: filter.user ? {
          [Op.or]: [
            { id: { [Op.in]: filter.user.split('|').map(term => Utils.uuid(term)) } },
            {
              firstName: {
                [Op.or]: filter.user.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },

      {
        model: db.titles,
        as: 'title',
        
        where: filter.title ? {
          [Op.or]: [
            { id: { [Op.in]: filter.title.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.title.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
              }
            },
          ]
        } : {},
        
      },

      {
        model: db.episodes,
        as: 'episode',
        
        where: filter.episode ? {
          [Op.or]: [
            { id: { [Op.in]: filter.episode.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.episode.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
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

            
            if (filter.notes) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'watch_entries',
                        'notes',
                        filter.notes,
                    ),
                };
            }
            

            
            

            
            if (filter.started_atRange) {
                const [start, end] = filter.started_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    started_at: {
                    ...where.started_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    started_at: {
                    ...where.started_at,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.finished_atRange) {
                const [start, end] = filter.finished_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    finished_at: {
                    ...where.finished_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    finished_at: {
                    ...where.finished_at,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.watched_atRange) {
                const [start, end] = filter.watched_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    watched_at: {
                    ...where.watched_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    watched_at: {
                    ...where.watched_at,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.ratingRange) {
                const [start, end] = filter.ratingRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    rating: {
                    ...where.rating,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    rating: {
                    ...where.rating,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.rewatch_countRange) {
                const [start, end] = filter.rewatch_countRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    rewatch_count: {
                    ...where.rewatch_count,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    rewatch_count: {
                    ...where.rewatch_count,
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

            
            if (filter.status) {
                where = {
                    ...where,
                status: filter.status,
            };
            }
            
            if (filter.revisit) {
                where = {
                    ...where,
                revisit: filter.revisit,
            };
            }
            
            if (filter.contains_spoilers) {
                where = {
                    ...where,
                contains_spoilers: filter.contains_spoilers,
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
            const { rows, count } = await db.watch_entries.findAndCountAll(queryOptions);

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
                        'watch_entries',
                        'notes',
                        query,
                    ),
                ],
            };
        }

        const records = await db.watch_entries.findAll({
            attributes: [ 'id', 'notes' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['notes', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.notes,
        }));
    }

    
};

