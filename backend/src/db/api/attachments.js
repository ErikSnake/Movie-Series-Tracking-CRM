
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AttachmentsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const attachments = await db.attachments.create(
            {
                id: data.id || undefined,
        
        name: data.name
        ||
        null
            ,
            
        description: data.description
        ||
        null
            ,
            
        category: data.category
        ||
        null
            ,
            
        attached_at: data.attached_at
        ||
        null
            ,
            
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await attachments.setUser( data.user || null, {
            transaction,
        });
        
        await attachments.setTitle( data.title || null, {
            transaction,
        });
        
        await attachments.setEpisode( data.episode || null, {
            transaction,
        });
        

        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.attachments.getTableName(),
                belongsToColumn: 'file',
                belongsToId: attachments.id,
            },
            data.file,
            options,
        );
        

        return attachments;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const attachmentsData = data.map((item, index) => ({
                id: item.id || undefined,
                
                name: item.name
            ||
            null
            ,
            
                description: item.description
            ||
            null
            ,
            
                category: item.category
            ||
            null
            ,
            
                attached_at: item.attached_at
            ||
            null
            ,
            
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const attachments = await db.attachments.bulkCreate(attachmentsData, { transaction });

        // For each item created, replace relation files
        
        for (let i = 0; i < attachments.length; i++) {
            await FileDBApi.replaceRelationFiles(
                {
                    belongsTo: db.attachments.getTableName(),
                    belongsToColumn: 'file',
                    belongsToId: attachments[i].id,
                },
                data[i].file,
                options,
            );
        }
        

        return attachments;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const attachments = await db.attachments.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        if (data.name !== undefined) updatePayload.name = data.name;
        
        
        if (data.description !== undefined) updatePayload.description = data.description;
        
        
        if (data.category !== undefined) updatePayload.category = data.category;
        
        
        if (data.attached_at !== undefined) updatePayload.attached_at = data.attached_at;
        
        
        updatePayload.updatedById = currentUser.id;

        await attachments.update(updatePayload, {transaction});

        
        
        if (data.user !== undefined) {
            await attachments.setUser(
              
              data.user,
              
              { transaction }
            );
        }
        
        if (data.title !== undefined) {
            await attachments.setTitle(
              
              data.title,
              
              { transaction }
            );
        }
        
        if (data.episode !== undefined) {
            await attachments.setEpisode(
              
              data.episode,
              
              { transaction }
            );
        }
        

        
        

        
        await FileDBApi.replaceRelationFiles(
            {
                belongsTo: db.attachments.getTableName(),
                belongsToColumn: 'file',
                belongsToId: attachments.id,
            },
            data.file,
            options,
        );
        

        return attachments;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const attachments = await db.attachments.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of attachments) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of attachments) {
                await record.destroy({transaction});
            }
        });


        return attachments;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const attachments = await db.attachments.findByPk(id, options);

        await attachments.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await attachments.destroy({
            transaction
        });

        return attachments;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const attachments = await db.attachments.findOne(
            { where },
            { transaction },
        );

        if (!attachments) {
            return attachments;
        }

        const output = attachments.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.user = await attachments.getUser({
            transaction
        });
        
        
        output.title = await attachments.getTitle({
            transaction
        });
        
        
        output.episode = await attachments.getEpisode({
            transaction
        });
        
        
        output.file = await attachments.getFile({
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



      {
        model: db.file,
        as: 'file',
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
                        'attachments',
                        'name',
                        filter.name,
                    ),
                };
            }
            
            if (filter.description) {
                where = {
                    ...where,
                    [Op.and]: Utils.ilike(
                        'attachments',
                        'description',
                        filter.description,
                    ),
                };
            }
            

            
            

            
            if (filter.attached_atRange) {
                const [start, end] = filter.attached_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    attached_at: {
                    ...where.attached_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    attached_at: {
                    ...where.attached_at,
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

            
            if (filter.category) {
                where = {
                    ...where,
                category: filter.category,
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
            const { rows, count } = await db.attachments.findAndCountAll(queryOptions);

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
                        'attachments',
                        'name',
                        query,
                    ),
                ],
            };
        }

        const records = await db.attachments.findAll({
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

