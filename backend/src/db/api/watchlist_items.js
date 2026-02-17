
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Watchlist_itemsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const watchlist_items = await db.watchlist_items.create(
            {
                id: data.id || undefined,
        
        priority: data.priority
        ||
        null
            ,
            
        position: data.position
        ||
        null
            ,
            
        added_at: data.added_at
        ||
        null
            ,
            
        planned_for: data.planned_for
        ||
        null
            ,
            
        is_active: data.is_active
        ||
        false
        
            ,
            
        note: data.note
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await watchlist_items.setUser( data.user || null, {
            transaction,
        });
        
        await watchlist_items.setTitle( data.title || null, {
            transaction,
        });
        
        await watchlist_items.setEpisode( data.episode || null, {
            transaction,
        });
        

        

        

        return watchlist_items;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const watchlist_itemsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                priority: item.priority
            ||
            null
            ,
            
                position: item.position
            ||
            null
            ,
            
                added_at: item.added_at
            ||
            null
            ,
            
                planned_for: item.planned_for
            ||
            null
            ,
            
                is_active: item.is_active
            ||
            false
        
            ,
            
                note: item.note
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const watchlist_items = await db.watchlist_items.bulkCreate(watchlist_itemsData, { transaction });

        // For each item created, replace relation files
        

        return watchlist_items;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const watchlist_items = await db.watchlist_items.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.priority !== undefined) updatePayload.priority = data.priority;
        
        
        if (data.position !== undefined) updatePayload.position = data.position;
        
        
        if (data.added_at !== undefined) updatePayload.added_at = data.added_at;
        
        
        if (data.planned_for !== undefined) updatePayload.planned_for = data.planned_for;
        
        
        if (data.is_active !== undefined) updatePayload.is_active = data.is_active;
        
        
        if (data.note !== undefined) updatePayload.note = data.note;
        
        
        updatePayload.updatedById = currentUser.id;

        await watchlist_items.update(updatePayload, {transaction});

        
        
        if (data.user !== undefined) {
            await watchlist_items.setUser(
              
              data.user,
              
              { transaction }
            );
        }
        
        if (data.title !== undefined) {
            await watchlist_items.setTitle(
              
              data.title,
              
              { transaction }
            );
        }
        
        if (data.episode !== undefined) {
            await watchlist_items.setEpisode(
              
              data.episode,
              
              { transaction }
            );
        }
        

        
        

        

        return watchlist_items;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const watchlist_items = await db.watchlist_items.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of watchlist_items) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of watchlist_items) {
                await record.destroy({transaction});
            }
        });


        return watchlist_items;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const watchlist_items = await db.watchlist_items.findByPk(id, options);

        await watchlist_items.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await watchlist_items.destroy({
            transaction
        });

        return watchlist_items;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const watchlist_items = await db.watchlist_items.findOne(
            { where },
            { transaction },
        );

        if (!watchlist_items) {
            return watchlist_items;
        }

        const output = watchlist_items.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.user = await watchlist_items.getUser({
            transaction
        });
        
        
        output.title = await watchlist_items.getTitle({
            transaction
        });
        
        
        output.episode = await watchlist_items.getEpisode({
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

            
            if (filter.note) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'watchlist_items',
                        'note',
                        filter.note,
                    ),
                };
            }
            

            
            

            
            if (filter.positionRange) {
                const [start, end] = filter.positionRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    position: {
                    ...where.position,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    position: {
                    ...where.position,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.added_atRange) {
                const [start, end] = filter.added_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    added_at: {
                    ...where.added_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    added_at: {
                    ...where.added_at,
                            [Op.lte]: end,
                    },
                };
                }
            }
            
            if (filter.planned_forRange) {
                const [start, end] = filter.planned_forRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    planned_for: {
                    ...where.planned_for,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    planned_for: {
                    ...where.planned_for,
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

            
            if (filter.priority) {
                where = {
                    ...where,
                priority: filter.priority,
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
            const { rows, count } = await db.watchlist_items.findAndCountAll(queryOptions);

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
                        'watchlist_items',
                        'note',
                        query,
                    ),
                ],
            };
        }

        const records = await db.watchlist_items.findAll({
            attributes: [ 'id', 'note' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['note', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.note,
        }));
    }

    
};

