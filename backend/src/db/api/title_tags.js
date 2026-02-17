
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');



const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Title_tagsDBApi {
    

    
    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const title_tags = await db.title_tags.create(
            {
                id: data.id || undefined,
        
            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        
        await title_tags.setTitle( data.title || null, {
            transaction,
        });
        
        await title_tags.setTag( data.tag || null, {
            transaction,
        });
        

        

        

        return title_tags;
    }
    

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const title_tagsData = data.map((item, index) => ({
                id: item.id || undefined,
                
            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const title_tags = await db.title_tags.bulkCreate(title_tagsData, { transaction });

        // For each item created, replace relation files
        

        return title_tags;
    }

    static async update(id, data,  options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;
        

        const title_tags = await db.title_tags.findByPk(id, {}, {transaction});


        

        const updatePayload = {};
        
        updatePayload.updatedById = currentUser.id;

        await title_tags.update(updatePayload, {transaction});

        
        
        if (data.title !== undefined) {
            await title_tags.setTitle(
              
              data.title,
              
              { transaction }
            );
        }
        
        if (data.tag !== undefined) {
            await title_tags.setTag(
              
              data.tag,
              
              { transaction }
            );
        }
        

        
        

        

        return title_tags;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const title_tags = await db.title_tags.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of title_tags) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of title_tags) {
                await record.destroy({transaction});
            }
        });


        return title_tags;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const title_tags = await db.title_tags.findByPk(id, options);

        await title_tags.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await title_tags.destroy({
            transaction
        });

        return title_tags;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const title_tags = await db.title_tags.findOne(
            { where },
            { transaction },
        );

        if (!title_tags) {
            return title_tags;
        }

        const output = title_tags.get({plain: true});

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        output.title = await title_tags.getTitle({
            transaction
        });
        
        
        output.tag = await title_tags.getTag({
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
        model: db.tags,
        as: 'tag',
        
        where: filter.tag ? {
          [Op.or]: [
            { id: { [Op.in]: filter.tag.split('|').map(term => Utils.uuid(term)) } },
            {
              name: {
                [Op.or]: filter.tag.split('|').map(term => ({ [Op.iLike]: `%${term}%` }))
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
            const { rows, count } = await db.title_tags.findAndCountAll(queryOptions);

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
                        'title_tags',
                        'title',
                        query,
                    ),
                ],
            };
        }

        const records = await db.title_tags.findAll({
            attributes: [ 'id', 'title' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['title', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.title,
        }));
    }

    
};

